import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk } from "@/lib/motion-variants";
import { BatikPattern, OrnamentalDivider } from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";
import { OrnateButton, SectionTitle } from "../primitives";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const ZERO: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function diff(target: number): Remaining {
  const ms = target - Date.now();
  if (ms <= 0) return ZERO;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function CountdownSection() {
  const target = new Date(weddingConfig.weddingDate).getTime();
  const [left, setLeft] = useState<Remaining>(ZERO);

  useEffect(() => {
    setLeft(diff(target));
    const id = window.setInterval(() => setLeft(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: { value: number; label: string }[] = [
    { value: left.days, label: "Hari" },
    { value: left.hours, label: "Jam" },
    { value: left.minutes, label: "Menit" },
    { value: left.seconds, label: "Detik" },
  ];

  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Aditya+%26+Sarah&dates=20261220T020000Z/20261220T080000Z&location=Gedung+Example,+Jakarta";

  return (
    <section
      aria-label="Menuju hari bahagia"
      className="relative isolate overflow-hidden surface-dark px-5 py-24 sm:px-8 sm:py-32"
    >
      <BatikPattern variant="parang" opacity={0.14} className="mix-blend-screen" />
      <ParticleBackground count={12} />

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Ngenteni Dinten"
          title="Menuju Hari Bahagia"
          tone="light"
          subtitle="Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara berkenan hadir dan memberikan doa restu."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={silk(0.9, i * 0.1)}
              className="relative overflow-hidden border border-gold/35 bg-java-dark/40 px-2 py-6 text-center backdrop-blur-sm"
            >
              <BatikPattern variant="kawung" opacity={0.1} className="mix-blend-screen" />
              <span
                aria-hidden="true"
                className="absolute inset-[5px] border border-gold/20"
              />
              <div className="relative flex h-[3.2rem] items-center justify-center overflow-hidden sm:h-[4.4rem]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={u.value}
                    initial={{ opacity: 0, y: 22, rotateX: -70 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -22, rotateX: 70 }}
                    transition={silk(0.5)}
                    className="block font-display text-5xl leading-none text-gold-gradient sm:text-6xl"
                  >
                    {String(u.value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="relative mt-3 font-sans text-[0.5rem] tracking-royal uppercase text-cream/60">
                {u.label}
              </p>
            </motion.div>
          ))}
        </div>

        <OrnamentalDivider className="mt-14" tone="cream" />

        <div className="mt-8 flex justify-center">
          <OrnateButton href={calendarUrl} ariaLabel="Simpan tanggal ke Google Calendar">
            Simpan Tanggal
          </OrnateButton>
        </div>
      </div>
    </section>
  );
}
