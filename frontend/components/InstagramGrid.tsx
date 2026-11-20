import Image from "next/image";
import { manrope } from "@/app/fonts";
import { tileAspect, type InstagramTile } from "@/lib/instagram";

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  tiles: (InstagramTile & { hotspot?: { x: number; y: number } | null })[];
  profileUrl?: string | null;
  handle?: string | null;
  followLabel?: string | null;
};

// Corner badge, always pinned to the top-right inside the tile (any tile height)
const badgeCls =
  "pointer-events-none absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white sm:right-3 sm:top-3";

function PlayBadge() {
  return (
    <span aria-hidden="true" className={badgeCls}>
      <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

// Reel icon: a rounded frame with a clapper line and a play triangle
function ReelBadge() {
  return (
    <span aria-hidden="true" className={badgeCls}>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <path d="M3.8 9h16.4M9 3.6l2.6 5.2M14.6 3.6l2.6 5.2" />
        <path d="M10.4 12.6v4.2l3.6-2.1z" className="fill-current" />
      </svg>
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" className="fill-current stroke-none" />
    </svg>
  );
}

export default function InstagramGrid({
  eyebrow,
  heading,
  description,
  tiles,
  profileUrl,
  handle,
  followLabel,
}: Props) {
  const items = tiles.filter((t) => t?.imageUrl);

  return (
    <section
      aria-labelledby="instagram-feed-heading"
      className="bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                id="instagram-feed-heading"
                className={`${manrope.className} mt-4 whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-tight text-ink lg:text-[3.25rem]`}
              >
                {heading}
              </h2>
            )}
          </div>
          {description && (
            <p className="max-w-sm text-sm leading-relaxed text-[#2D4970] lg:pb-2">
              {description}
            </p>
          )}
        </div>

        {/* Posts: each tile keeps its own shape (square, portrait, reel, video, custom) and the
            tiles are packed into columns, so different heights never leave gaps in the grid. */}
        {items.length > 0 ? (
          <ul className="mt-12 columns-2 gap-3 sm:gap-4 md:columns-3 lg:mt-16 lg:columns-4">
            {items.map((tile) => {
              const href = tile.permalink || profileUrl || undefined;
              const label = tile.caption
                ? tile.caption.slice(0, 120)
                : tile.isVideo
                  ? "Watch this video on Instagram"
                  : "View this photo on Instagram";
              const isSanity = tile.imageUrl.startsWith("https://cdn.sanity.io/");
              const objectPosition = tile.hotspot
                ? `${tile.hotspot.x * 100}% ${tile.hotspot.y * 100}%`
                : undefined;
              const aspect = tileAspect(tile);
              const isReel = aspect.className === "aspect-[9/16]";
              return (
                <li key={tile.id} className="mb-3 break-inside-avoid sm:mb-4">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={aspect.style}
                    className={`group relative block w-full overflow-hidden rounded-xl bg-[#0B1F44] ${aspect.className}`}
                  >
                    {isSanity ? (
                      <Image
                        src={tile.imageUrl}
                        alt={tile.alt || ""}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        style={{ objectPosition }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                      />
                    ) : (
                      // Instagram CDN images are signed URLs: shown as-is (not
                      // routed through the Sanity image loader).
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tile.imageUrl}
                        alt={tile.alt || tile.caption?.slice(0, 100) || ""}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        style={{ objectPosition }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                      />
                    )}
                    {tile.isVideo && (isReel || tile.isReel ? <ReelBadge /> : <PlayBadge />)}
                    {tile.caption && (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-3 bg-gradient-to-t from-[#0B1F44]/90 to-transparent p-4 pt-10 text-xs leading-relaxed text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                        {tile.caption}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-12 text-[15px] leading-[1.7] text-[#2D4970] lg:mt-16">
            Our latest photos and videos will appear here soon.
          </p>
        )}

        {/* Link back to the Instagram profile */}
        {profileUrl && (
          <div className="mt-12 flex flex-col items-center gap-3 lg:mt-16">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
            >
              <InstagramIcon />
              {followLabel || "Follow us on Instagram"}
            </a>
            {handle && (
              <p className="text-sm text-[#2D4970]">{handle}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
