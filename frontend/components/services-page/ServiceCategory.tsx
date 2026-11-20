import Link from "next/link";
import type { CSSProperties } from "react";
import { manrope } from "@/app/fonts";
import type { ServiceCardItem, ServiceCategory } from "@/lib/ourServices";
import ServiceCardIcon from "./ServiceCardIcon";

const cardCls =
  "group flex h-full flex-col items-center rounded-2xl border border-[#E3ECF7] bg-white px-5 pb-7 pt-6 text-center shadow-[0_8px_24px_-12px_rgba(0,32,96,0.18)] transition duration-300";
const linkCls =
  "hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(0,32,96,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan";

function Card({ item }: { item: ServiceCardItem }) {
  const body = (
    <>
      <ServiceCardIcon icon={item.icon} image={item.iconImage} />
      <h3
        className={`${manrope.className} mt-4 text-[17px] font-bold leading-[1.3] text-ink`}
      >
        {item.title}
      </h3>
      {item.description && (
        <p className="mt-3 text-[14px] leading-[1.65] text-[#2D4970]">{item.description}</p>
      )}
    </>
  );

  const href = item.link?.trim();
  if (!href) return <div className={cardCls}>{body}</div>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={`${cardCls} ${linkCls}`}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cardCls} ${linkCls}`}>
      {body}
    </a>
  );
}

// One category: centred title between two cyan rules, a subtitle, then a card grid that
// adapts to the number of cards (2 columns on phones, up to 5 on desktop).
export default function ServiceCategorySection({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const items = (category.items ?? []).filter((i) => i?.title?.trim());
  if (items.length === 0) return null;
  const cols = Math.min(Math.max(items.length, 1), 5);
  const headingId = `service-category-${index}`;

  return (
    <section aria-labelledby={headingId} className="relative bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-[1338px] px-6 lg:px-12">
        <header className="text-center">
          <div className="flex items-center justify-center gap-4 lg:gap-6">
            <span aria-hidden className="hidden h-px w-16 bg-brand-cyan sm:block lg:w-28" />
            <h2
              id={headingId}
              className={`${manrope.className} text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.5rem]`}
            >
              {category.heading}
            </h2>
            <span aria-hidden className="hidden h-px w-16 bg-brand-cyan sm:block lg:w-28" />
          </div>
          {category.subtitle && (
            <p className="mt-2 text-base text-[#2D4970] lg:text-xl">{category.subtitle}</p>
          )}
        </header>

        <ul
          style={{ "--cols": cols } as CSSProperties}
          className="mx-auto mt-8 grid grid-cols-2 gap-4 lg:mt-10 lg:max-w-none lg:gap-5 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        >
          {items.map((item, i) => (
            <li key={item._key ?? i} className="min-w-0 max-sm:col-span-2 sm:col-span-1">
              <Card item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
