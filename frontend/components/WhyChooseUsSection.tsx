import Image from "next/image";
import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";

export type WhyItem = {
  _key?: string;
  title?: string | null;
  text?: string | null;
  icon?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
};

type Props = {
  heading?: string | null;
  items?: WhyItem[] | null;
};

// Shown until the section is filled in Sanity (About Us > Why Choose Us)
const DEFAULT_ITEMS: WhyItem[] = [
  {
    icon: "diamond",
    title: "Decades of travel and visa expertise",
    text: "Since 1990, Alfa Holidays has planned holidays, booked flights and handled visas for travellers from Kerala. That experience means fewer surprises, smoother paperwork and better advice at every step.",
  },
  {
    icon: "compass",
    title: "Personal service from first enquiry to return home",
    text: "Our Puthentheru team plans every trip around you and stays on hand throughout, so you always have someone you know to call, before, during and after your holiday.",
  },
];

const DEFAULT_HEADING = "Why Choose Alfa Holidays";

// Icons for the round badges (24x24 outline icons, drawn with currentColor)
const ICONS: Record<string, ReactNode> = {
  diamond: (
    <>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M9 3l3 6 3-6M12 21 9 9m3 12 3-12" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-8.5-5-8.5-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2.5c0 6-8.5 11-8.5 11z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.7 4 5.9 4 9.5s-1.4 6.8-4 9.5c-2.6-2.7-4-5.9-4-9.5s1.4-6.8 4-9.5z" />
    </>
  ),
  star: <path d="m12 3 2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.2 6.4 20.3l1.2-6.3L3 9.6l6.3-.8z" />,
};

const FALLBACK_ICONS = ["diamond", "compass", "shield", "heart"];

function IconBadge({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-ink sm:h-20 sm:w-20 lg:h-[88px] lg:w-[88px]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
      >
        {ICONS[name] ?? ICONS.diamond}
      </svg>
    </span>
  );
}

// Decorative paper plane + dashed flight path (top-left of the title)
function FlightPath() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 260 150"
      fill="none"
      className="pointer-events-none absolute -left-4 -top-16 hidden h-auto w-[210px] text-brand-cyan sm:block lg:-left-24 lg:-top-20 lg:w-[270px]"
    >
      <path
        d="M4 98C34 92 62 100 74 118c10 16-4 28-20 22-15-6-8-26 10-40C96 76 150 44 208 32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 6"
      />
      <path
        d="M246 8 212 20l10 6-20 14 22-8 4 14 8-12 14 4z"
        fill="currentColor"
        transform="translate(-6 -2)"
      />
    </svg>
  );
}

// Soft decorative blobs in the section corners
function Blobs() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-brand-cyan/10 lg:-left-16 lg:-top-20 lg:h-72 lg:w-72"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-24 h-64 w-64 rounded-[45%_55%_60%_40%] bg-brand-cyan/10 lg:-bottom-24 lg:-right-16 lg:h-80 lg:w-80"
      />
    </>
  );
}

// Title: all lowercase, the last word in extra-bold with a cyan brush stroke under it
function Heading({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  const last = words.pop() ?? "";
  return (
    <h2
      id="why-heading"
      className={`${manrope.className} relative text-[2.5rem] leading-[1.02] tracking-tight text-ink lowercase sm:text-5xl lg:text-[4rem]`}
    >
      {words.length > 0 && (
        <span className="block font-medium">{words.join(" ")}</span>
      )}
      <span className="relative inline-block font-extrabold">
        {last}
        <svg
          aria-hidden
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-0 h-2.5 w-full text-brand-cyan lg:-bottom-3 lg:h-3"
        >
          <path
            d="M2 8C40 3 110 3 198 6"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
    </h2>
  );
}

// "why choose alfa holidays": a lowercase title with a plane and flight path, then
// zig-zag rows. Row 1 = text left / image right, row 2 = image left / text right.
// The title sits in the first text column, beside the first image. Each feature is a
// round icon badge, a thin divider, an uppercase heading and a paragraph. Images keep
// their native proportions (no frame, no cropping), so the brush-stroke shape is intact.
export default function WhyChooseUsSection({ heading, items }: Props) {
  const rows = (items ?? []).filter((i) => i?.title?.trim() || i?.text?.trim());
  const list = rows.length > 0 ? rows : DEFAULT_ITEMS;
  const title = heading?.trim() || DEFAULT_HEADING;

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-heading"
      className="relative scroll-mt-24 overflow-hidden bg-white py-16 lg:py-24"
    >
      <Blobs />

      <div className="relative mx-auto max-w-[1338px] px-6 lg:px-12">
        <div className="space-y-12 lg:space-y-16">
          {list.map((item, i) => {
            const imageRight = i % 2 === 0; // row 1: image on the right
            const hasImage = !!item.image;
            const icon =
              item.icon && ICONS[item.icon]
                ? item.icon
                : FALLBACK_ICONS[i % FALLBACK_ICONS.length];

            return (
              <div
                key={item._key ?? i}
                className={`grid items-center gap-8 lg:gap-14 ${
                  hasImage ? "lg:grid-cols-2" : ""
                }`}
              >
                <div
                  className={hasImage && !imageRight ? "lg:order-2 lg:pl-6" : "lg:pr-6"}
                >
                  {i === 0 && (
                    <div className="relative mb-10 pt-2 lg:mb-14">
                      <FlightPath />
                      <div className="relative sm:pl-16 lg:pl-2">
                        <Heading text={title} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-stretch gap-4 sm:gap-6">
                    <IconBadge name={icon} />
                    <span
                      aria-hidden
                      className="w-px shrink-0 self-stretch bg-ink/80"
                    />
                    <div className="min-w-0 max-w-[520px] self-center">
                      {item.title && (
                        <h3
                          className={`${manrope.className} text-xl font-semibold uppercase leading-[1.25] tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]`}
                        >
                          {item.title}
                        </h3>
                      )}
                      {item.text && (
                        <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-[#2D4970]">
                          {item.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {hasImage && (
                  <Image
                    src={item.image as string}
                    alt={item.imageAlt || ""}
                    width={item.imageWidth || 1600}
                    height={item.imageHeight || 1200}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={`h-auto w-full ${imageRight ? "" : "lg:order-1"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
