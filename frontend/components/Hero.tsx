import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  heroHeadingWhite: string;
  heroHeadingBlue: string;
  heroDescription?: string[] | null;
  heroButtonText?: string | null;
  heroButtonLink?: string | null;
  heroBackground?: string | null;
  heroBackgroundMobile?: string | null; // optional portrait artwork for phones
  heroBackgroundAlt?: string | null;
  heroAccent?: string | null; // optional foliage picture for the top-left corner
  heroAccentWidth?: number | null;
  heroAccentHeight?: number | null;
};

// Hero layout (white text on a blue travel scene, as in the approved designs)
//  - phones (< md): the artwork fills the whole hero behind the text. A dark-blue scrim fades in
//    from the top so the white headline and paragraphs stay readable over the sky, while the
//    plane, mountain, sailboat and town stay crisp at the bottom, under the button. If a
//    portrait "phone artwork" is set in Sanity it is used; otherwise the wide banner is shown
//    as a bottom-anchored band, cropped to its right-hand side (plane and town).
//  - tablets (md to lg): the wide banner is a full-bleed background with the text on the left
//    over a left-to-right scrim, and the scenery filling the right.
//  - desktop (lg and up): unchanged from before.
// A small dotted flight path with a plane decorates the headline, and an optional foliage picture
// from Sanity can hang from the top-left corner.
export default function Hero({
  heroHeadingWhite,
  heroHeadingBlue,
  heroDescription,
  heroButtonText,
  heroButtonLink,
  heroBackground,
  heroBackgroundMobile,
  heroBackgroundAlt,
  heroAccent,
  heroAccentWidth,
  heroAccentHeight,
}: HeroProps) {
  // Strip any trailing arrow typed in the CMS so only one "→" ever shows
  const buttonLabel = heroButtonText?.replace(/\s*[→➔➜]+\s*$/u, "").trim();

  return (
    <section className="relative isolate flex min-h-[clamp(680px,100svh,900px)] flex-col overflow-hidden bg-gradient-to-b from-[#0B4DA2] via-[#1170CF] to-[#1783E2] md:min-h-[clamp(560px,72vw,720px)] md:flex-row md:items-center md:bg-[#1170CF] md:bg-none lg:min-h-[clamp(640px,52vw,940px)]">
      {/* Phone artwork (portrait), only if one is set in Sanity */}
      {heroBackground && heroBackgroundMobile && (
        <div className="absolute inset-0 -z-10 md:hidden">
          <Image
            src={heroBackgroundMobile}
            alt={heroBackgroundAlt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      )}

      {/* Wide banner: full-bleed on tablet and desktop; on phones it is the fallback, shown as a
          bottom band that fades into the blue above it (hidden when phone artwork exists) */}
      {heroBackground && (
        <div
          className={
            heroBackgroundMobile
              ? "absolute inset-0 -z-10 hidden md:block"
              : "absolute inset-x-0 bottom-0 -z-10 h-[62%] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_35%)] [mask-image:linear-gradient(to_bottom,transparent,#000_35%)] md:inset-0 md:h-auto md:[-webkit-mask-image:none] md:[mask-image:none]"
          }
        >
          <Image
            src={heroBackground}
            alt={heroBackgroundMobile ? "" : heroBackgroundAlt || ""}
            fill
            priority={!heroBackgroundMobile}
            sizes="100vw"
            className="object-cover object-[80%_100%] md:object-right"
          />
        </div>
      )}

      {/* Scrims: top-down fade behind the text on phones, left-to-right on tablet and desktop,
          plus a soft top fade for the menu */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#032A5C]/85 via-[#0A4A9C]/50 via-[55%] to-transparent md:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#032A5C]/85 via-[#0A4A9C]/45 via-[62%] to-transparent md:block lg:via-[48%]"
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
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-44 pt-28 sm:pb-52 md:pb-20 md:pt-32 lg:px-8">
        <div className="max-w-[620px] md:max-w-[520px] lg:max-w-[600px] xl:max-w-[660px]">
          <div className="relative">
            {/* dotted flight path + plane, above-right of the headline */}
            <svg
              aria-hidden="true"
              viewBox="0 0 240 120"
              fill="none"
              className="pointer-events-none absolute -top-8 right-0 h-[56px] w-[112px] text-white/90 sm:-top-9 sm:h-[88px] sm:w-[176px] lg:-right-6 lg:-top-14 lg:h-[112px] lg:w-[224px]"
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
              className="animate-fade-up text-[2.4rem] leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(3,42,92,0.35)] motion-reduce:animate-none sm:text-5xl md:text-[3rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem]"
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
            className="mt-2 h-4 w-[68%] animate-fade-up motion-reduce:animate-none sm:w-[60%] md:w-[68%] lg:w-[82%]"
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
            className="mt-6 max-w-[560px] animate-fade-up space-y-4 text-[15px] leading-[1.7] text-white sm:text-base md:max-w-[480px] md:leading-[1.75] drop-shadow-[0_1px_8px_rgba(3,42,92,0.45)] motion-reduce:animate-none lg:mt-8 lg:text-[17px]"
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
