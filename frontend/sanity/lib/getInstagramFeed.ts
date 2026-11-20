import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {instagramFeedQuery} from './queries'

// Cached like the other fetchers; busted by the "instagramFeed" tag
// (see app/api/revalidate/route.ts)
export async function getInstagramFeed() {
  'use cache'
  cacheLife('minutes')
  cacheTag('instagramFeed')

  return client.fetch(instagramFeedQuery)
}
