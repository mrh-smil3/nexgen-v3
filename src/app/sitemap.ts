import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/config";
import { languageAlternates, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();
  const lastModified = new Date();

  return LOCALES.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
