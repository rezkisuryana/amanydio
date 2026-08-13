import { motion } from "motion/react";
import { Instagram } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  CornerOrnament,
  FloralOrnament,
  OrnamentalDivider,
  WayangPair,
} from "../JavaneseOrnaments";
import { ParallaxElement, SectionTitle } from "../primitives";

type Person = (typeof weddingConfig.couple)["bride"];

export function CoupleSection() {
  const { couple } = weddingConfig;

  return (
    <section
      id="couple"
      aria-label="Pinanganten"
      className="relative isolate overflow-hidden surface-paper paper-grain px-5 py-24 sm:px-8 sm:py-32"
    >
      <BatikPattern variant="truntum" opacity={0.08} />

      <ParallaxElement
        speed={0.25}
        className="pointer-events-none absolute left-1/2 bottom-0 h-64 w-[min(92vw,520px)] -translate-x-1/2 text-sogan/15"
      >
        <WayangPair />
      </ParallaxElement>

      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Pinanganten"
          title="Kedua Mempelai"
          subtitle="Dengan penuh rasa syukur, kami memperkenalkan calon pengantin yang akan mengikat janji suci."
        />

        <div className="mt-16 grid gap-16 sm:mt-20 md:grid-cols-2 md:gap-10">
          <PersonCard person={couple.bride} label="The Bride" from="left" />
          <div className="relative flex items-center justify-center md:hidden">
            <span className="font-script text-5xl text-gold">&amp;</span>
          </div>
          <PersonCard person={couple.groom} label="The Groom" from="right" />
        </div>

        <div className="relative mt-6 hidden justify-center md:flex">
          <span className="font-script text-5xl text-gold">&amp;</span>
        </div>

        <OrnamentalDivider className="mt-14" />
      </div>
    </section>
  );
}

function PersonCard({
  person,
  label,
  from,
}: {
  person: Person;
  label: string;
  from: "left" | "right";
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: from === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={silk(1.2)}
      className="relative text-center"
    >
      <motion.figure
        initial={{ clipPath: "inset(12% 12% 12% 12%)", scale: 1.06 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={viewportOnce}
        transition={silk(1.5, 0.2)}
        className="group relative mx-auto w-[min(72vw,270px)]"
      >
        <div className="relative arch-mask overflow-hidden frame-gold shadow-ornate">
          <img
            src={person.photo}
            alt={`Foto ${person.name}`}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.06]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/40 to-transparent"
          />
        </div>
        <span aria-hidden="true" className="absolute -inset-2.5 arch-mask border border-gold/30" />
        <div aria-hidden="true" className="absolute -left-4 -top-4 size-10 text-gold/60">
          <CornerOrnament />
        </div>
        <div aria-hidden="true" className="absolute -right-4 -top-4 size-10 text-gold/60">
          <CornerOrnament flipX />
        </div>
      </motion.figure>

      <motion.div
        aria-hidden="true"
        className="mx-auto mt-6 h-10 w-16 text-gold/70"
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={silk(1.1, 0.5)}
      >
        <FloralOrnament className="rotate-90" />
      </motion.div>

      <p className="mt-2 font-sans text-[0.55rem] tracking-royal uppercase text-gold">{label}</p>
      <h3 className="mt-3 font-display text-3xl text-java-brown sm:text-4xl">{person.name}</h3>
      <p className="mt-4 font-sans text-[0.72rem] leading-relaxed text-muted-clay">
        {person.order}
        <br />
        <span className="text-java-brown/85">
          {person.parents[0]} &amp; {person.parents[1]}
        </span>
      </p>

      <a
        href={`https://instagram.com/${person.instagram}`}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Instagram ${person.name}`}
        className="mt-5 inline-flex items-center gap-2 border border-gold/45 px-4 py-2 font-sans text-[0.55rem] tracking-wide-sm uppercase text-sogan transition-all duration-500 hover:border-gold hover:text-java-brown"
      >
        <Instagram className="size-3.5" strokeWidth={1.4} />@{person.instagram}
      </a>
    </motion.article>
  );
}
