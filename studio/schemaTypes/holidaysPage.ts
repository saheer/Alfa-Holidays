import {defineField, defineType} from 'sanity'

// The ONE place to manage "Holidays" (singleton: fixed ID, no create/delete, see sanity.config.ts).
// It works like the other pages: a hero banner, then a list of holiday entries. It feeds:
//   - the /holidays page: hero + every entry, with category filters
//   - the Home page section "Featured holidays": its own heading/text + the first 3 entries
//     (of the chosen category) from the same list
export default defineType({
  name: 'holidaysPage',
  title: 'Holidays',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero banner', default: true},
    {name: 'trips', title: 'Holiday entries'},
    {name: 'list', title: 'Page: list intro'},
    {name: 'home', title: 'Home page section'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ---------- Hero banner (/holidays) ----------
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'hero',
      initialValue: 'Holidays',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue: 'Handpicked holidays from Kerala and beyond, planned by Alfa Holidays.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero banner image',
      type: 'image',
      group: 'hero',
      description: 'Wide image (about 2400 × 1200). Shown behind a dark blue tint; plain navy if empty.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Holiday entries ----------
    defineField({
      name: 'trips',
      title: 'Holiday entries',
      type: 'array',
      group: 'trips',
      description:
        'Add as many holidays as you like. They appear on the /holidays page and in the Home page section (the first three of the selected category). Drag to reorder: the first entry is the large card.',
      of: [
        {
          type: 'object',
          name: 'holidayTrip',
          title: 'Holiday',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'Shown with a pin icon, e.g. "Munnar, Kerala".',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              description:
                'Type any category, e.g. "International", "India" or "Honeymoon". The filter buttons on the website are built from the categories you use, so type each one the same way every time.',
            }),
            defineField({
              name: 'description',
              title: 'Short description',
              type: 'text',
              rows: 2,
              description: 'One or two lines shown on the card.',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              description: 'Landscape or portrait photo (about 1400 × 1400). Use the hotspot to choose what stays in view.',
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Where the card goes: a page (/our-services/kerala-backwaters) or a full https:// link.',
              initialValue: '/our-services',
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'category', media: 'image'},
          },
        },
      ],
    }),

    // ---------- /holidays page: list intro ----------
    defineField({
      name: 'listHeading',
      title: 'Heading above the list',
      type: 'string',
      group: 'list',
      initialValue: 'Find Your Next Holiday',
    }),
    defineField({
      name: 'listDescription',
      title: 'Text on the right of the heading',
      type: 'text',
      rows: 3,
      group: 'list',
      initialValue: 'Filter by category and open any holiday to see more.',
    }),

    // ---------- Home page: "Featured holidays" section ----------
    defineField({
      name: 'featuredEyebrow',
      title: 'Small label',
      type: 'string',
      group: 'home',
      initialValue: 'Featured Holidays',
    }),
    defineField({
      name: 'featuredHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'home',
      description: 'Press Enter to start a new line.',
      initialValue: 'Handpicked holidays\nfrom Kerala and beyond',
    }),
    defineField({
      name: 'featuredDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'home',
      initialValue:
        'From backwater cruises to hill-station escapes and international getaways, explore the holidays our team loves to plan.',
    }),
    defineField({
      name: 'viewAllText',
      title: '"View all" text',
      type: 'string',
      group: 'home',
      initialValue: 'View all holidays',
    }),
    defineField({
      name: 'viewAllLink',
      title: '"View all" link',
      type: 'string',
      group: 'home',
      initialValue: '/holidays',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Holidays'})},
})
