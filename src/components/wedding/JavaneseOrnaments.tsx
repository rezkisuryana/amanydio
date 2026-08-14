/**
 * Javanese ornament surface — thin, API-compatible wrappers over the detailed
 * asset library in ./assets. Motion/animation contracts are unchanged; only
 * the artwork underneath was upgraded.
 */
import { cn } from "@/lib/utils";

import { BatikPattern, BatikRibbon, type BatikVariant } from "./assets/Batik";
import { JavaneseDivider, type DividerVariant } from "./assets/Dividers";
import { FloralCorner, KantilSprig, Melati, MelatiField, SulurVine } from "./assets/Floral";
import { Gunungan } from "./assets/Gunungan";
import { JogloLineArt } from "./assets/Joglo";
import { GebyokFrame, GebyokLintel, GebyokPanel } from "./assets/Gebyok";
import { WayangBride, WayangGroom, WayangPair } from "./assets/Wayang";

export {
  BatikPattern,
  BatikRibbon,
  FloralCorner,
  GebyokFrame,
  GebyokLintel,
  GebyokPanel,
  Gunungan,
  JavaneseDivider,
  JogloLineArt,
  KantilSprig,
  Melati,
  MelatiField,
  SulurVine,
  WayangBride,
  WayangGroom,
  WayangPair,
};
export type { BatikVariant, DividerVariant };

/** Legacy name → sulur vine with sirih leaves and melati buds. */
export function FloralOrnament({
  className,
  strokeWidth = 0.85,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return <SulurVine className={className} strokeWidth={strokeWidth} />;
}

/** Legacy name → carved corner (ukiran + floral). */
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

/** Legacy name → Javanese divider (batik ceplok centre by default). */
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
