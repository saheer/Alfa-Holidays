import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import InstagramHero from "@/components/InstagramHero";
import InstagramGrid from "@/components/InstagramGrid";
import { getInstagramFeed } from "@/sanity/lib/getInstagramFeed";
import { getInstagramLivePosts, type PostFormat } from "@/lib/instagram";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("instagramFeed");
  return buildMetadata({
    seo: page?.seo,
    path: "/instagram-feed",
    fallback: {
      title: "Instagram Feed | Alfa Holidays",
      description:
        "Photos and videos from Kerala and beyond: follow Alfa Holidays on Instagram.",
    },
  });
}

export default async function InstagramFeedPage() {
  const [page, live] = await Promise.all([
    getInstagramFeed(),
    getInstagramLivePosts(),
  ]);

  if (!page) {
    return (
      <>
        <Header />
        <main className="p-10 pt-40">
          Instagram Feed content not found. Publish the “Instagram Feed”
          document in Sanity Studio.
        </main>
      </>
    );
  }

  // Live posts from Instagram when connected; otherwise the posts added in Studio
  const manual = (page.posts ?? []).map(
    (p: {
      _key: string;
      imageUrl: string;
      alt?: string | null;
      hotspot?: { x: number; y: number } | null;
      postUrl?: string | null;
      isVideo?: boolean | null;
      format?: PostFormat | null;
      customRatio?: string | null;
      caption?: string | null;
    }) => ({
      id: p._key,
      imageUrl: p.imageUrl,
      alt: p.alt,
      hotspot: p.hotspot,
      permalink: p.postUrl,
      isVideo: !!p.isVideo,
      format: p.format,
      customRatio: p.customRatio,
      caption: p.caption,
    }),
  );
  const tiles = live.length > 0 ? live : manual;

  return (
    <>
      <Header />
      <main>
        <InstagramHero
          eyebrow={page.heroEyebrow}
          headingWhite={page.heroHeadingWhite}
          headingBlue={page.heroHeadingBlue}
          description={page.heroDescription}
          image={page.heroBackground}
          imageAlt={page.heroBackgroundAlt}
          hotspot={page.heroHotspot}
        />
        <FadeInWhenVisible>
          <InstagramGrid
            eyebrow={page.feedEyebrow}
            heading={page.feedHeading}
            description={page.feedDescription}
            tiles={tiles}
            profileUrl={page.instagramUrl}
            handle={page.instagramHandle}
            followLabel={page.followLabel}
          />
        </FadeInWhenVisible>
      </main>
    </>
  );
}
