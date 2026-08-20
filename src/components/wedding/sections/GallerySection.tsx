import { motion } from "motion/react";
import { useState } from "react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import { BatikPattern, FramedPhoto } from "../JavaneseOrnaments";
import { Lightbox } from "../Lightbox";
import { ParallaxElement, SectionTitle } from "../primitives";

export function GallerySection() {
  const { gallery, photos, couple } = weddingConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = gallery.map((g) => ({ src: g.src, alt: g.alt }));

  return (
    <section
      id="gallery"
      aria-label="Galeri"
      className="relative isolate overflow-hidden bg-cream paper-grain px-4 py-24 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="truntum" opacity={0.04} className="mask-fade-edges" />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Pandhita Sarira"
          title="Galeri Kami"
          divider="wayang"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          {/* the one framed, featured photograph */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={silk(1.4)}
            className="mx-auto w-[min(86vw,420px)] md:col-span-5 md:mx-0 md:w-full"
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
          </motion.div>

          {/* supporting masonry — unframed, parallaxed, editorial */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-7 md:content-center">
            {gallery.map((item, i) => (
              <ParallaxElement
                key={item.src + i}
                speed={i % 2 === 0 ? 0.16 : 0.3}
                className={cn(i === 1 && "col-span-2")}
              >
                <motion.button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, scale: 1.05 }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={silk(1.2, (i % 3) * 0.12)}
                  aria-label={`Buka foto: ${item.alt}`}
                  className={cn(
                    "group relative block w-full overflow-hidden border border-gold/20",
                    item.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]",
                    i === 1 && "aspect-[16/9]",
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
                </motion.button>
              </ParallaxElement>
            ))}
          </div>
        </div>

        <p className="mt-12 text-center font-sans text-[0.5rem] tracking-royal uppercase text-sogan/60">
          Ketuk foto untuk memperbesar
        </p>
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
