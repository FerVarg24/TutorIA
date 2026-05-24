import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const BAR_COUNT = 48;

function getBarHeight(index, activo, tick) {
  if (!activo) {
    return 0.15 + Math.sin((index / BAR_COUNT) * Math.PI * 2 + tick * 0.02) * 0.08;
  }
  const wave1 = Math.sin((index / BAR_COUNT) * Math.PI * 4 + tick * 0.12) * 0.35;
  const wave2 = Math.sin((index / BAR_COUNT) * Math.PI * 8 + tick * 0.08) * 0.2;
  const center = 1 - Math.abs(index - BAR_COUNT / 2) / (BAR_COUNT / 2);
  return 0.2 + (wave1 + wave2 + 0.3) * (0.5 + center * 0.5);
}

/**
 * @param {{
 *   reproduciendo: boolean,
 *   pausado: boolean,
 *   onToggle: () => void,
 * }} props
 */
export default function AudioVisualizer({ reproduciendo, pausado, onToggle }) {
  const [tick, setTick] = useState(0);
  const activo = reproduciendo && !pausado;

  useEffect(() => {
    let frame;
    const animate = () => {
      setTick((t) => t + 1);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full max-w-xl mx-auto aspect-[2/1]">
      {/* Glow de fondo */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 ${
          activo ? 'opacity-60' : 'opacity-30'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(163,230,53,0.15) 50%, transparent 70%)',
        }}
      />

      {/* Anillos concéntricos */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-accent-violet/20"
        animate={{ scale: activo ? [1, 1.08, 1] : 1, opacity: activo ? [0.3, 0.6, 0.3] : 0.2 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-accent-lime/10"
        animate={{ scale: activo ? [1, 1.05, 1] : 1, opacity: activo ? [0.15, 0.35, 0.15] : 0.1 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Barras del visualizador */}
      <div className="relative flex items-end justify-center gap-[3px] h-32 px-md">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const heightPct = getBarHeight(i, activo, tick) * 100;
          const isCenter = Math.abs(i - BAR_COUNT / 2) < 4;

          return (
            <motion.div
              key={i}
              className="w-[4px] rounded-full"
              style={{
                background: isCenter
                  ? 'linear-gradient(to top, #8B5CF6, #A3E635)'
                  : 'linear-gradient(to top, rgba(139,92,246,0.6), rgba(163,230,53,0.4))',
              }}
              animate={{ height: `${heightPct}%` }}
              transition={{ duration: activo ? 0.08 : 0.3, ease: 'easeOut' }}
            />
          );
        })}
      </div>

      {/* Botón play/pause central */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute z-10 w-16 h-16 rounded-full bg-accent-violet/90 hover:bg-accent-violet border-2 border-accent-lime/40 flex items-center justify-center shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all hover:scale-105 cursor-pointer"
        aria-label={reproduciendo && !pausado ? 'Pausar' : 'Reproducir'}
      >
        {reproduciendo && !pausado ? (
          <Pause className="w-7 h-7 text-ink-deep" fill="currentColor" />
        ) : (
          <Play className="w-7 h-7 text-ink-deep ml-0.5" fill="currentColor" />
        )}
      </button>
    </div>
  );
}
