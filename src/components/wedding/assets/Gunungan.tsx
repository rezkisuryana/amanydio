import { cn } from "@/lib/utils";

import { dotRow, fmt, mirrorX, patra, scallopEdge, smooth, sulur, type Pt } from "./geometry";

/* ------------------------------------------------------------------ */
/* Generated geometry — a real tatahan-style gunungan contour          */
/* ------------------------------------------------------------------ */

const CX = 180;
const TOP = 22;
const BASE = 524;
const H = BASE - TOP;

/** half-width profile of the kayon silhouette (t: 0 tip → 1 base) */
function halfWidth(t: number) {
  const swell = Math.pow(t, 0.52);
  const waist = 1 - 0.14 * Math.sin(Math.PI * t * 1.9);
  const shoulder = 1 + 0.1 * Math.sin(Math.PI * t * 0.9);
  return 132 * swell * waist * shoulder;
}

function rightProfile(inset: number) {
  return (t: number) => ({
    x: CX + Math.max(halfWidth(t) - inset, 0),
    y: TOP + inset * 0.35 + t * (H - inset * 0.7),
  });
}

function silhouette(inset: number, cusps: number, depth: number) {
  const right = scallopEdge(rightProfile(inset), { steps: 260, cusps, depth });
  const left = mirrorX(right, CX).reverse();
  return `${smooth(right)} ${smooth(left).replace(/^M/, "L")} Z`;
}

const OUTER = silhouette(0, 27, 7);
const INNER = silhouette(15, 25, 5);
const CORE = silhouette(30, 22, 3.5);

/** kalpataru — tree of life, generated branch pairs with patra leaves */
const TREE: string[] = (() => {
  const out: string[] = [`M${CX} ${BASE - 40} L${CX} 150`];
  const rungs = 9;
  for (let i = 0; i < rungs; i++) {
    const t = i / (rungs - 1);
    const y = 430 - t * 260;
    const len = 34 + (1 - t) * 62;
    const w = 9 + (1 - t) * 9;
    const ang = 200 + t * 22;
    out.push(patra(CX, y, len, w, ang));
    out.push(patra(CX, y, len, w, -20 - t * 22));
    out.push(
      smooth([
        [CX, y] as Pt,
        [CX - len * 0.6, y - 6] as Pt,
        [CX - len * 0.95, y - 20 - t * 8] as Pt,
      ]),
    );
    out.push(
      smooth([
        [CX, y] as Pt,
        [CX + len * 0.6, y - 6] as Pt,
        [CX + len * 0.95, y - 20 - t * 8] as Pt,
      ]),
    );
  }
  return out;
})();

/** sulur (spiral scroll) field filling the flanks */
const SULUR: string[] = (() => {
  const out: string[] = [];
  const rows = 7;
  for (let i = 0; i < rows; i++) {
    const t = i / (rows - 1);
    const y = 190 + t * 280;
    const x = CX + halfWidth((y - TOP) / H) * 0.62;
    const r = 13 + (1 - t) * 7;
    out.push(sulur(x, y, r, 1.9, 210, 1));
    out.push(sulur(2 * CX - x, y, r, 1.9, -30, -1));
  }
  return out;
})();

const PETAL_RING = (cx: number, cy: number, r: number, n: number, len: number) =>
  Array.from({ length: n }, (_, i) => patra(cx, cy, len, len * 0.34, (360 / n) * i, 0.5)).join(" ");

const DOTS_ARCH = dotRow(CX - 96, 470, CX + 96, 470, 25);
const DOTS_MID = dotRow(CX - 74, 246, CX + 74, 246, 19);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * Layered gunungan / kayon. Seven stacked layers (shadow, body, gold
 * ornament, inner floral tatahan, highlight, glow, sparks) so each can be
 * animated independently by the caller.
 */
