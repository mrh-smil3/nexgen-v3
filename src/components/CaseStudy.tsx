import { ArrowUpRight } from "lucide-react";
import ArchitectureDiagram from "./ArchitectureDiagram";
import TrackedLink from "./TrackedLink";
import ViewTracker from "./ViewTracker";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function CaseStudy({ d }: { d: Dictionary["caseStudy"] }) {
  return (
    <section
      id="case-study"
      className="relative scroll-mt-24 overflow-hidden border-t border-line px-5 py-24 sm:px-8 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-40" />
        <div className="absolute top-1/3 left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 rounded-full bg-signal/[0.05] blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px]">
        <ViewTracker
          event="case_study_view"
          payload={{ id: "maximo_overhaul" }}
        />

        <Reveal>
          <div className="flex items-center gap-3">
            <span className="mono-label text-signal/80">05</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden />
            <span className="mono-label">{d.kicker}</span>
          </div>

          <h2 className="mt-5 max-w-4xl text-[2rem] leading-[1.1] font-semibold sm:text-[2.6rem] md:text-[3rem]">
            {d.titleLead}{" "}
            <span className="text-gradient-signal">{d.titleAccent}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-fg-muted">
            <span className="font-medium text-fg">{d.project}</span>{" "}
            {d.projectSuffix}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {d.meta.map((m) => (
              <div key={m.k} className="bg-ink-900 px-5 py-4">
                <dt className="mono-label leading-[1.5]">{m.k}</dt>
                <dd className="mt-2 text-[13.5px] font-medium text-fg">{m.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* One card, three short blocks. Condensed so the case study reads
              as evidence for the positioning rather than as the page's subject.
              The pull-quote that sat here duplicated the callout in
              OperationalGap, so it was dropped rather than reworded. */}
          <div className="min-w-0 lg:col-span-7">
            <Reveal delay={60}>
              <div className="glass divide-y divide-line">
                <div className="p-6 sm:p-8">
                  <span className="mono-label !text-alert">
                    {d.problemLabel}
                  </span>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-fg-muted">
                    {d.problemBody}
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <span className="mono-label !text-signal">
                    {d.solutionLabel}
                  </span>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-fg-muted">
                    {d.solutionBody}
                  </p>
                </div>

                <div className="p-6 sm:p-8">
                  <span className="mono-label !text-ok">{d.outcomeLabel}</span>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-fg-muted">
                    {d.outcomeBody}
                  </p>

                  <div className="mt-7 border-t border-line pt-6">
                    <span className="mono-label">{d.monitoringLabel}</span>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {d.monitoringAreas.map((area) => (
                        <li
                          key={area}
                          className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1.5 text-[12px] text-fg-muted"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={110}>
              {/* Was "View Case Study", which promised a page that does not
                  exist — this href has always pointed at the contact form. */}
              <TrackedLink
                href="#contact"
                event="case_study_cta"
                payload={{ id: "maximo_overhaul" }}
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-fg transition-colors hover:border-signal/40 hover:bg-signal/[0.06]"
              >
                {d.cta}
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.2}
                  className="text-signal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </TrackedLink>
            </Reveal>
          </div>

          {/* Architecture */}
          <Reveal delay={130} className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ArchitectureDiagram d={d.architecture} />
              <p className="mt-4 text-[11.5px] leading-relaxed text-fg-dim">
                {d.caption}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
