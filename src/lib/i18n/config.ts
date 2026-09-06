export const LOCALES = ["en", "id"] as const;

export type Locale = (typeof LOCALES)[number];

/** Everyone who is not detected as Indonesian gets English. */
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

/** One year — a manual choice should outlive the session. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** ISO-3166 alpha-2 country → locale. Anything unlisted falls back. */
export const COUNTRY_LOCALE: Record<string, Locale> = {
  ID: "id",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/** Short form for the switcher button. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  id: "ID",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
