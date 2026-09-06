import { CircuitBoard, KeyRound, Server, Workflow } from "lucide-react";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

/** Icons stay here and pair positionally with `trust` in the dictionary. */
const ICONS = [CircuitBoard, Workflow, Server, KeyRound];

/**
 * Trust signals are capability statements we can actually stand behind —
 * no borrowed client logos, no invented metrics (PRD §30).
 */
export default function TrustBar({ d }: { d: Dictionary["trust"] }) {
  return (
    <section className="relative border-y border-line bg-ink-900/40">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        {/* gap-px hairlines rather than divide-x: on a two-column grid,
            divide-x would also draw a border at the start of each new row. */}
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {d.map((badge, i) => {
            const Icon = ICONS[i] ?? CircuitBoard;
            return (
              <Reveal
                key={badge.title}
                delay={i * 70}
                className="flex items-start gap-3.5 bg-ink-900 px-4 py-7 sm:px-6"
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.03]">
                  <Icon size={16} className="text-signal" strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-fg">
                    {badge.title}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg-dim">
                    {badge.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
