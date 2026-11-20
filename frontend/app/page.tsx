import type { Metadata } from "next";
import Header from "@/components/Header";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import HomeAboutSection from "@/components/HomeAboutSection";
import LandscapeSection from "@/components/LandscapeSection";
import FeaturedHolidays from "@/components/FeaturedHolidays";
import ApproachSection from "@/components/ApproachSection";
import HolidaySection from "@/components/HolidaySection";
import WhySection from "@/components/WhySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TravelGuideSection from "@/components/TravelGuideSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import { getHome, getNewsletter } from "@/sanity/lib/getHome";
import { getHolidaysPage } from "@/sanity/lib/getHolidaysPage";
import { getGuideHome } from "@/sanity/lib/getTravelGuide";
import { getContact } from "@/sanity/lib/getContact";
import { buildMetadata } from "@/sanity/lib/seo";
import { getPageSeo } from "@/sanity/lib/getPageSeo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSeo("home");
  return buildMetadata({
    seo: page?.seo,
    path: "/",
    fallback: {
      title: "Alfa Holidays",
      description: "Kerala holidays and tours, planned with care by Alfa Holidays in Puthentheru.",
    },
  });
}

export default async function HomePage() {
  // The Home Page, Holidays and Contact Us documents are separate
  // Studio documents, so they are fetched (and cached) separately, in parallel.
  const [home, holidaysPage, guide, newsletter, contact] = await Promise.all([
    getHome(),
    getHolidaysPage(),
    getGuideHome(),
    getNewsletter(),
    getContact(),
  ]);

  if (!home) {
    return (
      <main className="p-10">
        Home content not found. Publish the “Home Page” document in Sanity
        Studio.
      </main>
    );
  }

  const {
    logos,
    about,
    // The 4-icon list is no longer shown on the homepage; taken out so it is not passed to <Hero>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    features,
    landscape,
    approach,
    holidays,
    why,
    testimonials,
    ...hero
  } = home;

  return (
    <>
      <Header />
      <main>
        <Hero {...hero} />
        <FadeInWhenVisible>
          <LogoMarquee logos={logos} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <HomeAboutSection {...about} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <HolidaySection {...holidays} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <LandscapeSection {...landscape} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <FeaturedHolidays
            eyebrow={holidaysPage?.featuredEyebrow}
            heading={holidaysPage?.featuredHeading}
            description={holidaysPage?.featuredDescription}
            viewAllText={holidaysPage?.viewAllText}
            viewAllLink={holidaysPage?.viewAllLink}
            trips={holidaysPage?.trips}
          />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <ApproachSection {...approach} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <WhySection {...why} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <TestimonialsSection {...testimonials} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <TravelGuideSection posts={guide} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <NewsletterSection {...(newsletter ?? {})} />
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <ContactSection {...(contact ?? {})} />
        </FadeInWhenVisible>
      </main>
    </>
  );
}
