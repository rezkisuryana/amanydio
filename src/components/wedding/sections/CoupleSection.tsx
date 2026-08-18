import { motion } from "motion/react";
import { Instagram } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  FramedPhoto,
  GebyokPanel,
  MelatiField,
  OrnamentalDivider,
  SulurVine,
  WayangPair,
} from "../JavaneseOrnaments";

import { ParallaxElement, SectionTitle } from "../primitives";

type Person = {
  readonly name: string;
  readonly nickname: string;
  readonly order: string;
  readonly parents: readonly string[];
  readonly instagram: string;
  readonly photo: string;
};

export function CoupleSection() {
  const { couple } = weddingConfig;

  return (
    <section
      id="couple"
      aria-label="Pinanganten"
      className="relative isolate overflow-hidden surface-paper paper-grain vignette-paper px-5 py-20 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="truntum" opacity={0.06} className="mask-fade-edges" />
      <MelatiField count={6} tone="sogan" className="opacity-40" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-3 w-8 opacity-[0.1] mix-blend-multiply mask-fade-y sm:w-12"
      >
        <GebyokPanel side="left" units={7} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-3 w-8 opacity-[0.1] mix-blend-multiply mask-fade-y sm:w-12"
      >
        <GebyokPanel side="right" units={7} />
      </div>

      <ParallaxElement
        speed={0.25}
        className="pointer-events-none absolute left-1/2 bottom-0 h-72 w-[min(96vw,560px)] -translate-x-1/2 opacity-[0.07] mix-blend-multiply"
      >
        <WayangPair />
      </ParallaxElement>

      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Pinanganten"
          title="Kedua Mempelai"
          subtitle="Dengan penuh rasa syukur, kami memperkenalkan calon pengantin yang akan mengikat janji suci."
          divider="melati"
        />

        <div className="mt-20 grid gap-20 sm:mt-24 md:grid-cols-2 md:gap-12">
          <PersonCard person={couple.bride} label="The Bride" from="left" />
          <div className="relative flex items-center justify-center md:hidden">
            <span className="font-script text-5xl text-gold">&amp;</span>
          </div>
          <PersonCard person={couple.groom} label="The Groom" from="right" />
        </div>

        <div className="relative mt-8 hidden justify-center md:flex">
          <span className="font-script text-6xl text-gold">&amp;</span>
        </div>

        <OrnamentalDivider className="mt-16" variant="batik" />
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
        className="group relative mx-auto w-[min(78vw,330px)]"
      >
        <FramedPhoto
          src={person.photo}
          alt={`Foto ${person.name}`}
          variant="round"
          width={1024}
          height={1280}
          imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.06]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/35 to-transparent"
          />
        </FramedPhoto>

      </motion.figure>

      <motion.div
        aria-hidden="true"
        className="mx-auto mt-8 h-10 w-16 text-gold/70"
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={silk(1.1, 0.5)}
      >
        <SulurVine className="rotate-90" />
      </motion.div>

      <p className="mt-3 font-sans text-[0.58rem] tracking-royal uppercase text-gold">{label}</p>
      <h3 className="mt-4 font-display text-[2.1rem] leading-[1.1] text-java-brown sm:text-[2.6rem]">
        {person.name}
      </h3>
      <p className="mx-auto mt-5 max-w-xs font-sans text-[0.8rem] leading-relaxed text-muted-clay">
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
