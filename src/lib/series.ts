/**
 * Deterministic sample series for the hero console. Deterministic matters:
 * the server and the first client render must agree, so nothing here uses
 * Math.random() or Date.now().
 */

/** Small LCG so the "noise" is stable across renders. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

export type Point = { x: number; y: number };

export const WEEKS = 24;
export const CURRENT_WEEK = 17;

/** S-curve plan, 0..100 across the reporting period. */
export function planSeries(): Point[] {
  return Array.from({ length: WEEKS }, (_, i) => {
    const t = i / (WEEKS - 1);
    const y = 100 / (1 + Math.exp(-9.5 * (t - 0.5)));
    return { x: i, y: Math.round(y * 10) / 10 };
  });
}

/** Realisation trails the plan with a small, stable wobble. */
export function actualSeries(offset = 0): Point[] {
  const rand = lcg(20260905);
  const plan = planSeries();
  return plan.slice(0, CURRENT_WEEK + 1).map((p, i) => {
    // Realisation trails the plan, and the shortfall widens as the window
    // runs on — that lag is the operational gap this page is about.
    const lag = 7.5 * Math.pow(i / CURRENT_WEEK, 1.6);
    const noise = (rand() - 0.5) * 2.4;
    const drift = i === CURRENT_WEEK ? offset : 0;
    const y = Math.max(0, p.y - lag + noise + drift);
    return { x: i, y: Math.round(y * 10) / 10 };
  });
}

/**
 * Cardinal-spline path through the points, already mapped to view space.
 */
export function toPath(
  points: Point[],
  width: number,
  height: number,
  maxX: number,
  maxY: number,
): string {
  if (points.length === 0) return "";
  const px = (p: Point) => (p.x / maxX) * width;
  const py = (p: Point) => height - (p.y / maxY) * height;

  let d = `M ${px(points[0]).toFixed(1)} ${py(points[0]).toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = px(p1) + (px(p2) - px(p0)) / 6;
    const c1y = py(p1) + (py(p2) - py(p0)) / 6;
    const c2x = px(p2) - (px(p3) - px(p1)) / 6;
    const c2y = py(p2) - (py(p3) - py(p1)) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${px(p2).toFixed(1)} ${py(p2).toFixed(1)}`;
  }
  return d;
}

export const nf = new Intl.NumberFormat("en-US");
