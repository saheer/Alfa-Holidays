import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { manrope } from "@/app/fonts";
import { formatGuideDate, hotspotPosition } from "@/components/GuideCard";
import PortableTextBody from "@/components/PortableTextBody";
import { getGuidePost, getGuideSlugs } from "@/sanity/lib/getTravelGuide";
import { buildMetadata } from "@/sanity/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Prerender every post at build time; with Cache Components this must return at
// least one param, so a placeholder is used while the CMS has no posts yet (the page
// below answers it with a 404). New posts published later are rendered on first visit.
export async function generateStaticParams() {
  const slugs = (await getGuideSlugs()).filter((s) => s?.slug);
  return slugs.length > 0 ? slugs : [{ slug: "no-posts-yet" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getGuidePost(slug);
  if (!post)
    return {
      title: "Post not found | Alfa Holidays",
      robots: { index: false },
    };

  return buildMetadata({
    seo: post.seo,
    path: `/travel-guide/${slug}`,
    fallback: {
      title: `${post.title} | Alfa Holidays`,
      description: post.excerpt,
      image: post.image,
      type: "article",
      publishedTime: post.publishedAt,
    },
  });
}

export default async function GuidePostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getGuidePost(slug);
  if (!post) notFound();

  const date = formatGuideDate(post.publishedAt);

  return (
    <>
      <Header />
      <main>
        {/* Hero: main image under a navy tint, breadcrumb, title, excerpt, date */}
        <section className="relative overflow-hidden bg-[#03274B]">
          {post.image && (
            <Image
              src={post.image}
              alt={post.imageAlt || ""}
              fill
              priority
              sizes="100vw"
              style={hotspotPosition(post.hotspot)}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B215C]/95 via-[#0E2662]/90 to-[#0E2662]/80" />

          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-16 pt-36 lg:px-12 lg:pb-[4.5rem] lg:pt-[10.25rem]">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60"
            >
              <Link
                href="/travel-guide"
                className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
              >
                Resources
              </Link>
              {post.category && (
                <>
                  <span aria-hidden>/</span>
                  <span aria-current="page" className="text-brand-cyan">
                    {post.category}
                  </span>
                </>
              )}
            </nav>

            <h1
              className={`${manrope.className} mt-8 max-w-[900px] text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-white sm:text-5xl lg:text-[4rem]`}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 max-w-[680px] text-[15.5px] leading-[1.7] text-white/75">
                {post.excerpt}
              </p>
            )}
            {date && post.publishedAt && (
              <time
                dateTime={post.publishedAt}
                className="mt-6 block text-[12px] font-medium uppercase tracking-[0.2em] text-white/50"
              >
                {date}
              </time>
            )}
          </div>
        </section>

        {/* Article body */}
        <article className="bg-white pb-20 pt-14 lg:pb-28 lg:pt-16">
          <div className="mx-auto max-w-[840px] px-6">
            <PortableTextBody value={post.body} />

            <div className="mt-16 border-t border-[#EDF1F7] pt-8">
              <Link
                href="/travel-guide"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#244598] transition-colors hover:text-[#16306E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244598]"
              >
                <span aria-hidden>←</span>
                Back to Travel Guide
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
