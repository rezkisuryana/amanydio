import { motion } from "motion/react";
import { Clock, MapPin } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import { BatikPattern, GoldOrnament } from "../JavaneseOrnaments";
import { OrnateButton } from "../primitives";

export function EventSection() {
  const { events, venue } = weddingConfig;

  return (
    <section
      id="event"
      aria-label="Rangkaian acara"
      className="relative isolate overflow-hidden surface-sogan vignette-dark px-5 py-24 sm:px-8 sm:py-32"
    >
      <BatikPattern
        variant="sidomukti"
        tone="gold"
        opacity={0.05}
        className="mask-fade-edges"
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1)}
          className="text-center font-sans text-[0.55rem] tracking-royal uppercase text-gold/75"
        >
          Rangkaian Acara
        </motion.p>

        {/* One large typographic date — the drama of the section */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1.6, 0.1)}
          className="mt-10 text-center"
        >
          <p className="font-display text-date-mono text-gold-gradient">04</p>
          <p className="mt-2 font-serif text-[clamp(1rem,3.4vw,1.9rem)] tracking-royal uppercase text-cream/85">
            OKTOBER
          </p>
          <p className="mt-4 font-sans text-[0.7rem] tracking-royal uppercase text-gold/70 sm:text-[0.85rem]">
            2026
          </p>
        </motion.div>

        <div aria-hidden="true" className="mx-auto mt-12 h-8 w-28 opacity-70">
          <GoldOrnament name="flourish" />
        </div>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-16">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={silk(1.2, i * 0.15)}
              className="relative border-t border-gold/30 pt-9 text-left"
            >
              <p className="font-sans text-[0.5rem] tracking-royal uppercase text-gold/70">
                {event.subtitle}
              </p>
              <h3 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-tight text-cream">
                {event.name}
              </h3>

              <ul className="mt-8 space-y-5">
                <DetailRow Icon={Clock} label={event.date} value={event.time} />
                <DetailRow Icon={MapPin} label={event.place} value={event.address} />
              </ul>

              <div className="mt-9 flex justify-start">
                <OrnateButton
                  href={venue.googleMapsUrl}
                  ariaLabel={`Lihat lokasi ${event.name}`}
                >
                  Lihat Lokasi
                </OrnateButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start justify-start gap-4">
      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
        <Icon className="size-3.5" strokeWidth={1.2} />
      </span>
      <span className="text-left">
        <span className="block font-serif text-[clamp(1.05rem,2vw,1.4rem)] leading-snug text-gold-soft">
          {label}
        </span>
        <span className="mt-1 block font-sans text-[0.85rem] leading-relaxed text-cream/60">
          {value}
        </span>
      </span>
    </li>
  );
}
