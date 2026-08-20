import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { z } from "zod";

import { weddingConfig } from "@/config/weddingConfig";
import { CustomCursor } from "@/components/wedding/CustomCursor";
import { FloatingNavigation } from "@/components/wedding/FloatingNavigation";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { WeddingCover } from "@/components/wedding/WeddingCover";
import { SectionSeam } from "@/components/wedding/sections/SectionSeam";
import { HeroSection } from "@/components/wedding/sections/HeroSection";
import { QuoteSection } from "@/components/wedding/sections/QuoteSection";
import { CoupleSection } from "@/components/wedding/sections/CoupleSection";
import { CountdownSection } from "@/components/wedding/sections/CountdownSection";
import { EventSection } from "@/components/wedding/sections/EventSection";
import { VenueSection } from "@/components/wedding/sections/VenueSection";
import { BatikReveal } from "@/components/wedding/sections/BatikReveal";
import { GallerySection } from "@/components/wedding/sections/GallerySection";
import { LoveStorySection } from "@/components/wedding/sections/LoveStorySection";
import { GiftSection } from "@/components/wedding/sections/GiftSection";
import { RsvpWishesSection } from "@/components/wedding/sections/RsvpWishesSection";
import { PrayerSection } from "@/components/wedding/sections/PrayerSection";
import { ClosingSection } from "@/components/wedding/sections/ClosingSection";

const TITLE = "The Wedding of Aditya & Sarah";
const DESCRIPTION =
  "Undangan Pernikahan Aditya & Sarah — 20 Desember 2026, Gedung Example, Jakarta.";

export const Route = createFileRoute("/")({
  validateSearch: z.object({ to: z.string().optional() }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const { to } = Route.useSearch();
  const guestName = to && to.trim() ? to.trim() : weddingConfig.defaultGuest;
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "!border !border-gold/50 !bg-ivory !text-java-brown !font-sans !text-xs !rounded-none",
        }}
      />
      <CustomCursor />

      <AnimatePresence>
        {!opened ? (
          <WeddingCover guestName={guestName} onOpen={() => setOpened(true)} />
        ) : null}
      </AnimatePresence>

      {opened ? (
        <>
          <ScrollProgress />
          <FloatingNavigation />
          <MusicPlayer active={opened} />
        </>
      ) : null}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!opened}
        className="relative"
      >
        {/* cinematic — dark sogan */}
        <HeroSection guestName={guestName} />
        <SectionSeam variant="gunungan" from="dark" to="cream" />

        {/* quiet — editorial */}
        <QuoteSection />
        <CoupleSection />

        {/* dramatic — dark pendopo */}
        <SectionSeam variant="batik" from="paper" to="dark" />
        <CountdownSection />
        <EventSection />

        {/* informational */}
        <SectionSeam variant="rail" from="dark" to="paper" />
        <VenueSection />
        <BatikReveal variant="parang" tone="dark" />

        {/* editorial */}
        <GallerySection />
        <LoveStorySection />

        <SectionSeam variant="ornament" from="paper" to="cream" />
        <GiftSection />
        <RsvpWishesSection />
        <PrayerSection />

        {/* cinematic mirror of the opening */}
        <ClosingSection />
      </motion.main>
    </>
  );
}
