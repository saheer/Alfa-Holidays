import {defineField, defineType} from 'sanity'

// Singleton: feeds BOTH the "Have an Enquiry?" section on the Home page and the
// /contact-us page (hero + contact details).
export default defineType({
  name: 'contact',
  title: 'Contact Us',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Have an Enquiry?',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Would you like to learn more about our holidays or plan a custom trip? Please fill in the form and we will get back to you shortly.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Contact page hero background image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Shown behind the heading on the Contact page. A dark blue tint is added automatically so the text stays readable.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'address',
      title: 'Official address',
      type: 'text',
      rows: 3,
      description: 'Shown first on the contact details. Press Enter for a new line.',
      initialValue: 'Alfa Holidays\nPuthentheru, Kerala, India',
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'With country code, e.g. +91 98765 43210. Becomes a tap-to-call link.',
      initialValue: '+91 XXXXX XXXXX',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      description: 'With country code, e.g. +91 98765 43210. Opens a WhatsApp chat (wa.me link).',
      initialValue: '+91 XXXXX XXXXX',
    }),
    defineField({
      name: 'generalEmail',
      title: 'General enquiries email (shown on the site)',
      type: 'string',
      initialValue: 'hello@alfaholidays.com',
      description:
        'Display only. Where submitted enquiries are delivered is set in the website environment variables.',
      validation: (r) => r.email(),
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Bookings email (shown on the site)',
      type: 'string',
      initialValue: 'bookings@alfaholidays.com',
      description: 'Display only (see above).',
      validation: (r) => r.email(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields'}),
  ],
  preview: {prepare: () => ({title: 'Contact Us'})},
})