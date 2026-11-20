import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { manrope } from "@/app/fonts";
import { getOurServicesPage } from "@/sanity/lib/getServices";
import ServicesIntro from "@/components/services-page/ServicesIntro";
import ServiceCategorySection from "@/components/services-page/ServiceCategory";
import { Blob, FlightPath } from "@/components/services-page/TravelDecor";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_INTRO,
  type ServiceCategory,
} from "@/lib/ourServices";
import { hotspotStyle } from "@/lib/services";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("ourServicesPage");
  return buildMetadata({
    seo: page?.seo,
    path: "/our-services",
    fallback: {
      title: "Services | Alfa Holidays",
      description:
        "Tour packages, flight, train and bus tickets, visas, passports, hotels, travel insurance, cabs and custom itineraries from Alfa Holidays.",
    },
  });
}

export default async function OurServicesPage() {
  const pageData = await getOurServicesPage();
  // Works even before the "Services Page" document is published
  const page = pageData ?? {};
  const fromSanity = (page.serviceCategories ?? []).filter(
    (c: ServiceCategory) => c?.items?.some((i) => i?.title?.trim()),
  );
  const categories: ServiceCategory[] =
    fromSanity.length > 0 ? fromSanity : DEFAULT_CATEGORIES;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#021B35]">
          {page.heroBackground && (
            <Image
              src={page.heroBackground}
              alt={page.heroBackgroundAlt || ""}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              style={hotspotStyle(page.heroHotspot)}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#021B35]/90 via-[#021B35]/75 to-[#021B35]/50" />

          <div className="relative z-10 mx-auto max-w-[1338px] px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-[11rem]">
            <h1
              className={`${manrope.className} max-w-[860px] animate-fade-up text-5xl font-bold leading-[1.05] tracking-[-0.015em] text-white motion-reduce:animate-none sm:text-6xl lg:text-[4.5rem]`}
            >
              {page.heroTitle || "Services planned around the way you travel."}
            </h1>
            <p
              style={{ animationDelay: "150ms" }}
              className="mt-8 max-w-[640px] animate-fade-up text-base leading-[1.75] text-white/80 motion-reduce:animate-none"
            >
              {page.heroSubtitle ||
                "From Kerala’s backwaters and hill stations to beaches and beyond, we plan holidays for every kind of traveller."}
            </p>
          </div>
        </section>

        {/* Intro: title, text and the brush-masked illustration */}
        <FadeInWhenVisible>
          <ServicesIntro
            heading={page.introHeading || DEFAULT_INTRO.heading}
            description={page.introDescription || DEFAULT_INTRO.description}
            image={page.introImage || DEFAULT_INTRO.image}
            imageAlt={page.introImage ? page.introImageAlt : "Aeroplane above famous world landmarks"}
            imageWidth={page.introImage ? page.introImageWidth : DEFAULT_INTRO.imageWidth}
            imageHeight={page.introImage ? page.introImageHeight : DEFAULT_INTRO.imageHeight}
          />
        </FadeInWhenVisible>

        {/* Service categories: each one is a heading + a grid of cards, all from Sanity */}
        <div className="relative bg-white pb-16 lg:pb-24">
          <Blob className="-right-28 bottom-0 h-56 w-80 lg:-right-16 lg:h-72 lg:w-[30rem]" />
          {categories.map((category, i) => (
            <FadeInWhenVisible key={category._key ?? i}>
              <ServiceCategorySection category={category} index={i} />
            </FadeInWhenVisible>
          ))}
          <FlightPath className="mx-auto mt-8 h-auto w-[200px] -scale-x-100 lg:w-[260px]" />
        </div>
      </main>
    </>
  );
}
