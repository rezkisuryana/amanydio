import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Small gold cursor ring — desktop pointer devices only. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "image" | "button">("idle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.25 });

  useEffect(() => {
    const fine =
      window.matchMedia("(min-width: 1024px)").matches &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      if (el?.closest("button, a, [role='button'], input, textarea, select")) {
        setMode("button");
      } else if (el?.closest("img, [data-cursor='image']")) {
        setMode("image");
      } else {
        setMode("idle");
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "image" ? 58 : mode === "button" ? 40 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: size,
          height: size,
          borderWidth: mode === "idle" ? 0 : 1,
          backgroundColor:
            mode === "idle" ? "var(--gold)" : "oklch(0.735 0.089 82.5 / 0.12)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderStyle: "solid", borderColor: "var(--gold)" }}
      >
        {mode === "button" ? (
          <span className="absolute inset-[-6px] animate-spin-slow rounded-full border border-dashed border-gold/60" />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
