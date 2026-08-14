/**
 * Small deterministic geometry helpers used to *generate* dense, intricate
 * Javanese ornament paths (wayang-kulit style tatahan) instead of hand-drawing
 * a handful of simple shapes.
 *
 * Everything here is pure and evaluated at render time — no runtime data, no
 * randomness that would break SSR hydration.
 */

export const rad = (deg: number) => (deg * Math.PI) / 180;

/** Deterministic pseudo-random generator (stable across server/client). */
export function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type Pt = readonly [number, number];

export const fmt = (n: number) => Math.round(n * 100) / 100;

export function poly(points: readonly Pt[], close = true) {
  return (
    points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${fmt(x)} ${fmt(y)}`)
      .join(" ") + (close ? " Z" : "")
  );
}

/** Smooth polyline through points using quadratic midpoint smoothing. */
export function smooth(points: readonly Pt[], close = false) {
  if (points.length < 3) return poly(points, close);
  let d = `M${fmt(points[0]![0])} ${fmt(points[0]![1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x0, y0] = points[i]!;
    const [x1, y1] = points[i + 1]!;
    d += ` Q${fmt(x0)} ${fmt(y0)} ${fmt((x0 + x1) / 2)} ${fmt((y0 + y1) / 2)}`;
  }
  const last = points[points.length - 1]!;
  d += ` T${fmt(last[0])} ${fmt(last[1])}`;
  return close ? `${d} Z` : d;
}

/**
 * "Tatahan" scallop edge: a cusped, flame-like traditional carving edge that
 * follows an arbitrary width profile — the signature contour of gunungan and
 * wayang crowns.
 */
export function scallopEdge(
  profile: (t: number) => { x: number; y: number },
  {
    steps = 220,
    cusps = 26,
    depth = 5,
    phase = 0,
  }: { steps?: number; cusps?: number; depth?: number; phase?: number } = {},
) {
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const { x, y } = profile(t);
    const ripple = Math.abs(Math.sin(Math.PI * (t * cusps + phase)));
    const eased = Math.pow(ripple, 0.65);
    pts.push([x + depth * eased * (x >= 0 ? 1 : -1), y]);
  }
  return pts;
}

/** Mirror a list of points across x = cx. */
export function mirrorX(points: readonly Pt[], cx: number): Pt[] {
  return points.map(([x, y]) => [2 * cx - x, y] as Pt);
}

/** A single ornamental leaf/petal (patra) as a closed teardrop path. */
export function patra(
  cx: number,
  cy: number,
  len: number,
  width: number,
  angleDeg: number,
  curl = 0.45,
) {
  const a = rad(angleDeg);
  const tipX = cx + Math.cos(a) * len;
  const tipY = cy + Math.sin(a) * len;
  const nx = Math.cos(a + Math.PI / 2);
  const ny = Math.sin(a + Math.PI / 2);
  const m1x = cx + Math.cos(a) * len * 0.45 + nx * width;
  const m1y = cy + Math.sin(a) * len * 0.45 + ny * width;
  const m2x = cx + Math.cos(a) * len * 0.45 - nx * width * curl;
  const m2y = cy + Math.sin(a) * len * 0.45 - ny * width * curl;
  return `M${fmt(cx)} ${fmt(cy)} Q${fmt(m1x)} ${fmt(m1y)} ${fmt(tipX)} ${fmt(tipY)} Q${fmt(m2x)} ${fmt(m2y)} ${fmt(cx)} ${fmt(cy)} Z`;
}

/** Spiral scroll (lung-lungan / sulur) — the core Javanese carving motif. */
export function sulur(
  cx: number,
  cy: number,
  radius: number,
  turns = 2.1,
  startDeg = 0,
  dir: 1 | -1 = 1,
  steps = 90,
) {
  const pts: Pt[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = rad(startDeg) + dir * t * turns * Math.PI * 2;
    const r = radius * (1 - t * 0.92);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return smooth(pts);
}

/** Row of tiny drilled dots (tatahan "bubukan") along a line. */
export function dotRow(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  count: number,
) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    return { cx: fmt(x0 + (x1 - x0) * t), cy: fmt(y0 + (y1 - y0) * t) };
  });
}
