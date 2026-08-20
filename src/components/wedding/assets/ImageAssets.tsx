/**
 * Image-backed Javanese asset surface.
 *
 * Every decorative element on the site is rendered from the curated asset
 * library in `public/assets/javanese` (batik, gunungan, wayang, gebyok, joglo,
 * jasmine, gold ornaments and frames). The component APIs mirror the previous
 * ornament components so the existing motion system stays untouched — callers
 * animate the wrappers exactly as before.
 */
import type { CSSProperties } from "react";

import { frameInsets, javaneseAssets as A } from "@/lib/javanese-assets";
import { cn } from "@/lib/utils";

export type BatikVariant = "parang" | "kawung" | "truntum" | "sidomukti";
export type DividerVariant = "gunungan" | "batik" | "melati" | "rail" | "wayang";

/* ------------------------------------------------------------------ */
/* Base                                                                */
/* ------------------------------------------------------------------ */

/** Purely decorative image: never focusable, never intercepts pointer events. */
function Deco({
  src,
  className,
  style,
  eager,
  flipX,
  flipY,
}: {
  src: string;
  className?: string | undefined;
  style?: CSSProperties | undefined;
  eager?: boolean | undefined;
  flipX?: boolean | undefined;
  flipY?: boolean | undefined;
}) {
  const scale = `scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      loading={eager ? "eager" : "lazy"}
      className={cn("pointer-events-none select-none h-full w-full object-contain", className)}
      style={{ ...(flipX || flipY ? { transform: scale } : null), ...style }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Z-1 · Batik                                                         */
/* ------------------------------------------------------------------ */

const BATIK_TILE: Record<BatikVariant, number> = {
  kawung: 340,
  parang: 300,
  truntum: 260,
  sidomukti: 300,
};

/**
 * Tiled batik layer. `tone: "sogan"` uses the woven original (light surfaces),
 * `gold`/`cream` use the gold-on-transparent cutout (dark surfaces).
 */
export function BatikPattern({
  variant = "parang",
  className,
  opacity = 0.1,
  scale = 1,
  tone = "sogan",
}: {
  variant?: BatikVariant;
  className?: string | undefined;
  opacity?: number | undefined;
  scale?: number | undefined;
  tone?: "sogan" | "gold" | "cream" | undefined;
}) {
  const dark = tone !== "sogan";
  const url = dark ? A.batikGold[variant] : A.batik[variant];
  const size = BATIK_TILE[variant] * scale;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-[1] overflow-hidden", className)}
      style={{
        opacity,
        backgroundImage: `url(${url})`,
        backgroundRepeat: "repeat",
        backgroundSize: `${size}px ${size}px`,
        mixBlendMode: dark ? "normal" : "multiply",
      }}
    />
  );
}

/** Batik ribbon band used between sections. */
export function BatikRibbon({
  variant = "truntum",
  className,
}: {
  variant?: BatikVariant;
  className?: string | undefined;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative h-16 w-full overflow-hidden", className)}
    >
      <BatikPattern variant={variant} opacity={0.3} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Z-2 · Architecture                                                  */
/* ------------------------------------------------------------------ */

/** Joglo / pendopo backdrop illustration. */
export function JogloLineArt({
  className,
  strokeWidth: _strokeWidth,
}: {
  className?: string | undefined;
  strokeWidth?: number | undefined;
}) {
  return <Deco src={A.hero.joglo} className={cn("object-contain mix-blend-screen", className)} />;
}

/** Carved gebyok column, repeated vertically to fill the edge it frames. */
export function GebyokPanel({
  side = "left",
  units: _units,
  className,
}: {
  side?: "left" | "right";
  units?: number | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{
        backgroundImage: `url(${side === "left" ? A.gebyok.left : A.gebyok.right})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: side === "left" ? "left top" : "right top",
      }}
    />
  );
}

/** Carved arch frame (gebyok/keraton doorway). */
export function GebyokFrame({ className }: { className?: string | undefined }) {
  return <Deco src={A.frames.arch} className={className} />;
}

