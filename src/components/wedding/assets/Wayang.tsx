import { cn } from "@/lib/utils";

import { dotRow, patra, smooth, sulur, type Pt } from "./geometry";

/**
 * Traditional wayang kulit silhouettes — slim, stylised, bowed-head profile
 * (halus character type). Dark brown leather body, gold tatahan piercing.
 */

type WayangProps = { className?: string; strokeWidth?: number };

const goldDefs = (id: string) => (
  <defs>
    <linearGradient id={`${id}-leather`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="var(--java-dark, #3A2418)" />
      <stop offset="60%" stopColor="var(--java-brown, #5A3825)" />
      <stop offset="100%" stopColor="var(--sogan, #8A5A35)" />
    </linearGradient>
    <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="var(--gold-soft, #E3C98C)" />
      <stop offset="50%" stopColor="var(--gold, #C7A35A)" />
      <stop offset="100%" stopColor="var(--gold-soft, #E3C98C)" stopOpacity="0.85" />
    </linearGradient>
  </defs>
);

/** batik-patterned dodot (wrap) filigree, generated */
function DodotFiligree({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  const rows = 7;
  const items: string[] = [];
  for (let r = 0; r < rows; r++) {
    const yy = y + (h / rows) * (r + 0.5);
    const cols = 3;
    for (let c = 0; c < cols; c++) {
      const xx = x + (w / cols) * (c + 0.5) + (r % 2 ? w / (cols * 2.4) : 0);
      items.push(sulur(xx, yy, 6.5, 1.6, r % 2 ? 200 : 20, r % 2 ? 1 : -1, 44));
      items.push(patra(xx, yy, 11, 3.4, r % 2 ? -50 : 130, 0.5));
    }
  }
  return (
    <g stroke={`url(#${id}-gold)`} strokeWidth="0.6" fill="none" opacity="0.55">
      {items.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}

/** Groom — male halus wayang, kuluk/gelung crown, keris at back. */
export function WayangGroom({ className, strokeWidth = 0.9 }: WayangProps) {
  const id = "wg";
  return (
    <svg viewBox="0 0 260 640" fill="none" aria-hidden="true" className={cn("h-full w-full", className)}>
      {goldDefs(id)}

      {/* body silhouette */}
      <g fill={`url(#${id}-leather)`}>
        {/* torso + dodot */}
        <path d="M112 168c-14 12-22 30-26 52-5 30-4 60 2 90 5 26 4 52-4 78-8 24-12 50-10 76 1 20 6 38 14 54h96c-10-20-14-42-13-66 1-30 8-58 12-88 4-30 2-58-6-84-8-26-22-46-40-60-8-6-16-10-25-12Z" />
        {/* head + crown */}
        <path d="M120 60c-14 2-24 12-27 26-2 12 2 22 12 30-10 6-16 14-18 26 12 4 24 2 34-6 6-4 12-6 18-4 8 2 12 8 12 16 0 10-8 16-18 16-6 0-10-2-14-6-4 12 2 22 14 26 14 4 26-2 32-14 8-16 6-34-4-48-6-8-8-14-6-22 2-10 10-16 20-18-8-14-22-22-38-22-6 0-12 0-17 0Z" />
        {/* crown gelung + jamang */}
        <path d="M140 44c10-10 22-14 36-10-4 10-12 18-24 22 12 0 22 4 30 12-12 6-24 6-36 0 6 8 8 16 6 24-10-4-16-12-18-22-2-10 0-18 6-26Z" />
        {/* nose profile + chin */}
        <path d="M96 104c-14 4-24 10-30 20 12 4 24 2 34-6l-4-14Z" />
        {/* arms */}
        <path d="M108 196c-20 6-34 22-42 46-8 26-6 52 6 76 8-24 10-48 18-70 6-18 14-32 26-42l-8-10Z" />
        <path d="M170 200c18 10 30 28 34 54 4 24 0 48-10 70-4-26-6-50-14-72-6-18-14-32-24-42l14-10Z" />
        {/* keris */}
        <path d="M186 214c8-6 16-8 24-6-4 10-10 18-18 24l-6-18Z" />
      </g>

      {/* gold tatahan */}
      <g stroke={`url(#${id}-gold)`} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M120 60c-14 2-24 12-27 26-2 12 2 22 12 30-10 6-16 14-18 26" opacity="0.9" />
        <path d="M140 44c10-10 22-14 36-10-4 10-12 18-24 22 12 0 22 4 30 12-12 6-24 6-36 0" />
        <circle cx="124" cy="86" r="2.6" fill={`url(#${id}-gold)`} stroke="none" />
        <path d={smooth([[108, 150] as Pt, [140, 158] as Pt, [172, 150] as Pt])} opacity="0.8" />
        <path d={smooth([[104, 168] as Pt, [140, 178] as Pt, [178, 168] as Pt])} opacity="0.6" />
        {dotRow(104, 160, 176, 160, 12).map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="1.1" fill={`url(#${id}-gold)`} stroke="none" opacity="0.8" />
        ))}
        <path d="M96 520h96" opacity="0.7" />
        {dotRow(98, 530, 190, 530, 16).map((d, i) => (
          <circle key={`b${i}`} cx={d.cx} cy={d.cy} r="1" fill={`url(#${id}-gold)`} stroke="none" opacity="0.6" />
        ))}
        <path d={patra(140, 300, 44, 11, -90, 0.5)} opacity="0.5" />
      </g>

      <DodotFiligree id={id} x={96} y={330} w={100} h={180} />
    </svg>
  );
}

/** Bride — female wayang (putri), gelung keling, slender bowed posture. */
export function WayangBride({ className, strokeWidth = 0.9 }: WayangProps) {
  const id = "wb";
  return (
    <svg viewBox="0 0 260 640" fill="none" aria-hidden="true" className={cn("h-full w-full", className)}>
      {goldDefs(id)}

      <g fill={`url(#${id}-leather)`}>
        <path d="M148 170c14 12 22 30 26 54 5 32 2 62-6 92-7 26-8 52-2 78 6 26 8 52 4 76h-96c8-20 12-42 12-66 0-30-6-58-8-88-2-30 2-58 12-84 10-24 24-42 42-54 6-4 12-6 16-8Z" />
        {/* head + gelung */}
        <path d="M136 62c14 2 24 12 26 26 2 12-2 22-12 30 10 6 16 14 18 26-12 4-24 2-34-6-6-4-12-6-18-4-8 2-12 8-12 16 0 10 8 16 18 16 6 0 10-2 14-6 4 12-2 22-14 26-14 4-26-2-32-14-8-16-6-34 4-48 6-8 8-14 6-22-2-10-10-16-20-18 8-14 22-22 38-22 6 0 12 0 18 0Z" />
        {/* gelung keling bun */}
        <path d="M160 52c14-6 26-4 36 6-10 8-22 10-34 6 10 8 16 18 16 30-12-4-20-12-24-24-4-8-2-14 6-18Z" />
        <path d="M170 92c12 2 20 10 24 22-12 2-22-2-28-12l4-10Z" />
        {/* sanggul flowers (melati chain) */}
        <g fill="var(--gold-soft, #E3C98C)" opacity="0.85">
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={182 + Math.sin(i * 0.9) * 6} cy={104 + i * 15} r={2.4 - i * 0.1} />
          ))}
        </g>
        {/* arms */}
        <path d="M150 198c20 8 34 26 40 52 6 26 2 52-10 74-4-26-6-50-14-72-6-18-14-32-24-44l8-10Z" />
        <path d="M92 204c-18 12-28 32-30 58-2 24 4 46 16 66 2-26 2-50 8-72 5-18 12-34 22-44l-16-8Z" />
      </g>

      <g stroke={`url(#${id}-gold)`} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M136 62c14 2 24 12 26 26 2 12-2 22-12 30 10 6 16 14 18 26" opacity="0.9" />
        <path d="M160 52c14-6 26-4 36 6-10 8-22 10-34 6" />
        <circle cx="134" cy="88" r="2.6" fill={`url(#${id}-gold)`} stroke="none" />
        <path d={smooth([[88, 152] as Pt, [126, 162] as Pt, [162, 152] as Pt])} opacity="0.8" />
        <path d={smooth([[84, 172] as Pt, [126, 182] as Pt, [166, 172] as Pt])} opacity="0.6" />
        {dotRow(86, 164, 164, 164, 13).map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="1.1" fill={`url(#${id}-gold)`} stroke="none" opacity="0.8" />
        ))}
        <path d="M74 522h96" opacity="0.7" />
        {dotRow(76, 532, 168, 532, 16).map((d, i) => (
          <circle key={`b${i}`} cx={d.cx} cy={d.cy} r="1" fill={`url(#${id}-gold)`} stroke="none" opacity="0.6" />
        ))}
        <path d={patra(126, 302, 44, 11, -90, 0.5)} opacity="0.5" />
      </g>

      <DodotFiligree id={id} x={78} y={332} w={100} h={180} />
    </svg>
  );
}

