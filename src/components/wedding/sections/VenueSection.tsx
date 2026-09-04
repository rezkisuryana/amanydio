import { motion } from "motion/react";
import { Navigation } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { BatikPattern, CornerOrnament } from "../JavaneseOrnaments";
import { OrnateButton } from "../primitives";

export function VenueSection() {
  const { venue } = weddingConfig;

  return (
    <section
      aria-label="Lokasi acara"
      className="relative isolate overflow-hidden surface-paper paper-grain px-4 py-24 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="kawung" opacity={0.04} className="mask-fade-edges" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={silk(1.1)}
          >
            <p className="font-sans text-[0.55rem] tracking-royal uppercase text-sogan/70">
              Papan Panggenan
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.06] text-java-brown">
              {venue.name}
            </h2>
            <p className="mt-6 max-w-md font-sans text-[0.95rem] leading-[1.8] text-muted-clay">
              {venue.address}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={silk(1.1, 0.15)}
            className="flex md:justify-end"
          >
            <OrnateButton
              href={venue.googleMapsUrl}
              tone="solid"
              ariaLabel="Buka lokasi di Google Maps"
            >
              <Navigation className="size-3.5" strokeWidth={1.4} />
              Google Maps
            </OrnateButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.3, 0.1)}
          className="relative mt-14 w-full border border-gold/40 bg-ivory/90 p-3 shadow-ornate sm:p-4"
        >
          <div aria-hidden="true" className="absolute -left-2 -top-2 size-9 text-gold/70">
            <CornerOrnament />
          </div>
          <div aria-hidden="true" className="absolute -right-2 -top-2 size-9 text-gold/70">
            <CornerOrnament flipX />
          </div>
          <div aria-hidden="true" className="absolute -left-2 -bottom-2 size-9 text-gold/70">
            <CornerOrnament flipY />
          </div>
          <div aria-hidden="true" className="absolute -right-2 -bottom-2 size-9 text-gold/70">
            <CornerOrnament flipX flipY />
          </div>

          <div className="relative overflow-hidden border border-gold/25">
            <iframe
              title={`Peta lokasi ${venue.name}`}
              src={venue.googleMapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full grayscale-[0.25] sepia-[0.12] sm:h-[32rem] lg:h-[36rem]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
