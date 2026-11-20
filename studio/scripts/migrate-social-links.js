/*
 * One-off: footer social links -> Facebook + Instagram only.
 * Replaces the LinkedIn entry of the "Footer" document (published + draft) with Facebook and
 * drops any other platform. Instagram is kept as it is.
 *
 * Usage (from studio/):
 *   npx sanity exec scripts/migrate-social-links.js --with-user-token             # DRY RUN
 *   npx sanity exec scripts/migrate-social-links.js --with-user-token -- --commit # apply
 *
 * Edit FACEBOOK_URL first if the page address differs.
 */
import {getCliClient} from 'sanity/cli'

const COMMIT = process.argv.includes('--commit')
const FACEBOOK_URL = 'https://www.facebook.com/alfatravelcare/'
const client = getCliClient({apiVersion: '2025-01-01'})

async function main() {
  console.log(COMMIT ? 'APPLYING changes' : 'DRY RUN (add "-- --commit" to apply)')
  const docs = await client.fetch('*[_type == "footer"]{_id, socialLinks}')
  for (const d of docs) {
    const old = d.socialLinks ?? []
    if (!old.some((s) => s.platform === 'linkedin')) {
      console.log(d._id, ': no LinkedIn entry, skipped')
      continue
    }
    const instagram = old.filter((s) => s.platform === 'instagram')
    const next = [
      {_key: 'facebook', _type: 'social', platform: 'facebook', label: 'Facebook', url: FACEBOOK_URL},
      ...instagram,
    ]
    console.log(d._id, ':', old.map((s) => s.platform).join(', '), '->', next.map((s) => s.platform).join(', '))
    if (COMMIT) await client.patch(d._id).set({socialLinks: next}).commit()
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
