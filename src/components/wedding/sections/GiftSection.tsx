import { motion } from "motion/react";
import { Home } from "lucide-react";

import { weddingConfig } from "@/config/weddingConfig";
import { silk, viewportOnce } from "@/lib/motion-variants";
import {
  BatikPattern,
  CornerOrnament,
  GebyokPanel,
  OrnamentalDivider,
} from "../JavaneseOrnaments";
import { CopyButton } from "../CopyButton";
import { SectionTitle } from "../primitives";

export function GiftSection() {
  const { gift } = weddingConfig;

  return (
    <section
      id="gift"
      aria-label="Hadiah pernikahan"
      className="relative isolate overflow-hidden bg-cream paper-grain vignette-paper px-5 py-24 sm:px-8 sm:py-28"
    >
      <BatikPattern variant="sidomukti" opacity={0.05} className="mask-fade-edges" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-8 opacity-[0.09] mix-blend-multiply mask-fade-y sm:w-12 lg:w-16">
        <GebyokPanel side="left" units={5} />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 opacity-[0.09] mix-blend-multiply mask-fade-y sm:w-12 lg:w-16">
        <GebyokPanel side="right" units={5} />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Tanda Kasih"
          title={gift.title}
          subtitle={gift.note}
          divider="rail"
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2">
          {gift.bankAccounts.map((acc, i) => (
            <motion.article
              key={acc.bank}
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewportOnce}
              transition={silk(1, i * 0.12)}
              className="relative overflow-hidden border border-gold/45 bg-ivory px-6 py-8 text-center shadow-gold"
            >
              <BatikPattern variant="parang" opacity={0.07} />
              <span aria-hidden="true" className="absolute inset-[6px] border border-gold/25" />
              <div aria-hidden="true" className="absolute left-1 top-1 size-8 text-gold/70">
                <CornerOrnament />
              </div>
              <div aria-hidden="true" className="absolute right-1 bottom-1 size-8 text-gold/70">
                <CornerOrnament flipX flipY />
              </div>

              <div className="relative">
                <p className="font-serif text-lg tracking-royal uppercase text-java-brown">
                  {acc.bank}
                </p>
                <OrnamentalDivider className="mt-3 max-w-[9rem]" />
                <p className="mt-5 font-display text-2xl font-bold tracking-wide-sm text-gold-gradient sm:text-3xl">
                  {acc.number}
                </p>
                <p className="mt-2 font-sans text-[0.62rem] tracking-wide-sm uppercase text-muted-clay">
                  a/n {acc.holder}
                </p>
                <CopyButton value={acc.number} className="mt-6" />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={silk(1)}
          className="relative mt-8 border border-gold/30 bg-ivory/70 px-6 py-7 text-center"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-gold/45 text-gold">
            <Home className="size-4" strokeWidth={1.3} />
          </span>
          <p className="mt-4 font-sans text-[0.55rem] tracking-royal uppercase text-sogan">
            Kirim Hadiah
          </p>
          <p className="mx-auto mt-3 max-w-sm font-sans text-[0.76rem] leading-relaxed text-muted-clay">
            {gift.giftAddress}
          </p>
          <CopyButton value={gift.giftAddress} label="Salin Alamat" className="mt-5" />
        </motion.div>
      </div>
    </section>
  );
}
