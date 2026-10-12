import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, isLocale, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nexgen — Operational Intelligence & Digital Systems";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Dark-theme tokens from globals.css — the card should read as the site.
const INK = "#05070a";
const FG = "#e8ecf3";
const MUTED = "#97a1b0";
const DIM = "#667384";
const SIGNAL = "#3ed9c4";
const LINE = "rgba(148,163,184,0.12)";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const d = getDictionary(locale).meta;

  const assets = join(process.cwd(), "src/assets");
  const [glyph, inter400, inter600] = await Promise.all([
    readFile(join(assets, "og-glyph.png")),
    readFile(join(assets, "fonts/Inter-400.ttf")),
    readFile(join(assets, "fonts/Inter-600.ttf")),
  ]);
  const glyphSrc = `data:image/png;base64,${glyph.toString("base64")}`;

  // "Your Systems Have the Data. Do You Have the Control?" — the second
  // sentence is the hook, so it carries the accent.
  const split = d.ogTitle.indexOf(". ");
  const lead = split > -1 ? d.ogTitle.slice(0, split + 1) : d.ogTitle;
  const accent = split > -1 ? d.ogTitle.slice(split + 2) : "";

  const tagline = d.title.split(" — ")[1] ?? d.title;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: INK,
        backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        color: FG,
        fontFamily: "Inter",
        position: "relative",
      }}
    >
      {/* Signal glow, as behind the hero */}
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -160,
          width: 760,
          height: 760,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(62,217,196,0.22) 0%, rgba(62,217,196,0) 65%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={glyphSrc} width={64} height={64} alt="" />
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "0.18em",
          }}
        >
          NEXGEN
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          <span>{lead}</span>
          {accent ? <span style={{ color: SIGNAL }}>{accent}</span> : null}
        </div>
        <div
          style={{ fontSize: 26, lineHeight: 1.4, color: MUTED, maxWidth: 900 }}
        >
          {d.ogDescription}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 20,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: DIM,
        }}
      >
        <div style={{ width: 40, height: 2, backgroundColor: SIGNAL }} />
        {tagline}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter400, weight: 400, style: "normal" },
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
      ],
    },
  );
}
