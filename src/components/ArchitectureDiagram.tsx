import type { Dictionary } from "@/lib/i18n";

function Fan({ direction }: { direction: "out" | "in" }) {
  const lanes = [100, 300, 500];
  return (
    <svg
      viewBox="0 0 600 46"
      preserveAspectRatio="none"
      className="h-[46px] w-full"
      aria-hidden
    >
      {lanes.map((x) => (
        <path
          key={x}
          d={
            direction === "out"
              ? `M 300 0 C 300 26, ${x} 20, ${x} 46`
              : `M ${x} 0 C ${x} 26, 300 20, 300 46`
          }
          fill="none"
          stroke="rgb(62 217 196 / 0.35)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

function Stem() {
  return (
    <svg
      viewBox="0 0 10 34"
      preserveAspectRatio="none"
      className="mx-auto h-[34px] w-[10px]"
      aria-hidden
    >
      <line
        x1="5"
        y1="0"
        x2="5"
        y2="34"
        className="flow-dash"
        stroke="rgb(62 217 196 / 0.5)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Box({
  label,
  sub,
  variant = "default",
}: {
  label: string;
  sub?: string;
  variant?: "default" | "source" | "core" | "output";
}) {
  const styles = {
    default: "border-line bg-white/[0.03] text-fg",
    source: "border-line-strong bg-white/[0.05] text-fg",
    core: "border-signal/40 bg-signal/[0.09] text-signal",
    output: "border-line-strong bg-white/[0.035] text-fg",
  } as const;

  return (
    <div
      className={`rounded-lg border px-1.5 py-2.5 text-center backdrop-blur-sm sm:px-3 ${styles[variant]}`}
    >
      <p className="text-[11.5px] leading-tight font-medium break-words hyphens-auto sm:text-[12px]">
        {label}
      </p>
      {sub ? <p className="mono-label mt-1.5 leading-[1.4]">{sub}</p> : null}
    </div>
  );
}

export default function ArchitectureDiagram({
  d,
}: {
  d: Dictionary["caseStudy"]["architecture"];
}) {
  return (
    <div className="glass p-4 sm:p-6 md:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="mono-label">{d.title}</p>
        <p className="mono-label !text-signal">{d.scope}</p>
      </div>

      <div className="mt-6">
        <div className="mx-auto max-w-[260px]">
          <Box label={d.source.label} sub={d.source.sub} variant="source" />
        </div>

        <Fan direction="out" />

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <Box label={d.workOrder.label} sub={d.workOrder.sub} />
          <Box label={d.pr.label} sub={d.pr.sub} />
          <Box label={d.po.label} sub={d.po.sub} />
        </div>

        <Fan direction="in" />

        <div className="mx-auto max-w-[300px]">
          <Box label={d.integration.label} sub={d.integration.sub} />
        </div>

        <Stem />

        <div className="mx-auto max-w-[320px]">
          <Box label={d.core.label} sub={d.core.sub} variant="core" />
        </div>

        <Fan direction="out" />

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <Box label={d.planning} />
          <Box label={d.procurement} />
          <Box label={d.absorption} />
        </div>

        <Fan direction="in" />

        <div className="mx-auto max-w-[260px]">
          <Box label={d.output} variant="output" />
        </div>
      </div>
    </div>
  );
}
