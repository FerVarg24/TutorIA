import { motion } from 'framer-motion';
import {
  Target,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
} from 'lucide-react';

const ICON_MAP = {
  target: Target,
  arrow: ArrowRight,
  alert: AlertTriangle,
  check: CheckCircle,
};

function SlideHero({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center px-lg relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, rgba(139,92,246,0.5) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(163,230,53,0.25) 0%, transparent 50%)',
        }}
      />
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="relative text-7xl mb-lg"
        aria-hidden="true"
      >
        {slide.icono}
      </motion.span>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative font-display text-4xl md:text-5xl font-bold mb-md bg-gradient-to-r from-accent-violet to-accent-lime bg-clip-text text-transparent"
      >
        {slide.titulo}
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative font-ui text-lg text-on-dark-muted w-full max-w-lg mx-auto px-lg"
      >
        {slide.subtitulo}
      </motion.p>
    </div>
  );
}

function SlideCards({ slide }) {
  return (
    <div className="flex flex-col h-full w-full p-lg md:p-xl gap-lg">
      <h3 className="font-display text-2xl font-bold text-ink-deep">{slide.titulo}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md flex-1 min-h-0">
        {slide.items.map((item, i) => {
          const Icon = ICON_MAP[item.icono] ?? Lightbulb;
          return (
            <motion.div
              key={item.titulo}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="bg-accent-violet/10 border border-accent-violet/25 rounded-xl p-lg flex flex-col gap-sm hover:border-accent-violet/50 transition-colors min-w-0"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-violet/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent-lime" />
              </div>
              <p className="font-display font-semibold text-ink-deep">{item.titulo}</p>
              <p className="font-ui text-sm text-on-dark-muted leading-relaxed">{item.texto}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SlideFormula({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-lg py-lg gap-lg text-center">
      <h3 className="font-display text-2xl font-bold text-ink-deep w-full">{slide.titulo}</h3>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-surface-night/80 border-2 border-accent-violet/40 rounded-2xl px-lg md:px-xxl py-lg md:py-xl shadow-[0_0_48px_rgba(139,92,246,0.2)] w-full max-w-2xl"
      >
        <p className="font-display text-xl md:text-3xl font-bold text-accent-lime tracking-wide break-words">
          {slide.formula}
        </p>
      </motion.div>
      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-ui text-sm md:text-base text-on-dark-muted w-full max-w-2xl mx-auto px-lg leading-relaxed"
      >
        {slide.explicacion}
      </motion.p>
    </div>
  );
}

function SlidePasos({ slide }) {
  return (
    <div className="flex flex-col h-full w-full p-lg md:p-xl gap-lg">
      <h3 className="font-display text-2xl font-bold text-ink-deep">{slide.titulo}</h3>
      <div className="flex flex-col gap-md flex-1 justify-center relative pl-md min-h-0">
        <div className="absolute left-[1.65rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-violet via-accent-lime to-accent-violet/30" />
        {slide.pasos.map((paso, i) => (
          <motion.div
            key={paso}
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-lg relative min-w-0"
          >
            <span className="shrink-0 w-8 h-8 rounded-full bg-accent-violet text-ink-deep font-display font-bold text-sm flex items-center justify-center z-10 border-2 border-accent-lime/40">
              {i + 1}
            </span>
            <p className="font-ui text-ink-deep pt-xs leading-relaxed min-w-0 flex-1">{paso}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideComparacion({ slide }) {
  const Columna = ({ col }) => (
    <div
      className={`flex-1 min-w-0 rounded-xl p-lg border ${
        col.positivo
          ? 'bg-riesgo-bajo/10 border-riesgo-bajo/30'
          : 'bg-riesgo-alto/10 border-riesgo-alto/30'
      }`}
    >
      <div className="flex items-center gap-sm mb-md">
        {col.positivo ? (
          <CheckCircle className="w-5 h-5 text-riesgo-bajo shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-riesgo-alto shrink-0" />
        )}
        <p className="font-display font-semibold text-ink-deep">{col.titulo}</p>
      </div>
      <ul className="flex flex-col gap-sm">
        {col.items.map((item) => (
          <li key={item} className="font-ui text-sm text-on-dark-muted flex items-start gap-xs">
            <span className="text-accent-violet mt-0.5 shrink-0">•</span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full p-lg md:p-xl gap-lg">
      <h3 className="font-display text-2xl font-bold text-ink-deep text-center">{slide.titulo}</h3>
      <div className="flex flex-col sm:flex-row gap-lg flex-1 items-stretch min-h-0">
        <Columna col={slide.izquierda} />
        <Columna col={slide.derecha} />
      </div>
    </div>
  );
}

function SlideCierre({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-lg py-lg gap-lg text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(163,230,53,0.3) 0%, transparent 70%)',
        }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-16 h-16 rounded-full bg-accent-lime/20 border-2 border-accent-lime/50 flex items-center justify-center"
      >
        <Lightbulb className="w-8 h-8 text-accent-lime" />
      </motion.div>
      <h3 className="relative font-display text-3xl font-bold text-ink-deep">{slide.titulo}</h3>
      <ul className="relative flex flex-col gap-md w-full max-w-md mx-auto px-lg text-left">
        {slide.tips.map((tip, i) => (
          <motion.li
            key={tip}
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-sm font-ui text-ink-deep min-w-0"
          >
            <CheckCircle className="w-5 h-5 text-accent-lime shrink-0 mt-0.5" />
            <span className="min-w-0 flex-1">{tip}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/**
 * @param {{ slide: object }} props
 */
export default function SlideRenderer({ slide }) {
  const layouts = {
    hero: SlideHero,
    cards: SlideCards,
    formula: SlideFormula,
    pasos: SlidePasos,
    comparacion: SlideComparacion,
    cierre: SlideCierre,
  };

  const Component = layouts[slide.tipo] ?? SlideHero;

  return (
    <motion.div
      key={slide.titulo + slide.tipo}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden"
    >
      <Component slide={slide} />
    </motion.div>
  );
}
