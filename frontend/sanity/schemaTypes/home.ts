import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero Banner', default: true},
    {name: 'logos', title: 'Logo Slider'},
    {name: 'about', title: 'About Us Intro'},
    {name: 'packages', title: 'Holiday Packages'},
    {name: 'holidays', title: 'Services'},
    {name: 'why', title: 'Why Alfa Holidays (media + features)'},
    {name: 'testimonials', title: 'Client Speak (Testimonials)'},
    {name: 'newsletter', title: 'Newsletter Section'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true,
    }),
    defineField({
      name: 'heroHeadingWhite',
      title: 'Heading (first line, white)',
      type: 'string',
      group: 'hero',
      initialValue: 'Your Journey Begins',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroHeadingBlue',
      title: 'Heading (second line, light blue, with brush underline)',
      type: 'string',
      group: 'hero',
      initialValue: 'Here in Tirur',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description paragraphs',
      type: 'array',
      group: 'hero',
      of: [{type: 'text', rows: 3}],
      initialValue: [
        'Experience the world with Kerala’s trusted tour operators as Alfa Holidays crafts unforgettable journeys for you and your loved ones.',
        'Let Alfa Holidays turn your dream vacation into reality with handcrafted itineraries and expert guidance from the heart of Kerala.',
      ],
      validation: (r) => r.min(1).max(3),
    }),
    defineField({
      name: 'heroBackground',
      title: 'Banner image (airplane / destination artwork)',
      type: 'image',
      group: 'hero',
      description:
        'Wide scene, 16:9 (about 1920 × 1080), with the aeroplane and town on the RIGHT. It fills the hero right up to the screen edge. A dark-blue fade is added over its left side automatically so the white text stays readable, so the picture itself should NOT be white or washed out on the left. On phones and tablets it appears below the text.',
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroAccent',
      title: 'Foliage picture (optional, top-left corner)',
      type: 'image',
      group: 'hero',
      description:
        'Optional PNG with a transparent background (for example palm leaves, about 600 × 800). Shown hanging from the top-left corner of the hero. Leave empty if the foliage is already part of the banner image.',
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Button text',
      type: 'string',
      group: 'hero',
      initialValue: 'Explore Our Packages',
    }),
    defineField({
      name: 'heroButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'hero',
      description: 'A page (/holidays) or a full https:// link.',
      initialValue: '/holidays',
    }),
    defineField({
      name: 'logos',
      title: 'Partner logos (slider)',
      type: 'array',
      group: 'logos',
      description: 'Drag & drop several images at once. Drag the rows to change the order.',
      of: [
        {
          type: 'image',
          options: {hotspot: false},
          fields: [
            defineField({
              name: 'name',
              title: 'Brand name (used as alt text)',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (r) => r.min(4).warning('Add at least 4 logos for a smooth slider'),
    }),
    // ---------- About Us intro (between the logo slider and the statistics) ----------
    defineField({
      name: 'aboutEyebrow',
      title: 'Small label',
      type: 'string',
      group: 'about',
      initialValue: 'Welcome to Alfa Holidays',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'about',
      description: 'Press Enter to start a new line.',
      initialValue: 'Your Trusted Travel\nPartner Since 1990',
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'Paragraphs',
      type: 'array',
      group: 'about',
      of: [{type: 'text', rows: 4}],
      description: 'Two short paragraphs work best. Drag to reorder.',
      initialValue: [
        'Founded in 1990 by Ali in Saudi Arabia, Alfa Holidays began with a strong commitment to reliable visa processing, immigration support and essential travel documentation. Over the decades, we have built a legacy of trust and excellence in the travel and visa industry.',
        'Expanding our footprint to India, we have grown into a comprehensive travel partner offering seamless flight bookings, ticketing and curated holiday packages. Whether you’re planning a family vacation or need professional visa assistance, we make every journey simple, smooth and memorable.',
      ],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'aboutButtonText',
      title: 'Button text',
      type: 'string',
      group: 'about',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'aboutButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'about',
      description: 'A page (/about-us) or a full https:// link.',
      initialValue: '/about-us',
    }),
    defineField({
      name: 'aboutImage',
      title: 'Image',
      type: 'image',
      group: 'about',
      description:
        'One finished picture (about 1464 × 1075, white background). Any frames, brush strokes or decorations should already be part of the image: it is shown exactly as uploaded, without cropping.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),

    defineField({
      name: 'featureItems',
      title: 'Feature list (below the About intro)',
      type: 'array',
      group: 'about',
      description: 'Up to 4 short highlights, shown side by side with an icon. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Airplane', value: 'plane'},
                  {title: 'Shield (safety)', value: 'shield'},
                  {title: 'Headset (support)', value: 'headset'},
                  {title: 'Location pin', value: 'pin'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'plane',
            }),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Short text', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
      initialValue: [
        {_type: 'featureItem', icon: 'plane', title: 'Best Price Guarantee', description: 'Get the best deals for your dream trips.'},
        {_type: 'featureItem', icon: 'shield', title: 'Safe & Secure', description: 'Your safety is our top priority.'},
        {_type: 'featureItem', icon: 'headset', title: '24/7 Support', description: 'We’re always here to help you.'},
        {_type: 'featureItem', icon: 'pin', title: 'Expert Guides', description: 'Local experts for a richer experience.'},
      ],
      validation: (r) => r.max(4),
    }),

    defineField({
      name: 'landscapeEyebrow',
      title: 'Small label above the heading',
      type: 'string',
      group: 'packages',
      initialValue: 'Explore our exclusive',
    }),
    defineField({
      name: 'landscapeHeading',
      title: 'Section heading',
      type: 'string',
      group: 'packages',
      initialValue: 'Holiday Packages',
    }),
    defineField({
      name: 'landscapeDescription',
      title: 'Section description',
      type: 'text',
      rows: 3,
      group: 'packages',
      description: 'Short paragraph shown under the heading, on the left of the cards.',
      initialValue:
        'From global adventures to romantic getaways, discover handpicked travel experiences crafted just for you by Alfa Holidays.',
    }),
    defineField({
      name: 'landscapeButtonText',
      title: 'Button text',
      type: 'string',
      group: 'packages',
      initialValue: 'View All Packages',
    }),
    defineField({
      name: 'landscapeButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'packages',
      description: 'A page (/holidays) or a full https:// link.',
      initialValue: '/holidays',
    }),
    defineField({
      name: 'landscapeCards',
      title: 'Cards',
      type: 'array',
      group: 'packages',
      description:
        'Holiday package cards shown in a slider (3 at a time on desktop, 2 on tablets, 1 on phones, with arrows and a counter). Add as many as you need and drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'landscapeCard',
          title: 'Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Background image',
              type: 'image',
              options: {hotspot: true},
              description: 'Portrait image works best (3:4). Use the hotspot to choose the focus area.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
              description: 'Where the card goes: a page (/holidays) or a full https:// link. Empty = /holidays.',
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
        },
      ],
      validation: (r) => r.min(1).max(12),
    }),
    defineField({
      name: 'holidaysHeading',
      title: 'Section heading',
      type: 'string',
      group: 'holidays',
      description: 'Centered, with a line on each side.',
      initialValue: 'Services',
    }),
    defineField({
      name: 'holidaysDescription',
      title: 'Tagline under the heading',
      type: 'string',
      group: 'holidays',
      initialValue: 'Plan. Book. Travel. with Ease.',
    }),
    defineField({
      name: 'holidaysItems',
      title: 'Service cards',
      type: 'array',
      group: 'holidays',
      description:
        'Shown as a grid of cards (5 in the first row, then 4): icon, title and a short description. Pick a built-in icon or upload your own icon. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'holidayItem',
          title: 'Holiday',
          fields: [
            defineField({
              name: 'title',
              title: 'Service name',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short description',
              type: 'text',
              rows: 3,
              description: 'One or two short lines shown under the title (about 60-110 characters).',
              validation: (r) => r.max(160).warning('Keep it short so the cards stay even.'),
            }),
            defineField({
              name: 'icon',
              title: 'Built-in icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Luggage (tour packages)', value: 'luggage'},
                  {title: 'Plane (flights)', value: 'plane'},
                  {title: 'Ticket (flight & train tickets)', value: 'ticket'},
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
                layout: 'dropdown',
              },
              initialValue: 'globe',
            }),
            defineField({
              name: 'iconFile',
              title: 'Your own icon (optional)',
              type: 'file',
              options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'},
              description: 'SVG or PNG. If uploaded, it replaces the built-in icon.',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description:
                'Page path on this site (e.g. /our-services/kerala-backwaters) or a full https:// URL.',
              validation: (r) =>
                r.custom(
                  (v) =>
                    !v ||
                    /^(\/|https?:\/\/)/.test(v) ||
                    'Start with / for a page on this site, or https:// for an external link',
                ),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
      initialValue: [
        {
          _type: 'holidayItem',
          title: 'Tour Packages (Domestic & International)',
          icon: 'luggage',
          link: '/holidays',
          description:
            'Kerala and beyond! From honeymoon and family tours to international destinations (Dubai, Saudi, Singapore etc.).',
        },
        {
          _type: 'holidayItem',
          title: 'Flight & Train Ticket Booking',
          icon: 'plane',
          link: '/our-services',
          description:
            'Domestic & international flight tickets and train ticket assistance.',
        },
        {
          _type: 'holidayItem',
          title: 'Bus Ticket Booking',
          icon: 'bus',
          link: '/our-services',
          description:
            'KSRTC, private super fast and luxury sleeper bus tickets.',
        },
        {
          _type: 'holidayItem',
          title: 'Visa Assistance & Processing',
          icon: 'visa',
          link: '/our-services',
          description:
            'Tourist and business visa documentation and application support.',
        },
        {
          _type: 'holidayItem',
          title: 'Passport Services',
          icon: 'passport',
          link: '/our-services',
          description:
            'New passport applications, renewal and verification assistance.',
        },
        {
          _type: 'holidayItem',
          title: 'Hotel & Resort Reservations',
          icon: 'hotel',
          link: '/our-services',
          description:
            'Book top hotels, resorts and homestays.',
        },
        {
          _type: 'holidayItem',
          title: 'Travel Insurance',
          icon: 'insurance',
          link: '/our-services',
          description:
            'Stay protected with reliable travel insurance.',
        },
        {
          _type: 'holidayItem',
          title: 'Cab / Car Rental Services',
          icon: 'car',
          link: '/our-services',
          description:
            'Airport pick-up/drop, sightseeing cars and more.',
        },
        {
          _type: 'holidayItem',
          title: 'Customised Holiday Itineraries',
          icon: 'itinerary',
          link: '/our-services',
          description:
            'Tailor-made travel plans as per your interests and budget.',
        },
      ],
      validation: (r) => r.min(1).max(12),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button text (optional)',
      type: 'string',
      group: 'holidays',
      description: 'Shown centered under the grid. Leave empty for no button.',
    }),
    defineField({
      name: 'holidayButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'holidays',
      initialValue: '/our-services',
    }),
    // ---------- Why Alfa Holidays: full-width media + feature rows ----------
    defineField({
      name: 'whyMediaType',
      title: 'Left side shows',
      type: 'string',
      group: 'why',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video (auto-plays, loops, muted)', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'whyVideoFile',
      title: 'Video file (MP4 or WebM)',
      type: 'file',
      group: 'why',
      options: {accept: 'video/mp4,video/webm'},
      description: 'Keep it short and light (ideally under 10 MB, no audio needed).',
      hidden: ({document}) => document?.whyMediaType !== 'video',
    }),
    defineField({
      name: 'whyVideoUrl',
      title: 'Or video URL',
      type: 'url',
      group: 'why',
      description: 'Direct link to an .mp4 / .webm file. Only used when no video file is uploaded.',
      validation: (r) => r.uri({scheme: ['https']}),
      hidden: ({document}) => document?.whyMediaType !== 'video',
    }),
    defineField({
      name: 'whyImage',
      title: 'Image',
      type: 'image',
      group: 'why',
      options: {hotspot: true},
      description:
        'Shown when "Image" is selected. With a video it is also the poster and the fallback if the video fails.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'whyFeatures',
      title: 'Feature rows (right side)',
      type: 'array',
      group: 'why',
      description: 'Shown one under another on the dark panel. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'whyFeature',
          title: 'Feature',
          fields: [
            defineField({
              name: 'iconFile',
              title: 'Icon (SVG or PNG)',
              type: 'file',
              options: {accept: 'image/svg+xml,image/png,image/jpeg,image/webp'},
              description: 'If left empty, the default icon for this position is used.',
            }),
            defineField({
              name: 'title',
              title: 'Title (white line)',
              type: 'string',
              description: 'e.g. Continuous',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'highlight',
              title: 'Title (blue line)',
              type: 'string',
              description: 'e.g. Intelligence',
            }),
            defineField({
              name: 'description',
              title: 'Description (optional)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'highlight'}},
        },
      ],
      validation: (r) => r.min(1).max(5),
    }),
    // ---------- Client Speak: testimonials slider ----------
    defineField({
      name: 'testimonialsHeading',
      title: 'Section heading',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Client Speak',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Section subtitle',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Testimonials from our clients.',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      description: 'Shown one at a time in the dark slider card. Drag to reorder.',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              description: 'Type the quote without quotation marks – they are added automatically.',
              validation: (r) => [
                r.required(),
                r.max(400).warning('Keep it under about 400 characters so the card stays compact'),
              ],
            }),
            defineField({
              name: 'position',
              title: 'Author position / designation',
              type: 'string',
              description: 'e.g. Head of Legal',
            }),
            defineField({
              name: 'company',
              title: 'Company / organisation',
              type: 'string',
              description: 'Shown in blue capitals, e.g. International Cricket Council',
              validation: (r) => r.required(),
            }),
          ],
          preview: {select: {title: 'company', subtitle: 'quote'}},
        },
      ],
      validation: (r) => r.min(1).max(10),
    }),
    // ---------- Newsletter: "Subscribe to our newsletter" banner ----------
    defineField({
      name: 'newsletterHeading',
      title: 'Heading',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Subscribe to our newsletter',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'newsletterSubtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'newsletter',
      initialValue:
        'for the latest destination guides, travel tips and holiday ideas from Alfa Holidays.',
    }),
    defineField({
      name: 'newsletterBackgroundType',
      title: 'Background type',
      type: 'string',
      group: 'newsletter',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video (auto-plays, loops, muted)', value: 'video'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'newsletterBackgroundImage',
      title: 'Background image',
      type: 'image',
      group: 'newsletter',
      options: {hotspot: true},
      description:
        'Used when "Image" is selected. With a video it is also the poster and the fallback if the video fails to load.',
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'newsletterBackgroundVideoFile',
      title: 'Background video file (MP4 or WebM)',
      type: 'file',
      group: 'newsletter',
      options: {accept: 'video/mp4,video/webm'},
      description: 'Keep it short and light (ideally under 10 MB, no audio needed).',
      hidden: ({document}) => document?.newsletterBackgroundType !== 'video',
    }),
    defineField({
      name: 'newsletterBackgroundVideoUrl',
      title: 'Or background video URL',
      type: 'url',
      group: 'newsletter',
      description: 'Direct https link to an .mp4 / .webm file. Only used when no video file is uploaded.',
      validation: (r) => r.uri({scheme: ['https']}),
      hidden: ({document}) => document?.newsletterBackgroundType !== 'video',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Home Page'})},
})