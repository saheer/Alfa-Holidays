import {groq} from 'next-sanity'

// ---------------------------------------------------------------------------
// SEO: the `seoFields` object, as a reusable projection. Add `${seoFragment}`
// inside the projection of any query whose document has a `seo` field.
export const seoFragment = groq`
  "seo": seo{
    metaTitle,
    metaDescription,
    keywords,
    noIndex,
    noFollow,
    "ogImage": ogImage.asset->url,
    "ogImageAlt": ogImage.alt,
    "ogHotspot": ogImage.hotspot{x, y}
  }
`

// SEO of a one-document page: pageSeoQuery with { type: "about" }, { type: "home" } …
export const pageSeoQuery = groq`
  *[_type == $type][0]{
    ${seoFragment}
  }
`

export const homeQuery = groq`
  *[_type == "home"][0]{
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    heroButtonText,
    heroButtonLink,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroAccent": heroAccent.asset->url,
    "heroAccentWidth": heroAccent.asset->metadata.dimensions.width,
    "heroAccentHeight": heroAccent.asset->metadata.dimensions.height,
    "logos": logos[defined(asset)]{
      _key,
      "name": coalesce(name, asset->originalFilename),
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    "about": {
      "eyebrow": aboutEyebrow,
      "heading": aboutHeading,
      "paragraphs": aboutParagraphs,
      "buttonText": aboutButtonText,
      "buttonLink": aboutButtonLink,
      "image": {
        "url": aboutImage.asset->url,
        "alt": aboutImage.alt,
        "width": aboutImage.asset->metadata.dimensions.width,
        "height": aboutImage.asset->metadata.dimensions.height
      }
    },
    "features": featureItems[]{_key, icon, title, description},
    "landscape": {
      "eyebrow": landscapeEyebrow,
      "heading": landscapeHeading,
      "description": landscapeDescription,
      "buttonText": landscapeButtonText,
      "buttonLink": landscapeButtonLink,
      "cards": landscapeCards[defined(image.asset)]{
        _key,
        title,
        description,
        link,
        "image": image.asset->url,
        "hotspot": image.hotspot{x, y}
      }
    },
    "approach": {
      "heading": approachHeading,
      "description": approachDescription,
      "ctaText": approachCtaText,
      "ctaLink": approachCtaLink,
      "steps": approachSteps[]{
        _key,
        title,
        subtitle,
        highlight,
        "icon": iconFile.asset->url,
        "iconType": iconFile.asset->mimeType
      }
    },
    "holidays": {
      "heading": holidaysHeading,
      "description": holidaysDescription,
      "items": holidaysItems[]{
        _key,
        title,
        description,
        link,
        icon,
        "iconFile": iconFile.asset->url,
        "iconType": iconFile.asset->mimeType
      },
      "buttonLabel": buttonLabel,
      "holidayButtonLink": holidayButtonLink
    },
    "why": {
      "mediaType": whyMediaType,
      "videoUrl": coalesce(whyVideoFile.asset->url, whyVideoUrl),
      "image": whyImage.asset->url,
      "imageAlt": whyImage.alt,
      "hotspot": whyImage.hotspot{x, y},
      "features": whyFeatures[]{
        _key,
        title,
        highlight,
        description,
        "icon": iconFile.asset->url,
        "iconType": iconFile.asset->mimeType
      }
    },
    "testimonials": {
      "heading": testimonialsHeading,
      "subtitle": testimonialsSubtitle,
      "items": testimonials[defined(quote)]{
        _key,
        quote,
        position,
        company
      }
    }
  }
`

// ---------------------------------------------------------------------------
// Holidays: ONE Studio document ("Holidays") feeds both the Home page "Featured holidays"
// section and the /holidays page, so there is a single list of entries to maintain.
export const holidaysPageQuery = groq`
  *[_type == "holidaysPage"][0]{
    heroTitle,
    heroDescription,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "heroHotspot": heroImage.hotspot{x, y},

    listHeading,
    listDescription,

    featuredEyebrow,
    featuredHeading,
    featuredDescription,
    viewAllText,
    viewAllLink,

    "trips": trips[defined(image.asset)]{
      _key,
      title,
      location,
      category,
      description,
      link,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "hotspot": image.hotspot{x, y}
    }
  }
`

