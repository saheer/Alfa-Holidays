"use client";

import { useMemo, useState } from "react";
import HolidayFilterPills from "@/components/HolidayFilterPills";
import HolidayTripCard from "@/components/HolidayTripCard";
import {
  ALL,
  byCategory,
  categoriesOf,
  usableTrips,
  type HolidayTrip,
} from "@/lib/holidayTrips";

// All holiday entries on the /holidays page: category filters + a uniform responsive grid
export default function HolidayTripsGrid({ trips }: { trips?: HolidayTrip[] | null }) {
  const all = useMemo(() => usableTrips(trips), [trips]);
  const categories = useMemo(() => categoriesOf(all), [all]);
  const [active, setActive] = useState(ALL);
  const shown = byCategory(all, active);

  if (all.length === 0) {
    return (
      <p className="text-[#4A6283]">
        Holidays will appear here once they are added in Sanity Studio.
      </p>
    );
  }

  return (
    <div>
      <HolidayFilterPills
        categories={categories}
        active={active}
        onChange={setActive}
      />
      <div
        key={active}
        className="animate-fade-up mt-8 grid gap-5 motion-reduce:animate-none sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6"
      >
        {shown.map((t, i) => (
          <HolidayTripCard
            key={t._key}
            trip={t}
            size="grid"
            priority={i < 3}
            className="aspect-[4/5]"
          />
        ))}
      </div>
    </div>
  );
}
