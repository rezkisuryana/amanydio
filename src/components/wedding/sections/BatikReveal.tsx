import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { BatikPattern, Gunungan } from "../JavaneseOrnaments";

/**
 * Scroll-driven batik reveal: the pattern grows from the centre until it fills
 * the viewport, then becomes the ground of the next section.
 */
export function BatikReveal({
  variant = "parang",
  tone = "dark",
}: {
  variant?: "parang" | "kawung" | "truntum" | "sidomukti";
  tone?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.35, 1.05, 1.3]);
  const inset = useTransform(scrollYProgress, [0, 0.6], ["inset(45% 22% 45% 22%)", "inset(0% 0% 0% 0%)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0.85]);
  const gunScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.25]);
  const gunOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.22, 0]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative h-[46vh] overflow-hidden sm:h-[54vh] ${
        tone === "dark" ? "surface-dark" : "surface-paper"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        style={{ clipPath: inset, opacity, scale, willChange: "transform, clip-path" }}
      >
        <BatikPattern
          variant={variant}
          opacity={tone === "dark" ? 0.3 : 0.18}
          className={tone === "dark" ? "mix-blend-screen" : ""}
        />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[70%] w-[min(70vw,300px)] -translate-x-1/2 -translate-y-1/2"
        style={{ scale: gunScale, opacity: gunOpacity }}
      >
        <Gunungan />
      </motion.div>

      <div
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${
          tone === "dark" ? "from-java-dark" : "from-ivory"
        } to-transparent`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${
          tone === "dark" ? "from-java-dark" : "from-ivory"
        } to-transparent`}
      />
    </div>
  );
}
