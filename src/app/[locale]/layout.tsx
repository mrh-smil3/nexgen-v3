import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, getDictionary } from "@/lib/i18n";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import {
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  languageAlternates,
  localeUrl,
} from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const d = getDictionary(locale).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: d.title,
    description: d.description,
    applicationName: SITE_NAME,
    keywords: [
      "enterprise system integration",
      "operational monitoring system",
      "enterprise dashboard development",
      "management information system",
      "Maximo integration",
      "business application development",
      "operational intelligence",
      "custom monitoring system",
      "integrasi sistem enterprise",
      "sistem monitoring operasional",
      "sistem informasi manajemen",
    ],
    // Each language is its own canonical page. Pointing both at "/" would
    // mark /id as a duplicate of whichever language Googlebot is served at
    // "/" (English), and the Indonesian page would never be indexed.
    alternates: {
      canonical: localeUrl(locale),
      languages: languageAlternates(),
    },
    // og:image / twitter:image come from opengraph-image.tsx and
    // twitter-image.tsx in this segment.
    openGraph: {
      type: "website",
      url: localeUrl(locale),
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
      title: d.ogTitle,
      description: d.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: d.ogTitle,
      description: d.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
  colorScheme: "dark light",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const d = getDictionary(locale);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        description: d.meta.description,
        knowsAbout: [
          "Enterprise system integration",
          "Operational monitoring",
          "IBM Maximo integration",
          "Management information systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: LOCALES,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${localeUrl(locale)}#webpage`,
        url: localeUrl(locale),
        name: d.meta.title,
        description: d.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    // suppressHydrationWarning: the pre-paint script sets data-theme on <html>
    // before React hydrates.
    <html
      lang={locale}
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {/* Reveal animations start at opacity 0 and are driven by an
            IntersectionObserver — without JS the page must still be readable. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;animation:none!important}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
