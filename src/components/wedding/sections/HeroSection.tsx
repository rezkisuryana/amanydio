import { motion } from "motion/react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk } from "@/lib/motion-variants";
import {
  BatikPattern,
  CornerOrnament,
  GebyokPanel,
  MelatiField,
  OrnamentalDivider,
  SulurVine,
} from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";
import { ParallaxElement } from "../primitives";

export function HeroSection() {
  const { couple, dateLong, photos } = weddingConfig;

  return (
    <section
      id="home"
      aria-label="Undangan pernikahan"
      className="relative isolate overflow-hidden surface-paper paper-grain paper-fiber px-5 pt-20 pb-24 sm:px-8 sm:pt-24"
    >
      <BatikPattern variant="kawung" opacity={0.07} />
      <ParticleBackground count={9} />

      <MelatiField count={7} tone="sogan" className="opacity-60" />

      {/* Gebyok posts framing the invitation */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-8 opacity-45 sm:w-14 lg:w-20">
        <GebyokPanel side="left" units={8} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 opacity-45 sm:w-14 lg:w-20">
        <GebyokPanel side="right" units={8} />
      </div>

      <ParallaxElement
        speed={0.5}
        className="pointer-events-none absolute -left-4 top-24 h-72 w-20 text-sogan/25 sm:left-10 sm:h-96 sm:w-28"
      >
        <SulurVine />
      </ParallaxElement>
      <ParallaxElement
        speed={0.4}
        className="pointer-events-none absolute -right-4 bottom-24 h-72 w-20 text-sogan/25 sm:right-10 sm:h-96 sm:w-28"
      >
        <SulurVine flip />
      </ParallaxElement>

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1, 0.35)}
          className="font-sans text-[0.58rem] tracking-royal uppercase text-sogan sm:text-[0.66rem]"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1.3, 0.55)}
          className="mt-4 font-display text-[2.7rem] leading-[1] text-java-brown sm:text-6xl"
        >
          {couple.groom.nickname}
          <span className="mx-3 font-script text-3xl text-gold sm:text-4xl">&amp;</span>
          {couple.bride.nickname}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={silk(1.1, 0.9)}
        >
          <OrnamentalDivider className="mt-6" />
          <p className="mt-5 font-serif text-xs tracking-royal uppercase text-sogan sm:text-sm">
            {dateLong}
          </p>
        </motion.div>

        {/* Arch ornamental photo frame */}
        <motion.figure
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={silk(1.6, 1)}
          className="relative mx-auto mt-12 w-[min(84vw,340px)]"
        >
          <div className="group relative arch-mask overflow-hidden frame-ukiran">
            <motion.img
              src={photos.hero}
              alt={`${couple.groom.nickname} dan ${couple.bride.nickname} dalam busana adat Jawa`}
              width={1024}
              height={1408}
              className="h-full w-full object-cover"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={silk(2.4, 1)}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/45 via-transparent to-transparent"
            />
          </div>

          <span aria-hidden="true" className="absolute -inset-3 arch-mask border border-gold/35" />
          <div aria-hidden="true" className="absolute -left-5 -bottom-5 size-12 text-gold/60">
            <CornerOrnament flipY />
          </div>
          <div aria-hidden="true" className="absolute -right-5 -bottom-5 size-12 text-gold/60">
            <CornerOrnament flipX flipY />
          </div>

          <div className="absolute inset-x-0 -bottom-4 flex justify-center">
            <span className="border border-gold/50 bg-ivory/90 px-4 py-1.5 font-sans text-[0.5rem] tracking-royal uppercase text-sogan">
              Sugeng Rawuh
            </span>
          </div>
        </motion.figure>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1.1, 1.7)}
          className="mx-auto mt-14 max-w-sm font-sans text-[0.78rem] leading-relaxed text-muted-clay sm:text-sm"
        >
          Assalamu&apos;alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho
          Allah SWT, kami bermaksud menyelenggarakan pahargyan pernikahan putra-putri kami.
        </motion.p>

        <motion.div
          aria-hidden="true"
          className="mx-auto mt-12 h-16 w-px bg-gradient-to-b from-gold/70 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={silk(1.4, 2)}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
