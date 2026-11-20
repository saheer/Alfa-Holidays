import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  heroHeadingWhite: string;
  heroHeadingBlue: string;
  heroDescription?: string[] | null;
  heroButtonText?: string | null;
  heroButtonLink?: string | null;
  heroBackground?: string | null;
  heroBackgroundAlt?: string | null;
  heroAccent?: string | null; // optional foliage picture for the top-left corner
  heroAccentWidth?: number | null;
  heroAccentHeight?: number | null;
};

// Hero layout (white text on a blue scene, as in the approved design)
//  - lg and up: the banner is a full-bleed background (right edge to right edge). A dark-blue
//    scrim fades in from the left edge so the white headline, paragraphs and button always have
//    strong contrast, while the aeroplane, mountain, sailboat and town on the right stay crisp.
//  - below lg: the text sits on a solid blue gradient and the banner appears as a band UNDER it,
//    fading into that blue at its top, so the text never covers the artwork.
// A small dotted flight path with a plane decorates the headline (desktop and tablet), and an
// optional foliage picture from Sanity can hang from the top-left corner.
export default function Hero({
  heroHeadingWhite,
  heroHeadingBlue,
  heroDescription,
  heroButtonText,
  heroButtonLink,
  heroBackground,
  heroBackgroundAlt,
  heroAccent,
  heroAccentWidth,
  heroAccentHeight,
}: HeroProps) {
  // Strip any trailing arrow typed in the CMS so only one "→" ever shows
  const buttonLabel = heroButtonText?.replace(/\s*[→➔➜]+\s*$/u, "").trim();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#0B4DA2] via-[#1170CF] to-[#1783E2] lg:flex lg:min-h-[clamp(640px,52vw,940px)] lg:items-center lg:bg-[#1170CF] lg:bg-none">
      {/* Banner: a band under the text on phones/tablets, a full-bleed background on desktop */}
      {heroBackground && (
        <div className="relative order-2 mt-6 aspect-[4/3] w-full [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_30%)] [mask-image:linear-gradient(to_bottom,transparent,#000_30%)] sm:aspect-[16/10] md:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:mt-0 lg:aspect-auto lg:[-webkit-mask-image:none] lg:[mask-image:none]">
          <Image
            src={heroBackground}
            alt={heroBackgroundAlt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_50%] lg:object-right"
          />
        </div>
      )}

      {/* Scrims: left-to-right fade behind the text (desktop) and a soft top fade for the menu */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#032A5C]/85 via-[#0A4A9C]/45 via-[48%] to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-[#032A5C]/55 to-transparent"
      />

      {/* Optional foliage accent (Home Page > Hero > Foliage picture) */}
      {heroAccent && (
        <Image
          src={heroAccent}
          alt=""
          width={heroAccentWidth || 600}
          height={heroAccentHeight || 800}
          priority
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-[34vw] max-w-[200px] sm:max-w-[260px] lg:w-[20vw] lg:max-w-[380px]"
        />
      )}

      {/* Text column: same width and side padding as the header, so the logo and headline line up */}
      <div className="relative z-10 order-1 mx-auto w-full max-w-[1280px] px-4 pt-28 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="max-w-[620px] lg:max-w-[600px] xl:max-w-[660px]">
          <div className="relative">
            {/* dotted flight path + plane, above-right of the headline */}
            <svg
              aria-hidden="true"
              viewBox="0 0 240 120"
              fill="none"
              className="pointer-events-none absolute -top-9 right-0 hidden h-[88px] w-[176px] text-white/90 sm:block lg:-right-6 lg:-top-14 lg:h-[112px] lg:w-[224px]"
            >
              <path
                d="M6 112C36 62 86 38 128 42c32 3 32 32 8 30-20-2-12-22 24-34 28-9 44-14 52-18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="2.5 6"
              />
              <path
                transform="translate(206 -2) rotate(58 12 12) scale(1.05)"
                fill="currentColor"
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              />
            </svg>

            <h1
              style={{ animationDelay: "0ms" }}
              className="animate-fade-up text-[2.4rem] leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(3,42,92,0.35)] motion-reduce:animate-none sm:text-6xl lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem]"
            >
              <span className="block font-medium">{heroHeadingWhite}</span>
              <span className="block bg-gradient-to-r from-[#5AD0FF] to-[#27B0F5] bg-clip-text font-bold text-transparent">
                {heroHeadingBlue}
              </span>
            </h1>
          </div>

          {/* brush-stroke underline */}
          <svg
            aria-hidden="true"
            viewBox="0 0 500 22"
            preserveAspectRatio="none"
            className="mt-2 h-4 w-[82%] animate-fade-up motion-reduce:animate-none"
            style={{ animationDelay: "100ms" }}
          >
            <path
              d="M4 14C70 6 150 17 240 10S410 14 496 7"
              fill="none"
              stroke="#5AD0FF"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M60 17C150 11 260 18 380 13"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.55"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <div
            style={{ animationDelay: "200ms" }}
            className="mt-6 max-w-[560px] animate-fade-up space-y-4 text-base leading-[1.75] text-white drop-shadow-[0_1px_8px_rgba(3,42,92,0.45)] motion-reduce:animate-none lg:mt-8 lg:text-[17px]"
          >
            {(heroDescription ?? []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {buttonLabel && (
            <Link
              href={heroButtonLink || "/about-us"}
              style={{ animationDelay: "400ms" }}
              className="group/cta mt-8 inline-flex h-14 animate-fade-up items-center gap-5 rounded-full bg-white py-2 pl-8 pr-2 text-base font-semibold text-ink shadow-[0_14px_30px_-12px_rgba(3,42,92,0.55)] transition-colors duration-300 ease-out hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:animate-none lg:mt-10"
            >
              {buttonLabel}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-cyan text-white transition-colors duration-300 group-hover/cta:bg-brand-blue"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
