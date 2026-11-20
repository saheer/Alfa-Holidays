import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Travel Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL of the post: /travel-guide/<slug>. Click "Generate" to create it from the title.',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description:
        'Pick an existing category, or click "Create new" in the field to add one. It appears as the tag on the cards and on the post page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Card thumbnail and the background of the post header.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Short description for screen readers. Leave empty if the image is purely decorative.',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the cards and under the title on the post page.',
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      options: {dateFormat: 'DD MMMM YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Pin as featured',
      type: 'boolean',
      description:
        'Shows this post in the large "Featured" slot on the Travel Guide page. If no post is pinned (or several are), the newest pinned post wins; with none pinned, the newest post is used.',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields'}),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', category: 'category.title', date: 'publishedAt', media: 'mainImage'},
    prepare: ({title, category, date, media}) => ({
      title,
      subtitle: [category, date].filter(Boolean).join(' · '),
      media,
    }),
  },
})
