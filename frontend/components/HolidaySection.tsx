import Link from "next/link";
import { ICONS } from "@/components/services-page/ServiceCardIcon";
import { BottomWave, PlaneTrail } from "@/components/services-page/TravelDecor";

type Item = {
  _key?: string;
  title: string;
  description?: string | null;
  link?: string | null;
  icon?: string | null; // key of a built-in icon
  iconFile?: string | null; // uploaded icon (replaces the built-in one)
  iconType?: string | null;
};

type Props = {
  heading?: string | null;
  description?: string | null;
  items?: Item[] | null;
  buttonLabel?: string | null;
  holidayButtonLink?: string | null;
};

// Shown until the cards are filled in Sanity (Home Page > Services)
const DEFAULT_ITEMS: Item[] = [
  {
    title: "Tour Packages (Domestic & International)",
    icon: "luggage",
    link: "/holidays",
    description:
      "Kerala and beyond! From honeymoon and family tours to international destinations (Dubai, Saudi, Singapore etc.).",
  },
  {
    title: "Flight & Train Ticket Booking",
    icon: "plane",
    link: "/our-services",
    description: "Domestic & international flight tickets and train ticket assistance.",
  },
  {
    title: "Bus Ticket Booking",
    icon: "bus",
    link: "/our-services",
    description: "KSRTC, private super fast and luxury sleeper bus tickets.",
  },
  {
    title: "Visa Assistance & Processing",
    icon: "visa",
    link: "/our-services",
    description: "Tourist and business visa documentation and application support.",
  },
  {
    title: "Passport Services",
    icon: "passport",
    link: "/our-services",
    description: "New passport applications, renewal and verification assistance.",
  },
  {
    title: "Hotel & Resort Reservations",
    icon: "hotel",
    link: "/our-services",
    description: "Book top hotels, resorts and homestays.",
  },
  {
    title: "Travel Insurance",
    icon: "insurance",
    link: "/our-services",
    description: "Stay protected with reliable travel insurance.",
  },
  {
    title: "Cab / Car Rental Services",
    icon: "car",
    link: "/our-services",
    description: "Airport pick-up/drop, sightseeing cars and more.",
  },
  {
    title: "Customized Holiday Itineraries",
    icon: "itinerary",
    link: "/our-services",
    description: "Tailor-made travel plans as per your interests and budget.",
  },
];

// Cards saved in Studio before the Description field existed keep working: if a card has no
// description yet, the matching default (same title) is used until an editor fills it in.
const normalise = (t: string) =>
  t
    .toLowerCase()
    .replace(/customised/g, "customized")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const FALLBACK_DESCRIPTIONS = new Map(
  DEFAULT_ITEMS.map((d) => [normalise(d.title), d.description ?? ""]),
);

// "Tour Packages (Domestic & International)" -> the bracket goes on its own line, like the design
function TitleText({ title }: { title: string }) {
  const parts = title.split(/\s+(?=\()/);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} className={parts.length > 1 ? "block" : undefined}>
          {part}
        </span>
      ))}
    </>
  );
}

const cardBase =
  "group flex h-full flex-col items-center rounded-xl border border-line bg-white px-5 pb-7 pt-5 text-center shadow-[0_8px_24px_-14px_rgba(4,164,238,0.35)] transition duration-300";
const cardHover =
  "hover:-translate-y-1 hover:border-brand-cyan/60 hover:shadow-[0_16px_32px_-14px_rgba(4,164,238,0.5)] motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan";

// Icon on a soft pale-blue brush wash (an uploaded icon replaces the built-in one)
function CardIcon({ item }: { item: Item }) {
  return (
    <span aria-hidden="true" className="relative flex h-24 w-28 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 120 100"
        className="absolute inset-0 h-full w-full text-wash/80"
        fill="currentColor"
      >
        <path d="M20 48C8 28 28 8 56 12c20 3 44-6 52 16 5 15-4 26-6 40-5 17-30 24-52 18C30 84 28 64 20 48z" />
      </svg>
      {item.iconFile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.iconFile}
          alt=""
          width={56}
          height={56}
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
          className="relative h-14 w-14 text-ink transition-colors duration-300 group-hover:text-brand-blue"
        >
          {ICONS[item.icon ?? ""] ?? ICONS.globe}
        </svg>
      )}
    </span>
  );
}

