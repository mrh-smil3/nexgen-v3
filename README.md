# Nexgen — Operational Intelligence Landing Page

Repositioning landing page built to [`PRD.md`](./PRD.md). Next.js 15 (App Router),
React 19, TypeScript, Tailwind CSS v4.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

## Structure

```
src/
  middleware.ts           locale resolution; rewrites "/" without changing it
  app/
    [locale]/
      layout.tsx          <html lang>, per-locale SEO metadata (PRD §29), JSON-LD
      page.tsx            section composition; generateStaticParams → en, id
    globals.css           design tokens, glass utilities, motion
    api/contact/route.ts  lead intake endpoint
  components/             one file per section + shared primitives
  lib/
    analytics.ts          event shim, names per PRD §28
    series.ts             deterministic chart data for the hero console
    i18n/
      config.ts           locales, cookie name, country → locale map
      geo.ts              country/language detection
      en.ts               source dictionary; its shape defines Dictionary
      id.ts               Indonesian, type-checked against en.ts
```

There is no `app/layout.tsx`: `app/[locale]/layout.tsx` is the root layout, so
`<html lang>` can follow the locale.

## Design system

Dark industrial base (`--color-ink-*`) with hairline structure, a single data
accent (`--color-signal`), and restrained glassmorphism — thin frost, 1px edge,
top light catch — rather than the heavy blurred-card look. Mono is reserved for
labels, codes and figures so numeric content reads as instrumentation.

Everything is theme-token driven in `globals.css`; change the palette there.

## Languages (EN / ID)

English is the default; Indonesian visitors get Indonesian. The visitor's URL
stays `/` — `middleware.ts` **rewrites** (never redirects) to the prerendered
page for the resolved locale, so both languages stay static (`● SSG` in the
build output) and there is no redirect hop.

Resolution order, first match wins (`src/lib/i18n/geo.ts`):

1. `NEXT_LOCALE` cookie — a manual choice always wins, even against the IP.
2. Country header — `cf-ipcountry`, `x-vercel-ip-country`, `x-country-code`,
   or Netlify's `x-nf-geo`. `ID` → Indonesian; any *other* known country →
   English, even if the browser asks for Indonesian.
3. `Accept-Language` — the fallback while no country header exists.
4. English.

`/en` and `/id` remain directly reachable and are what `hreflang` points at, so
each language has a crawlable URL even though `/` serves both.

### Getting real IP geolocation on a VPS

A bare Node server sees no country header, so today step 2 is skipped and
detection falls back to `Accept-Language`. To get true IP-based detection,
have nginx set the header — no application change is needed:

```nginx
# requires nginx built with --with-http_geoip2_module + GeoLite2-Country.mmdb
geoip2 /usr/share/GeoIP/GeoLite2-Country.mmdb {
    $geoip2_country_code country iso_code;
}

location / {
    proxy_set_header X-Country-Code $geoip2_country_code;
    proxy_pass http://127.0.0.1:3000;
}
```

Putting the domain behind Cloudflare's proxy achieves the same thing for free —
`cf-ipcountry` is already in the lookup list.

### Caching behind nginx

`/` returns different content per visitor, so a shared cache must not treat it
as one document. A `Vary: Cookie, Accept-Language` header **cannot** be set
from this app — Next.js owns that header and overwrites both middleware and
`next.config.ts` values (verified; only its RSC values survive). Key the cache
explicitly instead:

```nginx
map $http_cookie $nexgen_locale {
    default "";
    "~*NEXT_LOCALE=(?<loc>en|id)" $loc;
}

proxy_cache_key "$scheme$request_method$host$request_uri:$nexgen_locale:$geoip2_country_code";
```

Without this, whichever language is cached first is served to everyone.

### Adding or editing copy

`src/lib/i18n/en.ts` is the source of truth — its shape *is* the `Dictionary`
type, so a key missing from `id.ts` fails the build. Icons, technology names
and section numbers stay in the components; only prose lives in the dictionary.

Short labels are length-constrained. Several sit in narrow grid columns whose
minimum width is set by their longest word — `mono-label` is uppercase with
`0.16em` tracking, which makes this worse. Re-run the overflow probe below for
**both** locales after editing them.

## Responsive behaviour

Verified for horizontal overflow at 320, 360, 390, 414, 768, 820, 1024, 1280,
1440 and 1920 CSS px. Layout switches:

| Breakpoint | Behaviour |
| --- | --- |
| `< 640` | Everything single column. Sticky bottom CTA, hamburger nav. Diagram boxes use tighter padding and hyphenate long words. |
| `sm` (640) | Two-column cards, trust bar and contact form; footer becomes 2-up. |
| `md` (768) | Sticky mobile CTA retires; capability cards go 2-up. |
| `lg` (1024) | Hero and case study split into their side-by-side columns, nav links appear, the flow rail and the five-step rail lay out horizontally. |
| `xl+` | Content stays centred within `max-w-[1240px]`. |

Two Tailwind/CSS traps this layout hits, both fixed and commented in place:

1. **Grid and flex children default to `min-width: auto`.** A `w-max` marquee
   or a `whitespace-nowrap` row inside them inflates the whole track — that is
   what pushed the page to 2535px wide. Grid children that wrap such content
   carry `min-w-0`.
2. **`min-w-0` alone is not enough.** It lets an item *shrink*, but the item
   still contributes its full nowrap min-content to an ancestor's intrinsic
   sizing, so the `min-w-0` has to sit on the grid item itself, not just the
   inner element.

Reveal animations start at `opacity: 0` and are driven by an
IntersectionObserver; a `<noscript>` rule in `layout.tsx` makes the page fully
readable without JavaScript.

## Content honesty

Per PRD §30 the page carries no invented client logos, testimonials or metrics.
The hero console is labelled a representative interface, and the trust bar states
capabilities rather than outcomes. Keep that constraint when adding content.

## Before launch

- [ ] `src/app/layout.tsx` — set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] `src/app/api/contact/route.ts` — wire lead delivery (transactional email or
      CRM webhook). It currently only logs server-side, so **submissions reach
      nobody**.
- [ ] `src/components/Footer.tsx` — replace the placeholder email and WhatsApp
      number with real Nexgen contact details.
- [ ] Add an Open Graph image (`opengraph-image.png` in `src/app/`).
- [ ] Point `track()` in `src/lib/analytics.ts` at the real analytics provider;
      it pushes to `window.dataLayer` today.
