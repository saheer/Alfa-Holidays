import Link from "next/link";
import { manrope } from "@/app/fonts";
import { GuideCard, type GuidePost } from "@/components/GuideCard";

type Props = {
  // Already the 3 newest posts (see guideHomeQuery in queries.ts)
  posts?: GuidePost[] | null;
};

export default function TravelGuideSection({ posts }: Props) {
  const cards = (posts ?? []).filter((p) => p?.slug && p?.title);
  if (cards.length === 0) return null;

  return (
    <section
      aria-labelledby="travel-guide-heading"
      className="bg-mist py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Header: title + subtitle, "View all" button on the right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="travel-guide-heading"
              className={`${manrope.className} max-w-[560px] text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-brand-blue lg:text-[3.3rem]`}
            >
              Your Weekly Travel Guide.
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-body">
              For the latest destination guides, travel tips and holiday ideas
              from Alfa Holidays.
            </p>
          </div>

          <Link
            href="/travel-guide"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#2F63B5] bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#123a85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue sm:self-auto"
          >
            View all guides
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* 3 newest posts */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {cards.map((post) => (
            <GuideCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
