import { motion } from "motion/react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk } from "@/lib/motion-variants";
import {
  BatikPattern,
  FloralCorner,
  FramedPhoto,
  GebyokPanel,
  Gunungan,
  JogloLineArt,
  MelatiField,
  OrnamentalDivider,
  WayangBride,
  WayangGroom,
} from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";
import { ParallaxElement } from "../primitives";

export function HeroSection() {
  const { couple, dateLong, photos } = weddingConfig;

  return (
    <section
      id="home"
      aria-label="Undangan pernikahan"
      className="relative isolate overflow-hidden surface-paper paper-grain paper-fiber vignette-paper px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24"
    >
      {/* Layer 1 — batik, whisper quiet and faded at the edges */}
      <BatikPattern variant="kawung" opacity={0.05} className="mask-fade-edges" />

      {/* Layer 2 — pendopo architecture, far behind */}
      <ParallaxElement
        speed={0.15}
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-64 w-[min(112vw,900px)] text-sogan/12 sm:h-80"
      >
        <JogloLineArt />
      </ParallaxElement>

      {/* Layer 3 — gunungan behind the names, single focal glow */}
      <ParallaxElement
        speed={0.22}
        className="pointer-events-none absolute left-1/2 top-4 h-[64vh] w-[min(84vw,430px)] -translate-x-1/2 opacity-[0.16] sm:top-0 sm:h-[72vh]"
      >
        <Gunungan className="animate-float-slow" />
      </ParallaxElement>

      {/* Layer 4 — gebyok columns, cropped by the viewport edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-3 w-10 opacity-25 mask-fade-y sm:w-16 lg:w-24"
      >
        <GebyokPanel side="left" units={8} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-3 w-10 opacity-25 mask-fade-y sm:w-16 lg:w-24"
      >
        <GebyokPanel side="right" units={8} />
      </div>

      {/* Layer 5 — wayang guardians, half out of frame */}
      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute -left-16 bottom-0 hidden h-[62vh] w-40 opacity-20 blur-[0.6px] md:block"
      >
        <WayangGroom />
      </ParallaxElement>
      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-[62vh] w-40 opacity-20 blur-[0.6px] md:block"
      >
        <WayangBride />
      </ParallaxElement>

      {/* Layer 6 — floral corners cropped into the composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-6 size-32 text-sogan/30 sm:size-44"
      >
        <FloralCorner />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 bottom-6 size-32 text-sogan/25 sm:size-44"
      >
        <FloralCorner flipX flipY />
      </div>

      {/* Layer 7 — atmosphere */}
      <MelatiField count={6} tone="sogan" className="opacity-40" />
      <ParticleBackground count={7} />

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1, 0.35)}
          className="font-sans text-[0.6rem] tracking-royal uppercase text-sogan/85 sm:text-[0.68rem]"
        >
          The Wedding Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={silk(1.3, 0.55)}
          className="mt-6 font-display text-hero-names text-java-brown"
        >
          <span className="block">{couple.groom.nickname}</span>
          <span className="my-1 block font-script text-[0.42em] leading-none text-gold">
            &amp;
          </span>
          <span className="block">{couple.bride.nickname}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={silk(1.1, 0.9)}
        >
          <OrnamentalDivider className="mt-8" />
          <p className="mt-5 font-serif text-[0.78rem] tracking-royal uppercase text-sogan sm:text-sm">
            {dateLong}
          </p>
        </motion.div>

        {/* Arch ornamental photo frame — the one framed image of the hero */}
        <motion.figure
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={silk(1.6, 1)}
          className="relative mx-auto mt-14 w-[min(80vw,330px)]"
        >
          <FramedPhoto
            src={photos.hero}
            alt={`${couple.groom.nickname} dan ${couple.bride.nickname} dalam busana adat Jawa`}
            variant="arch"
            eager
            width={1024}
            height={1408}
            className="group"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/45 via-transparent to-transparent"
            />
          </FramedPhoto>

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
          className="mx-auto mt-16 max-w-[30rem] font-sans text-body-lg text-muted-clay"
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
