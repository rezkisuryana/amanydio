import { cn } from "@/lib/utils";

import { dotRow, fmt, patra, poly, sulur, type Pt } from "./geometry";

/**
 * Pendopo Joglo — traditional Javanese architectural line art with the
 * signature tajug roof, tumpang sari ceiling tiers, saka guru pillars and
 * carved brackets.
 */
export function JogloLineArt({
  className,
  strokeWidth = 1,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  const CX = 480;

  // roof tiers: [halfWidth, yTop, yBottom]
  const tiers: Array<[number, number, number]> = [
    [72, 34, 86],
    [150, 86, 132],
    [252, 132, 186],
    [368, 186, 250],
  ];

  const tileLines: string[] = [];
  tiers.forEach(([hw, y0, y1]) => {
    const n = Math.round(hw / 13);
    for (let i = 1; i < n; i++) {
      const t = i / n;
      tileLines.push(
        `M${fmt(CX - hw * t * 0.62)} ${fmt(y0 + (y1 - y0) * 0.15)} L${fmt(CX - hw * t)} ${fmt(y1)}`,
      );
      tileLines.push(
        `M${fmt(CX + hw * t * 0.62)} ${fmt(y0 + (y1 - y0) * 0.15)} L${fmt(CX + hw * t)} ${fmt(y1)}`,
      );
    }
  });

  const pillars = [-300, -186, -70, 70, 186, 300];
  const brackets: string[] = [];
  pillars.forEach((dx) => {
    brackets.push(sulur(CX + dx - 14, 272, 11, 1.9, 200, 1));
    brackets.push(sulur(CX + dx + 14, 272, 11, 1.9, -20, -1));
    brackets.push(patra(CX + dx, 300, 22, 6, -90, 0.4));
  });

  return (
    <svg viewBox="0 0 960 520" fill="none" aria-hidden="true" className={cn("h-full w-full", className)}>
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* roof tiers */}
        {tiers.map(([hw, y0, y1], i) => (
          <g key={i} opacity={0.95 - i * 0.06}>
            <path d={poly([[CX, y0] as Pt, [CX + hw, y1] as Pt, [CX - hw, y1] as Pt])} />
            <path d={`M${fmt(CX - hw - 10)} ${fmt(y1)} h${fmt(2 * hw + 20)}`} />
            <path d={`M${fmt(CX - hw - 4)} ${fmt(y1 + 8)} h${fmt(2 * hw + 8)}`} opacity="0.7" />
          </g>
        ))}
        <g opacity="0.35">
          {tileLines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* roof finial (mustaka) */}
        <path d={`M${CX} 34 c-7 16 -6 27 0 36 6-9 7-20 0-36`} />
        <path d={patra(CX, 22, 20, 6, -90, 0.4)} />

        {/* tumpang sari inner ceiling suggestion */}
        <g opacity="0.45">
          {[0, 1, 2].map((i) => (
            <rect key={i} x={CX - 108 + i * 22} y={196 + i * 12} width={216 - i * 44} height={12} rx="1" />
          ))}
        </g>

        {/* pillars (saka guru) */}
        {pillars.map((dx, i) => (
          <g key={i}>
            <path d={`M${fmt(CX + dx - 7)} 258 v198 M${fmt(CX + dx + 7)} 258 v198`} />
            <path d={`M${fmt(CX + dx - 13)} 452 h26 M${fmt(CX + dx - 17)} 462 h34`} />
            <path d={`M${fmt(CX + dx - 12)} 268 h24`} opacity="0.6" />
          </g>
        ))}
        <g opacity="0.6">
          {brackets.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* platform */}
        <path d={`M96 462 H864 M78 474 H882 M64 486 H896`} />
        <g opacity="0.4">
          {dotRow(96, 480, 864, 480, 48).map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="1.2" fill="currentColor" stroke="none" />
          ))}
        </g>

        {/* gebyok back wall + doorway */}
        <path d={`M${CX - 148} 452 v-140 h296 v140`} opacity="0.55" />
        <path d={`M${CX - 60} 452 v-84 a60 60 0 0 1 120 0 v84`} opacity="0.5" />
        <g opacity="0.4">
          {[-112, -76, 76, 112].map((dx, i) => (
            <path key={i} d={sulur(CX + dx, 360, 15, 2, i % 2 ? 200 : -20, i % 2 ? 1 : -1)} />
          ))}
        </g>

        {/* lanterns */}
        <path d={`M${CX - 236} 258 v34 M${CX + 236} 258 v34`} opacity="0.5" />
        <path d={`M${CX - 244} 292 h16 l-4 16 h-8 z M${CX + 228} 292 h16 l-4 16 h-8 z`} opacity="0.5" />
      </g>
    </svg>
  );
}
