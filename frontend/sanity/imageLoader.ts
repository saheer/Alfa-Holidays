// Custom next/image loader (wired up in next.config.ts -> images.loaderFile).
//
// Why: the default loader makes the Next.js SERVER download every Sanity image
// from cdn.sanity.io before resizing it. Next 16 blocks that download whenever
// the hostname resolves to a private/NAT64 address (common on IPv6-only or
// DNS64 networks, some corporate/ISP resolvers, containers), logging
//   "upstream image ... hostname resolved to private IP"
// and the image never shows. Sanity's CDN already resizes and compresses
// images, so for Sanity URLs the browser is simply pointed at the CDN with the
// right size, and the Next.js server is not involved at all.
type LoaderArgs = {src: string; width: number; quality?: number}

export default function imageLoader({src, width, quality}: LoaderArgs): string {
  if (src.startsWith('https://cdn.sanity.io/')) {
    // SVGs are vector files: ask for no resizing / re-encoding
    if (/\.svg(\?|$)/i.test(src)) return src

    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality ?? 75))
    url.searchParams.set('auto', 'format')
    return url.toString()
  }

  // Local files from /public (logos etc.): served as-is, the query is ignored
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`
}
