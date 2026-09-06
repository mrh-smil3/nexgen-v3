import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, getDictionary } from "@/lib/i18n";
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

// TODO: set NEXT_PUBLIC_SITE_URL to the production domain before launch.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
    metadataBase: new URL(siteUrl),
    title: d.title,
    description: d.description,
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
    alternates: {
      canonical: siteUrl,
      // "/" negotiates the language, so it is the x-default entry point while
      // /en and /id stay addressable for anyone who wants a fixed language.
      languages: {
        en: `${siteUrl}/en`,
        id: `${siteUrl}/id`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: "Nexgen",
      locale: locale === "id" ? "id_ID" : "en_US",
      title: d.ogTitle,
      description: d.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: d.ogTitle,
      description: d.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
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

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexgen",
    url: siteUrl,
    description: d.meta.description,
    knowsAbout: [
      "Enterprise system integration",
      "Operational monitoring",
      "IBM Maximo integration",
      "Management information systems",
    ],
  };

  return (
    <html lang={locale} className={`${inter.variable} ${mono.variable}`}>
      <body>
        {/* Reveal animations start at opacity 0 and are driven by an
            IntersectionObserver — without JS the page must still be readable. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;animation:none!important}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
