import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import AboutHero from "@/components/AboutHero";
import StatsSection from "@/components/StatsSection";
import AboutStorySection from "@/components/AboutStorySection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import JourneySection from "@/components/JourneySection";
import TrustedClientsSection from "@/components/TrustedClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getAbout } from "@/sanity/lib/getAbout";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("about");
  return buildMetadata({
    seo: page?.seo,
    path: "/about-us",
    fallback: {
      title: "About Us | Alfa Holidays",
      description:
        "Alfa Holidays is a Kerala-based travel company in Puthentheru, planning memorable holidays with local expertise and personal service.",
    },
  });
}

export default async function AboutUsPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <>
        <Header />
        <main className="p-10 pt-40">
          About Us content not found. Publish the “About Us” document in Sanity
          Studio.
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <AboutHero
          headingWhite={about.heroHeadingWhite}
          headingBlue={about.heroHeadingBlue}
          description={about.heroDescription}
          buttonText={about.heroButtonText}
          buttonLink={about.heroButtonLink}
          image={about.heroBackground}
          imageAlt={about.heroBackgroundAlt}
          hotspot={about.heroHotspot}
        />
        <FadeInWhenVisible>
          <StatsSection items={about.stats} note={about.statsNote} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <AboutStorySection
            eyebrow={about.storyEyebrow}
            heading={about.storyHeading}
            description={about.storyDescription}
            buttonText={about.storyButtonText}
            buttonLink={about.storyButtonLink}
            image={about.storyImage}
            imageAlt={about.storyImageAlt}
            imageWidth={about.storyImageWidth}
            imageHeight={about.storyImageHeight}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <JourneySection
            heading={about.journeyHeading}
            items={about.journey}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <WhyChooseUsSection
            heading={about.whyHeading}
            items={about.whyItems}
          />
        </FadeInWhenVisible>

        {/* Light grey panel behind the clients grid and the testimonials */}
        <div className="bg-[#F2F9FF]">
          <FadeInWhenVisible>
            <TrustedClientsSection
              heading={about.clientsHeading}
              subtitle={about.clientsSubtitle}
              clients={about.clients}
            />
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <TestimonialsSection
              layout="stacked"
              heading={about.testimonialsHeading}
              subtitle={about.testimonialsSubtitle}
              items={about.testimonials}
            />
          </FadeInWhenVisible>
        </div>
      </main>
    </>
  );
}
