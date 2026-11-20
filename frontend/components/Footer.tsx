import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getFooter } from "@/sanity/lib/getFooter";

type LinkItem = { label?: string | null; url?: string | null };
type SocialItem = LinkItem & { platform?: string | null };
type Item = { label: string; url: string };

// Shown until the "Footer" document is published in Sanity (each list falls back separately)
const DEFAULTS = {
  description:
    "Alfa Holidays, Puthentheru, Kerala — Thoughtfully planned journeys. Memorable holidays.",
  social: [
    {
      platform: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/alfatravelcare/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/alfa_holidays/",
    },
  ] as SocialItem[],
  indexTitle: "Index",
  index: [
    { label: "About Us", url: "/about-us" },
    { label: "Services", url: "/our-services" },
    { label: "Instagram Feed", url: "/instagram-feed" },
    { label: "Holidays", url: "/holidays" },
    { label: "Travel Guide", url: "/travel-guide" },
    { label: "Contact Us", url: "/contact-us" },
  ] as Item[],
  holidaysTitle: "Holidays",
  holidays: [
    { label: "Backwater Cruises", url: "/our-services" },
    { label: "Hill Stations", url: "/our-services" },
    { label: "DESTINATION GUIDE", url: "/our-services" },
    { label: "Wildlife & Nature", url: "/our-services" },
  ] as Item[],
  copyright: "© 2026 Alfa Holidays. All rights reserved.",
  legal: [
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms & Conditions", url: "/terms-and-conditions" },
  ] as Item[],
};

// Only these two channels are used on the site. Anything else saved in Sanity (e.g. an old
// LinkedIn entry) is ignored until it is removed in Studio.
const SOCIAL_PLATFORMS = ["facebook", "instagram"];

// Glyph shown in the white square of each social button
const SOCIAL_ICON: Record<string, ReactNode> = {
  facebook: (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-3.5 w-3.5"
    >
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" />
    </svg>
  ),
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
      className="h-3.5 w-3.5"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </svg>
  ),
};

// Drops half-filled items; uses the default list when nothing usable is left
function items<T extends LinkItem>(
  list: T[] | null | undefined,
  fallback: T[],
) {
  const clean = (list ?? []).filter((i) => i?.label?.trim() && i?.url?.trim());
  return (clean.length > 0 ? clean : fallback) as (T & Item)[];
}

// Internal paths use next/link; http(s) links open in a new tab
function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^https?:/i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  if (/^(mailto:|tel:)/i.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const linkCls =
  "text-[16px] leading-6 text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400";
const headingCls =
  "text-sm font-semibold uppercase tracking-[0.2em] text-brand-cyan";

export default async function Footer() {
  const data = (await getFooter()) ?? {};

  const savedSocial = (data.socialLinks ?? []).filter((s: SocialItem) =>
    SOCIAL_PLATFORMS.includes(s?.platform ?? ""),
  );
  const social = items<SocialItem>(savedSocial, DEFAULTS.social);
  const indexLinks = items<LinkItem>(data.indexLinks, DEFAULTS.index);
  const holidayLinks = items<LinkItem>(data.holidayLinks, DEFAULTS.holidays);
  const legalLinks = items<LinkItem>(data.legalLinks, DEFAULTS.legal);

  return (
    <footer className="mt-auto bg-brand-navy text-white">
      <div className="mx-auto max-w-[1338px] px-6 pb-10 pt-14 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.53fr)_minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-0">
          {/* Brand: logo, description, social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Alfa Holidays – Home">
              <Image
                src={data.logo || "/Alfa_Logo.svg"}
                alt={data.logoAlt || "Alfa Holidays"}
                width={468}
                height={217}
                className="h-auto w-[130px]"
              />
            </Link>
            <p className="mt-6 max-w-[340px] text-[15px] leading-[1.5] text-white/70">
              {data.description || DEFAULTS.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {social.map((s) => (
                <FooterLink
                  key={`${s.platform}-${s.url}`}
                  href={s.url}
                  className="inline-flex h-[38px] items-center gap-2.5 rounded-full border border-white/20 pl-[1.05rem] pr-5 text-[15px] font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                  <span
                    aria-hidden
                    className="flex h-5 min-w-5 items-center justify-center rounded-[5px] bg-white px-1 text-[11px] font-extrabold leading-none text-brand-navy"
                  >
                    {SOCIAL_ICON[s.platform ?? ""]}
                  </span>
                  {s.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Index */}
          <nav aria-labelledby="footer-index-heading">
            <h2 id="footer-index-heading" className={headingCls}>
              {data.indexTitle || DEFAULTS.indexTitle}
            </h2>
            <ul className="mt-[1.65rem] space-y-3">
              {indexLinks.map((l) => (
                <li key={`${l.label}-${l.url}`}>
                  <FooterLink href={l.url} className={linkCls}>
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Holidays */}
          <nav aria-labelledby="footer-holidays-heading">
            <h2 id="footer-holidays-heading" className={headingCls}>
              {data.holidaysTitle || DEFAULTS.holidaysTitle}
            </h2>
            <ul className="mt-[1.65rem] space-y-3">
              {holidayLinks.map((l) => (
                <li key={`${l.label}-${l.url}`}>
                  <FooterLink href={l.url} className={linkCls}>
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="text-[15px] text-white/55">
            {data.copyright || DEFAULTS.copyright}
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalLinks.map((l) => (
              <li key={`${l.label}-${l.url}`}>
                <FooterLink
                  href={l.url}
                  className="text-[15px] text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                  {l.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
