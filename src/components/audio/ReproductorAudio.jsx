import { RotateCcw } from 'lucide-react';
import BotonPrimario from '../BotonPrimario.jsx';
import AudioVisualizer from './AudioVisualizer.jsx';
import { useResumenAudio } from '../../hooks/useResumenAudio.js';

/**
 * @param {{
 *   resumen: { duracion: string, secciones: Array<{ titulo: string, texto: string }> },
 *   tema: string,
 *   materia: string,
 * }} props
 */
export default function ReproductorAudio({ resumen, tema, materia }) {
  const {
    reproduciendo,
    pausado,
    progreso,
    seccionActual,
    toggle,
    stop,
    play,
  } = useResumenAudio(resumen);

  const seccion = resumen.secciones[seccionActual] ?? resumen.secciones[0];

  return (
    <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col gap-xl">
      <div className="flex items-start justify-between gap-md flex-wrap">
        <div>
          <p className="font-ui text-xs uppercase tracking-wide text-accent-violet mb-xs">
            Resumen de audio
          </p>
          <h2 className="font-display text-xl font-bold text-ink-deep">
            {tema}
          </h2>
          <p className="font-ui text-sm text-on-dark-muted mt-xs">
            {materia} · Duración estimada: {resumen.duracion}
          </p>
        </div>
        <span className="text-3xl" aria-hidden="true">🎧</span>
      </div>

      <AudioVisualizer
        reproduciendo={reproduciendo}
        pausado={pausado}
        onToggle={toggle}
      />

      {/* Barra de progreso */}
      <div className="flex flex-col gap-xs">
        <div className="h-1.5 bg-accent-violet/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-violet to-accent-lime rounded-full transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-ui text-on-dark-muted">
          <span>{Math.round(progreso)}%</span>
          <span>{resumen.duracion}</span>
        </div>
      </div>

      {/* Sección activa del guion */}
      <div className="bg-accent-violet-deep/20 border border-accent-violet/15 rounded-xl p-lg max-h-[14rem] overflow-y-auto">
        <p className="font-ui text-xs uppercase tracking-wide text-accent-lime mb-sm">
          {seccion.titulo}
        </p>
        <p className="font-ui text-sm text-ink-deep leading-relaxed">
          {seccion.texto}
        </p>
      </div>

      {/* Controles secundarios */}
      <div className="flex gap-md flex-wrap">
        <BotonPrimario
          variant="primary"
          onClick={play}
          disabled={reproduciendo && !pausado}
        >
          {pausado ? 'Continuar' : reproduciendo ? 'Reproduciendo...' : 'Reproducir'}
        </BotonPrimario>
        <BotonPrimario
          variant="ghost"
          onClick={stop}
          className="inline-flex items-center gap-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </BotonPrimario>
      </div>
    </div>
  );
}