// ---------------------------------------------------------------------------
// Travel Guide (blog): documents of type "post".
//
// Only posts that have a slug are listed (a post without one has no URL).
// "Newest first" is decided by `publishedAt`; as elsewhere, a missing
// date falls back to a very old one so undated posts sink to the bottom, and
// `_createdAt` breaks ties.
const POST_FILTER = '_type == "post" && defined(slug.current)'
const POST_NEWEST_FIRST =
  'order(coalesce(publishedAt, "1970-01-01") desc, _createdAt desc)'

// Fields every card needs (home section, featured slot, grid)
const POST_CARD = `
  _id,
  title,
  "slug": slug.current,
  "category": select(category._type == "reference" => category->title, category),
  excerpt,
  publishedAt,
  "image": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "hotspot": mainImage.hotspot{x, y}
`

// Home page: the 3 newest posts
export const guideHomeQuery = groq`
  *[${POST_FILTER}] | ${POST_NEWEST_FIRST}[0...3]{${POST_CARD}}
`

// Listing page, part 1: the featured post + how many posts exist.
// Pinned posts win ("featured == true"); among them (or among all posts, when none
// is pinned) the newest comes first.
export const guideFeaturedQuery = groq`
  {
    "featured": *[${POST_FILTER}]
      | order(coalesce(featured, false) desc, coalesce(publishedAt, "1970-01-01") desc, _createdAt desc)[0]{${POST_CARD}},
    "total": count(*[${POST_FILTER}])
  }
`

// Listing page, part 2: one page of the grid = every post except the featured one
export const guideGridQuery = groq`
  *[${POST_FILTER} && _id != $featuredId] | ${POST_NEWEST_FIRST}[$from...$to]{${POST_CARD}}
`

// Detail page: one post by slug (body images carry their URL and size for next/image)
export const guidePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_CARD},
    ${seoFragment},
    "body": body[]{
      ...,
      _type == "image" => {
        "url": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        alt,
        caption
      }
    }
  }
`
export const newsletterQuery = groq`
  *[_type == "home"][0]{
    "heading": newsletterHeading,
    "subtitle": newsletterSubtitle,
    "backgroundType": newsletterBackgroundType,
    "image": newsletterBackgroundImage.asset->url,
    "imageAlt": newsletterBackgroundImage.alt,
    "hotspot": newsletterBackgroundImage.hotspot{x, y},
    "videoUrl": coalesce(newsletterBackgroundVideoFile.asset->url, newsletterBackgroundVideoUrl)
  }
`
// ---------------------------------------------------------------------------
// Contact Us: ONE Studio document ("Contact Us") feeds both the Home page
// "Have an Enquiry?" section and the /contact-us page.
export const contactQuery = groq`
  *[_type == "contact"][0]{
    heading,
    description,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "heroHotspot": heroImage.hotspot{x, y},
    address,
    phone,
    whatsapp,
    generalEmail,
    bookingEmail
  }
`
// ---------------------------------------------------------------------------
// Global footer (singleton "Footer" document), rendered on every page
export const footerQuery = groq`
  *[_type == "footer"][0]{
    "logo": logo.asset->url,
    "logoAlt": logo.alt,
    description,
    socialLinks[]{platform, label, url},
    indexTitle,
    indexLinks[]{label, url},
    holidaysTitle,
    holidayLinks[]{label, url},
    copyright,
    legalLinks[]{label, url}
  }
`
// ---------------------------------------------------------------------------
// About Us page (singleton "About Us" document)
export const aboutQuery = groq`
  *[_type == "about"][0]{
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    heroButtonText,
    heroButtonLink,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},

    "stats": statsItems[]{_key, value, label},
    statsNote,

    storyEyebrow,
    storyHeading,
    storyDescription,
    storyButtonText,
    storyButtonLink,
    "storyImage": storyImage.asset->url,
    "storyImageAlt": storyImage.alt,
    "storyImageWidth": storyImage.asset->metadata.dimensions.width,
    "storyImageHeight": storyImage.asset->metadata.dimensions.height,


    journeyHeading,
    journey[]{_key, year, title, description},

    whyHeading,
    "whyItems": whyItems[]{
      _key,
      title,
      icon,
      text,
      "image": image.asset->url,
      "imageAlt": image.alt,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height
    },

    clientsHeading,
    clientsSubtitle,
    clients[]{_key, name, url, "logo": logo.asset->url},

    testimonialsHeading,
    testimonialsSubtitle,
    testimonials[]{_key, quote, author, position, company}
  }
