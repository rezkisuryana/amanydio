import { motion } from "motion/react";
import { Navigation } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { BatikPattern, CornerOrnament } from "../JavaneseOrnaments";
import { OrnateButton, SectionTitle } from "../primitives";

export function VenueSection() {
  const { venue } = weddingConfig;

  return (
    <section
      aria-label="Lokasi acara"
      className="relative isolate overflow-hidden surface-paper paper-grain px-5 py-24 sm:px-8 sm:py-32"
    >
      <BatikPattern variant="kawung" opacity={0.06} />

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle eyebrow="Papan Panggenan" title="Lokasi Acara" />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.2)}
          className="relative mx-auto mt-12 max-w-2xl border border-gold/40 bg-ivory/90 p-3 shadow-ornate sm:p-4"
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
              className="h-56 w-full grayscale-[0.35] sepia-[0.18] sm:h-72"
            />
          </div>

          <div className="relative px-2 py-6 text-center">
            <h3 className="font-display text-2xl text-java-brown sm:text-3xl">{venue.name}</h3>
            <p className="mx-auto mt-3 max-w-sm font-sans text-[0.75rem] leading-relaxed text-muted-clay">
              {venue.address}
            </p>
            <div className="mt-6 flex justify-center">
              <OrnateButton
                href={venue.googleMapsUrl}
                tone="solid"
                ariaLabel="Buka lokasi di Google Maps"
              >
                <Navigation className="size-3.5" strokeWidth={1.4} />
                Google Maps
              </OrnateButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
