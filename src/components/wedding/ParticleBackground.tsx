import { useMemo } from "react";

import { cn } from "@/lib/utils";

type Particle = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
};

/**
 * Lightweight CSS-only golden particle field (transform/opacity only).
 */
export function ParticleBackground({
  count = 14,
  className,
  tone = "gold",
}: {
  count?: number;
  className?: string;
  tone?: "gold" | "cream";
}) {
  const particles = useMemo<Particle[]>(() => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      size: 2 + rand() * 4,
      delay: rand() * 12,
      duration: 12 + rand() * 14,
      drift: (rand() - 0.5) * 90,
      opacity: 0.35 + rand() * 0.45,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className={cn(
            "absolute bottom-0 rounded-full blur-[0.4px]",
            tone === "gold" ? "bg-gold" : "bg-cream",
          )}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            ["--drift-x" as string]: `${p.drift}px`,
            animation: `drift-up ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: "0 0 8px currentColor",
          }}
        />
      ))}
    </div>
  );
}
