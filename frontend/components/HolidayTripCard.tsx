import Image from "next/image";
import Link from "next/link";
import type { HolidayTrip } from "@/lib/holidayTrips";

type Props = {
  trip: HolidayTrip;
  // large = the big featured card, small = the stacked ones, grid = uniform cards on /holidays
  size?: "large" | "small" | "grid";
  priority?: boolean;
  className?: string;
};

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

// Whole card is one link. The round arrow is decorative (the link is the card).
export default function HolidayTripCard({
  trip,
  size = "grid",
  priority = false,
  className = "",
}: Props) {
  const big = size === "large";
  const pos = trip.hotspot
    ? `${trip.hotspot.x * 100}% ${trip.hotspot.y * 100}%`
    : undefined;

  return (
    <Link
      href={trip.link || "/our-services"}
      className={`group relative isolate flex overflow-hidden rounded-3xl bg-brand-blue shadow-[0_10px_30px_-12px_rgba(0,32,96,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan ${className}`}
    >
      <Image
        src={trip.image}
        alt={trip.imageAlt || ""}
        fill
        priority={priority}
        sizes={
          big
            ? "(min-width: 1024px) 34vw, 100vw"
            : "(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
        }
        style={{ objectPosition: pos }}
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
      />
      {/* dark fade at the bottom so the text is readable on any photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#021B35]/90 via-[#021B35]/35 via-45% to-transparent" />

      <div className="mt-auto flex w-full items-end justify-between gap-4 p-5 text-white lg:p-6">
        <div className="min-w-0">
          {trip.location && (
            <p className="flex items-center gap-1.5 text-[13px] font-semibold text-white/95">
              <PinIcon />
              <span className="truncate">{trip.location}</span>
            </p>
          )}
          <h3
            className={`mt-2 font-semibold leading-snug ${
              big ? "text-2xl lg:text-[1.75rem]" : "text-lg lg:text-xl"
            }`}
          >
            {trip.title}
          </h3>
          {trip.description && (
            <p
              className={`mt-1.5 text-sm leading-relaxed text-white/80 ${
                big ? "line-clamp-3" : "line-clamp-2"
              }`}
            >
              {trip.description}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-brand-blue group-hover:text-white ${
            big ? "h-14 w-14 bg-brand-cyan text-white" : "h-11 w-11 bg-white text-ink"
          }`}
        >
          <svg
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
      </div>
    </Link>
  );
}
