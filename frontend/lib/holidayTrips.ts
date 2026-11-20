// Entries of the "Holidays" page document (Studio > Holidays > Holiday entries)
export type HolidayTrip = {
  _key: string;
  title: string;
  location?: string | null;
  category?: string | null;
  description?: string | null;
  link?: string | null;
  image: string;
  imageAlt?: string | null;
  hotspot?: { x: number; y: number } | null;
};

export const ALL = "All";

export const usableTrips = (trips?: HolidayTrip[] | null) =>
  (trips ?? []).filter((t) => t?.title && t?.image);

// Filter pills come from the categories typed on the entries (first appearance order)
export const categoriesOf = (trips: HolidayTrip[]) => [
  ...new Set(
    trips.map((t) => t.category?.trim()).filter((c): c is string => !!c),
  ),
];

export const byCategory = (trips: HolidayTrip[], active: string) =>
  active === ALL
    ? trips
    : trips.filter((t) => t.category?.trim() === active);
