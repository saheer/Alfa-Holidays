import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'

// Singletons: one document each, fixed ID, no create/delete.
const singletons = [
  'home',
  'holidaysPage',
  'contact',
  'footer',
  'headerSettings',
  'about',
  'ourServicesPage',
  'instagramFeed',
  'travelGuidePage',
]

export default defineConfig({
  name: 'default',
  title: 'alfa-holidays',
  projectId: 'ht8chjnl',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) => {
        // One-document pages. The explicit .title() matters: until a document has been
        // created, Studio would otherwise label its editor "New <type>" (e.g. "New Footer").
        const page = (id: string, title: string) =>
          S.listItem()
            .title(title)
            .id(id)
            .child(S.document().schemaType(id).documentId(id).title(title))

        return S.list()
          .title('Content')
          .items([
            page('home', 'Home Page'),
            page('about', 'About Us'),
            page('ourServicesPage', 'Services Page'),
            S.documentTypeListItem('service').title('Services'),
            page('instagramFeed', 'Instagram Feed'),
            page('holidaysPage', 'Holidays'),
            page('travelGuidePage', 'Travel Guide Page (SEO)'),
            // Blog posts (many documents, so a normal list instead of a singleton)
            S.documentTypeListItem('post').title('Travel Guide posts'),
            S.documentTypeListItem('category').title('Travel Guide categories'),
            S.divider(),
            page('contact', 'Contact Us'),
            page('headerSettings', 'Header (menu button)'),
            page('footer', 'Footer (all pages)'),
          ])
      },
    }),
    visionTool(),
    inlineSvgInput(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletons.includes(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})