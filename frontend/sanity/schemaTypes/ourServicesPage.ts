import {defineArrayMember, defineField, defineType} from 'sanity'
import {createElement} from 'react'
import {InlineSvgPreviewItem} from '@focus-reactive/sanity-plugin-inline-svg-input'
// Singleton: texts of the /our-services listing page, plus the "Why Choose Alfa Holidays"
// block that is shown on every service detail page.
export default defineType({
  name: 'ourServicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    {name: 'listing', title: 'Hero & intro', default: true},
    {name: 'categories', title: 'Service categories'},
    {name: 'whyChoose', title: 'Shared: Why Choose (all service pages)'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'listing',
      initialValue: 'Services planned around the way you travel.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'From Kerala’s backwaters and hill stations to beaches and beyond, we plan holidays for every kind of traveller.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero background image',
      type: 'image',
      group: 'listing',
      options: {hotspot: true},
      description: 'A dark navy tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    // ---------- Intro (below the hero) ----------
    defineField({
      name: 'introHeading',
      title: 'Intro title',
      type: 'string',
      group: 'listing',
      description: 'Shown big under the hero. The last word is set in bold with a blue underline stroke.',
      initialValue: 'Services',
    }),
    defineField({
      name: 'introDescription',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      group: 'listing',
      initialValue:
        'From dream destinations to seamless travel experiences, we are here to make your journeys easier, safer and more memorable.',
    }),
    defineField({
      name: 'introImage',
      title: 'Intro illustration',
      type: 'image',
      group: 'listing',
      description:
        'Shown on the right of the intro, exactly as uploaded and uncropped. Upload it with the brush-stroke shape and a white or transparent background (PNG recommended). If empty, a default illustration is used.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Service categories ----------
    defineField({
      name: 'serviceCategories',
      title: 'Service categories',
      type: 'array',
      group: 'categories',
      description:
        'Each category is a heading with a grid of service cards beneath it (e.g. "Travel & Booking Services"). Add, remove, edit and drag to reorder. The grid adapts to the number of cards (up to 5 per row).',
      of: [
        defineArrayMember({
          name: 'serviceCategory',
          type: 'object',
          title: 'Category',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
            defineField({
              name: 'items',
              title: 'Service cards',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'serviceCard',
                  type: 'object',
                  title: 'Service card',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (r) => r.required(),
                    }),
                    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
                    defineField({
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      description: 'Built-in icon. Ignored when you upload your own illustration below.',
                      options: {
                        layout: 'dropdown',
                        list: [
                          {title: 'Luggage (tour packages)', value: 'luggage'},
                          {title: 'Plane (flights)', value: 'plane'},
                          {title: 'Bus', value: 'bus'},
                          {title: 'Visa document', value: 'visa'},
                          {title: 'Passport', value: 'passport'},
                          {title: 'Hotel', value: 'hotel'},
                          {title: 'Shield (insurance)', value: 'insurance'},
                          {title: 'Car (cab / rental)', value: 'car'},
                          {title: 'Map pin (itineraries)', value: 'itinerary'},
                          {title: 'Globe', value: 'globe'},
                          {title: 'Heart', value: 'heart'},
                          {title: 'Star', value: 'star'},
                        ],
                      },
                    }),
                    defineField({
                      name: 'iconImage',
                      title: 'Custom icon / illustration (optional)',
                      type: 'image',
                      description:
                        'Square PNG, SVG or WebP with a transparent background. Replaces the built-in icon; it is shown on the soft blue blob.',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link (optional)',
                      type: 'string',
                      description:
                        'Makes the whole card clickable: a page on this site (e.g. /our-services/kerala-backwaters, /contact-us) or a full https:// URL. Leave empty for a plain card.',
                      validation: (r) =>
                        r.custom((v) =>
                          !v || /^(\/|https?:\/\/)/.test(v)
                            ? true
                            : 'Start with / for a page on this site, or https:// for an external link.',
                        ),
                    }),
                  ],
                  preview: {select: {title: 'title', subtitle: 'description'}},
                }),
              ],
              validation: (r) => r.min(1).max(5),
            }),
          ],
          preview: {
            select: {title: 'heading', subtitle: 'subtitle'},
          },
        }),
      ],
      initialValue: [
        {
          _type: 'serviceCategory',
          heading: 'Travel & Booking Services',
          subtitle: 'Plan. Book. Travel. with Ease.',
          items: [
            {_type: 'serviceCard', icon: 'luggage', title: 'Tour Packages (Domestic & International)', description: 'Kerala and beyond! From honeymoon and family tours to international destinations (Dubai, Saudi, Singapore etc.).'},
            {_type: 'serviceCard', icon: 'plane', title: 'Flight & Train Ticket Booking', description: 'Domestic & international flight tickets and train ticket assistance.'},
            {_type: 'serviceCard', icon: 'bus', title: 'Bus Ticket Booking', description: 'KSRTC, private super fast and luxury sleeper bus tickets.'},
            {_type: 'serviceCard', icon: 'visa', title: 'Visa Assistance & Processing', description: 'Tourist and business visa documentation and application support.'},
            {_type: 'serviceCard', icon: 'passport', title: 'Passport Services', description: 'New passport applications, renewal and verification assistance.'},
          ],
        },
        {
          _type: 'serviceCategory',
          heading: 'Stay & Travel Assistance',
          subtitle: 'Travel Better. Feel Secure.',
          items: [
            {_type: 'serviceCard', icon: 'hotel', title: 'Hotel & Resort Reservations', description: 'Book top hotels, resorts and homestays.'},
            {_type: 'serviceCard', icon: 'insurance', title: 'Travel Insurance', description: 'Stay protected with reliable travel insurance.'},
            {_type: 'serviceCard', icon: 'car', title: 'Cab / Car Rental Services', description: 'Airport pick-up/drop, sightseeing cars and more.'},
            {_type: 'serviceCard', icon: 'itinerary', title: 'Customized Holiday Itineraries', description: 'Tailor-made travel plans as per your interests and budget.'},
          ],
        },
      ],
    }),

    // ---------- Shared on every service detail page ----------
    defineField({
      name: 'whyChooseHeading',
      title: 'Heading',
      type: 'string',
      group: 'whyChoose',
      initialValue: 'Why Choose Alfa Holidays',
    }),
    defineField({
      name: 'whyChooseItems',
      title: 'Strengths',
      type: 'array',
      group: 'whyChoose',
      description: 'Dark cards, 3 per row (6 fills two rows).',
      of: [
          defineArrayMember({
          name: 'strength',
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon (SVG)', type: 'inlineSvg'}),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({              name: 'description',              title: 'Description (optional)',              type: 'text',              rows: 2,              description: 'Shown under the title. Leave empty to match the design (title only).',            }),
          ],
          preview: {select: {icon: 'icon', title: 'title', subtitle: 'description'}},          components: {            preview: (p: any) =>              createElement(InlineSvgPreviewItem, {icon: p.icon, title: p.title, subtitle: p.subtitle}),          },
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Services Page'})},
})