import { motion } from "motion/react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk } from "@/lib/motion-variants";
import {
  BatikPattern,
  GoldDust,
  GoldOrnament,
  Gunungan,
  JasmineSwag,
  JogloLineArt,
  MelatiField,
  WayangBride,
  WayangGroom,
} from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";
import { ParallaxElement } from "../primitives";

export function HeroSection({ guestName }: { guestName?: string }) {
  const { couple, dateLabel, dateLong } = weddingConfig;

  return (
    <section
      id="home"
      aria-label="Undangan pernikahan"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden surface-sogan vignette-dark px-5 pt-24 pb-20 sm:px-8 sm:pt-28"
    >
      {/* Layer 7 — batik as a whisper-quiet overlay texture on deep Sogan */}
      <BatikPattern
        variant="kawung"
        tone="gold"
        opacity={0.07}
        className="mask-fade-edges"
      />

      {/* Pendopo architecture, deep in the distance */}
      <ParallaxElement
        speed={0.12}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[42vh] w-[min(130vw,1100px)] opacity-[0.16] mask-fade-bottom"
      >
        <JogloLineArt />
      </ParallaxElement>

      {/* Layer 1 — the Gunungan: ceremonial portal, breathing slowly */}
      <ParallaxElement
        speed={0.18}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[86vh] w-[min(112vw,660px)] -translate-x-1/2 -translate-y-[52%]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.14 }}
          animate={{ opacity: 0.34, scale: 1 }}
          transition={silk(2.4, 0.15)}
          className="h-full w-full"
        >
          <Gunungan className="animate-breathe" eager />
        </motion.div>
      </ParallaxElement>

      {/* golden aura at the mouth of the portal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] size-[min(90vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.735_0.089_82.5/0.16),transparent_66%)] animate-glow-pulse"
      />

      {/* Layer 3 — wayang guardians, cropped and slow-parallaxed */}
      <ParallaxElement
        speed={0.42}
        className="pointer-events-none absolute -left-14 bottom-0 h-[58vh] w-40 opacity-[0.3] blur-[0.4px] sm:-left-8 sm:w-52 lg:w-64"
      >
        <WayangGroom />
      </ParallaxElement>
      <ParallaxElement
        speed={0.42}
        className="pointer-events-none absolute -right-14 bottom-0 h-[58vh] w-40 opacity-[0.3] blur-[0.4px] sm:-right-8 sm:w-52 lg:w-64"
      >
        <WayangBride />
      </ParallaxElement>

      {/* Jasmine — cropped swag overhead, asymmetric */}
      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute -top-10 left-[-8%] h-32 w-[68%] opacity-45 sm:h-44 sm:w-[52%]"
      >
        <JasmineSwag />
      </ParallaxElement>
      <MelatiField count={7} tone="gold" className="opacity-60" />

      {/* Gold dust + floating particles */}
      <GoldDust opacity={0.22} eager />
      <ParticleBackground count={14} />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1, 0.35)}
          className="font-sans text-[0.58rem] tracking-royal uppercase text-gold/80 sm:text-[0.66rem]"
        >
          The Wedding Of
        </motion.p>

        {/* Layer 2 — couple names, visually bound as one mark */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1.5, 0.5)}
          className="mt-7 font-display text-display-xl text-cream"
        >
          <span className="block">{couple.groom.nickname}</span>
          <span className="-my-2 block font-script text-[0.36em] leading-none text-gold sm:-my-3">
            &amp;
          </span>
          <span className="block">{couple.bride.nickname}</span>
        </motion.h1>

        {/* Layer 4 — date, quiet and precise */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={silk(1.2, 1)}
          className="mt-10 flex flex-col items-center"
        >
          <div className="h-6 w-32 opacity-70 sm:h-7 sm:w-40">
            <GoldOrnament name="flourish" />
          </div>
          <p className="mt-6 font-serif text-[1.05rem] tracking-wide-sm uppercase text-gold-soft sm:text-[1.35rem]">
            {dateLabel}
          </p>
          <p className="mt-2 font-sans text-[0.55rem] tracking-royal uppercase text-cream/45">
            {dateLong}
          </p>
        </motion.div>

        {/* Layer 5 — guest */}
        {guestName ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={silk(1.1, 1.45)}
            className="mt-14"
          >
            <p className="font-sans text-[0.5rem] tracking-royal uppercase text-cream/40">
              Kepada
            </p>
            <p className="mt-3 font-display text-[1.6rem] leading-tight text-cream/90 sm:text-[2.1rem]">
              {guestName}
            </p>
          </motion.div>
        ) : null}

        {/* Layer 6 — CTA / scroll cue */}
        <motion.a
          href="#couple"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={silk(1.2, 1.85)}
          className="group mt-16 inline-flex flex-col items-center gap-4"
          aria-label="Mulai menelusuri undangan"
        >
          <span className="font-sans text-[0.5rem] tracking-royal uppercase text-gold/75 transition-colors duration-500 group-hover:text-gold">
            Sugeng Rawuh
          </span>
          <motion.span
            aria-hidden="true"
            className="block h-20 w-px bg-gradient-to-b from-gold/80 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={silk(1.5, 2.1)}
            style={{ transformOrigin: "top" }}
          />
        </motion.a>
      </div>
    </section>
  );
}
