import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import HolidayTripsGrid from "@/components/HolidayTripsGrid";
import { manrope } from "@/app/fonts";
import { getHolidaysPage } from "@/sanity/lib/getHolidaysPage";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("holidaysPage");
  return buildMetadata({
    seo: page?.seo,
    path: "/holidays",
    fallback: {
      title: "Holidays | Alfa Holidays",
      description:
        "Handpicked holidays from Kerala and beyond, planned by Alfa Holidays in Puthentheru.",
    },
  });
}

export default async function HolidaysPage() {
  // Works even before the "Holidays" document is published
  const data = (await getHolidaysPage()) ?? {};

  return (
    <>
      <Header />
      <main>
        {/* Hero: same component (height, tint, typography) as the About Us page */}
        <AboutHero
          headingWhite={data.heroTitle || "Holidays"}
          description={
            data.heroDescription ||
            "Handpicked holidays from Kerala and beyond, planned by Alfa Holidays."
          }
          image={data.heroImage}
          imageAlt={data.heroImageAlt}
          hotspot={data.heroHotspot}
          scrollTargetId="holidays-list"
        />

        {/* All holiday entries */}
        <FadeInWhenVisible>
          <section id="holidays-list" className="scroll-mt-24 bg-white py-16 lg:py-24">
            <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
              {(data.listHeading || data.listDescription) && (
                <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
                  {data.listHeading && (
                    <h2
                      className={`${manrope.className} max-w-[640px] text-4xl font-bold leading-[1.1] tracking-tight text-ink lg:text-[3rem]`}
                    >
                      {data.listHeading}
                    </h2>
                  )}
                  {data.listDescription && (
                    <p className="max-w-[400px] text-[15px] leading-[1.6] text-[#2D4970] lg:pb-2">
                      {data.listDescription}
                    </p>
                  )}
                </div>
              )}
              <HolidayTripsGrid trips={data.trips} />
            </div>
          </section>
        </FadeInWhenVisible>
      </main>
    </>
  );
}
