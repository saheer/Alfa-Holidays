"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/our-services" },
  { label: "Instagram Feed", href: "/instagram-feed" },
  { label: "Holidays", href: "/holidays" },
  { label: "Travel Guide", href: "/travel-guide" },
  { label: "Contact Us", href: "/contact-us" },
];

const LOGO_WHITE = "/Alfa_Logo.svg";
const LOGO_BLUE = "/Alfa_Logo-blue.svg";

// The sticky bar appears after SHOW_AT and hides again at HIDE_AT (hysteresis).
const SHOW_AT = 120;
const HIDE_AT = 100;

type Variant = "top" | "sticky";

const linkCls =
  "flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

type Cta = { text: string; link: string; show: boolean };

type BarProps = {
  variant: Variant;
  light: boolean; // light surface behind the bar: dark text, blue logo, light mobile menu
  cta: Cta;
  open: boolean; // mobile menu
  onToggle: () => void;
  onNavigate: () => void;
};

// One bar (logo + nav + mobile menu), rendered once per layer
function HeaderBar({ variant, light, cta, open, onToggle, onNavigate }: BarProps) {
  const menuId = `mobile-menu-${variant}`;

  return (
    <>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-4 py-4 lg:px-8">
        <Link
          href="/"
          aria-label="Alfa Holidays – Home"
          className="block shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {/* Eager (not `priority`): no <link rel="preload">, so the hidden blue logo
              isn't preloaded on every page. Both logos are tiny local SVGs. */}
          <Image
            src={light ? LOGO_BLUE : LOGO_WHITE}
            alt="Alfa Holidays"
            width={130}
            height={60}
            loading="eager"
            className="h-auto w-[110px] lg:w-[120px] xl:w-[130px]"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-6 text-[15px] lg:flex xl:gap-10 xl:text-[17px]"
        >
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} className={linkCls}>
              {item.label}
            </Link>
          ))}
        </nav>

        {cta.show && cta.text && (
          <Link
            href={cta.link}
            className={`hidden shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan lg:inline-flex ${
              light
                ? "bg-brand-blue text-white hover:bg-brand-navy"
                : "border-2 border-white/90 text-white hover:bg-white hover:text-ink"
            }`}
          >
            {cta.text} <span aria-hidden="true">→</span>
          </Link>
        )}

        <button
          type="button"
          className="-m-2 p-2 lg:hidden"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Toggle menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id={menuId}
          aria-label="Mobile"
          className={`mx-6 mb-4 flex flex-col gap-4 rounded-xl p-6 text-lg lg:hidden ${
            light
              ? "border border-line bg-white text-ink shadow-lg"
              : "bg-slate-950/95 text-white"
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="transition-opacity hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
          {cta.show && cta.text && (
            <Link
              href={cta.link}
              onClick={onNavigate}
              className={`mt-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold ${
                light ? "bg-brand-blue text-white" : "border-2 border-white/90 text-white"
              }`}
            >
              {cta.text} <span aria-hidden="true">→</span>
            </Link>
          )}
        </nav>
      )}
    </>
  );
}

export default function HeaderClient({
  tone = "dark",
  ctaText = "Plan Your Trip",
  ctaLink = "/contact-us",
  showCta = true,
}: {
  tone?: "dark" | "light";
  ctaText?: string;
  ctaLink?: string;
  showCta?: boolean;
}) {
  const lightTop = tone === "light";
  const cta: Cta = { text: ctaText, link: ctaLink, show: showCta };
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const stuckRef = useRef(false);

  // Sticky bar: appears after SHOW_AT, hides at HIDE_AT
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const next = stuckRef.current ? y > HIDE_AT : y > SHOW_AT;
      if (next !== stuckRef.current) {
        stuckRef.current = next;
        setStuck(next);
        setOpen(false); // never leave a menu open on the layer that just left
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const shared = { cta, onToggle: toggle, onNavigate: close };

  return (
    <>
      {/* Layer 1: top of the page, transparent. Dark banners: white text + white logo.
          Light pages (tone="light"): dark text + blue logo. */}
      <header
        data-header
        inert={stuck}
        className={`absolute inset-x-0 top-0 z-40 bg-transparent ${
          lightTop ? "text-ink" : "text-white"
        }`}
      >
        <HeaderBar variant="top" light={lightTop} open={open && !stuck} {...shared} />
      </header>

      {/* Layer 2: sticky white bar + blue logo (hidden = slid up, transparent, no shadow) */}
      <header
        data-header
        inert={!stuck}
        aria-hidden={!stuck}
        className={[
          "fixed inset-x-0 top-0 z-50 border-b bg-white text-ink",
          "transition-[transform,opacity,visibility,box-shadow] duration-300 ease-out will-change-transform motion-reduce:transition-none",
          stuck
            ? "visible translate-y-0 border-line opacity-100 shadow-[0_4px_20px_rgba(11,31,68,0.08)]"
            : "invisible -translate-y-full border-transparent opacity-0 shadow-none",
        ].join(" ")}
      >
        <HeaderBar variant="sticky" light open={open && stuck} {...shared} />
      </header>
    </>
  );
}
