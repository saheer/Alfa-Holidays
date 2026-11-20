import {cacheLife, cacheTag} from 'next/cache'
import {client} from './client'
import {
  guideFeaturedQuery,
  guideGridQuery,
  guideHomeQuery,
  guidePostQuery,
  guideSlugsQuery,
} from './queries'

// Same pattern as getHome / getHolidaysPage: cached on the server, refreshed every few
// minutes, or instantly when the "travelGuide" tag is revalidated
// (see app/api/revalidate/route.ts).

// Number of cards in the grid of ONE listing page (the featured post is extra, and
// only shown on page 1)
export const GUIDE_PAGE_SIZE = 9

// Home page section: the 3 newest posts
export async function getGuideHome() {
  'use cache'
  cacheLife('minutes')
  cacheTag('travelGuide')

  return client.fetch(guideHomeQuery)
}

// Listing page: the featured post and the total number of posts
export async function getGuideFeatured() {
  'use cache'
  cacheLife('minutes')
  cacheTag('travelGuide')

  return client.fetch(guideFeaturedQuery)
}

// Listing page: the grid cards of one page (page numbers start at 1)
export async function getGuideGrid(featuredId: string | null, page: number) {
  'use cache'
  cacheLife('minutes')
  cacheTag('travelGuide')

  const from = (page - 1) * GUIDE_PAGE_SIZE
  return client.fetch(guideGridQuery, {
    featuredId: featuredId ?? '',
    from,
    to: from + GUIDE_PAGE_SIZE,
  })
}

// Detail page: one full post, or null when the slug doesn't exist
export async function getGuidePost(slug: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag('travelGuide')

  return client.fetch(guidePostQuery, {slug})
}

// All slugs, for generateStaticParams
export async function getGuideSlugs(): Promise<{slug: string}[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('travelGuide')

  return client.fetch(guideSlugsQuery)
}