`
// ---------------------------------------------------------------------------
// Instagram Feed page (singleton "Instagram Feed" document)
export const instagramFeedQuery = groq`
  *[_type == "instagramFeed"][0]{
    heroEyebrow,
    heroHeadingWhite,
    heroHeadingBlue,
    heroDescription,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},

    instagramUrl,
    instagramHandle,
    followLabel,

    feedEyebrow,
    feedHeading,
    feedDescription,

    "posts": posts[defined(image.asset)]{
      _key,
      "imageUrl": image.asset->url,
      "alt": image.alt,
      "hotspot": image.hotspot{x, y},
      postUrl,
      isVideo,
      format,
      customRatio,
      caption
    }
  }
`
// ---------------------------------------------------------------------------
// Holidays: "Services Page" singleton + one "holiday" document per solution
export const ourServicesPageQuery = groq`
  *[_type == "ourServicesPage"][0]{
    heroTitle,
    heroSubtitle,
    "heroBackground": heroBackground.asset->url,
    "heroBackgroundAlt": heroBackground.alt,
    "heroHotspot": heroBackground.hotspot{x, y},
    introHeading,
    introDescription,
    "introImage": introImage.asset->url,
    "introImageAlt": introImage.alt,
    "introImageWidth": introImage.asset->metadata.dimensions.width,
    "introImageHeight": introImage.asset->metadata.dimensions.height,
    serviceCategories[]{
      _key,
      heading,
      subtitle,
      items[]{
        _key,
        title,
        description,
        icon,
        "iconImage": iconImage.asset->url,
        link
      }
    },
    whyChooseHeading,
    whyChooseItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},
    benefits[]{
      _key,
      title,
      description,
      "icon": coalesce(icon.asset->url, icon)
    },
    coverItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)}
  }
`

const SERVICE_CARD = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  features,
  "image": image.asset->url,
  "imageAlt": image.alt,
  "hotspot": image.hotspot{x, y}
`

const SERVICE_ORDER = `order(coalesce(order, 999) asc, title asc)`

// /our-services listing
export const servicesListQuery = groq`
  *[_type == "service" && defined(slug.current)] | ${SERVICE_ORDER}{${SERVICE_CARD}}
`

// Header dropdown + "other solutions": only what a small card needs
export const servicesMenuQuery = groq`
  *[_type == "service" && defined(slug.current)] | ${SERVICE_ORDER}{
    _id,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`

// /our-services/[slug]
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    ${SERVICE_CARD},
    ${seoFragment},

    heroTitleWhite,
    heroTitleBlue,
    heroSubtitle,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "heroHotspot": heroImage.hotspot{x, y},

    keyFeaturesHeading,
    keyFeaturesIntro,
    keyFeatures[]{_key, tabLabel, title, description, "image": image.asset->url, "imageAlt": image.alt},

    whyHeading,
    whyText,
    whyPoints,
    "whyImage": whyImage.asset->url,
    "whyImageAlt": whyImage.alt,

    highlightsHeading,
    highlightItems[]{_key, title, description, "image": image.asset->url, "imageAlt": image.alt},

    benefitsHeading,
    benefits[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},

    coverHeading,
    coverIntro,
    coverItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},

    ctaEyebrow,
    ctaHeading,
    ctaText,
    ctaButtonLabel,
    ctaLink,
    whyChooseHeading,
    whyChooseItems[]{_key, title, description, "icon": coalesce(icon.asset->url, icon)},
    faqHeading,
    faqs[]{_key, question, answer}
  }
`

// For generateStaticParams
export const serviceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)] | ${SERVICE_ORDER}{"slug": slug.current}
`
// Slugs for generateStaticParams on /travel-guide/[slug]
export const guideSlugsQuery = groq`
  *[${POST_FILTER}] | ${POST_NEWEST_FIRST}{"slug": slug.current}
`

// ---------------------------------------------------------------------------
// Header (singleton "Header" document): the call-to-action button
export const headerSettingsQuery = groq`
  *[_type == "headerSettings"][0]{ ctaText, ctaLink, showCta }
`
