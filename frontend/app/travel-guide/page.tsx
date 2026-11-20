import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { manrope } from "@/app/fonts";
import { GuideCard, GuideFeaturedCard } from "@/components/GuideCard";
import GuidePagination from "@/components/GuidePagination";
import {
  GUIDE_PAGE_SIZE,
  getGuideFeatured,
  getGuideGrid,
} from "@/sanity/lib/getTravelGuide";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("travelGuidePage");
  return buildMetadata({
    seo: page?.seo,
    path: "/travel-guide",
    fallback: {
      title: "Travel Guide | Alfa Holidays",
      description:
        "The latest destination guides, travel tips and holiday ideas from Alfa Holidays.",
    },
  });
}

type SearchParams = Promise<{ page?: string | string[] }>;

// "?page=3" -> 3. Anything missing or invalid means page 1.
function parsePage(value?: string | string[]) {
  const n = Number.parseInt(
    Array.isArray(value) ? value[0] : (value ?? ""),
    10,
  );
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default function TravelGuidePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <Header />
      <main>
        {/* Hero (static, prerendered) */}
        <section className="relative overflow-hidden bg-[#03274B]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(47,99,181,0.45),transparent_60%),linear-gradient(to_right,#0B215C,#0E2662)]" />
          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-20 pt-36 lg:px-12 lg:pb-[7.2rem] lg:pt-[7.625rem]">
            <h1
              className={`${manrope.className} text-5xl font-bold leading-[1.05] tracking-[-0.008em] text-white lg:text-[4rem]`}
            >
              Your Weekly Travel Guide.
            </h1>
            <p className="mt-6 max-w-[560px] text-[15.5px] leading-[1.7] text-white/70">
              For the latest destination guides, travel tips and holiday ideas from Alfa Holidays.
            </p>
          </div>
        </section>

        {/* Posts: depends on ?page=, so it streams in behind a skeleton */}
        <FadeInWhenVisible>
          <section className="bg-white py-16 lg:py-20">
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              <Suspense fallback={<ListSkeleton />}>
                <GuideList searchParams={searchParams} />
              </Suspense>
            </div>
          </section>
        </FadeInWhenVisible>
      </main>
    </>
  );
}

async function GuideList({ searchParams }: { searchParams: SearchParams }) {
  const page = parsePage((await searchParams).page);
  const { featured, total } = await getGuideFeatured();

  if (!featured) {
    return (
      <p className="text-[#4A6283]">New insights will appear here soon.</p>
    );
  }

  // The featured post is not part of the grid
  const totalPages = Math.max(1, Math.ceil((total - 1) / GUIDE_PAGE_SIZE));
  if (page > totalPages) notFound();

  const posts = await getGuideGrid(featured._id, page);

  return (
    <>
      {/* Featured post: first page only */}
      {page === 1 && <GuideFeaturedCard post={featured} />}

      {posts.length > 0 && (
        <div
          className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${
            page === 1 ? "mt-8 lg:mt-16" : ""
          }`}
        >
          {posts.map((post: Parameters<typeof GuideCard>[0]["post"]) => (
            <GuideCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <GuidePagination page={page} totalPages={totalPages} />
    </>
  );
}

function ListSkeleton() {
  return (
    <div aria-hidden className="animate-pulse space-y-8">
      <div className="h-[428px] rounded-3xl bg-[#EEF1F6]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[380px] rounded-2xl bg-[#EEF1F6]" />
        ))}
      </div>
    </div>
  );
}
