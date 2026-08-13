import { cn } from "@/lib/utils";

type SvgProps = { className?: string; strokeWidth?: number };

/**
 * Gunungan — the wayang "mountain" ornament. Elegant line-art silhouette.
 */
export function Gunungan({ className, strokeWidth = 1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 300 460"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="gun-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
          <stop offset="45%" stopColor="var(--gold-soft)" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#gun-gold)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* outer silhouette */}
        <path d="M150 8c14 34 26 52 44 74 26 32 44 62 52 96 9 38 6 74-10 106-14 28-36 48-64 60-9 4-14 10-16 20h-12c-2-10-7-16-16-20-28-12-50-32-64-60-16-32-19-68-10-106 8-34 26-64 52-96 18-22 30-40 44-74Z" />
        <path
          d="M150 26c12 30 23 46 39 66 24 29 40 56 47 87 8 34 5 66-9 95-13 25-32 43-58 54-8 4-13 9-15 17h-8c-2-8-7-13-15-17-26-11-45-29-58-54-14-29-17-61-9-95 7-31 23-58 47-87 16-20 27-36 39-66Z"
          opacity="0.55"
        />
        {/* kalpataru tree of life */}
        <path d="M150 108v250" />
        <path d="M150 168c-16-6-28-18-32-34 16 2 28 12 32 26M150 168c16-6 28-18 32-34-16 2-28 12-32 26" />
        <path d="M150 216c-22-6-38-22-44-44 22 4 38 16 44 34M150 216c22-6 38-22 44-44-22 4-38 16-44 34" />
        <path d="M150 268c-26-6-44-24-52-48 26 4 44 18 52 38M150 268c26-6 44-24 52-48-26 4-44 18-52 38" />
        {/* gapura / gate */}
        <path d="M104 322h92M112 322v42h76v-42" opacity="0.8" />
        <path d="M126 364v-26a24 24 0 0 1 48 0v26" opacity="0.7" />
        {/* wings / birds */}
        <path d="M92 250c-18 4-30 16-34 32 18-2 30-12 34-24M208 250c18 4 30 16 34 32-18-2-30-12-34-24" opacity="0.7" />
        {/* crown flame */}
        <path d="M150 8c-6 14-4 24 0 32 4-8 6-18 0-32" />
        <circle cx="150" cy="96" r="7" opacity="0.85" />
        <circle cx="150" cy="96" r="14" opacity="0.4" />
      </g>
    </svg>
  );
}