// Homepage "Services": centered heading with a line on each side, then a grid of cards
// (5 in the first row, 4 in the second on desktop; 3 per row on tablets, 2 on large phones,
// 1 on small phones), with a soft wave and a small plane along the bottom.
export default function HolidaysSection({
  heading,
  description,
  items,
  buttonLabel,
  holidayButtonLink,
}: Props) {
  const fromSanity = (items ?? []).filter((s) => s?.title);
  const list: Item[] = (fromSanity.length > 0 ? fromSanity : DEFAULT_ITEMS).map((item) => ({
    ...item,
    description:
      item.description?.trim() || FALLBACK_DESCRIPTIONS.get(normalise(item.title)) || null,
  }));

  const buttonText = buttonLabel?.replace(/\s*[→➔➜]+\s*$/u, "").trim();

  return (
    <section
      aria-labelledby="holidays-heading"
      className="relative overflow-hidden pb-32 pt-16 lg:pb-44 lg:pt-24"
    >
      <BottomWave className="h-24 lg:h-44" />
      <PlaneTrail className="absolute bottom-5 right-4 hidden w-[190px] sm:block lg:bottom-9 lg:right-[5%] lg:w-[280px]" />

      <div className="relative mx-auto max-w-[1338px] px-6 lg:px-12">
        {/* Heading with a line on each side */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-5 lg:gap-8">
            <span aria-hidden="true" className="hidden h-px w-24 bg-brand-cyan/60 sm:block lg:w-56" />
            <h2
              id="holidays-heading"
              className="text-4xl font-bold tracking-tight text-ink lg:text-5xl"
            >
              {heading || "Services"}
            </h2>
            <span aria-hidden="true" className="hidden h-px w-24 bg-brand-cyan/60 sm:block lg:w-56" />
          </div>
          {(description ?? "Plan. Book. Travel. with Ease.") && (
            <p className="mt-3 text-lg text-body">
              {description ?? "Plan. Book. Travel. with Ease."}
            </p>
          )}
        </div>

        {/* Cards. Desktop: 20 columns, the first 5 span 4 and the rest span 5 (so the 2nd row is
            4 wider cards). Tablet: 12 columns, 3 per row. Large phone: 2 per row. Phone: 1. */}
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-12 lg:mt-14 lg:grid-cols-[repeat(20,minmax(0,1fr))] lg:gap-5">
          {list.map((item, i) => {
            const span =
              i < 5
                ? "sm:col-span-6 md:col-span-4 lg:col-span-4"
                : "sm:col-span-6 md:col-span-4 lg:col-span-5";
            // a lone last card on the 2- or 3-per-row grids is centered
            const isLast = i === list.length - 1;
            const centre = [
              isLast && list.length % 2 === 1 ? "sm:col-start-4 md:col-start-auto" : "",
              isLast && list.length % 3 === 1 ? "md:col-start-5" : "",
              isLast && (list.length % 2 === 1 || list.length % 3 === 1)
                ? "lg:col-start-auto"
                : "",
            ]
              .filter(Boolean)
              .join(" ");

            const inner = (
              <>
                <CardIcon item={item} />
                <h3 className="mt-3 max-w-[14rem] text-balance text-[16px] font-bold leading-snug text-ink lg:text-[17px]">
                  <TitleText title={item.title} />
                </h3>
                {item.description && (
                  <p className="mt-3 max-w-[16rem] text-pretty text-[14px] leading-[1.6] text-body">
                    {item.description}
                  </p>
                )}
              </>
            );
            const key = item._key ?? `${item.title}-${i}`;
            const liCls = `min-w-0 ${span} ${centre}`;

            if (!item.link) {
              return (
                <li key={key} className={liCls}>
                  <div className={cardBase}>{inner}</div>
                </li>
              );
            }
            const external = /^https?:\/\//i.test(item.link);
            return (
              <li key={key} className={liCls}>
                {external ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardBase} ${cardHover}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={item.link} className={`${cardBase} ${cardHover}`}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {buttonText && (
          <div className="mt-10 text-center lg:mt-12">
            <Link
              href={holidayButtonLink || "/our-services"}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-brand-blue px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
            >
              {buttonText} <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
