import {defineField, defineType} from 'sanity'

// Travel Guide categories ("Honeymoon Ideas", "Travel Tips", ...).
// Editors can add as many as they like here, or create one on the spot from the
// "Category" field of a post. The title is the tag shown on the cards and on the post page.
export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'Shown as a tag on the Travel Guide cards and posts, e.g. "Honeymoon Ideas".',
      validation: (Rule) =>
        Rule.required()
          .max(40)
          .custom(async (value, context) => {
            const name = typeof value === 'string' ? value.trim() : ''
            if (!name) return true
            const id = (context.document?._id ?? '').replace(/^drafts\./, '')
            const duplicates = await context
              .getClient({apiVersion: '2025-01-01'})
              .fetch<number>(
                `count(*[_type == "category" && lower(title) == lower($name) && !(_id in [$id, "drafts." + $id])])`,
                {name, id},
              )
            return duplicates > 0 ? 'A category with this name already exists.' : true
          }),
    }),
  ],
  orderings: [{title: 'Name (A–Z)', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})
