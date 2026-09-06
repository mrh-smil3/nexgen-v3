"use client";

import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_LABEL,
  LOCALE_SHORT,
  type Locale,
} from "@/lib/i18n/config";

export default function LanguageSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  function choose(next: Locale) {
    if (next === locale) return;

    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;

    // Read the address bar rather than usePathname(): at "/" the middleware
    // rewrites internally, so the router's idea of the path and the visitor's
    // URL are not the same thing. On "/" the cookie we just set decides, so a
    // reload suffices and the URL stays clean; on the explicit /en and /id
    // URLs the path itself decides, so navigate.
    const path = window.location.pathname;
    if (path === "/" || path === "") {
      window.location.reload();
    } else {
      window.location.assign(`/${next}`);
    }
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border border-line p-0.5 ${className}`}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => choose(code)}
            aria-pressed={active}
            title={LOCALE_LABEL[code]}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors ${
              active
                ? "bg-signal/15 text-signal"
                : "text-fg-dim hover:text-fg-muted"
            }`}
          >
            {LOCALE_SHORT[code]}
          </button>
        );
      })}
    </div>
  );
}
