import type { Variants, Transition } from "motion/react";

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.2,
  cinematic: 2.1,
} as const;

export const EASE_SILK: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const silk = (
  duration = DURATION.normal,
  delay = 0,
): Transition => ({ duration, delay, ease: EASE_SILK });

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: silk(DURATION.slow) },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: silk(DURATION.slow) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: silk(DURATION.slow) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: silk(DURATION.slow) },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0, transition: silk(DURATION.slow) },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: silk(DURATION.slow) },
};

export const reveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4, scale: 1.04 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    scale: 1,
    transition: silk(1.4),
  },
};

export const staggerChildren = (stagger = 0.12, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const VARIANTS = {
  fadeUp,
  fadeDown,
  fadeIn,
  scaleIn,
  slideLeft,
  slideRight,
  reveal,
} as const;

export type VariantName = keyof typeof VARIANTS;

export const viewportOnce = { once: true, amount: 0.25 } as const;