/** Carved lintel / crest for the head of a panel. */
export function GebyokLintel({ className }: { className?: string | undefined }) {
  return <Deco src={A.ornaments.crest} className={className} />;
}

/* ------------------------------------------------------------------ */
/* Z-3/4 · Gunungan & wayang                                           */
/* ------------------------------------------------------------------ */

/** Signature gunungan (kayon) — the focal asset of the invitation. */
export function Gunungan({
  className,
  eager,
}: {
  className?: string | undefined;
  strokeWidth?: number | undefined;
  filled?: boolean | undefined;
  eager?: boolean | undefined;
}) {
  return <Deco src={A.hero.gunungan} className={className} eager={eager} />;
}

export function WayangGroom({ className, eager }: { className?: string | undefined; strokeWidth?: number | undefined; eager?: boolean | undefined }) {
  return <Deco src={A.hero.wayangGroom} className={cn("object-bottom", className)} eager={eager} />;
}

export function WayangBride({ className, eager }: { className?: string | undefined; strokeWidth?: number | undefined; eager?: boolean | undefined }) {
  return <Deco src={A.hero.wayangBride} className={cn("object-bottom", className)} eager={eager} />;
}

/** Wayang bridal couple panel — used as a soft background silhouette. */
export function WayangPair({ className }: { className?: string | undefined; strokeWidth?: number | undefined }) {
  return <Deco src={A.couple.wayangCouple} className={cn("mix-blend-screen", className)} />;
}

/* ------------------------------------------------------------------ */
/* Z-5 · Floral                                                        */
/* ------------------------------------------------------------------ */

/** Single melati blossom. */
export function Melati({ size = 22, className }: { size?: number | undefined; className?: string | undefined }) {
  return <Deco src={A.floral.single} className={className} style={{ width: size, height: size }} />;
}

/** Melati / kantil sprig. */
export function KantilSprig({ className, flip }: { className?: string | undefined; flip?: boolean | undefined; strokeWidth?: number | undefined }) {
  return <Deco src={A.floral.melatiSpray} flipX={flip} className={className} />;
}

/** Corner spray: gold ukiran + jasmine. */
export function FloralCorner({
  className,
  flipX,
  flipY,
}: {
  className?: string | undefined;
  flipX?: boolean | undefined;
  flipY?: boolean | undefined;
  strokeWidth?: number | undefined;
}) {
  return (
    <Deco
      src={A.floral.cornerTop}
      flipX={!flipX}
      flipY={flipY}
      className={cn("object-contain", className)}
    />
  );
}

/** Hanging roncen melati strand — the vertical vine of the composition. */
export function SulurVine({ className, flip }: { className?: string | undefined; flip?: boolean | undefined; strokeWidth?: number | undefined }) {
  return <Deco src={A.floral.strand} flipX={flip} className={cn("object-top", className)} />;
}

/** Jasmine swag garland, for the head of a framed composition. */
export function JasmineSwag({ className }: { className?: string | undefined }) {
  return <Deco src={A.floral.swag} className={className} />;
}

const FLOATERS = [A.floral.single, A.floral.bud, A.floral.petal] as const;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

