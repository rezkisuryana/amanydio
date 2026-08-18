import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { BatikPattern, FloralOrnament } from "../JavaneseOrnaments";
import { ParallaxElement, SectionTitle } from "../primitives";

export function LoveStorySection() {
  const { loveStory } = weddingConfig;
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const scaleY = useTransform(fill, [0, 1], [0, 1]);

  return (
    <section
      aria-label="Kisah kami"
      className="relative isolate overflow-hidden surface-paper paper-grain vignette-paper px-5 py-20 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="kawung" opacity={0.045} className="mask-fade-edges" />
      <ParallaxElement
        speed={0.45}
        className="pointer-events-none absolute -right-8 top-32 h-80 w-24 -scale-x-100 text-sogan/14 blur-[0.5px] sm:w-32"
      >
        <FloralOrnament />
      </ParallaxElement>

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Lelakon"
          title="Kisah Kami"
          subtitle="Perjalanan yang kami lalui hingga sampai pada hari yang dinanti."
        />

        <div ref={trackRef} className="relative mt-16 pl-10 sm:pl-0">
          {/* timeline rail */}
          <div
            aria-hidden="true"
            className="absolute left-3 top-2 bottom-2 w-px bg-gold/20 sm:left-1/2 sm:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-[image:var(--gradient-gold)]"
              style={{ scaleY }}
            />
          </div>

          <ol className="space-y-14 sm:space-y-20">
            {loveStory.map((item, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={silk(1.1)}
                  className={cn(
                    "relative sm:grid sm:grid-cols-2 sm:items-center sm:gap-10",
                    alignRight && "sm:[&>*:first-child]:order-2",
                  )}
                >
                  {/* node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.72rem] top-2 flex size-4 items-center justify-center sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <span className="size-2 rotate-45 bg-gold" />
                    <span className="absolute size-4 rotate-45 border border-gold/50" />
                  </span>

                  <div
                    className={cn(
                      "sm:px-2",
                      alignRight ? "sm:text-left" : "sm:text-right",
                    )}
                  >
                    <p className="font-display text-4xl text-gold sm:text-5xl">{item.year}</p>
                    <h3 className="mt-2 font-serif text-lg tracking-wide-sm text-java-brown sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 font-sans text-[0.85rem] leading-relaxed text-muted-clay">
                      {item.text}
                    </p>
                  </div>

                  <motion.figure
                    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    viewport={viewportOnce}
                    transition={silk(1.4, 0.15)}
                    className="mt-5 overflow-hidden border border-gold/30 sm:mt-0"
                  >
                    <img
                      src={item.photo}
                      alt={`${item.year} — ${item.title}`}
                      loading="lazy"
                      className="h-44 w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] hover:scale-105 sm:h-52"
                    />
                  </motion.figure>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
