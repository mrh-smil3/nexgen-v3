import { Factory, HardHat, Truck, Wrench, Zap } from "lucide-react";
import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Paired positionally with `industries.items` in the dictionary. */
const ICONS = [Zap, Factory, HardHat, Truck, Wrench];

export default function IndustriesSection({
  d,
}: {
  d: Dictionary["industries"];
}) {
  return (
    <SectionShell id="industries" className="bg-ink-900/30">
      <SectionHeading
        index="07"
        kicker={d.kicker}
        title={d.title}
        lede={d.lede}
      />

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {d.items.map((industry, i) => {
          const Icon = ICONS[i] ?? Zap;
          return (
            <Reveal key={industry.name} delay={(i % 3) * 80}>
              <article className="glass glass-hover flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.04]">
                    <Icon size={18} className="text-signal" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[15.5px] font-semibold text-fg">
                    {industry.name}
                  </h3>
                </div>

                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-fg-muted">
                  {industry.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-4">
                  {industry.focus.map((f) => (
                    <li key={f} className="mono-label">
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}

        <Reveal delay={160}>
          <div className="glass-flat flex h-full flex-col justify-center p-6">
            <p className="text-[14px] leading-relaxed text-fg-muted">
              {d.closingBody}
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-medium text-signal transition-opacity hover:opacity-80"
            >
              {d.closingLink}
            </a>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
