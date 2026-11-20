import { cacheLife, cacheTag } from "next/cache";

// One tile of the Instagram Feed page (from the live feed or from Sanity).
export type InstagramTile = {
  id: string;
  imageUrl: string;
  alt?: string | null;
  caption?: string | null;
  permalink?: string | null;
  isVideo?: boolean;
  isReel?: boolean; // Instagram marks it as a Reel (live feed only)
  format?: PostFormat | null; // chosen in Studio; "auto" or empty = decided from the post type
  customRatio?: string | null; // only used when format is "custom", e.g. "3/4"
};

// Shape of a tile in the grid
export type PostFormat = "auto" | "square" | "portrait" | "reel" | "video" | "custom";

// Full class names (not built with string pieces) so Tailwind can see them
const ASPECT_CLASS = {
  square: "aspect-square", // 1:1
  portrait: "aspect-[4/5]", // 4:5, Instagram's classic portrait post
  reel: "aspect-[9/16]", // 9:16, Reels / vertical video
  video: "aspect-video", // 16:9, landscape video
} as const;

const RATIO_RE = /^\s*(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)\s*$/;

/**
 * Picks the tile shape. An explicit choice in Studio always wins; "auto" uses the post type:
 * Reels are 9:16, other videos 4:5, photos square. A bad custom ratio falls back to square.
 */
export function tileAspect(tile: InstagramTile): { className: string; style?: { aspectRatio: string } } {
  let format: PostFormat = tile.format && tile.format !== "auto" ? tile.format : "auto";
  if (format === "auto") {
    format = tile.isReel ? "reel" : tile.isVideo ? "portrait" : "square";
  }
  if (format === "custom") {
    const m = tile.customRatio?.match(RATIO_RE);
    const w = m ? Number(m[1]) : 0;
    const h = m ? Number(m[2]) : 0;
    // keep it sensible: between 1:3 (very tall) and 3:1 (very wide)
    if (w > 0 && h > 0 && w / h >= 1 / 3 && w / h <= 3) {
      return { className: "", style: { aspectRatio: `${w} / ${h}` } };
    }
    format = "square";
  }
  return { className: ASPECT_CLASS[format] };
}

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type?: "AD" | "FEED" | "STORY" | "REELS";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
};

/**
 * Latest posts of the Instagram account, via the Instagram API (Instagram Login).
 * Needs a long-lived access token in INSTAGRAM_ACCESS_TOKEN (see .env.example).
 * Without a token, or if Instagram is unreachable, it returns [] and the page
 * shows the posts entered manually in Sanity instead. It never throws.
 *
 * Cached for a few hours; refreshed instantly when the "instagramFeed" tag is
 * revalidated (see app/api/revalidate/route.ts).
 */
export async function getInstagramLivePosts(limit = 12): Promise<InstagramTile[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("instagramFeed");

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink",
    );
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", token);

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: GraphMedia[] };

    return (json.data ?? [])
      .map((m): InstagramTile | null => {
        const isVideo = m.media_type === "VIDEO";
        const imageUrl = isVideo ? m.thumbnail_url : m.media_url;
        if (!imageUrl) return null;
        return {
          id: m.id,
          imageUrl,
          caption: m.caption ?? null,
          permalink: m.permalink ?? null,
          isVideo,
          isReel: m.media_product_type === "REELS",
        };
      })
      .filter((t): t is InstagramTile => t !== null);
  } catch {
    return [];
  }
}
