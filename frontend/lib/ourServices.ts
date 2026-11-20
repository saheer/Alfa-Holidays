// Types + fallback content for the /our-services page sections below the hero.
// The fallback is shown until the "Services Page" document is filled in Sanity Studio.

export type ServiceCardItem = {
  _key?: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null; // key of a built-in icon (see ServiceCardIcon)
  iconImage?: string | null; // uploaded icon/illustration; replaces the built-in one
  link?: string | null;
};

export type ServiceCategory = {
  _key?: string;
  heading?: string | null;
  subtitle?: string | null;
  items?: ServiceCardItem[] | null;
};

export const DEFAULT_INTRO = {
  heading: "Services",
  description:
    "From dream destinations to seamless travel experiences, we are here to make your journeys easier, safer and more memorable.",
  image: "/our-services-intro.png",
  imageWidth: 659,
  imageHeight: 440,
};

export const DEFAULT_CATEGORIES: ServiceCategory[] = [
  {
    heading: "Travel & Booking Services",
    subtitle: "Plan. Book. Travel. with Ease.",
    items: [
      {
        icon: "luggage",
        title: "Tour Packages (Domestic & International)",
        description:
          "Kerala and beyond! From honeymoon and family tours to international destinations (Dubai, Saudi, Singapore etc.).",
      },
      {
        icon: "plane",
        title: "Flight & Train Ticket Booking",
        description: "Domestic & international flight tickets and train ticket assistance.",
      },
      {
        icon: "bus",
        title: "Bus Ticket Booking",
        description: "KSRTC, private super fast and luxury sleeper bus tickets.",
      },
      {
        icon: "visa",
        title: "Visa Assistance & Processing",
        description: "Tourist and business visa documentation and application support.",
      },
      {
        icon: "passport",
        title: "Passport Services",
        description: "New passport applications, renewal and verification assistance.",
      },
    ],
  },
  {
    heading: "Stay & Travel Assistance",
    subtitle: "Travel Better. Feel Secure.",
    items: [
      {
        icon: "hotel",
        title: "Hotel & Resort Reservations",
        description: "Book top hotels, resorts and homestays.",
      },
      {
        icon: "insurance",
        title: "Travel Insurance",
        description: "Stay protected with reliable travel insurance.",
      },
      {
        icon: "car",
        title: "Cab / Car Rental Services",
        description: "Airport pick-up/drop, sightseeing cars and more.",
      },
      {
        icon: "itinerary",
        title: "Customized Holiday Itineraries",
        description: "Tailor-made travel plans as per your interests and budget.",
      },
    ],
  },
];
