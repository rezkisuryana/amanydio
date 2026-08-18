import { motion } from "motion/react";

import { silk, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import {
  BatikPattern,
  GoldOrnament,
  Gunungan,
  JavaneseDivider,
  MelatiField,
} from "../JavaneseOrnaments";

type SeamTone = "paper" | "dark" | "cream";

const SURFACE: Record<SeamTone, string> = {
  paper: "surface-paper",
  cream: "bg-cream",
  dark: "surface-dark",
};

/**
 * Quiet transition band between two sections. Never the same treatment twice
 * in a row — variants rotate so the scroll gains rhythm instead of repetition.
 */
export function SectionSeam({
  variant = "ornament",
  from = "paper",
  to = "paper",
  className,
}: {
  variant?: "ornament" | "melati" | "gunungan" | "batik" | "rail";
  from?: SeamTone;
  to?: SeamTone;
  className?: string;
}) {
  const light = to !== "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden",
        variant === "batik" ? "h-28 sm:h-36" : "h-24 sm:h-32",
        SURFACE[to],
        className,
      )}
    >
      {/* blend the previous surface into this one */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b to-transparent",
          from === "dark"
            ? "from-java-dark"
            : from === "cream"
              ? "from-cream"
              : "from-ivory",
        )}
      />

      {variant === "batik" ? (
        <BatikPattern
          variant="parang"
          opacity={light ? 0.12 : 0.2}
          tone={light ? "sogan" : "gold"}
          className="mask-fade-y"
        />
      ) : null}

      {variant === "melati" ? (
        <MelatiField count={6} tone={light ? "sogan" : "gold"} className="opacity-50" />
      ) : null}

      {variant === "gunungan" ? (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[190%] w-[min(60vw,240px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.12, scale: 1 }}
          viewport={viewportOnce}
          transition={silk(1.6)}
        >
          <Gunungan />
        </motion.div>
      ) : null}

      <motion.div
        className="relative flex h-full items-center justify-center px-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={silk(1.2)}
      >
        {variant === "ornament" ? (
          <div className="h-8 w-24 opacity-80 sm:h-10 sm:w-28">
            <GoldOrnament name="flourish" />
          </div>
        ) : (
          <div className="w-full max-w-xs opacity-85">
            <JavaneseDivider
              variant={variant === "rail" ? "rail" : variant === "melati" ? "melati" : "batik"}
              tone={light ? "gold" : "cream"}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