/** The pair, facing each other with a kembar mayang between them. */
export function WayangPair({ className, strokeWidth = 0.9 }: WayangProps) {
  return (
    <div className={cn("relative flex h-full w-full items-end justify-center gap-2", className)} aria-hidden="true">
      <WayangGroom className="h-full w-auto max-w-[42%]" strokeWidth={strokeWidth} />
      <svg viewBox="0 0 120 260" className="h-[62%] w-auto" fill="none">
        <g stroke="var(--gold, #C7A35A)" strokeWidth="0.9" strokeLinecap="round" fill="none">
          <path d="M60 250V96" />
          <path d={patra(60, 96, 40, 13, -122, 0.5)} />
          <path d={patra(60, 96, 40, 13, -58, 0.5)} />
          <path d={patra(60, 130, 34, 11, -128, 0.5)} opacity="0.8" />
          <path d={patra(60, 130, 34, 11, -52, 0.5)} opacity="0.8" />
          <path d={patra(60, 166, 28, 9, -134, 0.5)} opacity="0.65" />
          <path d={patra(60, 166, 28, 9, -46, 0.5)} opacity="0.65" />
          <circle cx="60" cy="80" r="6" />
          <circle cx="60" cy="80" r="12" opacity="0.45" />
          <path d="M60 62c-5 10-4 17 0 23 4-6 5-13 0-23" />
        </g>
      </svg>
      <WayangBride className="h-full w-auto max-w-[42%]" strokeWidth={strokeWidth} />
    </div>
  );
}
