/**
 * Thin analytics shim. Events follow the naming in PRD §28 so a real
 * provider (GA4, Plausible, PostHog) can be dropped in without touching
 * call sites.
 */
export type NexgenEvent =
  | "hero_cta_click"
  | "case_study_view"
  | "case_study_cta"
  | "contact_form_start"
  | "contact_form_submit"
  | "whatsapp_click"
  | "email_click"
  | "scroll_depth"
  | "service_section_interaction"
  | "nav_cta_click";

type Payload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: NexgenEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload);
  }
}
