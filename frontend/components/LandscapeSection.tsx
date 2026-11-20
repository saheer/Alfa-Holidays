"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Card = {
  _key: string;
  title: string;
  description: string;
  image: string;
  link?: string | null;
  hotspot?: { x: number; y: number } | null;
};

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  cards?: Card[] | null;
};

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {dir === "prev" ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

// Holiday-package slider: native scroll-snap track (swipe on touch, drag/scroll on desktop),
// plus arrow buttons and a "01 / 05" counter with a thin progress line. The controls sit on the
// plain white section background: no boxes, fills or gradients behind them.
// Shows 1 card on phones, 2 on tablets and 3 on desktop.
export default function LandscapeSection({
  eyebrow,
  heading,
  description,
  buttonText,
  buttonLink,
  cards,
}: Props) {
  const items = (cards ?? []).filter((c) => c?.image && c?.title);

  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0); // first visible card
  const [maxIndex, setMaxIndex] = useState(0); // last position the track can reach

  const geometry = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return null;
    const first = el.children[0] as HTMLElement;
    const step =
      el.children.length > 1
        ? (el.children[1] as HTMLElement).offsetLeft - first.offsetLeft
        : first.offsetWidth;
    const gap = step - first.offsetWidth;
    return { el, step, gap };
  }, []);

  const measure = useCallback(() => {
    const g = geometry();
    if (!g) return;
    const { el, step, gap } = g;
    const perView = Math.max(1, Math.round((el.clientWidth + gap) / step));
    const max = Math.max(0, el.children.length - perView);
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setMaxIndex(max);
    setIndex(atEnd ? max : Math.min(max, Math.round(el.scrollLeft / step)));
  }, [geometry]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [measure, items.length]);

  const go = (dir: 1 | -1) => {
    const g = geometry();
    if (!g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    g.el.scrollBy({ left: dir * g.step, behavior: reduce ? "auto" : "smooth" });
  };

  if (items.length === 0) return null;

  const total = maxIndex + 1;
  const showControls = maxIndex > 0;

  const button = buttonText?.replace(/\s*[→➔➜]+\s*$/u, "").trim();

  return (
    <section
      aria-labelledby="landscape-heading"
      className="py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1338px] items-center gap-10 px-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12 lg:px-12">
        {/* Left: label, heading, text and the "View all" button */}
        <div className="max-w-[460px]">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-cyan">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2
              id="landscape-heading"
              className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-ink lg:text-[3.25rem]"
            >
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-5 text-[15px] leading-[1.75] text-body">
              {description}
            </p>
          )}
          {button && (
            <Link
              href={buttonLink || "/holidays"}
              className="group/cta relative isolate mt-8 inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full border-2 border-brand-cyan bg-white px-7 text-sm font-semibold text-ink shadow-[0_10px_28px_-14px_rgba(4,164,238,0.6)] transition-colors duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-brand-blue before:transition-transform before:duration-300 before:ease-out hover:border-brand-blue hover:text-white hover:before:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan motion-reduce:before:transition-none"
            >
              {button}
              <span
                aria-hidden="true"
                className="text-brand-cyan transition-[color,transform] duration-300 group-hover/cta:translate-x-1 group-hover/cta:text-white"
              >
                →
              </span>
            </Link>
          )}
        </div>

        {/* Right: the slider */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Holiday packages"
          className="min-w-0"
        >
          <div
            ref={trackRef}
            tabIndex={0}
            className="relative flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
          >
            {items.map((card, i) => (
              <Link
                key={card._key}
                href={card.link || "/holidays"}
                aria-roledescription="slide"
                aria-label={`${card.title} (${i + 1} of ${items.length})`}
                className="group relative isolate aspect-[3/4] shrink-0 basis-full snap-start overflow-hidden rounded-2xl bg-brand-navy shadow-[0_14px_30px_-16px_rgba(3,39,75,0.5)] md:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  loading={i < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw"
                  style={
                    card.hotspot
                      ? {
                          objectPosition: `${card.hotspot.x * 100}% ${card.hotspot.y * 100}%`,
                        }
                      : undefined
                  }
                  className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                {/* dark navy fade at the bottom for the text */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-navy via-brand-navy/70 via-35% to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-6">
                  <h3 className="text-lg font-semibold leading-snug lg:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 pr-10 text-[13px] leading-relaxed text-white/80 lg:text-sm">
                    {card.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-200 group-hover:border-brand-cyan group-hover:bg-brand-cyan lg:bottom-6 lg:right-6"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Controls (only when there are more cards than fit): counter, progress, arrows */}
          {showControls && (
            <div className="mt-8 flex items-center gap-6 lg:gap-8">
              <p
                aria-live="polite"
                className="shrink-0 text-sm font-semibold tracking-[0.2em] tabular-nums text-ink"
              >
                <span className="text-brand-blue">{pad(index + 1)}</span>
                <span className="mx-1.5 text-ink/30">/</span>
                <span className="text-ink/50">{pad(total)}</span>
              </p>

              <div
                aria-hidden="true"
                className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-ink/10"
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-brand-cyan transition-[width] duration-300 ease-out motion-reduce:transition-none"
                  style={{ width: `${((index + 1) / total) * 100}%` }}
                />
              </div>

              <div className="flex shrink-0 gap-3">
                {(["prev", "next"] as const).map((dir) => {
                  const disabled = dir === "prev" ? index <= 0 : index >= maxIndex;
                  return (
                    <button
                      key={dir}
                      type="button"
                      onClick={() => go(dir === "prev" ? -1 : 1)}
                      disabled={disabled}
                      aria-label={dir === "prev" ? "Previous packages" : "Next packages"}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 bg-white text-ink transition-colors duration-200 hover:border-brand-cyan hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-ink/25 disabled:hover:text-ink"
                    >
                      <Arrow dir={dir} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
