import { Fragment } from "react";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

/**
 * Stacks vertically up to `lg`. Only at `lg` is there room for five nodes
 * side by side, and even then they flex rather than hold their intrinsic
 * width — nowrap labels here used to overflow the container at tablet sizes.
 */
function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 lg:w-8 lg:py-0">
      <svg
        className="h-8 w-px lg:h-px lg:w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          className="flow-dash lg:hidden"
          stroke="rgb(62 217 196 / 0.5)"
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className="flow-dash hidden lg:block"
          stroke="rgb(62 217 196 / 0.5)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export default function FlowRail({ d }: { d: Dictionary["flowRail"] }) {
  return (
    <Reveal delay={120} className="mt-20 pb-20 md:mt-24 md:pb-24">
      <div className="rule-x" />
      {/* Stacked, the rail reads as a flow column — full-width bars on a
          tablet look like a list, not a sequence. */}
      <div className="mx-auto mt-10 flex max-w-sm flex-col items-stretch lg:max-w-none lg:flex-row lg:items-center">
        {d.map((node, i) => {
          // The third node is Nexgen's own layer — the one the diagram exists
          // to point at.
          const accent = i === 2;
          return (
            <Fragment key={node.label}>
              {i > 0 ? <Connector /> : null}
              <div
                className={`min-w-0 rounded-xl border px-4 py-3 text-center backdrop-blur-sm lg:flex-1 lg:text-left ${
                  accent
                    ? "border-signal/35 bg-signal/[0.07]"
                    : "border-line bg-white/[0.025]"
                }`}
              >
                <p
                  className={`text-[12.5px] leading-snug font-medium ${
                    accent ? "text-signal" : "text-fg"
                  }`}
                >
                  {node.label}
                </p>
                <p className="mono-label mt-1.5 leading-[1.4]">{node.sub}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Reveal>
  );
}
