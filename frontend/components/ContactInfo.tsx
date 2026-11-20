import type { ReactNode } from "react";
import { manrope } from "@/app/fonts";
import {
  DEFAULT_ADDRESS,
  DEFAULT_BOOKING_EMAIL,
  DEFAULT_GENERAL_EMAIL,
  DEFAULT_PHONE,
  DEFAULT_WHATSAPP,
  telHref,
  whatsappHref,
} from "@/lib/enquiry";

type Props = {
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  generalEmail?: string | null;
  bookingEmail?: string | null;
};

const linkCls = `${manrope.className} text-[17px] font-medium text-brand-blue transition-colors hover:text-[#123a85] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue`;
const labelCls = "text-xs uppercase tracking-[0.18em] text-[#4A6283]";

// Minimalist line icons (24px grid, 1.6 stroke)
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "h-[22px] w-[22px]",
} as const;

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5.9 5.9l1.3-2 4 1.6V19a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3.5 20.5 5 16A8.5 8.5 0 1 1 8 19l-4.5 1.5Z" />
      <path d="M9.2 8.6c.3-.6.7-.6 1-.6.2 0 .4.4.6 1 .1.4-.4.8-.5 1 .5 1 1.3 1.8 2.4 2.3.2-.2.6-.7 1-.6.5.2.9.4 1 .6 0 .4-.1 1-.7 1.3-.6.3-1.5.2-2.7-.4a7.4 7.4 0 0 1-3.2-3.2c-.5-1-.5-1.7-.4-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  );
}

function Row({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wash/60 text-brand-blue">
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <p className={labelCls}>{title}</p>
        <div className="mt-1.5 space-y-1.5">{children}</div>
      </div>
    </li>
  );
}

// A number that is a real link once it has enough digits, plain text until then
function Value({ href, children, external }: { href: string | null; children: string; external?: boolean }) {
  if (!href) return <p className={`${manrope.className} text-[17px] font-medium text-[#0B1F44]`}>{children}</p>;
  return (
    <a
      href={href}
      className={linkCls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

// Order: address, phone, WhatsApp, emails
export default function ContactInfo({
  address,
  phone,
  whatsapp,
  generalEmail,
  bookingEmail,
}: Props) {
  const phoneText = phone || DEFAULT_PHONE;
  const whatsappText = whatsapp || DEFAULT_WHATSAPP;
  const emails = [
    { label: "General enquiries", email: generalEmail || DEFAULT_GENERAL_EMAIL },
    { label: "Bookings", email: bookingEmail || DEFAULT_BOOKING_EMAIL },
  ];

  return (
    <ul className="space-y-7">
      <Row icon={<PinIcon />} title="Our Office">
        <address
          className={`${manrope.className} whitespace-pre-line text-[17px] font-medium not-italic leading-[1.5] text-[#0B1F44]`}
        >
          {address || DEFAULT_ADDRESS}
        </address>
      </Row>

      <Row icon={<PhoneIcon />} title="Phone">
        <Value href={telHref(phoneText)}>{phoneText}</Value>
      </Row>

      <Row icon={<WhatsAppIcon />} title="WhatsApp">
        <Value href={whatsappHref(whatsappText)} external>
          {whatsappText}
        </Value>
      </Row>

      <Row icon={<MailIcon />} title="Email">
        {emails.map((item) => (
          <p key={item.label}>
            <span className="block text-[13px] text-[#4A6283]">{item.label}</span>
            <a href={`mailto:${item.email}`} className={linkCls}>
              {item.email}
            </a>
          </p>
        ))}
      </Row>
    </ul>
  );
}
