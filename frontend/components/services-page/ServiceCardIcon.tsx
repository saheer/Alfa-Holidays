import Image from "next/image";
import type { ReactNode } from "react";

// Built-in outline icons (24x24, currentColor). Editors pick one in Studio, or upload
// their own illustration, which replaces it.
export const ICONS: Record<string, ReactNode> = {
  luggage: (
    <>
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <rect x="5" y="7" width="14" height="13" rx="3" />
      <path d="M9.5 10.5v6M14.5 10.5v6M8 20v1.5M16 20v1.5" />
    </>
  ),
  plane: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  ticket: (
    <>
      <path d="M3 9a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-1.5a1.5 1.5 0 0 0 0-3Z" />
      <path d="M14.5 7v10" strokeDasharray="1.6 2" />
      <path d="M7 10.5h4M7 13.5h3" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <path d="M4 11h16M8 3v8M16 3v8M7 18v2.5M17 18v2.5" />
      <circle cx="8" cy="14.5" r=".8" fill="currentColor" />
      <circle cx="16" cy="14.5" r=".8" fill="currentColor" />
    </>
  ),
  visa: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <path d="M14 3l5 5v3" />
      <path d="M9 9h4M9 13h2" />
      <circle cx="16.5" cy="17" r="3.5" />
      <path d="m15 17 1.1 1.1L18.2 16" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <circle cx="12" cy="10" r="3.5" />
      <path d="M8.5 10h7M12 6.5c-1.6 1.8-1.6 5.2 0 7M12 6.5c1.6 1.8 1.6 5.2 0 7M9 17.5h6" />
    </>
  ),
  hotel: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M10 21v-4h4v4" />
    </>
  ),
  insurance: (
    <>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10v-6z" />
      <g transform="translate(7.2 7.4) scale(0.4)">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </g>
    </>
  ),
  car: (
    <>
      <path d="m5 12 1.6-4.2A2 2 0 0 1 8.5 6.5h7a2 2 0 0 1 1.9 1.3L19 12" />
      <rect x="3" y="12" width="18" height="5.5" rx="1.5" />
      <path d="M6 17.5V20M18 17.5V20" />
      <circle cx="7" cy="14.8" r=".8" fill="currentColor" />
      <circle cx="17" cy="14.8" r=".8" fill="currentColor" />
    </>
  ),
  itinerary: (
    <>
      <path d="M12 2.5a4.5 4.5 0 0 1 4.5 4.5c0 3.2-4.5 7.5-4.5 7.5S7.5 10.2 7.5 7A4.5 4.5 0 0 1 12 2.5z" />
      <circle cx="12" cy="7" r="1.6" />
      <path d="m7.5 13.5-4 8h17l-4-8M8.5 17h7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.7 4 5.9 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-5.9-4-9.5s1.4-6.8 4-9.5z" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-8.5-5-8.5-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2.5c0 6-8.5 11-8.5 11z" />
  ),
  star: <path d="m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.2 6.4 20.3l1.2-6.3L3 9.6l6.3-.8z" />,
};

export const ICON_KEYS = Object.keys(ICONS);

// Icon on a soft watercolour-style blob. An uploaded image replaces the built-in icon.
export default function ServiceCardIcon({
  icon,
  image,
}: {
  icon?: string | null;
  image?: string | null;
}) {
  return (
    <span aria-hidden className="relative mx-auto flex h-24 w-28 items-center justify-center">
      <svg
        viewBox="0 0 120 100"
        className="absolute inset-0 h-full w-full text-brand-cyan/20"
        fill="currentColor"
      >
        <path d="M20 48C8 28 28 8 56 12c20 3 44-6 52 16 5 15-4 26-6 40-5 17-30 24-52 18C30 84 28 64 20 48z" />
      </svg>
      {image ? (
        <Image
          src={image}
          alt=""
          width={96}
          height={96}
          className="relative h-14 w-14 object-contain"
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative h-14 w-14 text-ink"
        >
          {ICONS[icon ?? ""] ?? ICONS.globe}
        </svg>
      )}
    </span>
  );
}
