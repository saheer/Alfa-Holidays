import Image from "next/image";
import { manrope } from "@/app/fonts";
import { Blob, FlightPath } from "./TravelDecor";

type Props = {
  heading?: string | null;
  description?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
};

// Intro block under the hero: two-tone title + paragraph on the left, brush-masked
// illustration on the right. The brush shape is part of the uploaded image (shown
// uncropped, at its natural proportions).
export default function ServicesIntro({
  heading,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
}: Props) {
  const words = (heading || "Services").trim().split(/\s+/);
  const last = words.pop() ?? "";

  return (
    <section
      aria-labelledby="services-intro-heading"
      className="relative overflow-hidden bg-white pb-8 pt-16 lg:pb-12 lg:pt-24"
    >
      <Blob className="-left-32 bottom-0 h-56 w-80 lg:-left-20 lg:h-64 lg:w-[28rem]" />

      <div className="relative mx-auto grid max-w-[1338px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <div className="relative pt-12 lg:pl-16 lg:pt-16">
          <FlightPath className="absolute -left-2 top-0 h-auto w-[190px] lg:-left-10 lg:-top-6 lg:w-[270px]" />

          <h2
            id="services-intro-heading"
            className={`${manrope.className} relative text-[3.25rem] leading-[1] tracking-tight text-ink sm:text-6xl lg:text-[5rem]`}
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
                className="absolute -bottom-3 left-0 h-3 w-full text-brand-cyan"
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

          {description && (
            <p className="mt-10 max-w-[440px] text-base leading-[1.8] text-[#2D4970] lg:text-[17px]">
              {description}
            </p>
          )}
        </div>

        {image && (
          <Image
            src={image}
            alt={imageAlt || ""}
            width={imageWidth || 1600}
            height={imageHeight || 1100}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="h-auto w-full"
          />
        )}
      </div>
    </section>
  );
}
