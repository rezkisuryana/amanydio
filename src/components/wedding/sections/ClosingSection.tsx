import { motion } from "motion/react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  GebyokPanel,
  Gunungan,
  JogloLineArt,
  FramedPhoto,
  MelatiField,
  OrnamentalDivider,
  SulurVine,
} from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";

export function ClosingSection() {
  const { closing, couple, photos, dateLong } = weddingConfig;

  return (
    <footer
      aria-label="Penutup undangan"
      className="relative isolate overflow-hidden surface-dark vignette-dark px-5 pt-20 pb-28 sm:px-8 sm:pt-28 sm:pb-20"
    >
      <BatikPattern variant="sidomukti" opacity={0.12} tone="gold" className="mask-fade-edges" />
      <MelatiField count={8} tone="gold" className="opacity-70" />

      {/* Joglo silhouette far behind */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-16 mx-auto h-40 w-[min(96vw,820px)] text-gold/12 sm:h-56"
      >
        <JogloLineArt />
      </div>

      {/* Gebyok posts */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-8 opacity-25 mask-fade-y sm:w-14 lg:w-20">
        <GebyokPanel side="left" units={7} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 opacity-25 mask-fade-y sm:w-14 lg:w-20">
        <GebyokPanel side="right" units={7} />
      </div>
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
        <SulurVine />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-10 h-64 w-24 text-gold/40 sm:right-2 sm:h-80 sm:w-32"
        initial={{ x: 90, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={silk(1.6, 0.35)}
      >
        <SulurVine flip />
      </motion.div>

      <div className="relative mx-auto max-w-xl text-center">
        <motion.figure
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={silk(1.5)}
          className="relative mx-auto w-[min(66vw,260px)]"
        >
          <FramedPhoto
            src={photos.closing}
            alt={`${couple.groom.nickname} dan ${couple.bride.nickname}`}
            variant="round"
            width={1200}
            height={1200}
          />
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
          className="mt-12 font-display text-[3rem] leading-[0.95] text-gold-gradient sm:text-[4.5rem]"
        >
          {closing.title}
        </motion.h2>

        <OrnamentalDivider className="mt-6" tone="cream" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.1, 0.35)}
          className="mx-auto mt-8 max-w-md font-sans text-body-lg text-cream/70"
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
          <p className="font-display text-2xl uppercase text-cream sm:text-4xl">
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
