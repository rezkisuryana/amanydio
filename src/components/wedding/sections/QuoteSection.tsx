import { weddingConfig } from "@/config/weddingConfig";
import { BatikPattern, GoldOrnament, KantilSprig } from "../JavaneseOrnaments";
import { ParallaxElement, StaggerGroup, StaggerItem } from "../primitives";

export function QuoteSection() {
  const { quote } = weddingConfig;

  return (
    <section
      aria-label="Ayat pernikahan"
      className="relative isolate overflow-hidden bg-cream paper-grain paper-fiber px-6 py-24 sm:py-32"
    >
      <BatikPattern variant="truntum" opacity={0.045} className="mask-fade-edges" />

      {/* single asymmetric jasmine sprig, cropped by the left edge */}
      <ParallaxElement
        speed={0.4}
        className="pointer-events-none absolute -left-16 top-10 h-72 w-40 opacity-[0.18] mix-blend-multiply sm:-left-10 sm:h-96 sm:w-56"
      >
        <KantilSprig />
      </ParallaxElement>

      <StaggerGroup
        className="relative mx-auto w-full max-w-[58ch] md:w-[62%] md:max-w-none"
        stagger={0.16}
      >
        <StaggerItem>
          <p className="font-sans text-eyebrow tracking-royal uppercase text-sogan/85">
            Tenteram
          </p>
        </StaggerItem>
        <StaggerItem variant="reveal">
          <blockquote className="mt-9">
            <p className="font-display text-[clamp(1.75rem,4.2vw,2.9rem)] leading-[1.32] text-java-brown italic">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-9 flex items-center gap-5">
              <span aria-hidden="true" className="h-px w-14 bg-gold/60" />
              <span className="font-sans text-eyebrow tracking-royal uppercase text-gold">
                {quote.source}
              </span>
            </footer>
          </blockquote>
        </StaggerItem>
        <StaggerItem>
          <div aria-hidden="true" className="mt-14 h-7 w-24 opacity-60">
            <GoldOrnament name="flourish" />
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
