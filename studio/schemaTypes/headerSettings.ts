import {defineField, defineType} from 'sanity'

// Singleton "Header" (one document, ID "headerSettings"): the call-to-action button
// shown on the right of the website menu on every page.
export default defineType({
  name: 'headerSettings',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'showCta',
      title: 'Show the button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'Button text',
      type: 'string',
      initialValue: 'Plan Your Trip',
      validation: (r) => r.max(30),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button link',
      type: 'string',
      description: 'A page on this site (/contact-us) or a full https:// link.',
      initialValue: '/contact-us',
      validation: (r) =>
        r.custom(
          (v) => !v || /^(\/|https?:\/\/)/.test(v) || 'Start with / for a page on this site, or https:// for an external link',
        ),
    }),
  ],
  preview: {prepare: () => ({title: 'Header'})},
})
