import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonPrimario from './BotonPrimario.jsx';
import { generarGuia } from '../services/anthropicService.js';

const FORMATOS_GUIA = [
  {
    id: 'audio',
    estilo: 'auditivo',
    label: 'Resumen de audio',
    descripcion: 'Escucha una explicación narrada paso a paso',
    icono: '🎧',
  },
  {
    id: 'mapa',
    estilo: 'visual',
    label: 'Mapa conceptual',
    descripcion: 'Visualiza las conexiones entre temas',
    icono: '🗺️',
  },
  {
    id: 'diapositivas',
    estilo: 'visual',
    label: 'Presentación de diapositivas',
    descripcion: 'Repasa con slides concisos y organizados',
    icono: '📊',
  },
];

/**
 * Modal for selecting study material format and displaying generated guide.
 *
 * Props:
 *   materia         — subject name
 *   temasDificiles  — comma-separated weak topics
 *   material        — course material content
 *   materiaId       — subject id for navigation
 *   onClose         — callback to close the modal
 */
export default function SelectorGuiaEstudio({ materia, materiaId, temasDificiles, material, onClose }) {
  const navigate = useNavigate();
  const [paso, setPaso] = useState('elegir'); // 'elegir' | 'generando' | 'resultado'
  const [guia, setGuia] = useState('');
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(null);

  async function handleSeleccion(formato) {
    if (formato.id === 'mapa') {
      onClose();
      navigate(`/alumno/materia/rojo/${materiaId}/mapa`);
      return;
    }

    setFormatoSeleccionado(formato);
    setPaso('generando');

    const resultado = await generarGuia(
      formato.estilo,
      materia,
      temasDificiles,
      material,
      formato.id,
    );

    setGuia(resultado);
    setPaso('resultado');
  }

  return (
    <div className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-xl">
      <div
        className={`bg-surface-night border border-hairline-violet rounded-xl p-xxl w-full ${
          paso === 'resultado' ? 'max-w-[40rem]' : 'max-w-[32rem]'
        }`}
      >
        {paso === 'elegir' && (
          <>
            <div className="w-12 h-12 rounded-full bg-accent-violet/20 border border-accent-violet/30 flex items-center justify-center mb-xl mx-auto">
              <span className="text-xl" aria-hidden="true">📚</span>
            </div>

            <h2 className="font-display text-xl font-bold text-ink-deep text-center mb-md">
              ¿Qué material de estudio prefieres?
            </h2>
            <p className="font-ui text-on-dark-muted text-center mb-xxl leading-relaxed">
              Elige el formato que te resulte más útil para repasar{' '}
              <span className="text-ink-deep font-semibold">{materia}</span>.
            </p>

            <div className="flex flex-col gap-md mb-xl">
              {FORMATOS_GUIA.map((formato) => (
                <button
                  key={formato.id}
                  type="button"
                  onClick={() => handleSeleccion(formato)}
                  className="flex items-center gap-lg w-full text-left border border-hairline-violet rounded-xl p-lg hover:border-accent-violet hover:bg-accent-violet/5 transition-colors cursor-pointer"
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">{formato.icono}</span>
                  <div>
                    <p className="font-display font-semibold text-ink-deep">{formato.label}</p>
                    <p className="font-ui text-sm text-on-dark-muted">{formato.descripcion}</p>
                  </div>
                </button>
              ))}
            </div>

            <BotonPrimario variant="ghost" className="w-full justify-center" onClick={onClose}>
              Cancelar
            </BotonPrimario>
          </>
        )}

        {paso === 'generando' && (
          <div className="flex flex-col items-center gap-lg py-xl">
            <div className="w-8 h-8 border-2 border-accent-violet border-t-accent-lime rounded-full animate-spin" />
            <p className="font-ui text-on-dark-muted text-sm animate-pulse text-center">
              Generando tu material personalizado...
            </p>
            {formatoSeleccionado && (
              <p className="font-ui text-xs text-on-dark-muted">
                Formato: {formatoSeleccionado.label}
              </p>
            )}
          </div>
        )}

        {paso === 'resultado' && (
          <>
            <div className="flex items-center gap-sm mb-lg">
              <span className="text-xl" aria-hidden="true">{formatoSeleccionado?.icono}</span>
              <h2 className="font-display text-lg font-bold text-ink-deep">
                {formatoSeleccionado?.label} — {materia}
              </h2>
            </div>

            <div className="bg-accent-violet-deep/20 border border-accent-violet/15 rounded-xl p-lg max-h-[24rem] overflow-y-auto mb-xl">
              <pre className="font-ui text-sm text-ink-deep leading-relaxed whitespace-pre-wrap">
                {guia}
              </pre>
            </div>

            <BotonPrimario variant="primary" className="w-full justify-center" onClick={onClose}>
              Cerrar
            </BotonPrimario>
          </>
        )}
      </div>
    </div>
  );
}
