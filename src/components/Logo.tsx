export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* Glyph: three stacked strata with one solid middle band —
          the operational layer sitting between systems and decisions. */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          x="0.75"
          y="0.75"
          width="24.5"
          height="24.5"
          rx="5"
          stroke="rgb(148 163 184 / 0.28)"
        />
        <path d="M6 8.5h14" stroke="rgb(148 163 184 / 0.55)" strokeWidth="1.3" />
        <rect x="6" y="11.7" width="14" height="2.9" rx="1.1" fill="#3ed9c4" />
        <path
          d="M6 17.9h14"
          stroke="rgb(148 163 184 / 0.55)"
          strokeWidth="1.3"
        />
      </svg>
      <span className="text-[15px] font-semibold tracking-[0.18em] text-fg">
        NEXGEN
      </span>
    </span>
  );
}
