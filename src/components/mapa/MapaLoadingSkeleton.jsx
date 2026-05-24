import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { PALETA_RAMAS, CENTRAL_THEME } from '../../utils/mapaVisual.js';

const SATELLITE_COUNT = 5;
const RADIUS = 38;

const satellitePositions = Array.from({ length: SATELLITE_COUNT }, (_, i) => {
  const angle = (2 * Math.PI * i) / SATELLITE_COUNT - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * RADIUS,
    y: 50 + Math.sin(angle) * RADIUS,
    color: PALETA_RAMAS[i % PALETA_RAMAS.length].color,
  };
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

/**
 * @param {{ tema?: string | null }} props
 */
export default function MapaLoadingSkeleton({ tema }) {
  const label = tema ? `Generando mapa de ${tema}…` : 'Generando mapa conceptual…';

  return (
    <div className="mapa-loading-skeleton flex-1 min-h-[400px] rounded-xl overflow-hidden border border-hairline-violet mapa-flow-wrapper relative flex flex-col">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#b8d0e8 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative flex-1 flex items-center justify-center p-xl">
        <motion.div
          className="relative w-full max-w-md aspect-square"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            className="absolute inset-0 w-full h-full mapa-loading-edges"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {satellitePositions.map((sat, i) => (
              <motion.path
                key={i}
                d={`M 50 50 Q ${(50 + sat.x) / 2} ${(50 + sat.y) / 2 - 4} ${sat.x} ${sat.y}`}
                fill="none"
                stroke={sat.color}
                strokeWidth="0.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0.3, 0.7, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.12,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            variants={nodeVariants}
          >
            <div
              className="flex flex-col items-center gap-xs rounded-2xl border-2 px-lg py-md min-w-[120px] shadow-md mapa-skeleton-shimmer"
              style={{
                backgroundColor: CENTRAL_THEME.bg,
                borderColor: CENTRAL_THEME.border,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full w-10 h-10"
                style={{ backgroundColor: `${CENTRAL_THEME.color}22`, color: CENTRAL_THEME.color }}
              >
                <Target size={20} strokeWidth={2.2} />
              </div>
              <div className="h-3 w-16 rounded-full bg-accent-violet/25 mapa-skeleton-bar" />
            </div>
          </motion.div>

          {satellitePositions.map((sat, i) => (
            <motion.div
              key={i}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${sat.x}%`, top: `${sat.y}%` }}
              variants={nodeVariants}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: { duration: 2 + i * 0.15, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <div
                className="flex flex-col items-center gap-xxs rounded-xl border-2 px-sm py-xs min-w-[72px] mapa-skeleton-shimmer"
                style={{
                  backgroundColor: `${sat.color}18`,
                  borderColor: `${sat.color}66`,
                }}
              >
                <div
                  className="rounded-full w-6 h-6 mapa-skeleton-bar"
                  style={{ backgroundColor: `${sat.color}33` }}
                />
                <div
                  className="h-2 w-10 rounded-full mapa-skeleton-bar"
                  style={{ backgroundColor: `${sat.color}28` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="relative shrink-0 pb-lg flex flex-col items-center gap-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
      >
        <p className="font-display text-sm font-semibold text-ink-deep">{label}</p>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-hairline-violet/80">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-violet/40 via-accent-violet to-accent-violet-deep/60"
            initial={{ width: '0%' }}
            animate={{ width: ['0%', '70%', '95%', '70%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
