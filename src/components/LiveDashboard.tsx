"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Boxes, RefreshCw } from "lucide-react";
import {
  CURRENT_WEEK,
  WEEKS,
  actualSeries,
  nf,
  planSeries,
  toPath,
} from "@/lib/series";
import type { Dictionary } from "@/lib/i18n";

const W = 560;
const H = 176;

/**
 * State keys, positionally matched to `console.stream` in the dictionary.
 * Keeping the key here rather than the translated label means the colour
 * mapping does not have to be re-stated per language.
 */
const STREAM_STATES = [
  "inProgress",
  "approved",
  "issued",
  "scheduled",
  "inReview",
  "completed",
] as const;

const STATE_TONE: Record<(typeof STREAM_STATES)[number], string> = {
  completed: "text-ok",
  approved: "text-ok",
  issued: "text-signal",
  inProgress: "text-amber",
  scheduled: "text-fg-muted",
  inReview: "text-amber",
};

export default function LiveDashboard({ d }: { d: Dictionary["console"] }) {
  const [tick, setTick] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  // Gentle, bounded drift so the panel reads as live without ever
  // implying a real measured figure.
  const drift = live ? Math.sin(tick / 2.1) * 1.4 : 0;

  const plan = useMemo(() => planSeries(), []);
  const actual = useMemo(() => actualSeries(drift), [drift]);

  const planPath = toPath(plan, W, H, WEEKS - 1, 100);
  const actualPath = toPath(actual, W, H, WEEKS - 1, 100);
  const headX = (CURRENT_WEEK / (WEEKS - 1)) * W;
  const areaPath = `${actualPath} L ${headX.toFixed(1)} ${H} L 0 ${H} Z`;

  const last = actual[actual.length - 1];
  const planNow = plan[CURRENT_WEEK].y;
  const variance = last.y - planNow;
  const headY = H - (last.y / 100) * H;

  const values = [
    nf.format(128 + (live ? (tick % 5) - 2 : 0)),
    nf.format(34 - (live ? tick % 3 : 0)),
    nf.format(91 + (live ? tick % 4 : 0)),
  ];
  const tones = ["text-fg", "text-amber", "text-signal"];

  const offset = live ? tick % d.stream.length : 0;
  const stream = [0, 1, 2].map((i) => {
    const index = (offset + i) % d.stream.length;
    return { ...d.stream[index], state: STREAM_STATES[index] };
  });

  return (
    <div className="relative">
      <div className="glass overflow-hidden p-3 sm:p-4">
        {/* Console header */}
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          <div className="flex items-center gap-2.5">
            <Activity size={14} className="text-signal" strokeWidth={2.2} />
            <span className="mono-label !text-fg-muted">{d.title}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-ok/25 bg-ok/10 px-2.5 py-1">
            <span className="blip h-1.5 w-1.5 rounded-full bg-ok" />
            <span className="mono-label !text-ok">{d.live}</span>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {d.kpis.map((kpi, i) => (
            <div key={kpi.label} className="glass-flat p-3">
              <p className="mono-label leading-[1.4]">{kpi.label}</p>
              <p
                className={`mt-2 font-mono text-[20px] leading-none font-medium tabular-nums sm:text-[26px] ${tones[i]}`}
              >
                {values[i]}
              </p>
              <p className="mt-1.5 truncate text-[11px] text-fg-dim">
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="glass-flat mt-2.5 p-3 sm:mt-3 sm:p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <div>
              <p className="text-[13px] font-medium text-fg">{d.chartTitle}</p>
              <p className="mono-label mt-1.5">{d.chartSub}</p>
            </div>
            <div className="flex items-center gap-4">
              <Legend
                color="rgb(148 163 184 / 0.55)"
                label={d.legendPlan}
                dashed
              />
              <Legend color="#3ed9c4" label={d.legendActual} />
            </div>
          </div>

          <div className="relative mt-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-[132px] w-full sm:h-[168px]"
              preserveAspectRatio="none"
              role="img"
              aria-label={d.chartAria}
            >
              <defs>
                <linearGradient id="nx-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3ed9c4" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3ed9c4" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 0.25, 0.5, 0.75, 1].map((g) => (
                <line
                  key={g}
                  x1="0"
                  x2={W}
                  y1={H * g}
                  y2={H * g}
                  stroke="rgb(148 163 184 / 0.12)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              <path d={areaPath} fill="url(#nx-area)" />

              <path
                d={planPath}
                fill="none"
                stroke="rgb(148 163 184 / 0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 5"
                vectorEffect="non-scaling-stroke"
              />

              <path
                d={actualPath}
                fill="none"
                stroke="#3ed9c4"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />

              <line
                x1={headX}
                x2={headX}
                y1="0"
                y2={H}
                stroke="rgb(62 217 196 / 0.35)"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Head marker lives outside the stretched SVG so it stays circular */}
            <span
              className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal ring-4 ring-signal/20 transition-all duration-700"
              style={{
                left: `${(headX / W) * 100}%`,
                top: `${(headY / H) * 100}%`,
              }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3">
            <Metric
              label={d.metricRealisation}
              value={`${last.y.toFixed(1)}%`}
            />
            <Metric label={d.metricPlan} value={`${planNow.toFixed(1)}%`} />
            <Metric
              label={d.metricVariance}
              value={`${variance >= 0 ? "+" : ""}${variance.toFixed(1)} ${d.variancePts}`}
              tone={variance >= 0 ? "text-ok" : "text-amber"}
            />
          </div>
        </div>

        {/* Event stream */}
        <div className="glass-flat mt-2.5 divide-y divide-line sm:mt-3">
          {stream.map((row, i) => (
            <div
              key={`${row.code}-${i}`}
              className="flex items-center gap-3 px-3 py-2.5"
            >
              <span className="font-mono text-[11px] text-fg-dim tabular-nums">
                {row.code}
              </span>
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-fg-muted">
                {row.text}
              </span>
              <span
                className={`mono-label whitespace-nowrap ${STATE_TONE[row.state]}`}
              >
                {d.states[row.state]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating glass chips */}
      <div className="glass absolute -bottom-5 -left-3 hidden items-center gap-2.5 px-3.5 py-2.5 sm:flex lg:-left-8">
        <RefreshCw size={13} className="text-signal" strokeWidth={2.2} />
        <div className="leading-tight">
          <p className="text-[12px] font-medium text-fg">
            {d.chipIntegration.title}
          </p>
          <p className="mono-label mt-1">{d.chipIntegration.sub}</p>
        </div>
      </div>

      <div className="glass absolute -right-3 -bottom-5 hidden items-center gap-2.5 px-3.5 py-2.5 lg:flex lg:-right-6">
        <Boxes size={13} className="text-amber" strokeWidth={2.2} />
        <div className="leading-tight">
          <p className="text-[12px] font-medium text-fg">{d.chipAlert.title}</p>
          <p className="mono-label mt-1">{d.chipAlert.sub}</p>
        </div>
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <svg width="16" height="2" aria-hidden>
        <line
          x1="0"
          y1="1"
          x2="16"
          y2="1"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={dashed ? "3 3" : undefined}
        />
      </svg>
      <span className="mono-label">{label}</span>
    </span>
  );
}

function Metric({
  label,
  value,
  tone = "text-fg",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="mono-label">{label}</span>
      <span className={`font-mono text-[13px] tabular-nums ${tone}`}>
        {value}
      </span>
    </span>
  );
}
