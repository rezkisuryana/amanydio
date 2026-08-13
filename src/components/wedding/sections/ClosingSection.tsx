import { motion } from "motion/react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  FloralOrnament,
  Gunungan,
  OrnamentalDivider,
} from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";

export function ClosingSection() {
  const { closing, couple, photos, dateLong } = weddingConfig;

  return (
    <footer
      aria-label="Penutup undangan"
      className="relative isolate overflow-hidden surface-dark px-5 pt-24 pb-32 sm:px-8 sm:pt-32 sm:pb-24"
    >
      <BatikPattern variant="sidomukti" opacity={0.1} className="mix-blend-screen" />
      <ParticleBackground count={16} />

      {/* Gunungan rising from the bottom */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[70%] w-[min(90vw,420px)] opacity-25"
        initial={{ y: 140, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.25 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={silk(1.9)}
      >
        <Gunungan />
      </motion.div>

      {/* Floral entering from both sides */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 bottom-10 h-64 w-24 text-gold/40 sm:left-2 sm:h-80 sm:w-32"
        initial={{ x: -90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={silk(1.6, 0.2)}
      >
        <FloralOrnament />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-10 h-64 w-24 -scale-x-100 text-gold/40 sm:right-2 sm:h-80 sm:w-32"
        initial={{ x: 90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={silk(1.6, 0.35)}
      >
        <FloralOrnament />
      </motion.div>

      <div className="relative mx-auto max-w-xl text-center">
        <motion.figure
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={silk(1.5)}
          className="relative mx-auto w-[min(60vw,220px)]"
        >
          <div className="overflow-hidden rounded-full border border-gold/45">
            <img
              src={photos.closing}
              alt={`${couple.groom.nickname} dan ${couple.bride.nickname}`}
              loading="lazy"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-full border border-dashed border-gold/30"
          />
        </motion.figure>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.3, 0.2)}
          className="mt-10 font-display text-[2.6rem] leading-none text-gold-gradient sm:text-6xl"
        >
          {closing.title}
        </motion.h2>

        <OrnamentalDivider className="mt-6" tone="cream" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.1, 0.35)}
          className="mx-auto mt-7 max-w-md font-sans text-[0.78rem] leading-relaxed text-cream/70"
        >
          {closing.text}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={silk(1.2, 0.5)}
          className="mx-auto mt-4 max-w-md font-display text-base italic text-cream/85 sm:text-lg"
        >
          &ldquo;{closing.javanese}&rdquo;
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={silk(1.2, 0.65)}
          className="mx-auto mt-3 max-w-md font-sans text-[0.7rem] leading-relaxed text-cream/50"
        >
          {closing.indonesian}
        </motion.p>

        {/* Final cinematic name reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, letterSpacing: "0.6em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={silk(2.1, 0.4)}
          className="mt-16"
        >
          <p className="font-display text-xl uppercase text-cream sm:text-3xl">
            {couple.groom.nickname} &amp; {couple.bride.nickname}
          </p>
          <p className="mt-4 font-sans text-[0.55rem] tracking-royal uppercase text-gold/80">
            {dateLong}
          </p>
        </motion.div>

        <OrnamentalDivider className="mt-14" tone="cream" />
        <p className="mt-6 font-sans text-[0.5rem] tracking-royal uppercase text-cream/35">
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </p>
      </div>
    </footer>
  );
}