/** Drifting melati field (petals + buds) — atmospheric layer. */
export function MelatiField({
  count = 10,
  className,
  tone: _tone,
}: {
  count?: number | undefined;
  className?: string | undefined;
  tone?: "gold" | "cream" | "sogan";
}) {
  const rnd = seeded(97);
  const flowers = Array.from({ length: count }, (_, i) => ({
    left: rnd() * 100,
    top: rnd() * 100,
    size: 16 + rnd() * 22,
    dur: 14 + rnd() * 16,
    delay: rnd() * 10,
    opacity: 0.28 + rnd() * 0.4,
    src: FLOATERS[i % FLOATERS.length]!,
  }));

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-[5] overflow-hidden", className)}
    >
      {flowers.map((f, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            opacity: f.opacity,
            width: f.size,
            height: f.size,
            animation: `melati-drift ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        >
          <Deco src={f.src} />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Z-6 · Gold dust                                                     */
/* ------------------------------------------------------------------ */

/** Gold particle sheet, screen-blended over dark surfaces. */
export function GoldDust({
  className,
  opacity = 0.5,
  eager,
}: {
  className?: string | undefined;
  opacity?: number | undefined;
  eager?: boolean | undefined;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-[6] overflow-hidden", className)}>
      <Deco
        src={A.effects.goldParticle}
        eager={eager}
        className="h-full w-full object-cover mix-blend-screen"
        style={{ opacity }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ornaments & dividers                                                */
/* ------------------------------------------------------------------ */

const DIVIDERS: Record<DividerVariant, string> = {
  gunungan: A.dividers.crestFloral,
  batik: A.dividers.scroll,
  melati: A.dividers.melati,
  rail: A.dividers.beaded,
  wayang: A.dividers.slim,
};

/** Ornamental divider, five distinct pieces from the asset library. */
export function JavaneseDivider({
  variant = "gunungan",
  tone = "gold",
  className,
}: {
  variant?: DividerVariant;
  tone?: "gold" | "cream" | "sogan";
  className?: string | undefined;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("mx-auto w-full max-w-sm sm:max-w-md", className)}
      style={tone === "cream" ? { filter: "brightness(1.25) saturate(0.9)" } : undefined}
    >
      <Deco src={DIVIDERS[variant]} className="h-auto w-full" />
    </div>
  );
}

export type OrnamentName = keyof typeof javaneseOrnamentParts;
const javaneseOrnamentParts = A.ornaments;

/** Single carved gold ornament part (crest, corner, medallion, cloud, …). */
export function GoldOrnament({
  name = "crest",
  className,
  flipX,
  flipY,
}: {
  name?: OrnamentName;
  className?: string | undefined;
  flipX?: boolean | undefined;
  flipY?: boolean | undefined;
}) {
  return <Deco src={javaneseOrnamentParts[name]} flipX={flipX} flipY={flipY} className={className} />;
}

/* ------------------------------------------------------------------ */
/* Framed photo                                                        */
/* ------------------------------------------------------------------ */

/**
 * Photograph mounted inside a carved Javanese frame. The photo is inset to the
 * frame's real interior window so the artwork never crops the faces.
 */
export function FramedPhoto({
  src,
  alt,
  variant = "arch",
  className,
  imgClassName,
  eager,
  width,
  height,
  children,
}: {
  src: string;
  alt: string;
  variant?: "arch" | "round" | "pendopo";
  className?: string | undefined;
  imgClassName?: string | undefined;
  eager?: boolean | undefined;
  width?: number | undefined;
  height?: number | undefined;
  children?: React.ReactNode;
}) {
  const inset = frameInsets[variant];
  const frame =
    variant === "arch" ? A.frames.arch : variant === "round" ? A.frames.round : A.frames.pendopo;

  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: `${inset.left}%`,
          right: `${inset.right}%`,
          top: `${inset.top}%`,
          bottom: `${inset.bottom}%`,
          borderRadius: variant === "round" ? "9999px" : "44% 44% 6% 6% / 30% 30% 4% 4%",
        }}
      >
        <img
          src={src}
          alt={alt}
          {...(width ? { width } : null)}
          {...(height ? { height } : null)}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-full w-full object-cover", imgClassName)}
        />
        {children}
      </div>
      <Deco src={frame} eager={eager} className="relative h-auto w-full" />
    </div>
  );
}

/** Cream ornamental plaque used for content panels (bank details, labels). */
export function OrnatePlaque({
  className,
  contentClassName,
  variant = "plaque",
  children,
}: {
  className?: string | undefined;
  contentClassName?: string | undefined;
  variant?: "plaque" | "cartouche";
  children: React.ReactNode;
}) {
  const src = variant === "plaque" ? A.frames.plaque : A.frames.cartouche;
  const pad =
    variant === "plaque"
      ? "left-[16%] right-[16%] top-[22%] bottom-[22%]"
      : "left-[22%] right-[22%] top-[26%] bottom-[26%]";
  return (
    <div className={cn("relative", className)}>
      <Deco src={src} className="h-auto w-full" />
      <div className={cn("absolute flex flex-col items-center justify-center text-center", pad, contentClassName)}>
        {children}
      </div>
    </div>
  );
}
