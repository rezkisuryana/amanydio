import { cn } from "@/lib/utils";

import { Melati } from "./Floral";
import { dotRow, fmt, patra, smooth, sulur, type Pt } from "./geometry";

/**
 * JavaneseDivider — five distinct traditional dividers so no two sections
 * repeat the same separator.
 *
 *  01 gunungan-mini · 02 batik-ornament · 03 melati · 04 gold-rail · 05 wayang
 */
export type DividerVariant =
  | "gunungan"
  | "batik"
  | "melati"
  | "rail"
  | "wayang";

export function JavaneseDivider({
  variant = "gunungan",
  tone = "gold",
  className,
}: {
  variant?: DividerVariant;
  tone?: "gold" | "cream" | "sogan";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto flex w-full max-w-sm items-center gap-3 sm:max-w-md",
        tone === "gold" ? "text-gold" : tone === "cream" ? "text-cream/75" : "text-sogan",
        className,
      )}
    >
      <Rail side="left" />
      <span className="shrink-0">{CENTER[variant]}</span>
      <Rail side="right" />
    </div>
  );
}

function Rail({ side }: { side: "left" | "right" }) {
  return (
    <span className="relative h-4 flex-1">
      <svg
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full"
        style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}
      >
        <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none">
          <path d="M0 12 H196" opacity="0.55" />
          <path d="M40 12 q22 -9 44 0 q22 9 44 0" opacity="0.75" />
          {[
            [96, 12],
            [140, 12],
            [176, 12],
          ].map(([x, y], i) => (
            <path key={i} d={patra(x!, y!, 14, 4.5, 0, 0.55)} opacity={0.8 - i * 0.18} />
          ))}
          {dotRow(8, 12, 36, 12, 4).map((d, i) => (
            <circle key={`d${i}`} cx={d.cx} cy={d.cy} r="1.1" fill="currentColor" stroke="none" opacity="0.6" />
          ))}
        </g>
      </svg>
    </span>
  );
}

const CENTER: Record<DividerVariant, React.ReactNode> = {
  gunungan: <GununganMini />,
  batik: <BatikMedallion />,
  melati: <MelatiTriad />,
  rail: <GoldKnot />,
  wayang: <WayangCrest />,
};

function GununganMini() {
  return (
    <svg viewBox="0 0 60 72" fill="none" className="h-12 w-10">
      <g stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" fill="none">
        <path d="M30 3c4 12 9 19 15 27 6 9 8 19 5 28-3 10-11 16-20 16s-17-6-20-16c-3-9-1-19 5-28 6-8 11-15 15-27Z" />
        <path d="M30 11c3 10 7 16 12 23 5 7 7 15 5 22-3 8-9 13-17 13s-14-5-17-13c-2-7 0-15 5-22 5-7 9-13 12-23Z" opacity="0.6" />
        <path d="M30 26v40" />
        <path d={patra(30, 40, 13, 4, 200, 0.5)} />
        <path d={patra(30, 40, 13, 4, -20, 0.5)} />
        <path d={patra(30, 52, 10, 3.4, 206, 0.5)} opacity="0.7" />
        <path d={patra(30, 52, 10, 3.4, -26, 0.5)} opacity="0.7" />
        <circle cx="30" cy="22" r="2.6" />
      </g>
    </svg>
  );
}

function BatikMedallion() {
  const petals = Array.from({ length: 8 }, (_, i) => patra(30, 30, 20, 6.5, (360 / 8) * i, 0.5));
  const inner = Array.from({ length: 8 }, (_, i) => patra(30, 30, 11, 4, 22.5 + (360 / 8) * i, 0.55));
  return (
    <svg viewBox="0 0 60 60" fill="none" className="h-11 w-11">
      <g stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" fill="none">
        {petals.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <g opacity="0.65">
          {inner.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <circle cx="30" cy="30" r="3" />
        {[0, 1, 2, 3].map((i) => (
          <path key={`s${i}`} d={sulur(30 + Math.cos((i * Math.PI) / 2) * 24, 30 + Math.sin((i * Math.PI) / 2) * 24, 7, 1.7, i * 90, 1)} opacity="0.55" />
        ))}
      </g>
    </svg>
  );
}

function MelatiTriad() {
  return (
    <span className="flex items-end gap-1.5">
      <Melati size={16} className="opacity-70" />
      <Melati size={26} />
      <Melati size={16} className="opacity-70" />
    </span>
  );
}

function GoldKnot() {
  const loops: Pt[] = Array.from({ length: 26 }, (_, i) => {
    const t = i / 25;
    return [6 + t * 84, 20 + Math.sin(t * Math.PI * 3) * 11] as Pt;
  });
  return (
    <svg viewBox="0 0 96 40" fill="none" className="h-8 w-24">
      <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none">
        <path d={smooth(loops)} />
        <path d={smooth(loops.map(([x, y]) => [x, 40 - y] as Pt))} opacity="0.6" />
        <path d={patra(48, 20, 15, 5, 0, 0.5)} />
        <path d={patra(48, 20, 15, 5, 180, 0.5)} />
        <circle cx="48" cy="20" r="2.4" />
      </g>
    </svg>
  );
}

function WayangCrest() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="h-12 w-16">
      <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* two facing wayang crowns */}
        <path d="M26 60c-6-14-4-26 2-36 4-7 4-13-1-18-5-6-4-13 2-16 6-3 12 0 13 6 1 5-1 9-5 12 7 5 11 12 11 21" />
        <path d="M54 60c6-14 4-26-2-36-4-7-4-13 1-18 5-6 4-13-2-16-6-3-12 0-13 6-1 5 1 9 5 12-7 5-11 12-11 21" />
        <path d={`M40 30 ${patra(40, 30, 12, 4, -90, 0.5).slice(1)}`} opacity="0.8" />
        <path d={`M${fmt(20)} 60 H60`} opacity="0.5" />
        <circle cx="40" cy="16" r="2" />
      </g>
    </svg>
  );
}
