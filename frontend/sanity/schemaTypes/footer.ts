import {defineArrayMember, defineField, defineType} from 'sanity'

// Internal path (/about-us), anchor (#contact) or full link (https://, mailto:, tel:)
const urlValidation = (r: any) =>
  r.required().custom((value: string | undefined) =>
    !value || /^(\/|#|https?:\/\/|mailto:|tel:)/i.test(value)
      ? true
      : 'Use a path like /about-us or a full link starting with https://',
  )

// Reusable "list of text links" field (label + url)
const linkList = (
  name: string,
  title: string,
  initialValue: {label: string; url: string}[],
  description?: string,
) =>
  defineField({
    name,
    title,
    type: 'array',
    description,
    of: [
      defineArrayMember({
        name: 'link',
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'url', title: 'Link', type: 'string', validation: urlValidation}),
        ],
        preview: {select: {title: 'label', subtitle: 'url'}},
      }),
    ],
    initialValue: initialValue.map((item) => ({_type: 'link', ...item})),
  })

// Singleton: the global footer shown at the bottom of every page.
export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  groups: [
    {name: 'brand', title: 'Logo & Social', default: true},
    {name: 'links', title: 'Link Columns'},
    {name: 'bottom', title: 'Bottom Bar'},
  ],
  fields: [
    // ---------- Logo, description, social ----------
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      description:
        'Optional. Leave empty to use the default logo. Use a light/white logo: the footer is dark navy.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'brand',
      initialValue:
        'Alfa Holidays, Puthentheru, Kerala — Thoughtfully planned journeys. Memorable holidays.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'brand',
      description: 'Facebook and Instagram only.',
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          name: 'social',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                ],
              },
              initialValue: 'facebook',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Button text',
              type: 'string',
              initialValue: 'Facebook',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profile link',
              type: 'url',
              validation: (r) => r.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
      initialValue: [
        {
          _type: 'social',
          platform: 'facebook',
          label: 'Facebook',
          url: 'https://www.facebook.com/alfatravelcare/',
        },
        {
          _type: 'social',
          platform: 'instagram',
          label: 'Instagram',
          url: 'https://www.instagram.com/alfaholidays/',
        },
      ],
    }),

    // ---------- Link columns ----------
    defineField({
      name: 'indexTitle',
      title: 'Index column title',
      type: 'string',
      group: 'links',
      initialValue: 'Index',
    }),
    linkList('indexLinks', 'Index links', [
      {label: 'About Us', url: '/about-us'},
      {label: 'Services', url: '/our-services'},
      {label: 'Instagram Feed', url: '/instagram-feed'},
      {label: 'Holidays', url: '/holidays'},
      {label: 'Travel Guide', url: '/travel-guide'},
      {label: 'Contact Us', url: '/contact-us'},
    ]),
    defineField({
      name: 'holidaysTitle',
      title: 'Holidays column title',
      type: 'string',
      group: 'links',
      initialValue: 'Holidays',
    }),
    linkList('holidayLinks', 'Holidays links', [
      {label: 'Backwater Cruises', url: '/our-services'},
      {label: 'Hill Stations', url: '/our-services'},
      {label: 'DESTINATION GUIDE', url: '/our-services'},
      {label: 'Wildlife & Nature', url: '/our-services'},
    ]),

    // ---------- Bottom bar ----------
    defineField({
      name: 'copyright',
      title: 'Copyright text',
      type: 'string',
      group: 'bottom',
      initialValue: '© 2026 Alfa Holidays. All rights reserved.',
    }),
    linkList('legalLinks', 'Legal links', [
      {label: 'Privacy Policy', url: '/privacy-policy'},
      {label: 'Terms & Conditions', url: '/terms-and-conditions'},
    ]),
  ].map((field) => {
    // put the two link-list fields into their groups
    if (['indexLinks', 'holidayLinks'].includes(field.name)) return {...field, group: 'links'}
    if (field.name === 'legalLinks') return {...field, group: 'bottom'}
    return field
  }),
  preview: {prepare: () => ({title: 'Footer'})},
})