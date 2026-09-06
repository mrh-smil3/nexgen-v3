import { ArrowDown } from "lucide-react";
import { SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

function Node({
  label,
  sub,
  tone = "default",
}: {
  label: string;
  sub?: string;
  tone?: "default" | "signal" | "muted";
}) {
  const tones = {
    default: "border-line-strong bg-white/[0.035] text-fg",
    signal: "border-signal/40 bg-signal/[0.08] text-signal",
    muted: "border-line bg-white/[0.02] text-fg-muted",
  } as const;

  return (
    <div
      className={`rounded-lg border px-1.5 py-2.5 text-center backdrop-blur-sm sm:px-4 sm:py-3 ${tones[tone]}`}
    >
      {/* hyphens: long single words like "Procurement" / "Pengadaan" cannot
          otherwise fit these columns on a 320px screen */}
      <p className="text-[11.5px] leading-snug font-medium break-words hyphens-auto sm:text-[12.5px]">
        {label}
      </p>
      {sub ? <p className="mono-label mt-1.5 leading-[1.4]">{sub}</p> : null}
    </div>
  );
}

export default function OperationalGap({ d }: { d: Dictionary["gap"] }) {
  return (
    <SectionShell id="gap" className="grid-field-fine bg-ink-900/30">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="mono-label text-signal/80">02</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span className="mono-label">{d.kicker}</span>
            </div>

            <h2 className="mt-5 text-[1.85rem] leading-[1.12] font-semibold sm:text-[2.35rem] md:text-[2.6rem]">
              {d.title}
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
              {d.lede}
            </p>

            <div className="glass mt-8 border-l-2 border-l-signal p-5">
              <p className="text-[14.5px] leading-relaxed font-medium text-fg">
                {d.callout}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Diagram */}
        <Reveal delay={120} className="min-w-0 lg:col-span-7">
          <div className="glass p-4 sm:p-6 md:p-8">
            <p className="mono-label text-center">{d.diagramTitle}</p>

            <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-3">
              <Node label={d.erp.label} sub={d.erp.sub} />
              <Node label={d.eam.label} sub={d.eam.sub} />
              <Node label={d.procurement.label} sub={d.procurement.sub} />
            </div>

            {/* Convergence */}
            <svg
              viewBox="0 0 600 54"
              preserveAspectRatio="none"
              className="h-[54px] w-full"
              aria-hidden
            >
              {[100, 300, 500].map((x) => (
                <path
                  key={x}
                  d={`M ${x} 0 C ${x} 30, 300 24, 300 54`}
                  fill="none"
                  stroke="rgb(148 163 184 / 0.4)"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            <div className="mx-auto max-w-[280px]">
              <Node label={d.dataExists.label} sub={d.dataExists.sub} />
            </div>

            {/* The gap */}
            <div className="relative mx-auto mt-4 max-w-[420px]">
              <div
                className="rounded-lg border border-dashed border-amber/45 px-5 py-6 text-center"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, rgb(240 168 60 / 0.07) 0px, rgb(240 168 60 / 0.07) 1px, transparent 1px, transparent 9px)",
                }}
              >
                <p className="mono-label !text-amber">{d.gapLabel}</p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-fg-muted">
                  {d.gapBody}
                </p>
              </div>
              {/* Scanning sweep suggests the gap being closed */}
              <div className="pointer-events-none absolute inset-x-6 top-0 overflow-hidden">
                <div className="scan-sweep h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent" />
              </div>
            </div>

            <div className="flex justify-center py-4">
              <ArrowDown size={16} className="text-fg-dim" strokeWidth={2} />
            </div>

            <div className="mx-auto max-w-[280px]">
              <Node label={d.decision} tone="signal" />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
