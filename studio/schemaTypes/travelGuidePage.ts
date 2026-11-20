import {defineField, defineType} from 'sanity'

// The /travel-guide listing page has no editable content of its own,
// so this singleton only holds its SEO settings.
export default defineType({
  name: 'travelGuidePage',
  title: 'Travel Guide Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Travel Guide Page',
      readOnly: true,
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields'}),
  ],
  preview: {prepare: () => ({title: 'Travel Guide Page'})},
})
