import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { manrope } from "@/app/fonts";

// Colours of this section, in one place. They follow the site palette; to restyle the
// section (e.g. a green / cream scheme), change these five values.
const THEME = {
  "--story-bg": "#FFFFFF",
  "--story-eyebrow": "#04A4EE", // brand cyan
  "--story-heading": "#0B1F44",
  "--story-text": "#2D4970",
  "--story-button": "#0B1F44",
  "--story-button-hover": "#004C8C",
} as CSSProperties;

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
};

export default function AboutStorySection({
  eyebrow,
  heading,
  description,
  buttonText,
  buttonLink,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
}: Props) {
  if (!heading && !description && !image) return null;

  const href = buttonLink || "/our-services";
  const external = /^https?:\/\//.test(href);

  return (
    <section
      id="our-story"
      aria-labelledby="story-heading"
      style={THEME}
      className="scroll-mt-24 overflow-hidden bg-[var(--story-bg)] py-16 lg:py-24"
    >
      <div
        className={`mx-auto grid max-w-[1338px] items-center gap-10 px-6 lg:px-12 ${
          image
            ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8"
            : ""
        }`}
      >
        <div className="max-w-[520px]">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--story-eyebrow)]">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2
              id="story-heading"
              className={`${manrope.className} mt-4 whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-tight text-[var(--story-heading)] lg:text-[3.1rem]`}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-6 whitespace-pre-line text-[15px] leading-[1.75] text-[var(--story-text)]">
              {description}
            </p>
          )}
          {buttonText && (
            <Link
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--story-button)] px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--story-button-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--story-eyebrow)]"
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

        {/* The brushstroke frame is part of the uploaded image, so it is shown as-is */}
        {image && (
          <Image
            src={image}
            alt={imageAlt || ""}
            width={imageWidth || 1672}
            height={imageHeight || 941}
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="mx-auto h-auto w-full max-w-[760px] lg:max-w-none"
          />
        )}
      </div>
    </section>
  );
}
