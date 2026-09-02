import { motion } from "motion/react";
import { Instagram } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  FramedPhoto,
  KantilSprig,
  MelatiField,
  SulurVine,
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
      aria-label="Kedua mempelai"
      className="relative isolate overflow-hidden surface-paper paper-grain px-5 py-24 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="truntum" opacity={0.04} className="mask-fade-edges" />
      <MelatiField count={5} tone="sogan" className="opacity-30" />

      {/* jasmine, only on one side, cropped */}
      <ParallaxElement
        speed={0.45}
        className="pointer-events-none absolute -right-20 top-24 h-80 w-44 -scale-x-100 opacity-[0.16] mix-blend-multiply sm:-right-10 sm:h-[26rem] sm:w-56"
      >
        <KantilSprig />
      </ParallaxElement>

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Kedua Mempelai"
          title="Calon Pengantin"
          subtitle="Dengan penuh rasa syukur, kami memperkenalkan calon pengantin yang akan mengikat janji suci."
          divider="melati"
        />

        <div className="mt-20 grid items-start gap-16 sm:mt-24 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <PersonCard person={couple.bride} label="Mempelai Wanita" from="left" />

          <div className="relative flex items-center justify-center md:h-full md:pt-40">
            <span className="font-script text-6xl text-gold sm:text-7xl">&amp;</span>
          </div>

          <PersonCard
            person={couple.groom}
            label="Mempelai Pria"
            from="right"
            className="md:mt-28"
          />
        </div>
      </div>
    </section>
  );
}

function PersonCard({
  person,
  label,
  from,
  className,
}: {
  person: Person;
  label: string;
  from: "left" | "right";
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: from === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={silk(1.2)}
      className={className}
    >
      <motion.figure
        initial={{ clipPath: "inset(10% 10% 10% 10%)", scale: 1.05 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={viewportOnce}
        transition={silk(1.5, 0.2)}
        className="group relative mx-auto w-[min(88vw,430px)]"
      >
        <FramedPhoto
          src={person.photo}
          alt={`Foto ${person.name}`}
          variant="round"
          width={1024}
          height={1280}
          imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.06]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/30 to-transparent"
          />
        </FramedPhoto>
      </motion.figure>

      <div className="mt-10 text-center md:text-left">
        <div
          aria-hidden="true"
          className="mx-auto h-8 w-12 text-gold/60 md:mx-0"
        >
          <SulurVine className="rotate-90" />
        </div>

        <p className="mt-4 font-sans text-[0.55rem] tracking-royal uppercase text-gold">
          {label}
        </p>
        <h3 className="mt-4 font-display text-[clamp(2.1rem,4.4vw,3rem)] leading-[1.08] text-java-brown">
          {person.name}
        </h3>
        <p className="mx-auto mt-5 max-w-xs font-sans text-[0.9rem] leading-relaxed text-muted-clay md:mx-0">
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
          className="mt-6 inline-flex items-center gap-2 border border-gold/45 px-4 py-2 font-sans text-[0.55rem] tracking-wide-sm uppercase text-sogan transition-all duration-500 hover:border-gold hover:text-java-brown"
        >
          <Instagram className="size-3.5" strokeWidth={1.4} />@{person.instagram}
        </a>
      </div>
    </motion.article>
  );
}
