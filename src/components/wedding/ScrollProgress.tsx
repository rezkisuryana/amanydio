import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

  return (
    <>
      {/* mobile: thin top line */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[image:var(--gradient-gold)] md:hidden"
        style={{ scaleX: progress }}
      />
      {/* desktop: vertical gold line on the right */}
      <div
        aria-hidden="true"
        className="fixed right-6 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 bg-gold/20 md:block"
      >
        <motion.div
          className="h-full w-full origin-top bg-[image:var(--gradient-gold)]"
          style={{ scaleY: progress }}
        />
      </div>
    </>
  );
}
