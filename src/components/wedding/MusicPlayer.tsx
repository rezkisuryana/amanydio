import { motion } from "motion/react";
import { Music2, Pause } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Ambient gamelan-inspired music, synthesised with the Web Audio API so the
 * invitation carries its own soundtrack without shipping an audio file.
 * Slendro-like pentatonic scale, slow metallophone-style decays.
 */
const SCALE = [261.63, 294.33, 349.23, 392.0, 440.0, 523.25, 588.66, 698.46];
const PHRASE = [0, 2, 4, 3, 5, 4, 2, 1, 0, 3, 5, 6, 4, 2, 3, 1];

export function MusicPlayer({ active }: { active: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (gain && ctx) {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
    }
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    if (!ctxRef.current) {
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = 0;
      const reverbDelay = ctx.createDelay(1.2);
      reverbDelay.delayTime.value = 0.28;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.32;
      reverbDelay.connect(feedback);
      feedback.connect(reverbDelay);
      master.connect(ctx.destination);
      master.connect(reverbDelay);
      reverbDelay.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = master;
    }
    const ctx = ctxRef.current;
    const master = gainRef.current;
    if (!ctx || !master) return;
    void ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.16, ctx.currentTime, 1.1);

    const strike = (freq: number, when: number, level: number) => {
      const osc = ctx.createOscillator();
      const partial = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "triangle";
      partial.type = "sine";
      osc.frequency.value = freq;
      partial.frequency.value = freq * 2.76;
      env.gain.setValueAtTime(0.0001, when);
      env.gain.exponentialRampToValueAtTime(level, when + 0.012);
      env.gain.exponentialRampToValueAtTime(0.0001, when + 2.6);
      const partialGain = ctx.createGain();
      partialGain.gain.value = 0.18;
      osc.connect(env);
      partial.connect(partialGain);
      partialGain.connect(env);
      env.connect(master);
      osc.start(when);
      partial.start(when);
      osc.stop(when + 2.7);
      partial.stop(when + 2.7);
    };

    const tick = () => {
      const i = stepRef.current % PHRASE.length;
      const t = ctx.currentTime + 0.02;
      const note = SCALE[PHRASE[i]!]!;
      strike(note, t, 0.5);
      if (i % 4 === 0) strike(note / 2, t, 0.34);
      if (i % 8 === 4) strike(SCALE[PHRASE[(i + 2) % PHRASE.length]!]! * 2, t + 0.24, 0.16);
      stepRef.current += 1;
    };

    tick();
    timerRef.current = window.setInterval(tick, 720);
    setPlaying(true);
  }, []);

  // Start only after the guest opens the invitation (user gesture).
  useEffect(() => {
    if (active) start();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [active, start]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && playing) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing, stop]);

  if (!active) return null;

  return (
    <motion.button
      type="button"
      onClick={() => (playing ? stop() : start())}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? "Hentikan musik latar" : "Putar musik latar"}
      aria-pressed={playing}
      className="fixed left-4 bottom-24 z-50 flex size-12 items-center justify-center rounded-full border border-gold/60 bg-java-dark/80 text-gold backdrop-blur-sm transition-colors hover:border-gold md:left-6 md:bottom-6"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-[-5px] rounded-full border border-dashed border-gold/40",
          playing && "animate-spin-slow",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full",
          playing && "animate-glow-pulse glow-gold",
        )}
      />
      {playing ? (
        <Pause className="relative size-4" />
      ) : (
        <Music2 className="relative size-4" />
      )}
    </motion.button>
  );
}
