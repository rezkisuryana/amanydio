import { weddingConfig } from "@/config/weddingConfig";
import { BatikPattern, Gunungan, OrnamentalDivider } from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";
import { ParallaxElement, StaggerGroup, StaggerItem } from "../primitives";

export function PrayerSection() {
  const { prayer } = weddingConfig;

  return (
    <section
      aria-label="Doa untuk pengantin"
      className="relative isolate overflow-hidden surface-dark px-6 py-28 sm:py-36"
    >
      <BatikPattern variant="parang" opacity={0.12} tone="gold" className="mix-blend-screen" />
      <ParticleBackground count={14} />

      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[min(92vw,460px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
      >
        <Gunungan />
      </ParallaxElement>

      <StaggerGroup className="relative mx-auto max-w-2xl text-center" stagger={0.2}>
        <StaggerItem>
          <p className="font-sans text-[0.58rem] tracking-royal uppercase text-gold">
            {prayer.title}
          </p>
        </StaggerItem>
        <StaggerItem>
          <OrnamentalDivider className="mt-5" tone="cream" variant="gunungan" />
        </StaggerItem>
        <StaggerItem variant="scaleIn">
          <p
            dir="rtl"
            lang="ar"
            className="mt-10 font-serif text-2xl leading-[2] text-gold-gradient sm:text-3xl"
          >
            {prayer.arabic}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-8 font-display text-base italic leading-relaxed text-cream/85 sm:text-lg">
            &ldquo;{prayer.transliteration}&rdquo;
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-6 max-w-md font-sans text-[0.74rem] leading-relaxed text-cream/55">
            {prayer.meaning}
          </p>
        </StaggerItem>
        <StaggerItem>
          <OrnamentalDivider className="mt-10" tone="cream" variant="melati" />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
