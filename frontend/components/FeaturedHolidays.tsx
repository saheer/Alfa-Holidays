"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { manrope } from "@/app/fonts";
import HolidayFilterPills from "@/components/HolidayFilterPills";
import HolidayTripCard from "@/components/HolidayTripCard";
import {
  ALL,
  byCategory,
  categoriesOf,
  usableTrips,
  type HolidayTrip,
} from "@/lib/holidayTrips";

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  viewAllText?: string | null;
  viewAllLink?: string | null;
  trips?: HolidayTrip[] | null;
};

// Homepage "Featured holidays": text + category filters on the left; one large card and up
// to two small ones on the right (the first 3 entries of the chosen category). Data comes from
// the "Holidays" document in Sanity.
export default function FeaturedHolidays({
  eyebrow,
  heading,
  description,
  viewAllText,
  viewAllLink,
  trips,
}: Props) {
  const all = useMemo(() => usableTrips(trips), [trips]);
  const categories = useMemo(() => categoriesOf(all), [all]);
  const [active, setActive] = useState(ALL);

  if (all.length === 0) return null;

  const shown = byCategory(all, active).slice(0, 3);
  const [big, ...small] = shown;
  const stacked = shown.length >= 3; // large card spans both rows only with 2 small ones

  return (
    <section
      aria-labelledby="featured-holidays-heading"
      className="relative isolate overflow-hidden bg-mist py-16 lg:py-24"
    >
      {/* Soft sky-blue clouds / wash behind the section (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -left-28 top-[28%] h-72 w-72 rounded-full bg-wash/70 blur-3xl" />
        <span className="absolute -right-24 -top-28 h-80 w-[36rem] max-w-[90vw] rounded-full bg-brand-cyan/30 blur-3xl" />
        <span className="absolute right-4 top-6 h-32 w-60 rounded-full bg-white/80 blur-2xl" />
        <span className="absolute -bottom-24 right-1/4 h-56 w-[28rem] max-w-[80vw] rounded-full bg-wash/60 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-[1338px] items-center gap-10 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:px-12">
        {/* Text + filters + view-all */}
        <div className="max-w-[520px]">
          {eyebrow && (
            <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
              {eyebrow}
              <span aria-hidden className="h-px w-16 bg-brand-cyan/40" />
            </p>
          )}
          {heading && (
            <h2
              id="featured-holidays-heading"
              className={`${manrope.className} mt-4 whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-tight text-ink lg:text-[3rem]`}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-5 text-[15px] leading-[1.75] text-[#2D4970]">
              {description}
            </p>
          )}

          <div className="mt-7">
            <HolidayFilterPills
              categories={categories}
              active={active}
              onChange={setActive}
            />
          </div>

          <Link
            href={viewAllLink || "/holidays"}
            className="group mt-9 inline-flex items-center gap-4 text-[15px] font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-white transition-colors duration-200 group-hover:bg-brand-blue">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="transition-colors group-hover:text-brand-blue">
              {viewAllText || "View all holidays"}
            </span>
          </Link>
        </div>

        {/* Cards: the grid is keyed by the filter so it fades in again when it changes */}
        <div
          key={active}
          className="animate-fade-up grid gap-4 motion-reduce:animate-none sm:grid-cols-2 sm:gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-5"
        >
          {big && (
            <HolidayTripCard
              trip={big}
              size="large"
              priority
              className={`min-h-[360px] sm:col-span-2 ${
                stacked ? "lg:col-span-1 lg:row-span-2" : "lg:col-span-1"
              } aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[500px]`}
            />
          )}
          {small.map((t) => (
            <HolidayTripCard
              key={t._key}
              trip={t}
              size="small"
              className="aspect-[16/10] sm:col-span-1 lg:aspect-auto lg:min-h-[240px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