/** Floral / sulur ornament used on left & right edges. */
export function FloralOrnament({ className, strokeWidth = 1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 420"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 6c34 40 52 84 58 132 6 52-4 104-30 152-12 22-20 44-22 66" />
        <path d="M64 138c26-14 46-12 62 6-20 14-42 14-62-6ZM74 196c28-8 48-2 60 20-22 10-44 6-60-20ZM58 92c22-18 42-20 62-6-16 18-38 22-62 6Z" />
        <path d="M40 258c26-4 44 6 54 30-24 6-44-4-54-30ZM26 316c24-2 40 10 48 34-22 4-40-8-48-34Z" opacity="0.8" />
        <g opacity="0.85">
          <circle cx="70" cy="120" r="4" />
          <circle cx="84" cy="180" r="3.4" />
          <circle cx="52" cy="244" r="3.4" />
          <circle cx="34" cy="302" r="3" />
        </g>
        <path d="M6 6c12 6 20 16 24 30" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Ornamental divider: gold line + batik lozenge + melati. */
export function OrnamentalDivider({
  className,
  tone = "gold",
}: {
  className?: string;
  tone?: "gold" | "cream";
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-xs items-center gap-3 sm:max-w-sm",
        tone === "gold" ? "text-gold" : "text-cream/70",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current opacity-70" />
      <svg viewBox="0 0 80 40" className="h-8 w-16 shrink-0" fill="none">
        <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
          <path d="M40 4c8 8 14 12 20 16-6 4-12 8-20 16-8-8-14-12-20-16 6-4 12-8 20-16Z" />
          <path d="M40 12c4 5 7 7 10 8-3 1-6 3-10 8-4-5-7-7-10-8 3-1 6-3 10-8Z" opacity="0.7" />
          <circle cx="12" cy="20" r="2.6" />
          <circle cx="68" cy="20" r="2.6" />
          <path d="M18 20h4M58 20h4" opacity="0.8" />
        </g>
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current opacity-70" />
    </div>
  );
}

/** Joglo pendopo line art. */
export function JogloLineArt({ className, strokeWidth = 1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 600 300"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M300 14 214 74h172L300 14Z" />
        <path d="M204 78h192l-14 12H218l-14-12Z" />
        <path d="M300 92v22" />
        <path d="M120 150 300 92l180 58H120Z" />
        <path d="M104 156h392l-16 14H120l-16-14Z" />
        <path d="M150 170v104M210 170v104M390 170v104M450 170v104M300 176v98" opacity="0.9" />
        <path d="M120 274h360" />
        <path d="M100 282h400M92 292h416" />
        <path d="M240 274v-56h120v56" opacity="0.7" />
        <path d="M264 274v-34a36 36 0 0 1 72 0v34" opacity="0.6" />
        <path d="M150 196h60M390 196h60" opacity="0.6" />
        <path d="M40 292h60M500 292h60" opacity="0.5" />
        <path d="M300 14c-4 8-3 14 0 18 3-4 4-10 0-18" />
      </g>
    </svg>
  );
}

/** Corner ukiran (wood carving) ornament. */
export function CornerOrnament({
  className,
  flipX,
  flipY,
}: SvgProps & { flipX?: boolean; flipY?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h44M4 4v44" />
        <path d="M10 10h26M10 10v26" opacity="0.7" />
        <path d="M14 46c18 0 32-14 32-32" opacity="0.6" />
        <path d="M46 30c14 2 24 12 26 26-14-2-24-12-26-26Z" />
        <path d="M30 46c2 14 12 24 26 26-2-14-12-24-26-26Z" />
        <circle cx="48" cy="48" r="3" />
      </g>
    </svg>
  );
}

/** Wayang couple silhouette (stylised line art). */
export function WayangPair({ className, strokeWidth = 1 }: SvgProps) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* left figure */}
        <path d="M108 274c-10-38-6-72 6-104 8-22 6-38-6-52-10-12-10-26 2-34 10-7 22-4 27 7 4 9 1 17-6 24 12 8 20 20 22 36 3 22-4 40-14 56-12 20-16 44-11 67" />
        <path d="M112 120c-18 6-30 20-34 40 16-2 28-12 34-26" opacity="0.8" />
        <path d="M131 84c8-4 15-2 20 6-8 4-16 2-20-6Z" />
        {/* right figure */}
        <path d="M212 274c10-38 6-72-6-104-8-22-6-38 6-52 10-12 10-26-2-34-10-7-22-4-27 7-4 9-1 17 6 24-12 8-20 20-22 36-3 22 4 40 14 56 12 20 16 44 11 67" />
        <path d="M208 120c18 6 30 20 34 40-16-2-28-12-34-26" opacity="0.8" />
        <path d="M189 84c-8-4-15-2-20 6 8 4 16 2 20-6Z" />
        {/* joining flower */}
        <path d="M160 170c6 8 10 12 16 16-6 4-10 8-16 16-6-8-10-12-16-16 6-4 10-8 16-16Z" />
        <path d="M60 274h200" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Batik pattern layer, low opacity. */
export function BatikPattern({
  variant = "parang",
  className,
  opacity = 0.12,
}: {
  variant?: "parang" | "kawung" | "truntum" | "sidomukti";
  className?: string;
  opacity?: number;
}) {
  const map = {
    parang: "batik-parang",
    kawung: "batik-kawung",
    truntum: "batik-truntum",
    sidomukti: "batik-sidomukti",
  } as const;
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", map[variant], className)}
      style={{ opacity }}
    />
  );
}

/** Batik ribbon divider between sections. */
export function BatikRibbon({
  variant = "truntum",
  className,
}: {
  variant?: "parang" | "kawung" | "truntum" | "sidomukti";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-14 w-full overflow-hidden", className)}
    >
      <BatikPattern variant={variant} opacity={0.22} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}
