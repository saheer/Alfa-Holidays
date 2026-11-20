import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";

export type FeatureItem = {
  _key?: string;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
};

// Shown until the list is filled in Sanity (Home Page > About Us Intro > Feature list)
const DEFAULT_ITEMS: FeatureItem[] = [
  { icon: "plane", title: "Best Price Guarantee", description: "Get the best deals for your dream trips." },
  { icon: "shield", title: "Safe & Secure", description: "Your safety is our top priority." },
  { icon: "headset", title: "24/7 Support", description: "We’re always here to help you." },
  { icon: "pin", title: "Expert Guides", description: "Local experts for a richer experience." },
];

// Minimalist line icons (48px grid, 2px stroke), drawn in the brand blue
const svgProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "h-10 w-10",
} as const;

const ICONS: Record<string, ReactNode> = {
  plane: (
    <svg {...svgProps}>
      <path d="M43 7.5c-1.6-1.6-4.2-1.6-5.8 0L28.4 16 10.5 11.6 7.2 14.9l15.1 8.7-6.6 6.6-6.4-.9-2.4 2.4 8.1 3.9 3.9 8.1 2.4-2.4-.9-6.4 6.6-6.6 8.7 15.1 3.3-3.3L32 19.6l8.5-8.8c1.6-1.6 1.6-4.2 0-5.8Z" transform="translate(1.5 -0.5) scale(.96)" />
    </svg>
  ),
  shield: (
    <svg {...svgProps}>
      <path d="M24 5 8 11v11c0 10 6.6 17.6 16 21 9.4-3.4 16-11 16-21V11L24 5Z" />
      <path d="m16.5 24 5.5 5.5 10-10.5" />
    </svg>
  ),
  headset: (
    <svg {...svgProps}>
      <path d="M8 27v-3a16 16 0 0 1 32 0v3" />
      <rect x="6" y="26" width="7" height="11" rx="3" />
      <rect x="35" y="26" width="7" height="11" rx="3" />
      <path d="M38.5 37c0 3.6-3.4 6-8 6H27" />
      <rect x="22" y="40.5" width="5.5" height="5" rx="2" />
    </svg>
  ),
  pin: (
    <svg {...svgProps}>
      <path d="M24 4.5a9.5 9.5 0 0 0-9.5 9.5c0 7.6 9.5 16.5 9.5 16.5S33.5 21.6 33.5 14A9.5 9.5 0 0 0 24 4.5Z" />
      <circle cx="24" cy="14" r="3.6" />
      <path d="m15.5 26-7.6 12.5L24 43.5l16.1-5L32.5 26" />
    </svg>
  ),
};

export default function HomeFeaturesSection({ items }: { items?: FeatureItem[] | null }) {
  const list = (items ?? []).filter((i) => i?.title?.trim());
  const features = list.length > 0 ? list : DEFAULT_ITEMS;

  return (
    <section aria-label="Why travel with Alfa Holidays" className="bg-white pb-16 lg:pb-20">
      <ul className="mx-auto grid max-w-[1100px] grid-cols-2 gap-y-10 px-6 lg:grid-cols-4 lg:px-12">
        {features.map((f, i) => (
          <li
            key={f._key ?? i}
            className={`flex flex-col items-center px-4 text-center lg:px-6 ${
              i > 0 ? "lg:border-l lg:border-[#CFE3F3]" : ""
            } ${i % 2 === 1 ? "border-l border-[#CFE3F3] lg:border-l" : ""}`}
          >
            <span className="text-brand-blue">
              {ICONS[f.icon ?? ""] ?? ICONS.pin}
            </span>
            <h3
              className={`${manrope.className} mt-4 text-[15px] font-bold text-ink`}
            >
              {f.title}
            </h3>
            {f.description && (
              <p className="mt-2 max-w-[190px] text-[13.5px] leading-[1.6] text-[#2D4970]/80">
                {f.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
