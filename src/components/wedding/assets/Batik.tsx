import { useId } from "react";

import { cn } from "@/lib/utils";

import { patra, smooth, sulur, type Pt } from "./geometry";

export type BatikVariant = "parang" | "kawung" | "truntum" | "sidomukti";

/**
 * Batik motifs as real tiled SVG patterns (not flat CSS stripes):
 *  · kawung     — four-lobed aren palm ovals, subtle background
 *  · parang     — diagonal klithik blades, used for dividers/transitions
 *  · truntum    — star-jasmine sprinkle, the wedding motif
 *  · sidomukti  — lattice with ceplok medallions, closing/gift
 */
export function BatikPattern({
  variant = "parang",
  className,
  opacity = 0.12,
  scale = 1,
}: {
  variant?: BatikVariant;
  className?: string;
  opacity?: number;
  scale?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const id = `batik-${variant}-${uid}`;
  const size = TILE[variant] * scale;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity }}
    >
      <svg className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
            <g
              transform={`scale(${size / TILE[variant]})`}
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              {TILES[variant]}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

const TILE: Record<BatikVariant, number> = {
  parang: 96,
  kawung: 80,
  truntum: 72,
  sidomukti: 88,
};

const parangBlade = (dx: number, dy: number, s = 1) => {
  const pts: Pt[] = Array.from({ length: 18 }, (_, i) => {
    const t = i / 17;
    return [dx + (10 + t * 46) * s, dy + (52 - t * 46 + Math.sin(t * Math.PI) * 9) * s] as Pt;
  });
  return smooth(pts);
};

const TILES: Record<BatikVariant, React.ReactNode> = {
  parang: (
    <>
      {[0, 48].map((o) => (
        <g key={o} transform={`translate(${o} ${o})`}>
          <path d={parangBlade(0, 0)} strokeWidth="1.5" />
          <path d={parangBlade(8, 8)} opacity="0.7" />
          <path d={parangBlade(-8, -8)} opacity="0.45" />
          <path d={sulur(30, 26, 8, 1.8, 200, 1)} opacity="0.6" />
          <circle cx="16" cy="42" r="1.3" fill="currentColor" stroke="none" opacity="0.7" />
          <circle cx="44" cy="14" r="1.3" fill="currentColor" stroke="none" opacity="0.7" />
        </g>
      ))}
    </>
  ),
  kawung: (
    <>
      {[
        [20, 20],
        [60, 20],
        [20, 60],
        [60, 60],
        [40, 40],
      ].map(([cx, cy], i) => (
        <g key={i} opacity={i === 4 ? 0.6 : 1}>
          {[0, 90, 180, 270].map((a) => (
            <path key={a} d={patra(cx!, cy!, 17, 8.5, a, 0.9)} />
          ))}
          <circle cx={cx} cy={cy} r="2.2" />
          <path d={`M${cx! - 4} ${cy! - 4} l8 8 M${cx! + 4} ${cy! - 4} l-8 8`} opacity="0.5" />
        </g>
      ))}
    </>
  ),
  truntum: (
    <>
      {[
        [18, 18],
        [54, 54],
        [54, 18],
        [18, 54],
        [36, 36],
      ].map(([cx, cy], i) => (
        <g key={i} opacity={i === 4 ? 0.85 : 1}>
          {Array.from({ length: 8 }, (_, k) => (
            <path key={k} d={`M${cx} ${cy} l${Math.cos((k * Math.PI) / 4) * 8} ${Math.sin((k * Math.PI) / 4) * 8}`} />
          ))}
          {Array.from({ length: 4 }, (_, k) => (
            <path key={`p${k}`} d={patra(cx!, cy!, 11, 3.6, 45 + k * 90, 0.5)} opacity="0.7" />
          ))}
          <circle cx={cx} cy={cy} r="1.6" fill="currentColor" stroke="none" />
        </g>
      ))}
      <g opacity="0.45" fill="currentColor" stroke="none">
        {[
          [36, 8],
          [8, 36],
          [64, 36],
          [36, 64],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.2" />
        ))}
      </g>
    </>
  ),
  sidomukti: (
    <>
      <path d="M0 44 L44 0 L88 44 L44 88 Z" opacity="0.55" />
      <path d="M14 44 L44 14 L74 44 L44 74 Z" opacity="0.35" />
      {[
        [44, 44],
        [0, 0],
        [88, 0],
        [0, 88],
        [88, 88],
      ].map(([cx, cy], i) => (
        <g key={i}>
          {Array.from({ length: 6 }, (_, k) => (
            <path key={k} d={patra(cx!, cy!, 13, 4.6, k * 60, 0.55)} opacity="0.8" />
          ))}
          <circle cx={cx} cy={cy} r="2" />
        </g>
      ))}
      {[
        [22, 22],
        [66, 22],
        [22, 66],
        [66, 66],
      ].map(([cx, cy], i) => (
        <path key={`s${i}`} d={sulur(cx!, cy!, 7, 1.7, i * 90, i % 2 ? 1 : -1)} opacity="0.5" />
      ))}
    </>
  ),
};

/** Batik ribbon divider between sections (kept API-compatible). */
export function BatikRibbon({
  variant = "truntum",
  className,
}: {
  variant?: BatikVariant;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("relative h-16 w-full overflow-hidden text-sogan", className)}>
      <BatikPattern variant={variant} opacity={0.3} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}
