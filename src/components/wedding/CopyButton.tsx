import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { silk } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

const SPARKS = [0, 60, 120, 180, 240, 300];

export function CopyButton({
  value,
  label = "Salin Rekening",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — still confirm visually */
    }
    setCopied(true);
    toast.success("Nomor rekening berhasil disalin.");
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={silk(0.3)}
      aria-label={`${label} ${value}`}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 border border-gold/55 px-5 py-2.5",
        "font-sans text-eyebrow tracking-wide-sm uppercase text-sogan transition-colors duration-500",
        "hover:border-gold hover:text-java-brown",
        className,
      )}
    >
      <AnimatePresence>
        {copied
          ? SPARKS.map((angle) => (
              <motion.span
                key={angle}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-gold"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{
                  opacity: 0,
                  scale: 1.4,
                  x: Math.cos((angle * Math.PI) / 180) * 46,
                  y: Math.sin((angle * Math.PI) / 180) * 30,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                style={{ boxShadow: "0 0 10px var(--gold)" }}
              />
            ))
          : null}
      </AnimatePresence>
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span>{copied ? "Tersalin" : label}</span>
    </motion.button>
  );
}
