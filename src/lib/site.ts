import { LOCALES, type Locale } from "./i18n/config";

/**
 * Absolute origin of the production site, without a trailing slash. Every
 * canonical, hreflang, Open Graph and sitemap URL is built from it, so an
 * unset value in production would point all of them at localhost.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

if (
  !process.env.NEXT_PUBLIC_SITE_URL &&
  process.env.NODE_ENV === "production"
) {
  console.warn(
    "[seo] NEXT_PUBLIC_SITE_URL is not set — canonical, hreflang, Open Graph and sitemap URLs will point at http://localhost:3000.",
  );
}

export const SITE_NAME = "Nexgen";

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
};

export function localeUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}`;
}

/** hreflang map shared by page metadata and the sitemap. */
export function languageAlternates(): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l)])),
    // "/" negotiates the language, so it is the x-default entry point.
    "x-default": SITE_URL,
  };
}
