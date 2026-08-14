import { AnimatePresence, motion } from "motion/react";
import { MailOpen } from "lucide-react";
import { useState } from "react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk } from "@/lib/motion-variants";
import {
  BatikPattern,
  FloralCorner,
  Gunungan,
  MelatiField,
  OrnamentalDivider,
  WayangBride,
  WayangGroom,
} from "./JavaneseOrnaments";
import { ParticleBackground } from "./ParticleBackground";
import { OrnateButton } from "./primitives";

/**
 * Fullscreen cinematic cover. On "Buka Undangan" it plays a ~2.2s royal
 * page-opening transition before handing over to the invitation.
 */
export function WeddingCover({
  guestName,
  onOpen,
}: {
  guestName: string;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const { couple, dateLabel } = weddingConfig;

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 2150);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden surface-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={silk(1.1)}
    >
      {/* Layer: batik */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0.3 : 0.16 }}
        transition={silk(2, 0.9)}
      >
        <BatikPattern variant="parang" opacity={1} tone="gold" className="mix-blend-screen" />
      </motion.div>

      {/* Layer: moving golden light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-1/2 top-1/4 h-[60vh] rotate-[-8deg] bg-[radial-gradient(ellipse_at_center,oklch(0.735_0.089_82.5/0.22),transparent_65%)]"
        initial={{ x: "-25%", opacity: 0 }}
        animate={{ x: "25%", opacity: 1 }}
        transition={{ duration: 9, delay: 1.6, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Layer: particles */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={silk(1.4, 0.5)}
      >
        <ParticleBackground count={16} />
      </motion.div>

      {/* Floral ornaments left / right */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-8 bottom-0 h-[58vh] w-28 opacity-70 sm:left-2 sm:w-40"
        initial={{ opacity: 0, x: -70 }}
        animate={opening ? { opacity: 0, x: -140 } : { opacity: 1, x: 0 }}
        transition={silk(opening ? 1 : 1.6, opening ? 0 : 1.1)}
      >
        <WayangGroom />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute -right-8 bottom-0 h-[58vh] w-28 opacity-70 sm:right-2 sm:w-40"
        initial={{ opacity: 0, x: 70 }}
        animate={opening ? { opacity: 0, x: 140 } : { opacity: 1, x: 0 }}
        transition={silk(opening ? 1 : 1.6, opening ? 0 : 1.35)}
      >
        <WayangBride />
      </motion.div>

      {/* Floral corners (sulur + melati) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-28 text-gold/45 sm:size-40"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: opening ? 0 : 1, scale: 1 }}
        transition={silk(1.4, opening ? 0 : 0.7)}
      >
        <FloralCorner />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 size-28 text-gold/45 sm:size-40"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: opening ? 0 : 1, scale: 1 }}
        transition={silk(1.4, opening ? 0 : 0.85)}
      >
        <FloralCorner flipX flipY />
      </motion.div>

      {/* Floating melati */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={silk(1.6, 0.6)}
      >
        <MelatiField count={9} tone="gold" />
      </motion.div>

      {/* Gunungan */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[78vh] w-[min(88vw,420px)] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.6, y: "40%" }}
        animate={
          opening
            ? { opacity: 0.25, scale: 2.3, y: "-90%" }
            : { opacity: 0.5, scale: 1, y: "-50%" }
        }
        transition={silk(opening ? 1.9 : 2.2, opening ? 0 : 0.9)}
      >
        <div className="relative h-full w-full">
          <span className="absolute inset-0 animate-glow-pulse rounded-full bg-[radial-gradient(circle,oklch(0.735_0.089_82.5/0.18),transparent_62%)]" />
          <Gunungan className="animate-float-slow" />
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence>
        {!opening ? (
          <motion.div
            key="cover-content"
            className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 py-16 text-center"
            exit={{ opacity: 0, y: -20, transition: silk(0.7) }}
          >
            <motion.p
              className="font-sans text-[0.58rem] tracking-royal uppercase text-gold/85 sm:text-[0.66rem]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={silk(1.1, 1.9)}
            >
              The Wedding Of
            </motion.p>

            <motion.h1
              className="mt-5 font-display text-[3.1rem] leading-[0.95] text-cream sm:text-7xl"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={silk(1.3, 2.15)}
            >
              <span className="block">{couple.groom.nickname}</span>
              <span className="my-1 block font-script text-3xl text-gold-gradient sm:text-4xl">
                &amp;
              </span>
              <span className="block">{couple.bride.nickname}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={silk(1.2, 2.6)}
              className="mt-6 w-full"
            >
              <OrnamentalDivider />
              <p className="mt-5 font-serif text-sm tracking-wide-sm text-gold sm:text-base">
                {dateLabel}
              </p>
            </motion.div>

            <motion.div
              className="mt-10 w-full max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={silk(1.1, 3)}
            >
              <p className="font-sans text-[0.55rem] tracking-royal uppercase text-cream/55">
                Kepada Yth.
              </p>
              <p className="mt-2 font-display text-xl text-cream sm:text-2xl">{guestName}</p>
              <div className="mx-auto mt-2 h-px w-24 bg-gold/40" />
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={silk(1, 3.3)}
            >
              <OrnateButton onClick={handleOpen} ariaLabel="Buka undangan pernikahan">
                <MailOpen className="size-3.5" strokeWidth={1.5} />
                Buka Undangan
              </OrnateButton>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Opening wipe: dark brown -> cream, revealed from the centre */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-paper"
        initial={{ clipPath: "inset(50% 0% 50% 0%)", opacity: 0 }}
        animate={
          opening
            ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
            : { clipPath: "inset(50% 0% 50% 0%)", opacity: 0 }
        }
        transition={{ duration: 1.25, delay: opening ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <BatikPattern variant="truntum" opacity={0.16} />
      </motion.div>
    </motion.div>
  );
}
