import { useEffect, useState } from 'react';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import { analizarCuestionario } from '../../services/anthropicService.js';
import { RESPUESTAS_CUESTIONARIO } from '../../services/mockData.js';

export default function Reporte({ alumno, onClose }) {
  const [reporte, setReporte] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const respuestas = RESPUESTAS_CUESTIONARIO[alumno.boleta];
    if (!respuestas) {
      setReporte('No hay respuestas disponibles para este alumno.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchReporte() {
      try {
        const result = await analizarCuestionario(alumno, respuestas);
        if (!cancelled) setReporte(result);
      } catch {
        if (!cancelled) {
          setReporte(
            `Problemas detectados: académicos, económicos y emocionales. Soluciones: guía de estudio personalizada, información de becas IPN y Benito Juárez, y acercamiento al servicio de psicología escolar.`,
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchReporte();
    return () => {
      cancelled = true;
    };
  }, [alumno]);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-hairline-violet bg-surface-night p-xxl shadow-xl">
      <div className="mb-xl flex items-center justify-between">
        <h2 className="font-display text-xl font-medium text-on-primary">Reporte</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-on-dark-muted hover:text-on-primary"
          aria-label="Cerrar reporte"
        >
          ✕
        </button>
      </div>

      <p className="mb-lg text-sm text-on-dark-muted">{alumno.nombre}</p>

      {loading ? (
        <p className="text-on-dark-muted">Generando reporte...</p>
      ) : (
        <div className="rounded-xl border border-hairline-violet bg-ink-deep p-xl">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-primary">{reporte}</p>
        </div>
      )}

      <div className="mt-xxl">
        <BotonPrimario variant="ghost" onClick={onClose}>
          Cerrar
        </BotonPrimario>
      </div>
    </div>
  );
}
