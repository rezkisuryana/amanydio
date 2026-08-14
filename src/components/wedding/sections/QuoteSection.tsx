import { weddingConfig } from "@/config/weddingConfig";
import { BatikPattern, Gunungan, OrnamentalDivider } from "../JavaneseOrnaments";
import { ParticleBackground } from "../ParticleBackground";
import { ParallaxElement, StaggerGroup, StaggerItem } from "../primitives";

export function QuoteSection() {
  const { quote } = weddingConfig;

  return (
    <section
      aria-label="Ayem Tentrem"
      className="relative isolate overflow-hidden bg-cream paper-grain paper-fiber px-6 py-24 sm:py-32"
    >
      <BatikPattern variant="sidomukti" opacity={0.06} />
      <ParticleBackground count={8} />

      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]"
      >
        <Gunungan />
      </ParallaxElement>

      <StaggerGroup className="relative mx-auto max-w-2xl text-center" stagger={0.18}>
        <StaggerItem>
          <p className="font-sans text-[0.58rem] tracking-royal uppercase text-sogan/80">
            Ayem Tentrem
          </p>
        </StaggerItem>
        <StaggerItem>
          <OrnamentalDivider className="mt-5" variant="gunungan" />
        </StaggerItem>
        <StaggerItem variant="reveal">
          <blockquote className="mt-8">
            <p className="font-display text-xl leading-[1.5] text-java-brown italic sm:text-3xl">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-7 font-sans text-[0.6rem] tracking-royal uppercase text-gold">
              {quote.source}
            </footer>
          </blockquote>
        </StaggerItem>
        <StaggerItem>
          <OrnamentalDivider className="mt-9" />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
