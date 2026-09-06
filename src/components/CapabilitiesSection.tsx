import {
  AppWindow,
  ClipboardList,
  GaugeCircle,
  Network,
  PieChart,
  ShoppingCart,
} from "lucide-react";
import { SectionHeading, SectionShell } from "./Section";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Paired positionally with `capabilities.items` in the dictionary. */
const ICONS = [
  GaugeCircle,
  Network,
  ClipboardList,
  ShoppingCart,
  PieChart,
  AppWindow,
];

export default function CapabilitiesSection({
  d,
}: {
  d: Dictionary["capabilities"];
}) {
  return (
    <SectionShell id="capabilities" className="bg-ink-900/30">
      <SectionHeading
        index="04"
        kicker={d.kicker}
        title={d.title}
        lede={d.lede}
      />

      <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {d.items.map((cap, i) => {
          const Icon = ICONS[i] ?? GaugeCircle;
          return (
            <Reveal key={cap.title} delay={(i % 3) * 80}>
              <article className="glass glass-hover flex h-full flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/[0.04]">
                  <Icon size={19} className="text-signal" strokeWidth={1.8} />
                </span>

                <h3 className="mt-5 text-[16px] font-semibold text-fg">
                  {cap.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-fg-muted">
                  {cap.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {cap.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[10.5px] tracking-wide text-fg-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
