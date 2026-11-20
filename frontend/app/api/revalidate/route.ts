import {revalidateTag} from 'next/cache'
import {NextRequest, NextResponse} from 'next/server'

// Sanity webhook target: POST /api/revalidate?secret=YOUR_SECRET
export async function POST(req: NextRequest) {
  if (req.nextUrl.searchParams.get('secret') !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({message: 'Invalid secret'}, {status: 401})
  }
  // Studio content feeding the site: "Home Page", "Holidays",
  // "Contact Us", "Footer", "About", "Instagram Feed" and the Travel Guide posts
  revalidateTag('home', 'max')
  revalidateTag('holidaysPage', 'max')
  revalidateTag('headerSettings', 'max')
  revalidateTag('travelGuide', 'max')
  revalidateTag('contact', 'max')
  revalidateTag('footer', 'max')
  revalidateTag('about', 'max')
  revalidateTag('instagramFeed', 'max')
  revalidateTag('services', 'max')
  revalidateTag('seo', 'max') // SEO fields of every page
  return NextResponse.json({revalidated: true})
}