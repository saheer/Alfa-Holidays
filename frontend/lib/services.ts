// Shared by the /our-services page and the detail pages.

export type Hotspot = { x: number; y: number } | null | undefined;

export type ServiceMenuItem = {
  _id: string;
  title: string;
  slug: string;
  image?: string | null;
  imageAlt?: string | null;
};

export type ServiceCardData = ServiceMenuItem & {
  shortDescription?: string | null;
  features?: string[] | null;
  hotspot?: Hotspot;
};


// Sanity hotspot -> CSS object-position, so the chosen focal point survives cropping
export function hotspotStyle(h: Hotspot) {
  return h ? { objectPosition: `${h.x * 100}% ${h.y * 100}%` } : undefined;
}