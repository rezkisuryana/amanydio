import { motion } from "motion/react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { BatikPattern, WayangPair } from "../JavaneseOrnaments";
import { ParallaxElement, SectionTitle } from "../primitives";

export function LoveStorySection() {
  const { loveStory } = weddingConfig;

  return (
    <section
      aria-label="Kisah kami"
      className="relative isolate overflow-hidden surface-paper paper-grain px-5 py-24 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="parang" opacity={0.04} className="mask-fade-edges" />

      {/* the single wayang appearance of this section */}
      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute -left-24 top-1/3 h-[60%] w-[min(70vw,420px)] opacity-[0.07]"
      >
        <WayangPair className="mix-blend-multiply" />
      </ParallaxElement>

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Lelakon"
          title="Kisah Kami"
          subtitle="Perjalanan yang kami lalui hingga sampai pada hari yang dinanti."
          divider="rail"
        />

        <ol className="mt-20 space-y-24 sm:space-y-32">
          {loveStory.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.li
                key={item.year}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={silk(1.2)}
                className="grid items-center gap-10 md:grid-cols-12 md:gap-14"
              >
                <motion.figure
                  initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={viewportOnce}
                  transition={silk(1.5, 0.15)}
                  className={cn(
                    "relative overflow-hidden border border-gold/25 md:col-span-7",
                    flipped ? "md:order-2 md:col-start-6" : "md:col-start-1",
                  )}
                >
                  <img
                    src={item.photo}
                    alt={`${item.year} — ${item.title}`}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] hover:scale-[1.05] sm:h-[22rem] lg:h-[26rem]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 border border-cream/15"
                  />
                </motion.figure>

                <div
                  className={cn(
                    "md:col-span-5",
                    flipped ? "md:order-1 md:text-right" : "",
                  )}
                >
                  <p className="font-display text-[clamp(3rem,7vw,4.75rem)] leading-none text-gold-gradient">
                    {item.year}
                  </p>
                  <h3 className="mt-4 font-serif text-[clamp(1.15rem,2.4vw,1.6rem)] tracking-wide-sm text-java-brown">
                    {item.title}
                  </h3>
                  <p className="mt-5 font-sans text-[0.95rem] leading-[1.8] text-muted-clay">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
