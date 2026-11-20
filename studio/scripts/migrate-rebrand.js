/*
 * One-off content migration for the Alfa Holidays rebrand.
 *
 * Why: renaming a schema type or field in code does NOT rename the data already stored
 * in the dataset. Without this script, the existing Home/Footer/Contact content, the
 * Services and the Digital Footprint posts would no longer show in Studio or on the site.
 *
 * What it does (published documents AND drafts):
 *   servicesPage          -> exploreHolidaysPage   (new _id + _type, old one deleted)
 *   digitalFootprintPage / travelStoriesPage -> DELETED (the LinkedIn "Travel Stories" page was
 *                          replaced by the new "holidaysPage" document, which starts empty)
 *   service (many)        -> holiday               (_id prefix service- -> holiday-;
 *                                                  protectHeading/protectItems -> highlightsHeading/highlightItems)
 *   home    servicesEyebrow, servicesHeading, servicesDescription, servicesItems, serviceButtonLink
 *           -> holidaysEyebrow, holidaysHeading, holidaysDescription, holidaysItems, holidayButtonLink
 *   footer  servicesTitle, serviceLinks   -> holidaysTitle, holidayLinks
 *   contact reportEmail                   -> bookingEmail
 *   digestPage            -> travelGuidePage       (new _id + _type, old one deleted)
 *   post    category (plain text) -> reference to a new "category" document (one per distinct value)
 *   about   removes the leftover peopleHeading / peopleDescription / peopleImage fields ("Our People" was removed)
 *   home    statsItems / statsNote ("Key Statistics") are copied to the About document, then removed from home
 *   (ourTechnology is NOT migrated: its content was technology copy. The new instagramFeed
 *    document starts fresh; delete the old "ourTechnology" document if it is still listed.)
 *   footer  indexLinks    "Digital Digest" /digital-digest -> "Travel Guide" /travel-guide (also Digital Footprint link)
 *
 * Usage (from the studio/ folder, logged in with `npx sanity login`):
 *   npx sanity exec scripts/migrate-rebrand.js --with-user-token            # DRY RUN (default)
 *   npx sanity exec scripts/migrate-rebrand.js --with-user-token -- --commit # apply
 *
 * Take a backup first:  npx sanity dataset export production backup.tar.gz
 * Safe to run twice: documents that were already migrated are skipped.
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2025-01-01'})

// _type values found inside documents (array members / objects)
const NESTED_TYPES = {
  footprintPost: 'travelStory',
  serviceItem: 'holidayItem',
  protectItem: 'highlightItem',
}

// Top-level field renames per document type
const FIELD_RENAMES = {
  holiday: {protectHeading: 'highlightsHeading', protectItems: 'highlightItems'},
  home: {
    servicesEyebrow: 'holidaysEyebrow',
    servicesHeading: 'holidaysHeading',
    servicesDescription: 'holidaysDescription',
    servicesItems: 'holidaysItems',
    serviceButtonLink: 'holidayButtonLink',
    aboutImagePrimary: 'aboutImage', // the About intro now uses one image; a second photo, if any, is ignored
  },
  footer: {servicesTitle: 'holidaysTitle', serviceLinks: 'holidayLinks'},
  contact: {reportEmail: 'bookingEmail'},
}

const stripSystem = ({_rev, _createdAt, _updatedAt, ...rest}) => rest

function retypeNested(value) {
  if (Array.isArray(value)) return value.map(retypeNested)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === '_type' && NESTED_TYPES[v] ? NESTED_TYPES[v] : retypeNested(v)
    }
    return out
  }
  return value
}

function renameFields(doc, map) {
  const out = {}
  for (const [k, v] of Object.entries(doc)) out[map[k] ?? k] = v
  return out
}

const log = (...a) => console.log(COMMIT ? '' : '[dry-run]', ...a)

// 1. Documents whose _type (and _id) change: create the new one, delete the old one.
async function moveType({oldType, newType, newId}) {
  const docs = await client.fetch('*[_type == $t]', {t: oldType})
  for (const d of docs) {
    const isDraft = d._id.startsWith('drafts.')
    const baseId = d._id.replace(/^drafts\./, '')
    const target = newId ? newId(baseId) : baseId
    const targetId = (isDraft ? 'drafts.' : '') + target
    let next = retypeNested(stripSystem(d))
    next = renameFields(next, FIELD_RENAMES[newType] ?? {})
    next._id = targetId
    next._type = newType
    log(`${oldType} ${d._id}  ->  ${newType} ${targetId}`)
    if (COMMIT) {
      await client.transaction().createOrReplace(next).delete(d._id).commit()
    }
  }
  if (docs.length === 0) log(`no "${oldType}" documents (already migrated?)`)
}

// 2. Documents that keep their _id/_type but get renamed fields / nested types.
async function patchInPlace(type) {
  const docs = await client.fetch('*[_type == $t]', {t: type})
  const map = FIELD_RENAMES[type]
  for (const d of docs) {
    const set = {}
    const unset = []
    for (const [oldKey, newKey] of Object.entries(map)) {
      if (d[oldKey] !== undefined && d[newKey] === undefined) {
        set[newKey] = retypeNested(d[oldKey])
        unset.push(oldKey)
      }
    }
    if (unset.length === 0) {
      log(`${type} ${d._id}: nothing to rename`)
      continue
    }
    log(`${type} ${d._id}: ${unset.join(', ')}  ->  ${Object.keys(set).join(', ')}`)
    if (COMMIT) await client.patch(d._id).set(set).unset(unset).commit()
  }
}

// Footer link lists are stored as data, so old labels/URLs must be rewritten there too
const LINK_FIXES = [
  {label: 'Digital Digest', url: '/digital-digest', newLabel: 'Travel Guide', newUrl: '/travel-guide'},
  {label: 'Digital Footprint', url: '/digital-footprint', newLabel: 'Holidays', newUrl: '/holidays'},
  {label: 'Travel Stories', url: '/travel-stories', newLabel: 'Holidays', newUrl: '/holidays'},
  {label: 'Our Technology', url: '/our-technology', newLabel: 'Instagram Feed', newUrl: '/instagram-feed'},
]
async function fixFooterLinks() {
  const docs = await client.fetch('*[_type == "footer"]')
  for (const d of docs) {
    const set = {}
    for (const field of ['indexLinks', 'holidayLinks', 'servicesLinks', 'legalLinks']) {
      if (!Array.isArray(d[field])) continue
      let changed = false
      const next = d[field].map((l) => {
        const fix = LINK_FIXES.find((f) => l.url === f.url || l.label === f.label)
        if (!fix) return l
        changed = true
        return {...l, label: fix.newLabel, url: fix.newUrl}
      })
      if (changed) set[field] = next
    }
    if (Object.keys(set).length === 0) continue
    log(`footer ${d._id}: updating links in ${Object.keys(set).join(', ')}`)
    if (COMMIT) await client.patch(d._id).set(set).commit()
  }
}

// Travel Guide posts used to store the category as plain text ("HONEYMOON IDEAS").
// Create one "category" document per distinct value and point every post at it.
const toTitle = (s) =>
  s === s.toUpperCase() ? s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : s
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

async function migrateCategories() {
  const posts = await client.fetch('*[_type == "post" && defined(category)]{_id, category}')
  const legacy = posts.filter((p) => typeof p.category === 'string' && p.category.trim())
  if (legacy.length === 0) return log('no posts with a text category (already migrated?)')

  const titles = new Map() // lowercased text -> display title
  for (const p of legacy) {
    const key = p.category.trim().toLowerCase()
    if (!titles.has(key)) titles.set(key, toTitle(p.category.trim()))
  }
  for (const [key, title] of titles) {
    const id = `category-${slugify(key)}`
    log(`category "${title}" (${id})`)
    if (COMMIT) await client.createIfNotExists({_id: id, _type: 'category', title})
  }
  for (const p of legacy) {
    const id = `category-${slugify(p.category.trim().toLowerCase())}`
    log(`post ${p._id}: "${p.category}" -> reference ${id}`)
    if (COMMIT) {
      await client.patch(p._id).set({category: {_type: 'reference', _ref: id}}).commit()
    }
  }
}

// The "Our People" block was removed from the About page: drop its leftover fields
async function removeLegacyAboutFields() {
  const docs = await client.fetch('*[_type == "about" && (defined(peopleHeading) || defined(peopleDescription) || defined(peopleImage))]{_id}')
  for (const d of docs) {
    log(`about ${d._id}: removing peopleHeading, peopleDescription, peopleImage`)
    if (COMMIT) await client.patch(d._id).unset(['peopleHeading', 'peopleDescription', 'peopleImage']).commit()
  }
  if (docs.length === 0) log('no leftover "Our People" fields on the About document')
}

// "Key Statistics" moved from the Home page to the About Us page: copy the saved numbers
// across (if About has none yet), then remove them from Home.
async function moveStatsToAbout() {
  const homes = await client.fetch(
    '*[_type == "home" && (defined(statsItems) || defined(statsNote))]{_id, statsItems, statsNote}',
  )
  if (homes.length === 0) return log('no statistics left on the Home document')
  const about = await client.fetch(
    '*[_type == "about" && !(_id in path("drafts.**"))][0]{_id, statsItems, statsNote}',
  )
  const source = homes.find((h) => !h._id.startsWith('drafts.')) ?? homes[0]
  const set = {}
  if (about && !about.statsItems && source.statsItems) set.statsItems = source.statsItems
  if (about && !about.statsNote && source.statsNote) set.statsNote = source.statsNote
  if (Object.keys(set).length > 0) {
    log(`about ${about._id}: copying ${Object.keys(set).join(', ')} from home ${source._id}`)
    if (COMMIT) await client.patch(about._id).set(set).commit()
  }
  // Only clear Home once the numbers are safely on About
  if (!about) return log('no published About document yet: statistics left on Home, run again after creating it')
  for (const h of homes) {
    log(`home ${h._id}: removing statsItems, statsNote`)
    if (COMMIT) await client.patch(h._id).unset(['statsItems', 'statsNote']).commit()
  }
}

// The LinkedIn "Travel Stories" page was removed. Delete its documents (published + drafts).
// Back up first: npx sanity dataset export production backup.tar.gz
async function deleteDocuments(types) {
  const docs = await client.fetch('*[_type in $types]{_id, _type}', {types})
  for (const d of docs) {
    log(`delete ${d._type} ${d._id}`)
    if (COMMIT) await client.delete(d._id)
  }
  if (docs.length === 0) log(`no ${types.join(' / ')} documents to delete`)
}

async function main() {
  console.log(COMMIT ? 'APPLYING changes' : 'DRY RUN (add "-- --commit" to apply)')

  await moveType({oldType: 'servicesPage', newType: 'exploreHolidaysPage', newId: () => 'exploreHolidaysPage'})
  await deleteDocuments(['digitalFootprintPage', 'travelStoriesPage'])
  await moveType({oldType: 'digestPage', newType: 'travelGuidePage', newId: () => 'travelGuidePage'})
  await moveType({
    oldType: 'service',
    newType: 'holiday',
    newId: (id) => (id.startsWith('service-') ? id.replace(/^service-/, 'holiday-') : `holiday-${id}`),
  })

  for (const t of ['home', 'footer', 'contact']) await patchInPlace(t)
  await fixFooterLinks()
  await migrateCategories()
  await removeLegacyAboutFields()
  await moveStatsToAbout()

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
