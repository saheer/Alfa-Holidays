import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {holidaysPageQuery} from './queries'

// "Holidays" document: feeds the homepage "Featured holidays" section and the /holidays page.
// Cached like the other fetchers; busted by the "holidaysPage" tag (see app/api/revalidate/route.ts)
export async function getHolidaysPage() {
  'use cache'
  cacheLife('minutes')
  cacheTag('holidaysPage')

  return client.fetch(holidaysPageQuery)
}
