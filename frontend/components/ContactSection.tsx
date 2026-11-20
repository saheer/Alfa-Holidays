import { manrope } from "@/app/fonts";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import {
  DEFAULT_CONTACT_DESCRIPTION,
  DEFAULT_CONTACT_HEADING,
} from "@/lib/enquiry";

type Props = {
  heading?: string | null;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  generalEmail?: string | null;
  bookingEmail?: string | null;
};

export default function ContactSection({
  heading,
  description,
  address,
  phone,
  whatsapp,
  generalEmail,
  bookingEmail,
}: Props) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-mist py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1338px] items-start gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-14 lg:px-12">
        {/* Left: heading, description, contact details */}
        <div className="lg:max-w-[485px]">
          <h2
            id="contact-heading"
            className={`${manrope.className} text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-[#0B1F44] lg:text-[3.5rem]`}
          >
            {heading || DEFAULT_CONTACT_HEADING}
          </h2>
          <p className="mt-6 text-base leading-[1.65] text-[#4A6283]">
            {description || DEFAULT_CONTACT_DESCRIPTION}
          </p>
          <hr className="my-9 border-[#D9E4F0]" />
          <ContactInfo
            address={address}
            phone={phone}
            whatsapp={whatsapp}
            generalEmail={generalEmail}
            bookingEmail={bookingEmail}
          />
        </div>

        {/* Right: the form card */}
        <ContactForm />
      </div>
    </section>
  );
}
