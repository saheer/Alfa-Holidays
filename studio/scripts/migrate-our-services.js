/*
 * One-off content migration: "Explore Holidays"  ->  "Our Services".
 *
 * Why: renaming a schema type in code does NOT rename the documents already stored in the
 * dataset. Without this script the existing "Explore Holidays Page" content and every
 * holiday package would disappear from Studio and from the website.
 *
 * What it does (published documents AND drafts):
 *   exploreHolidaysPage  -> ourServicesPage   (new _id + _type, old one deleted)
 *   holiday (many)       -> service           (_id prefix holiday- -> service-, old one deleted)
 *   every text value that contains "/explore-holidays" (footer, home, about, holidays page,
 *   service CTAs, ...) is rewritten to "/our-services"; the footer link labelled
 *   "Holidays"/"Explore Holidays" that pointed there is relabelled "Our Services".
 *
 * Usage (from the studio/ folder, logged in with `npx sanity login`):
 *   npx sanity exec scripts/migrate-our-services.js --with-user-token            # DRY RUN (default)
 *   npx sanity exec scripts/migrate-our-services.js --with-user-token -- --commit # apply
 *
 * Take a backup first:  npx sanity dataset export production backup.tar.gz
 * Safe to run twice: documents that were already migrated are skipped.
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const client = getCliClient({apiVersion: '2025-01-01'})
const log = (...a) => console.log(COMMIT ? '' : '[dry-run]', ...a)

const stripSystem = ({_rev, _createdAt, _updatedAt, ...rest}) => rest

const OLD_PATH = '/explore-holidays'
const NEW_PATH = '/our-services'

// Deep copy that rewrites every string containing the old path
function rewritePaths(value) {
  if (typeof value === 'string') return value.split(OLD_PATH).join(NEW_PATH)
  if (Array.isArray(value)) return value.map(rewritePaths)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = rewritePaths(v)
    // footer-style link objects: {label, url}
    if (value.url === OLD_PATH && ['Holidays', 'Explore Holidays'].includes(value.label)) {
      out.label = 'Our Services'
    }
    return out
  }
  return value
}

// 1. Documents whose _type (and _id) change: create the new one, delete the old one.
async function moveType({oldType, newType, newId}) {
  const docs = await client.fetch('*[_type == $t]', {t: oldType})
  for (const d of docs) {
    const isDraft = d._id.startsWith('drafts.')
    const baseId = d._id.replace(/^drafts\./, '')
    const targetId = (isDraft ? 'drafts.' : '') + newId(baseId)
    const next = {...rewritePaths(stripSystem(d)), _id: targetId, _type: newType}
    log(`${oldType} ${d._id}  ->  ${newType} ${targetId}`)
    if (COMMIT) await client.transaction().createOrReplace(next).delete(d._id).commit()
  }
  if (docs.length === 0) log(`no "${oldType}" documents (already migrated?)`)
}

// 2. Every other document that still links to the old path
async function fixLinks() {
  const docs = await client.fetch('*[!(_type match "system.*") && !(_type in $moved)]', {
    moved: ['exploreHolidaysPage', 'holiday'],
  })
  for (const d of docs) {
    if (!JSON.stringify(d).includes(OLD_PATH)) continue
    const next = rewritePaths(stripSystem(d))
    log(`${d._type} ${d._id}: rewriting "${OLD_PATH}" links`)
    if (COMMIT) await client.createOrReplace(next)
  }
}

async function main() {
  console.log(COMMIT ? 'APPLYING changes' : 'DRY RUN (add "-- --commit" to apply)')
  await moveType({
    oldType: 'exploreHolidaysPage',
    newType: 'ourServicesPage',
    newId: () => 'ourServicesPage',
  })
  await moveType({
    oldType: 'holiday',
    newType: 'service',
    newId: (id) => (id.startsWith('holiday-') ? id.replace(/^holiday-/, 'service-') : `service-${id}`),
  })
  await fixLinks()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
