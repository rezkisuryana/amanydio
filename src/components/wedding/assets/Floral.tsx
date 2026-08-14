import { cn } from "@/lib/utils";

import { patra, seeded, smooth, sulur, type Pt } from "./geometry";

/**
 * Javanese botanical assets — melati, kantil (cempaka), kenanga and daun
 * sirih, drawn as fine engraved line art (one consistent visual family).
 */

/** Melati (jasmine) blossom — 5 slim petals with a small calyx. */
export function Melati({
  className,
  size = 26,
  strokeWidth = 0.8,
}: {
  className?: string | undefined;
  size?: number | undefined;
  strokeWidth?: number | undefined;
}) {
  const petals = Array.from({ length: 5 }, (_, i) => patra(24, 24, 15, 5.4, -90 + i * 72, 0.5));
  const inner = Array.from({ length: 5 }, (_, i) => patra(24, 24, 8, 3, -54 + i * 72, 0.6));
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn(className)}
      width={size}
      height={size}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" fill="none">
        {petals.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <g opacity="0.6">
          {inner.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <circle cx="24" cy="24" r="2.4" />
        <circle cx="24" cy="24" r="4.6" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Kantil / cempaka bloom with sirih leaves on a curving stem. */
export function KantilSprig({
  className,
  strokeWidth = 0.85,
  flip,
}: {
  className?: string | undefined;
  strokeWidth?: number | undefined;
  flip?: boolean | undefined;
}) {
  const stem: Pt[] = [
    [16, 300],
    [40, 246],
    [46, 190],
    [62, 138],
    [92, 92],
    [122, 58],
  ];
  const leaves: string[] = [];
  [
    [40, 246, 150],
    [46, 190, 26],
    [62, 138, 156],
    [92, 92, 20],
  ].forEach(([x, y, a]) => {
    // daun sirih (heart-shaped leaf approximated by two patra)
    leaves.push(patra(x!, y!, 52, 20, a!, 0.65));
    leaves.push(patra(x!, y!, 40, 13, a! + 22, 0.6));
  });

  return (
    <svg
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={smooth(stem)} strokeWidth={strokeWidth * 1.3} />
        <g opacity="0.9">
          {leaves.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {/* leaf veins */}
        <g opacity="0.45">
          <path d="M40 246 q24 -8 44 -26" />
          <path d="M46 190 q18 10 38 16" />
          <path d="M62 138 q22 -10 44 -26" />
        </g>
        {/* kantil bloom */}
        <g transform="translate(104 40) scale(1.15)">
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={patra(18, 18, 20, 6.5, -90 + i * 60, 0.55)} />
          ))}
          <circle cx="18" cy="18" r="3" />
        </g>
        {/* kenanga cluster */}
        <g opacity="0.8">
          {Array.from({ length: 5 }, (_, i) => (
            <path key={i} d={patra(140, 96, 26, 5, -20 + i * 26, 0.7)} />
          ))}
        </g>
        <path d={sulur(72, 218, 16, 2.1, 200, 1)} opacity="0.6" />
        <path d={sulur(34, 274, 13, 2, 160, -1)} opacity="0.5" />
      </g>
    </svg>
  );
}

/**
 * Corner composition: sulur scrollwork + sirih leaves + melati buds.
 * Replaces the old generic "floral ornament".
 */
export function FloralCorner({
  className,
  flipX,
  flipY,
  strokeWidth = 0.85,
}: {
  className?: string | undefined;
  flipX?: boolean | undefined;
  flipY?: boolean | undefined;
  strokeWidth?: number | undefined;
}) {
  const spine: Pt[] = [
    [4, 4],
    [58, 20],
    [104, 52],
    [138, 100],
    [156, 158],
  ];
  const items: string[] = [];
  [
    [58, 20, 118],
    [104, 52, 150],
    [138, 100, 176],
  ].forEach(([x, y, a]) => {
    items.push(patra(x!, y!, 46, 17, a!, 0.62));
    items.push(patra(x!, y!, 34, 11, a! - 30, 0.6));
    items.push(sulur(x! + 8, y! + 22, 14, 2, a! - 60, 1));
  });

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* carved corner rails */}
        <path d="M4 4h72M4 4v72" strokeWidth={strokeWidth * 1.3} />
        <path d="M12 12h48M12 12v48" opacity="0.6" />
        <path d={smooth(spine)} strokeWidth={strokeWidth * 1.2} />
        {items.map((d, i) => (
          <path key={i} d={d} opacity="0.9" />
        ))}
        <path d={sulur(46, 46, 22, 2.4, 40, 1)} opacity="0.7" />
        {/* melati buds */}
        <g opacity="0.85">
          {[
            [92, 26],
            [130, 66],
            [154, 122],
          ].map(([x, y], i) => (
            <g key={i}>
              {Array.from({ length: 5 }, (_, k) => (
                <path key={k} d={patra(x!, y!, 9, 3.2, -90 + k * 72, 0.5)} />
              ))}
              <circle cx={x} cy={y} r="1.4" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

/** Long vertical vine for section edges (replaces generic side ornament). */
export function SulurVine({
  className,
  flip,
  strokeWidth = 0.85,
}: {
  className?: string | undefined;
  flip?: boolean | undefined;
  strokeWidth?: number | undefined;
}) {
  const rnd = seeded(21);
  const spine: Pt[] = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13;
    return [30 + Math.sin(t * Math.PI * 2.4) * 26, t * 620] as Pt;
  });
  const decor: string[] = [];
  spine.forEach(([x, y], i) => {
    if (i === 0) return;
    const dir = i % 2 ? 1 : -1;
    decor.push(patra(x, y, 40 + rnd() * 22, 13, dir > 0 ? -18 : 198, 0.62));
    decor.push(patra(x, y, 26 + rnd() * 14, 8, dir > 0 ? -50 : 230, 0.6));
    if (i % 3 === 0) decor.push(sulur(x + dir * 26, y - 8, 13, 2, dir > 0 ? -20 : 200, dir > 0 ? 1 : -1));
  });
  return (
    <svg
      viewBox="0 0 120 640"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={smooth(spine)} strokeWidth={strokeWidth * 1.4} />
        {decor.map((d, i) => (
          <path key={i} d={d} opacity={i % 2 ? 0.6 : 0.9} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Floating melati field — recurring jasmine motif, slow float + rotation.
 * Purely additive (CSS transform/opacity only).
 */
export function MelatiField({
  count = 10,
  className,
  tone = "gold",
}: {
  count?: number | undefined;
  className?: string | undefined;
  tone?: "gold" | "cream" | "sogan";
}) {
  const rnd = seeded(97);
  const flowers = Array.from({ length: count }, () => ({
    left: rnd() * 100,
    top: rnd() * 100,
    size: 14 + rnd() * 20,
    dur: 14 + rnd() * 16,
    delay: rnd() * 10,
    opacity: 0.2 + rnd() * 0.35,
  }));
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        tone === "gold" ? "text-gold" : tone === "cream" ? "text-cream" : "text-sogan",
        className,
      )}
    >
      {flowers.map((f, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            opacity: f.opacity,
            animation: `melati-drift ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        >
          <Melati size={f.size} />
        </span>
      ))}
    </div>
  );
}
