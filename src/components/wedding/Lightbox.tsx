import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

type Item = { src: string; alt: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, next, prev]);

  const current = index !== null ? items[index] : undefined;

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Galeri foto"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-java-dark/95 px-4 py-16 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup galeri"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10"
          >
            <X className="size-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 md:left-8"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto berikutnya"
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 md:right-8"
          >
            <ChevronRight className="size-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <span aria-hidden="true" className="absolute inset-[-10px] border border-gold/35" />
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[74vh] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-4 text-center font-sans text-[0.6rem] tracking-royal uppercase text-cream/60">
                {current.alt}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[0.65rem] tracking-royal text-gold">
            {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
