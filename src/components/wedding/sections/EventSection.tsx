import { motion } from "motion/react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  CornerOrnament,
  JogloLineArt,
  OrnamentalDivider,
  WayangBride,
  WayangGroom,
} from "../JavaneseOrnaments";
import { OrnateButton, ParallaxElement, SectionTitle } from "../primitives";

export function EventSection() {
  const { events, venue } = weddingConfig;

  return (
    <section
      id="event"
      aria-label="Rangkaian acara"
      className="relative isolate overflow-hidden bg-cream paper-grain vignette-paper px-5 py-20 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="sidomukti" opacity={0.05} className="mask-fade-edges" />

      {/* Joglo line art — draws itself in on scroll */}
      <ParallaxElement
        speed={0.2}
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-56 w-[min(96vw,760px)] text-sogan/14 sm:h-72"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={silk(1.8)}
          className="h-full w-full"
        >
          <JogloLineArt />
        </motion.div>
      </ParallaxElement>

      <ParallaxElement
        speed={0.35}
        className="pointer-events-none absolute -left-4 top-24 h-64 w-20 opacity-[0.16] blur-[0.5px] sm:left-2 sm:h-80 sm:w-28"
      >
        <WayangGroom />
      </ParallaxElement>
      <ParallaxElement
        speed={0.35}
        className="pointer-events-none absolute -right-4 top-24 h-64 w-20 opacity-[0.16] blur-[0.5px] sm:right-2 sm:h-80 sm:w-28"
      >
        <WayangBride />
      </ParallaxElement>

      <div className="relative mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Pawai & Pesta"
          title="Rangkaian Acara"
          subtitle="Insya Allah acara akan diselenggarakan pada waktu dan tempat berikut."
          divider="wayang"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={silk(1.1, i * 0.15)}
              className="relative overflow-hidden border border-gold/35 bg-ivory/85 px-7 py-11 text-center backdrop-blur-sm hover-lift"
            >
              <BatikPattern variant="truntum" opacity={0.08} />
              <span aria-hidden="true" className="absolute inset-[6px] border border-gold/20" />
              <div aria-hidden="true" className="absolute left-1 top-1 size-8 text-gold/60">
                <CornerOrnament />
              </div>
              <div aria-hidden="true" className="absolute right-1 top-1 size-8 text-gold/60">
                <CornerOrnament flipX />
              </div>

              <div className="relative">
                <p className="font-sans text-[0.5rem] tracking-royal uppercase text-gold">
                  {event.subtitle}
                </p>
                <h3 className="mt-4 font-display text-[2.1rem] leading-tight text-java-brown sm:text-[2.6rem]">
                  {event.name}
                </h3>
                <OrnamentalDivider className="mt-4 max-w-[11rem]" />

                <ul className="mt-7 space-y-4 text-left">
                  <DetailRow Icon={CalendarDays} text={event.date} />
                  <DetailRow Icon={Clock} text={event.time} />
                  <DetailRow
                    Icon={MapPin}
                    text={`${event.place} — ${event.address}`}
                  />
                </ul>

                <div className="mt-8">
                  <OrnateButton
                    href={venue.googleMapsUrl}
                    tone="outline"
                    ariaLabel={`Lihat lokasi ${event.name}`}
                  >
                    Lihat Lokasi
                  </OrnateButton>
                </div>
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
  text,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  text: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/45 text-gold">
        <Icon className="size-3.5" strokeWidth={1.2} />
      </span>
      <span className="font-sans text-[0.85rem] leading-relaxed text-java-brown/85">{text}</span>
    </li>
  );
}
