import { motion } from "motion/react";
import { useState } from "react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { BatikPattern, OrnamentalDivider } from "../JavaneseOrnaments";
import { Lightbox } from "../Lightbox";
import { SectionTitle } from "../primitives";

export function GallerySection() {
  const { gallery, photos, couple } = weddingConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = gallery.map((g) => ({ src: g.src, alt: g.alt }));

  return (
    <section
      id="gallery"
      aria-label="Galeri"
      className="relative isolate overflow-hidden bg-cream paper-grain px-4 py-24 sm:px-8 sm:py-32"
    >
      <BatikPattern variant="truntum" opacity={0.07} />

      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Pandhita Sarira"
          title="Galeri Kami"
          subtitle="Sekelumit momen yang kami rangkai dalam kenangan."
        />

        {/* Hero image */}
        <motion.button
          type="button"
          onClick={() => setOpenIndex(0)}
          initial={{ clipPath: "inset(18% 0% 18% 0%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          viewport={viewportOnce}
          transition={silk(1.5)}
          aria-label="Buka galeri foto"
          className="group relative mt-14 block w-full overflow-hidden border border-gold/35"
        >
          <img
            src={photos.hero}
            alt={`${couple.groom.nickname} dan ${couple.bride.nickname}`}
            loading="lazy"
            width={1024}
            height={1408}
            className="h-[46vh] w-full object-cover object-top transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.05] sm:h-[62vh]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/70 via-java-dark/10 to-transparent"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-6 font-sans text-[0.55rem] tracking-royal uppercase text-cream/85">
            Ketuk untuk melihat galeri
          </span>
        </motion.button>

        {/* Masonry-ish overlapping grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
          {gallery.map((item, i) => (
            <motion.button
              key={item.src + i}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, scale: 1.06 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={silk(1.2, (i % 4) * 0.1)}
              aria-label={`Buka foto: ${item.alt}`}
              className={cn(
                "group relative overflow-hidden border border-gold/30",
                item.span === "tall" ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]",
                i === 0 && "sm:col-span-2",
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.08]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-java-dark/0 transition-colors duration-700 group-hover:bg-java-dark/25"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 border border-cream/0 transition-colors duration-700 group-hover:border-cream/40"
              />
            </motion.button>
          ))}
        </div>

        {/* Horizontal filmstrip */}
        <div className="mt-8 -mx-4 overflow-x-auto no-scrollbar px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-3 pb-2">
            {gallery.map((item, i) => (
              <button
                key={`strip-${i}`}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Buka foto: ${item.alt}`}
                className="group relative h-28 w-40 shrink-0 overflow-hidden border border-gold/25 sm:h-32 sm:w-48"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>

        <OrnamentalDivider className="mt-12" />
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
