import { motion } from "motion/react";
import { CalendarHeart, Gift, Home, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "home", label: "Utama", Icon: Home },
  { id: "couple", label: "Mempelai", Icon: Users },
  { id: "event", label: "Acara", Icon: CalendarHeart },
  { id: "gift", label: "Hadiah", Icon: Gift },
] as const;

export function FloatingNavigation() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Mobile: bottom pill */}
      <motion.nav
        aria-label="Navigasi undangan"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden"
      >
        <ul className="flex items-center gap-1 rounded-full border border-gold/40 bg-java-dark/90 px-2 py-1.5 shadow-ornate backdrop-blur-md">
          {ITEMS.map(({ id, label, Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-label={label}
                aria-current={active === id ? "true" : undefined}
                className={cn(
                  "relative flex size-11 flex-col items-center justify-center rounded-full transition-colors duration-400",
                  active === id ? "text-gold" : "text-cream/55",
                )}
              >
                {active === id ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-gold/50 bg-gold/10"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <Icon className="relative size-4" strokeWidth={1.4} />
                <span className="relative mt-0.5 text-[0.5rem] tracking-widest uppercase">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Desktop: right vertical nav */}
      <motion.nav
        aria-label="Navigasi undangan"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-10 top-1/2 z-50 hidden -translate-y-1/2 md:block"
      >
        <ul className="flex flex-col items-end gap-5">
          {ITEMS.map(({ id, label, Icon }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={active === id ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "font-sans text-[0.55rem] tracking-royal uppercase transition-all duration-500",
                    active === id
                      ? "text-gold opacity-100"
                      : "text-muted-clay opacity-0 group-hover:opacity-100",
                  )}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border transition-all duration-500",
                    active === id
                      ? "border-gold/70 bg-gold/10 text-gold"
                      : "border-muted-clay/30 text-muted-clay group-hover:border-gold/50 group-hover:text-gold",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.3} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
