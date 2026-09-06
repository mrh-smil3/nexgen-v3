import {
  COUNTRY_LOCALE,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Locale,
  isLocale,
} from "./config";

/**
 * Country headers, in priority order. None of these exist on a plain Node
 * VPS — they appear as soon as something upstream sets them:
 *
 *   cf-ipcountry            Cloudflare proxy (orange cloud), free
 *   x-vercel-ip-country     Vercel
 *   x-nf-geo                Netlify (JSON blob)
 *   x-country-code          convention for your own nginx/GeoIP module
 *
 * With nginx + libmaxminddb this is one line in the server block:
 *   proxy_set_header X-Country-Code $geoip2_data_country_code;
 *
 * Until one of them is present we fall back to Accept-Language, which is a
 * proxy for country rather than a measurement of it — good enough to pick a
 * default that the visitor can override, and it costs no request latency.
 */
const COUNTRY_HEADERS = [
  "cf-ipcountry",
  "x-vercel-ip-country",
  "x-country-code",
] as const;

type HeaderSource = { get(name: string): string | null };

export function countryFromHeaders(headers: HeaderSource): string | null {
  for (const name of COUNTRY_HEADERS) {
    const value = headers.get(name)?.trim().toUpperCase();
    // Cloudflare sends "XX" for anonymised/unknown clients.
    if (value && value.length === 2 && value !== "XX") return value;
  }

  const netlify = headers.get("x-nf-geo");
  if (netlify) {
    try {
      const parsed = JSON.parse(netlify) as { country?: { code?: string } };
      const code = parsed.country?.code?.toUpperCase();
      if (code && code.length === 2) return code;
    } catch {
      // Malformed header — fall through to the language check.
    }
  }

  return null;
}

/**
 * `id` anywhere in Accept-Language means the visitor asked for Indonesian.
 * Guard against matching the "id" inside unrelated subtags.
 */
export function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const wanted = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const tag of wanted) {
    const primary = tag.split("-")[0];
    if (primary === "id" || primary === "in") return "id"; // "in" is the legacy code
    if (primary === "en") return "en";
  }

  return null;
}

/**
 * Resolution order: explicit choice → country of the IP → language preference
 * → default. A cookie always wins, so switching the language sticks even for a
 * visitor whose IP says otherwise.
 */
export function resolveLocale(
  headers: HeaderSource,
  cookieValue?: string | null,
): { locale: Locale; source: "cookie" | "country" | "language" | "default" } {
  if (isLocale(cookieValue)) return { locale: cookieValue, source: "cookie" };

  const country = countryFromHeaders(headers);
  if (country && COUNTRY_LOCALE[country]) {
    return { locale: COUNTRY_LOCALE[country], source: "country" };
  }
  // A known country that is not Indonesia is a decision, not a miss.
  if (country) return { locale: DEFAULT_LOCALE, source: "country" };

  const byLanguage = localeFromAcceptLanguage(headers.get("accept-language"));
  if (byLanguage) return { locale: byLanguage, source: "language" };

  return { locale: DEFAULT_LOCALE, source: "default" };
}

export { LOCALE_COOKIE };
