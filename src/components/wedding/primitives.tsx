import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  VARIANTS,
  silk,
  staggerChildren,
  viewportOnce,
  type VariantName,
} from "@/lib/motion-variants";
import { OrnamentalDivider } from "./JavaneseOrnaments";

/* ------------------------------------------------------------------ */
/* AnimatedReveal                                                      */
/* ------------------------------------------------------------------ */

export function AnimatedReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  variant?: VariantName;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.14,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerChildren(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  variant?: VariantName;
}) {
  return (
    <motion.div className={className} variants={VARIANTS[variant]}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ParallaxElement                                                     */
/* ------------------------------------------------------------------ */

export function ParallaxElement({
  children,
  speed = 0.3,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 140 * speed;
  const raw = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(raw, { stiffness: 80, damping: 22, mass: 0.4 });

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduce ? {} : { y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

export function useSectionProgress(): {
  ref: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, progress: scrollYProgress };
}

/* ------------------------------------------------------------------ */
/* SectionTitle                                                        */
/* ------------------------------------------------------------------ */

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  const light = tone === "light";
  return (
    <StaggerGroup className={cn("text-center", className)} stagger={0.12}>
      {eyebrow ? (
        <StaggerItem>
          <p
            className={cn(
              "font-sans text-[0.6rem] tracking-royal uppercase sm:text-[0.68rem]",
              light ? "text-gold/80" : "text-sogan/80",
            )}
          >
            {eyebrow}
          </p>
        </StaggerItem>
      ) : null}
      <StaggerItem>
        <Heading
          className={cn(
            "mt-3 font-display text-[2rem] leading-[1.1] tracking-tight sm:text-5xl",
            light ? "text-cream" : "text-java-brown",
          )}
        >
          {title}
        </Heading>
      </StaggerItem>
      <StaggerItem>
        <OrnamentalDivider className="mt-5" tone={light ? "cream" : "gold"} />
      </StaggerItem>
      {subtitle ? (
        <StaggerItem>
          <p
            className={cn(
              "mx-auto mt-5 max-w-md font-sans text-[0.82rem] leading-relaxed sm:text-sm",
              light ? "text-cream/70" : "text-muted-clay",
            )}
          >
            {subtitle}
          </p>
        </StaggerItem>
      ) : null}
    </StaggerGroup>
  );
}

/* ------------------------------------------------------------------ */
/* OrnateButton                                                        */
/* ------------------------------------------------------------------ */

export function OrnateButton({
  children,
  onClick,
  href,
  tone = "gold",
  type = "button",
  className,
  ariaLabel,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: "gold" | "solid" | "outline";
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-7 py-3.5",
    "font-sans text-[0.62rem] tracking-royal uppercase transition-all duration-500",
    "disabled:pointer-events-none disabled:opacity-60",
    tone === "solid"
      ? "bg-java-brown text-cream hover:bg-sogan"
      : tone === "outline"
        ? "border border-gold/45 text-sogan hover:border-gold hover:text-java-brown"
        : "border border-gold/60 text-gold hover:text-java-dark",
    className,
  );

  const inner = (
    <>
      {tone === "gold" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-[image:var(--gradient-gold)] transition-transform duration-600 ease-[var(--ease-silk)] group-hover:scale-x-100"
        />
      ) : null}
      <span
        aria-hidden="true"
        className="absolute inset-[3px] border border-current opacity-25"
      />
      <CornerTick className="left-1 top-1" />
      <CornerTick className="right-1 top-1 rotate-90" />
      <CornerTick className="right-1 bottom-1 rotate-180" />
      <CornerTick className="left-1 bottom-1 -rotate-90" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
        className={base}
      >
        {inner}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={silk(0.35)}
      className={base}
    >
      {inner}
    </motion.button>
  );
}

function CornerTick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute h-2 w-2 border-t border-l border-current opacity-60", className)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Ornamental frame wrapper                                            */
/* ------------------------------------------------------------------ */

export function OrnateFrame({
  children,
  className,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "cream";
}) {
  return (
    <div
      className={cn(
        "relative",
        tone === "gold" ? "text-gold" : "text-cream/70",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 border border-current opacity-40" />
      <span aria-hidden="true" className="absolute inset-[6px] border border-current opacity-20" />
      {children}
    </div>
  );
}
