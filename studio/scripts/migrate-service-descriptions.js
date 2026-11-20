/*
 * One-off: Home Page > Services cards get the new "Short description" (and the luggage / plane
 * icons from the new design) on the cards that already exist in Studio.
 * Cards are matched by title; only EMPTY descriptions are filled, so anything an editor has
 * already written is left alone. Both the published document and any draft are updated.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/migrate-service-descriptions.js --with-user-token             # DRY RUN
 *   npx sanity exec scripts/migrate-service-descriptions.js --with-user-token -- --commit # apply
 *
 * Set SET_ICONS to false if you want to keep the icons you have chosen.
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const SET_ICONS = true
const client = getCliClient({apiVersion: '2025-01-01'})

const norm = (t) =>
  String(t || '')
    .toLowerCase()
    .replace(/customised/g, 'customized')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const CARDS = {
  'Tour Packages (Domestic & International)': {
    icon: 'luggage',
    description:
      'Kerala and beyond! From honeymoon and family tours to international destinations (Dubai, Saudi, Singapore etc.).',
  },
  'Flight & Train Ticket Booking': {
    icon: 'plane',
    description: 'Domestic & international flight tickets and train ticket assistance.',
  },
  'Bus Ticket Booking': {
    icon: 'bus',
    description: 'KSRTC, private super fast and luxury sleeper bus tickets.',
  },
  'Visa Assistance & Processing': {
    icon: 'visa',
    description: 'Tourist and business visa documentation and application support.',
  },
  'Passport Services': {
    icon: 'passport',
    description: 'New passport applications, renewal and verification assistance.',
  },
  'Hotel & Resort Reservations': {
    icon: 'hotel',
    description: 'Book top hotels, resorts and homestays.',
  },
  'Travel Insurance': {
    icon: 'insurance',
    description: 'Stay protected with reliable travel insurance.',
  },
  'Cab / Car Rental Services': {
    icon: 'car',
    description: 'Airport pick-up/drop, sightseeing cars and more.',
  },
  'Customised Holiday Itineraries': {
    icon: 'itinerary',
    description: 'Tailor-made travel plans as per your interests and budget.',
  },
}
const BY_TITLE = new Map(Object.entries(CARDS).map(([t, v]) => [norm(t), v]))

async function main() {
  console.log(COMMIT ? 'APPLYING changes' : 'DRY RUN (add "-- --commit" to apply)')
  const docs = await client.fetch(
    '*[_type == "home" && _id in ["home", "drafts.home"]]{_id, holidaysItems}',
  )
  if (docs.length === 0) console.log('No Home Page document found.')

  for (const d of docs) {
    const set = {}
    for (const item of d.holidaysItems ?? []) {
      const match = BY_TITLE.get(norm(item.title))
      if (!match) {
        console.log(d._id, ':', JSON.stringify(item.title), '-> no matching default, skipped')
        continue
      }
      const sel = `holidaysItems[_key=="${item._key}"]`
      if (!item.description?.trim()) set[`${sel}.description`] = match.description
      if (SET_ICONS && !item.iconFile && item.icon !== match.icon) set[`${sel}.icon`] = match.icon
    }
    const n = Object.keys(set).length
    console.log(d._id, ':', n ? `${n} field(s) to set` : 'nothing to change')
    for (const [path, value] of Object.entries(set)) console.log('   ', path, '=', value)
    if (COMMIT && n) await client.patch(d._id).set(set).commit()
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
