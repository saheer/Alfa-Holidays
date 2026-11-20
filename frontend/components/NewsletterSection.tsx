import Image from "next/image";
import { manrope } from "@/app/fonts";
import NewsletterForm from "@/components/NewsletterForm";

type Props = {
  heading?: string | null;
  subtitle?: string | null;
  backgroundType?: "image" | "video" | null;
  image?: string | null;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
  videoUrl?: string | null;
};

// Shown until the fields are filled in Sanity
const DEFAULT_HEADING = "Subscribe to our newsletter";
const DEFAULT_SUBTITLE =
  "for the latest destination guides, travel tips and holiday ideas from Alfa Holidays.";

export default function NewsletterSection({
  heading,
  subtitle,
  backgroundType,
  image,
  imageAlt,
  hotspot,
  videoUrl,
}: Props) {
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : undefined;
  // The video is only used when "Video" is selected AND a file / URL exists
  const showVideo = backgroundType === "video" && !!videoUrl;

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-brand-navy"
    >
      {/* Image: the background itself, or the poster/fallback behind the video */}
      {image && (
        <Image
          src={image}
          alt={showVideo ? "" : imageAlt || ""}
          fill
          sizes="100vw"
          style={{ objectPosition }}
          className="object-cover"
        />
      )}

      {/* Video: sits on top of the image; hidden for visitors who prefer reduced motion */}
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          style={{ objectPosition }}
          src={videoUrl!}
          poster={image ?? undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
        />
      )}

      {/* Dark overlay keeps the text readable on any image or video */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,76,140,0.82),rgba(3,39,75,0.96))]"
      />

      {/* Curved top edge: the page tint above dips into the navy banner */}
      <svg
        aria-hidden
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 z-[5] h-14 w-full sm:h-20 lg:h-24"
      >
        <path
          d="M0 0H1440V46C1200 96 980 92 720 60C470 30 220 22 0 70Z"
          fill="#04a4ee"
          fillOpacity="0.35"
        />
        <path
          d="M0 0H1440V22C1230 74 1010 82 760 46C500 10 220 6 0 50Z"
          fill="#f2f9ff"
        />
      </svg>

      <div className="relative z-10 mx-auto flex max-w-[1338px] flex-col items-center px-6 pb-16 pt-24 text-center sm:pt-28 lg:px-12 lg:pt-32">
        <h2
          id="newsletter-heading"
          className={`${manrope.className} text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-white sm:text-4xl lg:text-[2.6rem]`}
        >
          {heading || DEFAULT_HEADING}
        </h2>
        <p className="mt-4 max-w-[600px] text-[15.5px] leading-[1.7] text-white/75 lg:text-base">
          {subtitle || DEFAULT_SUBTITLE}
        </p>

        <div className="mt-9 w-full max-w-[560px]">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
