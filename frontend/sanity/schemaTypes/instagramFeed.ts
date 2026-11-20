import {defineField, defineType} from 'sanity'

// Singleton "Instagram Feed" page (one document, ID "instagramFeed").
// Shows Instagram posts/videos and links back to the Instagram profile.
// If INSTAGRAM_ACCESS_TOKEN is set on the website, the latest posts are loaded from
// Instagram automatically; the "Posts" below are the manual fallback (and the only
// source when no token is configured).
export default defineType({
  name: 'instagramFeed',
  title: 'Instagram Feed',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'profile', title: 'Instagram profile'},
    {name: 'posts', title: 'Posts'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Instagram Feed',
      readOnly: true,
    }),

    // ---------- Hero ----------
    defineField({
      name: 'heroEyebrow',
      title: 'Badge (small label)',
      type: 'string',
      group: 'hero',
      initialValue: 'Instagram Feed',
    }),
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (white part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Follow our journeys on',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (blue part)',
      type: 'string',
      group: 'hero',
      initialValue: 'Instagram.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Moments, places and videos from Kerala and beyond, shared by Alfa Holidays and the travellers we host.',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      description: 'Wide image (about 2400 × 1200). A navy tint is added automatically.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    // ---------- Instagram profile ----------
    defineField({
      name: 'instagramUrl',
      title: 'Instagram profile link',
      type: 'url',
      group: 'profile',
      description: 'The "Follow us" button links here, e.g. https://www.instagram.com/yourhandle/',
      initialValue: 'https://www.instagram.com/alfaholidays/',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram handle',
      type: 'string',
      group: 'profile',
      description: 'Shown next to the follow button, e.g. @alfaholidays',
      initialValue: '@alfaholidays',
    }),
    defineField({
      name: 'followLabel',
      title: 'Follow button label',
      type: 'string',
      group: 'profile',
      initialValue: 'Follow us on Instagram',
    }),

    // ---------- Posts ----------
    defineField({
      name: 'feedEyebrow',
      title: 'Small label',
      type: 'string',
      group: 'posts',
      initialValue: 'Gallery',
    }),
    defineField({
      name: 'feedHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'posts',
      description: 'Press Enter to start a new line.',
      initialValue: 'Latest from\nour Instagram.',
    }),
    defineField({
      name: 'feedDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'posts',
      description: 'Shown on the right of the heading.',
      initialValue: 'Tap any photo or video to open it on Instagram.',
    }),
    defineField({
      name: 'posts',
      title: 'Posts (manual)',
      type: 'array',
      group: 'posts',
      description:
        'Photos and videos to show. Used when the live Instagram connection is not set up (or is temporarily unavailable). Drag to reorder; the first one is shown first.',
      of: [
        {
          type: 'object',
          name: 'instagramPost',
          title: 'Instagram post',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo or video cover',
              type: 'image',
              options: {hotspot: true},
              description: 'Any photo works (about 1080 px wide or more); it is cropped to the tile shape chosen below. For a video, upload its cover frame.',
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'postUrl',
              title: 'Link to the Instagram post',
              type: 'url',
              description: 'The post/reel link, e.g. https://www.instagram.com/p/XXXX/ (falls back to the profile link).',
              validation: (r) => r.uri({scheme: ['https']}),
            }),
            defineField({
              name: 'isVideo',
              title: 'This is a video / reel',
              type: 'boolean',
              description: 'Shows a play / reel icon on the tile.',
              initialValue: false,
            }),
            defineField({
              name: 'format',
              title: 'Tile shape',
              type: 'string',
              options: {
                list: [
                  {title: 'Automatic (photo = square, video / reel = taller)', value: 'auto'},
                  {title: 'Square (1:1)', value: 'square'},
                  {title: 'Portrait (4:5)', value: 'portrait'},
                  {title: 'Reel / vertical video (9:16)', value: 'reel'},
                  {title: 'Landscape video (16:9)', value: 'video'},
                  {title: 'Custom ratio', value: 'custom'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'auto',
              description:
                'How tall this tile is. The picture is cropped to fit (never stretched); use the image hotspot to choose what stays in view.',
            }),
            defineField({
              name: 'customRatio',
              title: 'Custom ratio',
              type: 'string',
              description: 'Width:height, e.g. 3:4 or 2:3 (between 1:3 and 3:1).',
              hidden: ({parent}) => parent?.format !== 'custom',
              validation: (r) =>
                r.custom((v, ctx) => {
                  const parent = ctx.parent as {format?: string} | undefined
                  if (parent?.format !== 'custom') return true
                  const m = String(v || '').match(/^\s*(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)\s*$/)
                  if (!m) return 'Enter it like 3:4'
                  const ratio = Number(m[1]) / Number(m[2])
                  return ratio >= 1 / 3 && ratio <= 3 ? true : 'Keep it between 1:3 and 3:1'
                }),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 3,
              description: 'Short text shown when hovering over the tile.',
            }),
          ],
          preview: {select: {title: 'caption', subtitle: 'postUrl', media: 'image'}},
        },
      ],
      validation: (r) => r.max(24),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Instagram Feed'})},
})
