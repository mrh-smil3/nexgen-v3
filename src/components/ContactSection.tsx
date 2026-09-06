"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { track } from "@/lib/analytics";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

const field =
  "w-full rounded-lg border border-line bg-white/[0.025] px-3.5 py-3 text-[14px] text-fg placeholder:text-fg-dim transition-colors focus:border-signal/50 focus:bg-white/[0.04]";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection({ d }: { d: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);

  function onFirstInteraction() {
    if (started) return;
    setStarted(true);
    track("contact_form_start");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("sent");
      track("contact_form_submit", {
        industry: String(data.industry ?? ""),
        scope: String(data.scope ?? ""),
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-50" />
        <div className="absolute bottom-[-16rem] left-1/2 h-[36rem] w-[62rem] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[130px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="mono-label text-signal/80">10</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="mono-label">{d.kicker}</span>
            </div>

            <h2 className="mt-5 text-[2rem] leading-[1.1] font-semibold sm:text-[2.5rem]">
              {d.titleLead}{" "}
              <span className="text-gradient-signal">{d.titleAccent}</span>
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
              {d.lede}
            </p>

            <ul className="mt-9 space-y-3">
              {d.points.map((line) => (
                <li key={line} className="flex gap-3">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-signal"
                    strokeWidth={2}
                  />
                  <span className="text-[13.5px] leading-relaxed text-fg-muted">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100} className="min-w-0 lg:col-span-7">
          {status === "sent" ? (
            <div className="glass flex h-full flex-col items-start justify-center p-8 sm:p-10">
              <CheckCircle2
                size={26}
                className="text-signal"
                strokeWidth={1.8}
              />
              <h3 className="mt-5 text-[20px] font-semibold text-fg">
                {d.successTitle}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fg-muted">
                {d.successBody}
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              onFocusCapture={onFirstInteraction}
              className="glass p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={d.fields.name} required>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className={field}
                    placeholder={d.fields.namePlaceholder}
                  />
                </Field>

                <Field label={d.fields.company} required>
                  <input
                    name="company"
                    required
                    autoComplete="organization"
                    className={field}
                    placeholder={d.fields.companyPlaceholder}
                  />
                </Field>

                <Field label={d.fields.position}>
                  <input
                    name="position"
                    autoComplete="organization-title"
                    className={field}
                    placeholder={d.fields.positionPlaceholder}
                  />
                </Field>

                <Field label={d.fields.email} required>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                    placeholder={d.fields.emailPlaceholder}
                  />
                </Field>

                <Field label={d.fields.phone}>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={field}
                    placeholder={d.fields.phonePlaceholder}
                  />
                </Field>

                <Field label={d.fields.industry}>
                  <select name="industry" className={field} defaultValue="">
                    <option value="" disabled>
                      {d.fields.industryPlaceholder}
                    </option>
                    {d.industries.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-ink-850"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={d.fields.systems} className="sm:col-span-2">
                  <input
                    name="systems"
                    className={field}
                    placeholder={d.fields.systemsPlaceholder}
                  />
                </Field>

                <Field
                  label={d.fields.challenge}
                  className="sm:col-span-2"
                  required
                >
                  <textarea
                    name="challenge"
                    required
                    rows={4}
                    className={`${field} resize-y`}
                    placeholder={d.fields.challengePlaceholder}
                  />
                </Field>

                <Field label={d.fields.scope} className="sm:col-span-2">
                  <select name="scope" className={field} defaultValue="">
                    <option value="" disabled>
                      {d.fields.scopePlaceholder}
                    </option>
                    {d.scopes.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-ink-850"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {status === "error" ? (
                <p
                  role="alert"
                  className="mt-5 rounded-lg border border-alert/35 bg-alert/10 px-4 py-3 text-[13px] text-alert"
                >
                  {d.error}
                </p>
              ) : null}

              <div className="mt-7 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11.5px] leading-relaxed text-fg-dim">
                  {d.privacy}
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-[14px] font-semibold text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {d.sending}
                    </>
                  ) : (
                    <>
                      {d.submit}
                      <ArrowRight
                        size={16}
                        strokeWidth={2.4}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
  required,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mono-label block leading-[1.5]">
        {label}
        {required ? <span className="text-signal"> *</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
