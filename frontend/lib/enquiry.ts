// Shared between components/ContactForm.tsx (client) and app/actions/enquiry.ts (server).

// Options of the "Type of Enquiry" dropdown. To add a category, add a line here: the form,
// the server validation and the email routing all read this list.
//   route: "booking" -> emailed to the bookings address, "general" -> to the general address
export const ENQUIRY_TYPES = [
  { value: "international-holidays", label: "International Holidays", route: "booking" },
  { value: "domestic-getaways", label: "Domestic Getaways (Kerala & India)", route: "booking" },
  { value: "honeymoon-packages", label: "Honeymoon Packages", route: "booking" },
  { value: "flights-visa", label: "Flight Bookings & Visa Assistance", route: "booking" },
  { value: "general-enquiry", label: "General Enquiry", route: "general" },
] as const;

export type EnquiryValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

export type EnquiryField = keyof EnquiryValues | "captcha";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<EnquiryField, string>>;
  // Sent back so the form keeps what the visitor typed after an error
  values: EnquiryValues;
};

export const EMPTY_VALUES: EnquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  type: "", // nothing chosen yet: the dropdown shows its placeholder
  message: "",
};

export const INITIAL_ENQUIRY_STATE: EnquiryState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_VALUES,
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  message: 5000,
} as const;

// Shown until the fields are filled in Sanity
export const DEFAULT_CONTACT_HEADING = "Have an Enquiry?";
export const DEFAULT_CONTACT_DESCRIPTION =
  "Would you like to learn more about our holidays or plan a custom trip? Please fill in the form and we will get back to you shortly.";
export const DEFAULT_GENERAL_EMAIL = "hello@alfaholidays.com";
export const DEFAULT_BOOKING_EMAIL = "bookings@alfaholidays.com";
// Placeholders until the real details are entered in Sanity (Contact Us). A number without
// enough digits is shown as plain text, not as a tel: / WhatsApp link.
export const DEFAULT_ADDRESS = "Alfa Holidays\nPuthentheru, Kerala, India";
export const DEFAULT_PHONE = "+91 XXXXX XXXXX";
export const DEFAULT_WHATSAPP = "+91 XXXXX XXXXX";

/** Digits only (with the country code), or null if it is not a usable number yet. */
export function dialDigits(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export function telHref(value: string): string | null {
  const digits = dialDigits(value);
  return digits ? `tel:+${digits}` : null;
}

export function whatsappHref(value: string): string | null {
  const digits = dialDigits(value);
  if (!digits) return null;
  const text = encodeURIComponent(
    "Hello Alfa Holidays, I would like to enquire about a holiday.",
  );
  return `https://wa.me/${digits}?text=${text}`;
}