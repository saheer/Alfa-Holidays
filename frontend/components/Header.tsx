import HeaderClient from "./HeaderClient";
import { getHeaderSettings } from "@/sanity/lib/getHeaderSettings";

// tone="light": for pages whose top is light (the Home hero): dark text + blue logo, no dark
// tint. The default keeps the transparent bar with white text over the dark page banners.
// The "Plan Your Trip" button text / link come from Studio > Header.
export default async function Header({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const settings = await getHeaderSettings();
  return (
    <HeaderClient
      tone={tone}
      ctaText={settings?.ctaText ?? "Plan Your Trip"}
      ctaLink={settings?.ctaLink ?? "/contact-us"}
      showCta={settings?.showCta ?? true}
    />
  );
}