export function Gunungan({
  className,
  strokeWidth = 1,
  filled = true,
}: {
  className?: string | undefined;
  strokeWidth?: number | undefined;
  filled?: boolean | undefined;
}) {
  return (
    <svg
      viewBox="0 0 360 560"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="gun-body" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="var(--java-brown, #5A3825)" stopOpacity="0.96" />
          <stop offset="55%" stopColor="var(--java-dark, #3A2418)" stopOpacity="0.98" />
          <stop offset="100%" stopColor="var(--sogan, #8A5A35)" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="gun-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold-soft, #E3C98C)" />
          <stop offset="38%" stopColor="var(--gold, #C7A35A)" />
          <stop offset="62%" stopColor="var(--gold-soft, #E3C98C)" />
          <stop offset="100%" stopColor="var(--gold, #C7A35A)" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="gun-glow" cx="0.5" cy="0.42" r="0.55">
          <stop offset="0%" stopColor="var(--gold, #C7A35A)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--gold, #C7A35A)" stopOpacity="0" />
        </radialGradient>
        <filter id="gun-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* L6 — glow */}
      <ellipse cx={CX} cy="250" rx="185" ry="255" fill="url(#gun-glow)" className="gun-glow" />

      {/* L1 — shadow silhouette */}
      <g className="gun-shadow" opacity="0.4" filter="url(#gun-soft)">
        <path d={OUTER} transform="translate(7 12)" fill="var(--java-dark, #3A2418)" />
      </g>

      {/* L2 — body */}
      {filled ? (
        <path d={OUTER} fill="url(#gun-body)" className="gun-body" />
      ) : null}

      {/* L3 — gold ornamental contours */}
      <g
        className="gun-gold"
        stroke="url(#gun-leaf)"
        strokeWidth={strokeWidth * 1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d={OUTER} strokeWidth={strokeWidth * 1.6} />
        <path d={INNER} opacity="0.85" />
        <path d={CORE} opacity="0.55" />
      </g>

      {/* L4 — inner floral tatahan */}
      <g
        className="gun-detail"
        stroke="url(#gun-leaf)"
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* kala / gapura gate */}
        <path d={`M${CX - 104} 470 h208`} opacity="0.9" />
        <path d={`M${CX - 92} 470 v${fmt(BASE - 470 - 6)} M${CX + 92} 470 v${fmt(BASE - 470 - 6)}`} />
        <path
          d={`M${CX - 62} ${BASE - 8} v-52 a62 62 0 0 1 124 0 v52`}
          opacity="0.8"
        />
        <path d={`M${CX - 40} ${BASE - 8} v-40 a40 40 0 0 1 80 0 v40`} opacity="0.55" />
        {/* gate carvings */}
        {DOTS_ARCH.map((d, i) => (
          <circle key={`da${i}`} cx={d.cx} cy={d.cy} r="1.5" fill="url(#gun-leaf)" stroke="none" opacity="0.75" />
        ))}
        {DOTS_MID.map((d, i) => (
          <circle key={`dm${i}`} cx={d.cx} cy={d.cy} r="1.2" fill="url(#gun-leaf)" stroke="none" opacity="0.6" />
        ))}

        {/* tree of life */}
        <g opacity="0.92">
          {TREE.map((d, i) => (
            <path key={`t${i}`} d={d} />
          ))}
        </g>

        {/* sulur scroll field */}
        <g opacity="0.62">
          {SULUR.map((d, i) => (
            <path key={`s${i}`} d={d} />
          ))}
        </g>

        {/* flanking wings / birds */}
        <path d={`M${CX - 116} 300 c-26 8 -42 26 -46 50 26-4 44-18 50-36`} opacity="0.7" />
        <path d={`M${CX + 116} 300 c26 8 42 26 46 50 -26-4 -44-18 -50-36`} opacity="0.7" />
        <path d={`M${CX - 128} 356 c-18 10 -28 26 -30 46 18-6 30-20 34-34`} opacity="0.45" />
        <path d={`M${CX + 128} 356 c18 10 28 26 30 46 -18-6 -30-20 -34-34`} opacity="0.45" />

        {/* crown lotus + rosette */}
        <path d={PETAL_RING(CX, 150, 20, 12, 26)} opacity="0.7" />
        <circle cx={CX} cy="150" r="7.5" />
        <circle cx={CX} cy="150" r="14" opacity="0.5" />
        <path d={`M${CX} ${TOP} c-8 20 -6 34 0 46 6-12 8-26 0-46`} />
        <path d={PETAL_RING(CX, 96, 12, 8, 17)} opacity="0.5" />
      </g>

      {/* L5 — highlight */}
      <g className="gun-highlight" opacity="0.35" fill="none" stroke="var(--gold-soft, #E3C98C)" strokeWidth={strokeWidth * 0.6}>
        <path d={INNER} strokeDasharray="6 22" />
      </g>

      {/* L7 — sparks */}
      <g className="gun-sparks" fill="var(--gold-soft, #E3C98C)">
        {[
          [CX - 70, 128],
          [CX + 74, 142],
          [CX - 118, 232],
          [CX + 122, 246],
          [CX - 46, 84],
          [CX + 52, 96],
        ].map(([x, y], i) => (
          <circle
            key={`sp${i}`}
            cx={x}
            cy={y}
            r={i % 2 ? 1.6 : 2.3}
            opacity="0.75"
            style={{ animation: `glow-pulse ${5 + i}s ease-in-out ${i * 0.6}s infinite` }}
          />
        ))}
      </g>
    </svg>
  );
}
