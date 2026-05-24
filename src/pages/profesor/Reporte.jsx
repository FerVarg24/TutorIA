import { useEffect, useState } from 'react';
import { analizarCuestionario } from '../../services/anthropicService.js';
import { RESPUESTAS_CUESTIONARIO } from '../../services/mockData.js';

/**
 * Side panel that calls analizarCuestionario() and displays the generated report.
 * Rendered inside Seguimiento, not on its own route.
 *
 * Props:
 *   alumno  — student object
 *   onClose — callback to close the panel
 */
export default function Reporte({ alumno, onClose }) {
  const [reporte, setReporte] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const respuestas = RESPUESTAS_CUESTIONARIO[alumno?.boleta];

    if (!respuestas) {
      setReporte(null); // null signals "no responses"
      setLoading(false);
      return;
    }

    analizarCuestionario(alumno, respuestas)
      .then((text) => setReporte(text))
      .finally(() => setLoading(false));
  }, [alumno]);

  return (
    <div
      className="fixed inset-y-0 right-0 max-w-[28rem] w-full bg-surface-night border-l border-hairline-violet z-50 overflow-y-auto"
      role="dialog"
      aria-label="Reporte del alumno"
    >
      {/* Header */}
      <div className="sticky top-0 bg-surface-night border-b border-hairline-violet px-xl py-md flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-on-primary">
          Reporte de intervención
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar reporte"
          className="text-on-dark-muted hover:text-on-primary border border-hairline-violet rounded-md px-md py-xs font-ui text-sm transition-all hover:border-accent-violet"
        >
          ✕
        </button>
      </div>

      {/* Student name sub-header */}
      <div className="px-xl py-md border-b border-hairline-violet/50">
        <p className="font-ui text-sm text-on-dark-muted">
          Alumno:{' '}
          <span className="text-on-primary font-medium">{alumno?.nombre}</span>
        </p>
        <p className="font-ui text-xs text-on-dark-muted mt-xxs">{alumno?.boleta}</p>
      </div>

      {/* Content */}
      <div className="p-xl">
        {loading && (
          <div className="flex flex-col items-center gap-lg py-xxl">
            <div className="w-8 h-8 border-2 border-accent-violet border-t-accent-lime rounded-full animate-spin" />
            <p className="font-ui text-on-dark-muted text-sm">
              Analizando respuestas del cuestionario...
            </p>
          </div>
        )}

        {!loading && reporte === null && (
          <div className="bg-surface-canvas-dark border border-hairline-violet rounded-xl p-xl">
            <p className="font-ui text-on-dark-muted text-sm">
              No hay respuestas registradas para este alumno.
            </p>
          </div>
        )}

        {!loading && reporte && (
          <div className="bg-surface-canvas-dark border border-hairline-violet rounded-xl p-xl">
            <p className="font-ui text-on-primary text-sm leading-relaxed whitespace-pre-wrap">
              {reporte}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
