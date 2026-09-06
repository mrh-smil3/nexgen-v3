import { Cable, Layers, Radar, SlidersHorizontal } from "lucide-react";
import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Paired positionally with `approach.stages` in the dictionary. */
const ICONS = [Cable, Layers, Radar, SlidersHorizontal];

export default function ApproachSection({ d }: { d: Dictionary["approach"] }) {
  return (
    <SectionShell id="approach">
      <SectionHeading
        index="03"
        kicker={d.kicker}
        title={d.title}
        lede={d.lede}
      />

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {d.stages.map((stage, i) => {
          const Icon = ICONS[i] ?? Cable;
          return (
            <Reveal key={stage.title} delay={i * 80}>
              <article className="glass glass-hover group relative h-full overflow-hidden p-6">
                <span className="mono-label absolute top-5 right-5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="grid h-11 w-11 place-items-center rounded-xl border border-signal/25 bg-signal/[0.08]">
                  <Icon size={19} className="text-signal" strokeWidth={1.8} />
                </span>

                <h3 className="mt-5 text-[17px] font-semibold text-fg">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted">
                  {stage.body}
                </p>

                <span
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-signal/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
