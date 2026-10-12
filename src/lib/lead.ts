import { escapeHtml } from "./telegram";

export type Lead = {
  name?: string;
  company?: string;
  position?: string;
  email?: string;
  phone?: string;
  industry?: string;
  systems?: string;
  challenge?: string;
  scope?: string;
  turnstileToken?: string;
};

export const REQUIRED: (keyof Lead)[] = [
  "name",
  "company",
  "position",
  "email",
  "phone",
  "industry",
  "systems",
  "challenge",
  "scope",
];

// Generous for a real enquiry, small enough that one lead fits in a single
// Telegram message (4096 chars).
export const MAX_LENGTH: Record<
  Exclude<keyof Lead, "turnstileToken">,
  number
> = {
  name: 120,
  company: 160,
  position: 120,
  email: 200,
  phone: 40,
  industry: 120,
  systems: 400,
  challenge: 2000,
  scope: 120,
};

const LABELS: [keyof typeof MAX_LENGTH, string][] = [
  ["name", "Nama"],
  ["company", "Perusahaan"],
  ["position", "Jabatan"],
  ["email", "Email"],
  ["phone", "Telepon"],
  ["industry", "Industri"],
  ["systems", "Sistem saat ini"],
  ["scope", "Lingkup"],
];

export type LeadFields = Record<keyof typeof MAX_LENGTH, string>;

/** Renders a validated lead as an HTML message for Telegram. */
export function formatLead(lead: LeadFields): string {
  const time = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  const lines = LABELS.filter(([key]) => lead[key]).map(
    ([key, label]) => `<b>${label}:</b> ${escapeHtml(lead[key])}`,
  );

  return [
    "<b>📩 Lead baru — Form Kontak Nexgen</b>",
    "",
    ...lines,
    "",
    "<b>Tantangan operasional:</b>",
    escapeHtml(lead.challenge),
    "",
    `<i>${escapeHtml(time)} WIB</i>`,
  ].join("\n");
}
