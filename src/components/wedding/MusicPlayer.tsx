import { motion } from "motion/react";
import { Music2, Pause } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import backsoundSrc from "@/assets/backsound.mp3";
import { cn } from "@/lib/utils";

/** Musik latar undangan: nasheed pernikahan, diputar setelah tamu membuka undangan. */
export function MusicPlayer({ active }: { active: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    void audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  // Mulai hanya setelah tamu membuka undangan (gesture pengguna).
  useEffect(() => {
    if (active) start();
  }, [active, start]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stop]);

  if (!active) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={backsoundSrc}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
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
    </>
  );
}
