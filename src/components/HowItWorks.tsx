import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function HowItWorks({ d }: { d: Dictionary["how"] }) {
  return (
    <SectionShell id="how">
      <SectionHeading
        index="06"
        kicker={d.kicker}
        title={d.title}
        lede={d.lede}
      />

      {/* Single column on phones, two on tablets, the full five-across rail
          only at lg — five columns below that leaves ~130px per step. */}
      <ol className="relative mt-16 grid gap-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-4">
        {/* Connecting rail, drawn only where the steps sit in one row */}
        <span
          className="absolute top-[13px] right-[13px] left-[13px] hidden h-px bg-line-strong lg:block"
          aria-hidden
        />
        <span
          className="absolute top-2 bottom-2 left-[13px] w-px bg-line-strong sm:hidden"
          aria-hidden
        />

        {d.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="relative">
            <div className="flex items-start gap-4 lg:block">
              <span className="relative z-10 grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border border-signal/40 bg-ink-950 font-mono text-[11px] text-signal">
                {i + 1}
              </span>
              <div className="min-w-0 lg:mt-6 lg:pr-4">
                <h3 className="text-[15.5px] font-semibold text-fg">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-fg-muted">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </SectionShell>
  );
}
