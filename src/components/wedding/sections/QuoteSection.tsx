import { weddingConfig } from "@/config/weddingConfig";
import {
  BatikPattern,
  Gunungan,
  MelatiField,
  OrnamentalDivider,
} from "../JavaneseOrnaments";
import { ParallaxElement, StaggerGroup, StaggerItem } from "../primitives";

export function QuoteSection() {
  const { quote } = weddingConfig;

  return (
    <section
      aria-label="Ayem Tentrem"
      className="relative isolate overflow-hidden bg-cream paper-grain paper-fiber vignette-paper px-6 py-20 sm:py-28"
    >
      <BatikPattern variant="sidomukti" opacity={0.05} className="mask-fade-edges" />
      <MelatiField count={5} tone="sogan" className="opacity-40" />

      <ParallaxElement
        speed={0.3}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[min(84vw,400px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
      >
        <Gunungan />
      </ParallaxElement>

      <StaggerGroup className="relative mx-auto max-w-2xl text-center" stagger={0.18}>
        <StaggerItem>
          <p className="font-sans text-[0.6rem] tracking-royal uppercase text-sogan/80">
            Ayem Tentrem
          </p>
        </StaggerItem>
        <StaggerItem>
          <OrnamentalDivider className="mt-6" variant="gunungan" />
        </StaggerItem>
        <StaggerItem variant="reveal">
          <blockquote className="mt-10">
            <p className="font-display text-[1.55rem] leading-[1.45] text-java-brown italic sm:text-[2.15rem]">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-8 font-sans text-[0.62rem] tracking-royal uppercase text-gold">
              {quote.source}
            </footer>
          </blockquote>
        </StaggerItem>
        <StaggerItem>
          <OrnamentalDivider className="mt-10" variant="melati" />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
