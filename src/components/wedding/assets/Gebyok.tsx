import { cn } from "@/lib/utils";

import { dotRow, fmt, patra, sulur } from "./geometry";

/**
 * Gebyok — carved Javanese (Jepara) teak partition panel. Built from a
 * generated lattice of carved medallions so the panel reads as real ukiran
 * rather than a plain border.
 */
export function GebyokPanel({
  className,
  side = "left",
  units = 6,
  strokeWidth = 0.9,
}: {
  className?: string | undefined;
  side?: "left" | "right";
  units?: number | undefined;
  strokeWidth?: number | undefined;
}) {
  const W = 160;
  const unitH = 150;
  const H = unitH * units + 120;

  const carvings: string[] = [];
  for (let i = 0; i < units; i++) {
    const y0 = 60 + i * unitH;
    const cy = y0 + unitH / 2;
    // medallion: 4 mirrored sulur + patra rosette
    carvings.push(sulur(W / 2 - 26, cy - 22, 20, 2.2, 200, 1));
    carvings.push(sulur(W / 2 + 26, cy - 22, 20, 2.2, -20, -1));
    carvings.push(sulur(W / 2 - 26, cy + 22, 20, 2.2, 160, -1));
    carvings.push(sulur(W / 2 + 26, cy + 22, 20, 2.2, 20, 1));
    for (let k = 0; k < 8; k++) {
      carvings.push(patra(W / 2, cy, 30, 9, (360 / 8) * k, 0.5));
    }
    carvings.push(patra(W / 2, y0 + 12, 26, 7, 90, 0.45));
    carvings.push(patra(W / 2, y0 + unitH - 12, 26, 7, -90, 0.45));
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <linearGradient id={`gb-wood-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--java-dark, #3A2418)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--java-brown, #5A3825)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--sogan, #8A5A35)" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`gb-gold-${side}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold-soft, #E3C98C)" />
          <stop offset="55%" stopColor="var(--gold, #C7A35A)" />
          <stop offset="100%" stopColor="var(--gold, #C7A35A)" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* wood body */}
      <rect x="6" y="6" width={W - 12} height={H - 12} fill={`url(#gb-wood-${side})`} />
      {/* wood grain */}
      <g stroke="var(--java-dark, #3A2418)" strokeWidth="0.5" opacity="0.25">
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={i}
            d={`M${fmt(12 + i * 10)} 8 C${fmt(10 + i * 10)} ${H * 0.3} ${fmt(16 + i * 10)} ${H * 0.7} ${fmt(12 + i * 10)} ${H - 8}`}
          />
        ))}
      </g>

      {/* frame rails */}
      <g stroke={`url(#gb-gold-${side})`} strokeWidth={strokeWidth * 1.4} fill="none">
        <rect x="6" y="6" width={W - 12} height={H - 12} />
        <rect x="20" y="22" width={W - 40} height={H - 44} opacity="0.7" />
        <rect x="28" y="32" width={W - 56} height={H - 64} opacity="0.4" />
      </g>

      {/* carved panels */}
      <g stroke={`url(#gb-gold-${side})`} strokeWidth={strokeWidth * 0.7} fill="none" strokeLinecap="round" opacity="0.75">
        {carvings.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {Array.from({ length: units - 1 }, (_, i) => (
          <path key={`sep${i}`} d={`M28 ${60 + (i + 1) * unitH} h${W - 56}`} opacity="0.5" />
        ))}
      </g>

      {/* drilled dots along rails */}
      <g fill={`url(#gb-gold-${side})`} opacity="0.6">
        {dotRow(13, 30, 13, H - 30, units * 6).map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="1.1" />
        ))}
      </g>
    </svg>
  );
}

/**
 * Gebyok doorway: left + right carved posts plus a carved lintel, wrapping
 * arbitrary content.
 */
export function GebyokFrame({
  children,
  className,
  panelClassName,
}: {
  children: React.ReactNode;
  className?: string | undefined;
  panelClassName?: string | undefined;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-10 opacity-70 sm:w-16 lg:w-24",
          panelClassName,
        )}
      >
        <GebyokPanel side="left" />
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-10 opacity-70 sm:w-16 lg:w-24",
          panelClassName,
        )}
      >
        <GebyokPanel side="right" />
      </div>
      <div className="relative px-12 sm:px-20 lg:px-28">{children}</div>
    </div>
  );
}

/** Carved lintel (top rail of a gebyok) — good as a section cap. */
export function GebyokLintel({ className }: { className?: string }) {
  const W = 900;
  const items: string[] = [];
  const n = 11;
  for (let i = 0; i < n; i++) {
    const cx = (W / n) * (i + 0.5);
    items.push(sulur(cx - 16, 44, 14, 2, 200, 1));
    items.push(sulur(cx + 16, 44, 14, 2, -20, -1));
    items.push(patra(cx, 44, 22, 6, -90, 0.45));
    items.push(patra(cx, 44, 22, 6, 90, 0.45));
  }
  return (
    <svg viewBox={`0 0 ${W} 96`} fill="none" preserveAspectRatio="none" aria-hidden="true" className={cn("h-full w-full", className)}>
      <rect x="0" y="8" width={W} height="80" fill="var(--java-brown, #5A3825)" opacity="0.18" />
      <g stroke="var(--gold, #C7A35A)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.8">
        <path d={`M0 10 H${W} M0 86 H${W}`} />
        <path d={`M0 20 H${W}`} opacity="0.5" />
        <path d={`M0 76 H${W}`} opacity="0.5" />
        {items.map((d, i) => (
          <path key={i} d={d} opacity="0.7" />
        ))}
      </g>
    </svg>
  );
}
