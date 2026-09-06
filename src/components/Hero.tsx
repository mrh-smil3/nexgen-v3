import { ArrowRight, MessageSquareText } from "lucide-react";
import LiveDashboard from "./LiveDashboard";
import TrackedLink from "./TrackedLink";
import Reveal from "./Reveal";
import FlowRail from "./FlowRail";
import type { Dictionary } from "@/lib/i18n";

export default function Hero({
  d,
  console: consoleD,
  flowRail,
}: {
  d: Dictionary["hero"];
  console: Dictionary["console"];
  flowRail: Dictionary["flowRail"];
}) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-0">
      {/* Structural field + a single soft light source, no gradient wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-60" />
        <div className="absolute top-[-18rem] left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy. min-w-0 on both columns: the console's nowrap event rows
              otherwise size the single mobile grid track to their min-content
              and push the whole hero wider than the viewport. */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
                <span className="blip h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="mono-label !text-fg-muted">{d.eyebrow}</span>
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 text-[2.5rem] leading-[1.06] font-semibold sm:text-[3.25rem] lg:text-[3.4rem]">
                {d.headlineLead}
                <br />
                <span className="text-gradient-signal">{d.headlineAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-fg-muted md:text-[16.5px]">
                {d.lede}
              </p>
            </Reveal>

            <Reveal delay={230}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href="#case-study"
                  event="hero_cta_click"
                  payload={{ cta: "explore_our_work" }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-[14px] font-semibold text-ink-950 transition-transform hover:-translate-y-0.5"
                >
                  {d.ctaPrimary}
                  <ArrowRight
                    size={16}
                    strokeWidth={2.4}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </TrackedLink>

                <TrackedLink
                  href="#contact"
                  event="hero_cta_click"
                  payload={{ cta: "discuss_your_operation" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-fg backdrop-blur-sm transition-colors hover:border-signal/40 hover:bg-signal/[0.06]"
                >
                  <MessageSquareText size={16} strokeWidth={2} />
                  {d.ctaSecondary}
                </TrackedLink>
              </div>
            </Reveal>

            <Reveal delay={300}>
              {/* Word choice in these labels is load-bearing: they are mono,
                  uppercase and wide-tracked, so the longest word sets the
                  column minimum. See the 320px notes in README before editing
                  them in any language. */}
              <dl className="mt-11 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {d.meta.map((item) => (
                  <div
                    key={item.k}
                    className="bg-ink-900 px-2 py-3.5 sm:px-3.5 sm:py-4"
                  >
                    <dt className="mono-label leading-[1.5]">{item.k}</dt>
                    <dd className="mt-2 text-[12.5px] font-medium text-fg">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Console */}
          <Reveal delay={140} className="min-w-0 lg:col-span-7">
            <LiveDashboard d={consoleD} />
            <p className="mt-8 text-center text-[11.5px] text-fg-dim lg:text-right">
              {d.note}
            </p>
          </Reveal>
        </div>

        <FlowRail d={flowRail} />
      </div>
    </section>
  );
}
