/**
 * Javanese ornament surface — thin, API-compatible wrappers over the curated
 * Javanese image asset library (`public/assets/javanese`). Motion/animation
 * contracts are unchanged; only the artwork underneath is the real asset pack.
 */
import { cn } from "@/lib/utils";

import {
  BatikPattern,
  BatikRibbon,
  FloralCorner,
  FramedPhoto,
  GebyokFrame,
  GebyokLintel,
  GebyokPanel,
  GoldDust,
  GoldOrnament,
  Gunungan,
  JasmineSwag,
  JavaneseDivider,
  JogloLineArt,
  KantilSprig,
  Melati,
  MelatiField,
  OrnatePlaque,
  SulurVine,
  WayangBride,
  WayangGroom,
  WayangPair,
  type BatikVariant,
  type DividerVariant,
  type OrnamentName,
} from "./assets/ImageAssets";

export {
  BatikPattern,
  BatikRibbon,
  FloralCorner,
  FramedPhoto,
  GebyokFrame,
  GebyokLintel,
  GebyokPanel,
  GoldDust,
  GoldOrnament,
  Gunungan,
  JasmineSwag,
  JavaneseDivider,
  JogloLineArt,
  KantilSprig,
  Melati,
  MelatiField,
  OrnatePlaque,
  SulurVine,
  WayangBride,
  WayangGroom,
  WayangPair,
};
export type { BatikVariant, DividerVariant, OrnamentName };

/** Legacy name → hanging roncen melati strand. */
export function FloralOrnament({ className }: { className?: string; strokeWidth?: number }) {
  return <SulurVine className={className} />;
}

/** Legacy name → carved corner (ukiran + jasmine). */
export function CornerOrnament({
  className,
  flipX,
  flipY,
}: {
  className?: string;
  strokeWidth?: number;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return <FloralCorner className={className} flipX={flipX} flipY={flipY} />;
}

/** Legacy name → Javanese divider from the asset pack. */
export function OrnamentalDivider({
  className,
  tone = "gold",
  variant = "batik",
}: {
  className?: string;
  tone?: "gold" | "cream" | "sogan";
  variant?: DividerVariant;
}) {
  return <JavaneseDivider className={cn(className)} tone={tone} variant={variant} />;
}
