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
      className="relative isolate overflow-hidden bg-cream paper-grain px-4 py-20 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="truntum" opacity={0.07} />

      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Pandhita Sarira"
          title="Galeri Kami"
          subtitle="Sekelumit momen yang kami rangkai dalam kenangan."
          divider="gunungan"
        />

        {/* One featured, ornamentally framed image — the anchor of the grid */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.4)}
          className="mx-auto mt-16 w-[min(82vw,360px)]"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(0)}
            aria-label="Buka galeri foto"
            className="group block w-full"
          >
            <FramedPhoto
              src={photos.hero}
              alt={`${couple.groom.nickname} dan ${couple.bride.nickname}`}
              variant="arch"
              width={1024}
              height={1408}
              imgClassName="transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-java-dark/55 via-transparent to-transparent"
              />
            </FramedPhoto>
          </button>
          <p className="mt-5 text-center font-sans text-[0.55rem] tracking-royal uppercase text-sogan/75">
            Ketuk untuk melihat galeri
          </p>
        </motion.div>

        {/* Supporting grid — unframed, quiet, editorial */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
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
                "group relative overflow-hidden border border-gold/25",
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

        <OrnamentalDivider className="mt-16" variant="melati" />

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
