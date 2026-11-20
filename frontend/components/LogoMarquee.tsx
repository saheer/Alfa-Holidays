import Image from "next/image";

type Logo = {
  _key: string;
  name?: string | null;
  url: string;
  width?: number | null;
  height?: number | null;
};

const SECONDS_PER_LOGO = 4; // lower = faster
const MIN_ITEMS_PER_HALF = 8; // keeps the track wider than the screen

// Partner / airline logos: a white rounded card (slightly overlapping the hero) with a thin
// divider between logos, scrolling slowly. Logos come from Home Page > Logo Slider in Sanity.
export default function LogoMarquee({ logos }: { logos?: Logo[] | null }) {
  const valid = (logos ?? []).filter((l) => l?.url);
  if (valid.length === 0) return null;

  // Repeat a short list so one half of the track always fills the screen
  const reps = Math.ceil(MIN_ITEMS_PER_HALF / valid.length);
  const half = Array.from({ length: reps }, () => valid).flat();

  return (
    <section
      aria-label="Our partners and clients"
      className="relative z-10 -mt-6 px-4 lg:-mt-10 lg:px-8"
    >
      <div className="mx-auto max-w-[1338px] overflow-hidden rounded-3xl border border-line bg-white py-5 shadow-[0_18px_40px_-22px_rgba(0,76,140,0.35)] lg:py-6">
        <div
          className="marquee-track flex w-max"
          style={{ animationDuration: `${half.length * SECONDS_PER_LOGO}s` }}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              // the second copy only exists for the seamless loop
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {half.map((logo, i) => (
                <li
                  key={`${logo._key}-${i}`}
                  className="shrink-0 border-r border-line px-8 lg:px-14"
                >
                  <Image
                    src={logo.url}
                    alt={copy === 1 ? "" : logo.name || ""}
                    width={logo.width || 214}
                    height={logo.height || 190}
                    className="h-14 w-auto mix-blend-multiply md:h-24 lg:h-[5.5rem]"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
