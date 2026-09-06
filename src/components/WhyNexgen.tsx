import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function WhyNexgen({ d }: { d: Dictionary["why"] }) {
  return (
    <SectionShell id="why" className="bg-ink-900/30">
      <SectionHeading
        index="09"
        kicker={d.kicker}
        title={d.title}
        lede={d.lede}
      />

      <ul className="mt-14 border-t border-line">
        {d.values.map((value, i) => (
          <Reveal as="li" key={value.title} delay={i * 70}>
            <div className="group grid gap-3 border-b border-line py-7 transition-colors hover:bg-white/[0.018] md:grid-cols-12 md:gap-8 md:px-4">
              <div className="flex items-baseline gap-4 md:col-span-5">
                <span className="mono-label text-signal/70 transition-colors group-hover:!text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[17px] leading-snug font-semibold text-fg md:text-[19px]">
                  {value.title}
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-fg-muted md:col-span-7">
                {value.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}
