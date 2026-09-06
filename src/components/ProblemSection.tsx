import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function ProblemSection({ d }: { d: Dictionary["problem"] }) {
  return (
    <SectionShell id="problem">
      <SectionHeading
        index="01"
        kicker={d.kicker}
        title={
          <>
            {d.titleLead} <span className="text-fg-dim">{d.titleAccent}</span>
          </>
        }
        lede={d.lede}
      />

      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {d.items.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 60}>
            <div className="glass glass-hover h-full p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-alert/80" />
                <span className="mono-label">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-[15px] font-medium text-fg">{p.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-fg-muted">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}
