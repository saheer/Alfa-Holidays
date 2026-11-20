import {defineArrayMember, defineField, defineType} from 'sanity'

// Singleton: everything on the /about-us page.
export default defineType({
  name: 'about',
  title: 'About Us',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'stats', title: 'Key Statistics'},
    {name: 'story', title: 'Our Story'},
    {name: 'journey', title: 'Our Journey'},
    {name: 'why', title: 'Why Choose Us'},
    {name: 'clients', title: 'Trusted Clients'},
    {name: 'testimonials', title: 'Client Speak'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ---------- Hero ----------
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Journeys That Inspire',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (blue part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Your Next Holiday',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Subheading / description',
      type: 'text',
      rows: 4,
      group: 'hero',
      initialValue:
        'Alfa Holidays is a travel company based in Puthentheru, Kerala. We combine local expertise, trusted partners and personal service to plan holidays that are easy to book and hard to forget.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'A dark blue tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Button text',
      type: 'string',
      group: 'hero',
      initialValue: 'Learn About Our Approach',
    }),
    defineField({
      name: 'heroButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'hero',
      description: 'A page (/instagram-feed), a section on this page (#our-journey) or a full https:// link.',
      initialValue: '#our-journey',
    }),

    // ---------- Key Statistics (right below the hero) ----------
    defineField({
      name: 'statsItems',
      title: 'Statistics',
      type: 'array',
      group: 'stats',
      description:
        'Up to 4 headline numbers, shown side by side right below the hero (they count up when scrolled into view). Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Statistic',
          fields: [
            defineField({
              name: 'value',
              title: 'Number',
              type: 'string',
              description: 'Type it exactly as it should appear, e.g. 5,000+ or 35+',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. Happy travellers, Holiday packages, Repeat customers',
              validation: (r) => r.required(),
            }),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'statsNote',
      title: 'Note under the statistics',
      type: 'string',
      group: 'stats',
      description: 'Small grey text in the bottom bar. Leave empty to hide the bar.',
    }),

    // ---------- Our Story (text + image in a brush-stroke frame) ----------
    defineField({
      name: 'storyEyebrow',
      title: 'Small label',
      type: 'string',
      group: 'story',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'storyHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'story',
      description: 'Press Enter to start a new line.',
      initialValue: 'Where Every Journey\nBegins in Kerala',
    }),
    defineField({
      name: 'storyDescription',
      title: 'Description',
      type: 'text',
      rows: 5,
      group: 'story',
      initialValue:
        'From the quiet backwaters of Kerala to beaches and hill stations beyond, Alfa Holidays plans journeys around the way you like to travel. Our Puthentheru team pairs local knowledge with trusted stays and personal support, so every holiday feels effortless from the first enquiry to the trip home.',
    }),
    defineField({
      name: 'storyButtonText',
      title: 'Button text',
      type: 'string',
      group: 'story',
      initialValue: 'Services',
    }),
    defineField({
      name: 'storyButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'story',
      description: 'A page (/our-services), a section on this page (#our-journey) or a full https:// link.',
      initialValue: '/our-services',
    }),
    defineField({
      name: 'storyImage',
      title: 'Image',
      type: 'image',
      group: 'story',
      description:
        'One finished picture (any landscape size, e.g. 1672 × 941). Any brush-stroke frame should already be part of the image: it is shown exactly as uploaded, without cropping.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Our Journey ----------
    defineField({
      name: 'journeyHeading',
      title: 'Heading',
      type: 'string',
      group: 'journey',
      initialValue: 'Our Journey',
    }),
    defineField({
      name: 'journey',
      title: 'Timeline items',
      type: 'array',
      group: 'journey',
      description: 'Shown left to right (4 fit in one row). Drag to reorder.',
      of: [
        defineArrayMember({
          name: 'milestone',
          type: 'object',
          fields: [
            defineField({name: 'year', title: 'Year', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'year'}},
        }),
      ],
      initialValue: [
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Founded',
          description:
            'Alfa Holidays begins planning holidays from Puthentheru, Kerala. (Replace with your own milestone.)',
        },
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Global Reach',
          description:
            'Add a milestone about growth or new destinations. (Replace with your own milestone.)',
        },
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Technology',
          description:
            'Add a milestone about new holidays or partnerships. (Replace with your own milestone.)',
        },
        {
          _type: 'milestone',
          year: '20XX',
          title: 'Today',
          description:
            'A trusted travel partner for holidays across Kerala and beyond.',
        },
      ],
    }),

    // ---------- Why Choose Us (header + zig-zag rows) ----------
    defineField({
      name: 'whyHeading',
      title: 'Heading',
      type: 'string',
      group: 'why',
      description:
        'Section title, shown in lowercase on the website. The last word is set in bold with a blue underline stroke.',
      initialValue: 'Why Choose Alfa Holidays',
    }),
    defineField({
      name: 'whyItems',
      title: 'Value points',
      type: 'array',
      group: 'why',
      description:
        'Each point is one row. Rows alternate automatically: the first has the text on the left and the image on the right, the second the other way round. Two points work best. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'whyItem',
          title: 'Value point',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Round icon badge shown beside the title. If empty, the first point gets a diamond and the second a compass.',
              options: {
                layout: 'dropdown',
                list: [
                  {title: 'Diamond (quality / value)', value: 'diamond'},
                  {title: 'Compass (journeys / connections)', value: 'compass'},
                  {title: 'Shield (trust / safety)', value: 'shield'},
                  {title: 'Heart (care / service)', value: 'heart'},
                  {title: 'Globe (destinations)', value: 'globe'},
                  {title: 'Star (experience)', value: 'star'},
                ],
              },
            }),
            defineField({name: 'text', title: 'Paragraph', type: 'text', rows: 5}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Shown exactly as uploaded, at its natural proportions (no cropping, frame or background). Any frame or artwork should be part of the image.',
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'text', media: 'image'}},
        },
      ],
      initialValue: [
        {
          _type: 'whyItem',
          icon: 'diamond',
          title: 'Decades of travel and visa expertise',
          text: 'Since 1990, Alfa Holidays has planned holidays, booked flights and handled visas for travellers from Kerala. That experience means fewer surprises, smoother paperwork and better advice at every step.',
        },
        {
          _type: 'whyItem',
          icon: 'compass',
          title: 'Personal service from first enquiry to return home',
          text: 'Our Puthentheru team plans every trip around you and stays on hand throughout, so you always have someone you know to call, before, during and after your holiday.',
        },
      ],
      validation: (r) => r.max(4),
    }),

    // ---------- Trusted clients ----------
    defineField({
      name: 'clientsHeading',
      title: 'Heading',
      type: 'string',
      group: 'clients',
      initialValue: 'Trusted by travellers and partners.',
    }),
    defineField({
      name: 'clientsSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'clients',
      initialValue:
        'We work with travellers, families, corporate groups and trusted hospitality partners across Kerala.',
    }),
    defineField({
      name: 'clients',
      title: 'Client logos',
      type: 'array',
      group: 'clients',
      description: 'Shown in a grid of white cards (3 per row on desktop). Drag to reorder.',
      of: [
        defineArrayMember({
          name: 'client',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Client name',
              type: 'string',
              description: 'Used as the logo’s alt text.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo (SVG or PNG)',
              type: 'image',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'Website (optional)',
              type: 'url',
              description: 'If set, the card becomes a link that opens in a new tab.',
              validation: (r) => r.uri({scheme: ['https', 'http']}),
            }),
          ],
          preview: {select: {title: 'name', media: 'logo'}},
        }),
      ],
    }),

    // ---------- Client Speak ----------
    defineField({
      name: 'testimonialsHeading',
      title: 'Heading',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Client Speak',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Testimonials from our clients.',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      description: 'Shown one at a time in the slider. Drag to reorder.',
      of: [
        defineArrayMember({
          name: 'testimonial',
          type: 'object',
          fields: [
            defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required()}),
            defineField({
              name: 'author',
              title: 'Author name (optional)',
              type: 'string',
              description: 'Leave empty to show only the role and company, as in the design.',
            }),
            defineField({name: 'position', title: 'Designation', type: 'string'}),
            defineField({name: 'company', title: 'Company', type: 'string'}),
          ],
          preview: {select: {title: 'company', subtitle: 'quote'}},
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'About Us'})},
})