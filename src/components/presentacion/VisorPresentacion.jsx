import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BotonPrimario from '../BotonPrimario.jsx';
import SlideRenderer from './SlideRenderer.jsx';
import { usePresentacion } from '../../hooks/usePresentacion.js';

/**
 * @param {{
 *   presentacion: { titulo: string, subtitulo: string, slides: object[] },
 *   tema: string,
 *   materia: string,
 * }} props
 */
export default function VisorPresentacion({ presentacion, tema, materia }) {
  const slides = presentacion.slides;
  const {
    slideActual,
    totalSlides,
    progreso,
    irA,
    siguiente,
    anterior,
    esPrimero,
    esUltimo,
  } = usePresentacion(slides.length);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' && !esUltimo) siguiente();
      if (e.key === 'ArrowLeft' && !esPrimero) anterior();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [siguiente, anterior, esPrimero, esUltimo]);

  const slide = slides[slideActual];

  return (
    <div className="bg-surface-night border border-hairline-violet rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-md px-xl py-lg border-b border-hairline-violet/50">
        <div>
          <p className="font-ui text-xs uppercase tracking-wide text-accent-violet mb-xs">
            Presentación
          </p>
          <h2 className="font-display text-lg font-bold text-ink-deep">{tema}</h2>
          <p className="font-ui text-xs text-on-dark-muted">{materia}</p>
        </div>
        <span className="text-2xl" aria-hidden="true">📊</span>
      </div>

      {/* Slide viewport 16:9 */}
      <div className="relative bg-gradient-to-br from-surface-canvas-dark via-accent-violet-deep/10 to-surface-canvas-dark aspect-video min-h-[20rem] overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <SlideRenderer key={slideActual} slide={slide} />
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-xl pt-md">
        <div className="h-1.5 bg-accent-violet/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-violet to-accent-lime rounded-full transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-xs py-md px-xl flex-wrap">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => irA(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === slideActual
                ? 'bg-accent-lime scale-125'
                : 'bg-accent-violet/40 hover:bg-accent-violet/70'
            }`}
          />
        ))}
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between gap-md px-xl pb-xl flex-wrap">
        <BotonPrimario
          variant="ghost"
          onClick={anterior}
          disabled={esPrimero}
          className="inline-flex items-center gap-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </BotonPrimario>

        <span className="font-ui text-sm text-on-dark-muted">
          {slideActual + 1} / {totalSlides}
        </span>

        <BotonPrimario
          variant="primary"
          onClick={siguiente}
          disabled={esUltimo}
          className="inline-flex items-center gap-xs"
        >
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </BotonPrimario>
      </div>
    </div>
  );
}
