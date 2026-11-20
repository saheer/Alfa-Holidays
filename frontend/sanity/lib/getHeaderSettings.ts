import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {headerSettingsQuery} from './queries'

// Header call-to-action ("Plan Your Trip"). Busted by the "headerSettings" tag
// (see app/api/revalidate/route.ts).
export async function getHeaderSettings() {
  'use cache'
  cacheLife('minutes')
  cacheTag('headerSettings')

  return client.fetch(headerSettingsQuery)
}
