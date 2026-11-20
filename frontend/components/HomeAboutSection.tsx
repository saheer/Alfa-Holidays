import Image from "next/image";
import Link from "next/link";
import { manrope } from "@/app/fonts";

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  paragraphs?: string[] | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image?: {
    url?: string | null;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

// Used until an image is uploaded in Sanity (Home Page > About Us Intro)
const FALLBACK_IMAGE = { url: "/about-welcome.jpg", width: 1464, height: 1074 };

// Homepage "About Us" intro. The artwork (frames, brush strokes, plane) is part of the single
// image uploaded in Sanity, so it is shown as-is: no cropping, masks or overlays.
export default function HomeAboutSection({
  eyebrow,
  heading,
  paragraphs,
  buttonText,
  buttonLink,
  image,
}: Props) {
  const texts = (paragraphs ?? []).filter((p) => p?.trim());
  const img = image?.url
    ? {
        url: image.url,
        width: image.width || FALLBACK_IMAGE.width,
        height: image.height || FALLBACK_IMAGE.height,
      }
    : FALLBACK_IMAGE;

  return (
    <section
      id="about-alfa"
      aria-labelledby="home-about-heading"
      className="overflow-hidden bg-[#EBF8FE] py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1338px] items-center gap-10 px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:px-12">
        <Image
          src={img.url}
          alt={image?.alt || ""}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="mx-auto h-auto w-full max-w-[720px] lg:max-w-none"
        />

        <div className="max-w-[540px]">
          {eyebrow && (
            <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              {eyebrow}
              <span aria-hidden="true" className="h-px w-16 bg-brand-cyan/50 lg:w-24" />
            </p>
          )}
          {heading && (
            <h2
              id="home-about-heading"
              className={`${manrope.className} mt-4 whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-tight text-ink lg:text-[3.1rem]`}
            >
              {heading}
            </h2>
          )}
          <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-body">
            {texts.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {buttonText && (
            <Link
              href={buttonLink || "/about-us"}
              className="relative isolate mt-8 inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full border-2 border-brand-blue bg-brand-blue px-7 text-sm font-semibold text-white transition-colors duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-wash before:transition-transform before:duration-300 before:ease-out hover:text-ink hover:before:scale-x-100 focus-visible:text-ink focus-visible:before:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan motion-reduce:transition-none motion-reduce:before:transition-none"
            >
              {buttonText}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
