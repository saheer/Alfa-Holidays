import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // next/image + pictures uploaded in Sanity.
  // The custom loader sends the browser straight to Sanity's image CDN, so the
  // Next.js server never has to download the originals (see sanity/imageLoader.ts).
  images: {
    loader: 'custom',
    loaderFile: './sanity/imageLoader.ts',
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
  // Old /services and /explore-holidays URLs (bookmarks, search results, links saved in Sanity content)
  async redirects() {
    return [
      {source: '/services', destination: '/our-services', permanent: true},
      {source: '/services/:slug', destination: '/our-services/:slug', permanent: true},
      // "Explore Holidays" was renamed to "Our Services"
      {source: '/explore-holidays', destination: '/our-services', permanent: true},
      {source: '/explore-holidays/:slug', destination: '/our-services/:slug', permanent: true},
      // Old "Digital Footprint" / "Travel Stories" pages, replaced by "Holidays"
      {source: '/digital-footprint', destination: '/holidays', permanent: true},
      {source: '/travel-stories', destination: '/holidays', permanent: true},
      // Old "Our Technology" page, now "Instagram Feed"
      {source: '/our-technology', destination: '/instagram-feed', permanent: true},
      // Old "Digital Digest" section, now "Travel Guide"
      {source: '/digital-digest', destination: '/travel-guide', permanent: true},
      {source: '/digital-digest/:slug', destination: '/travel-guide/:slug', permanent: true},
    ]
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
