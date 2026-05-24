import { useNavigate } from 'react-router-dom';
import BotonPrimario from './BotonPrimario.jsx';

const FORMATOS_GUIA = [
  {
    id: 'audio',
    label: 'Resumen de audio',
    descripcion: 'Escucha una explicación narrada paso a paso',
    icono: '🎧',
    ruta: 'audio',
  },
  {
    id: 'mapa',
    label: 'Mapa conceptual',
    descripcion: 'Visualiza las conexiones entre temas',
    icono: '🗺️',
    ruta: 'mapa',
  },
  {
    id: 'diapositivas',
    label: 'Presentación de diapositivas',
    descripcion: 'Repasa con slides concisos y organizados',
    icono: '📊',
    ruta: 'presentacion',
  },
];

/**
 * Modal for selecting study material format.
 *
 * Props:
 *   materia    — subject name
 *   materiaId  — subject id for navigation
 *   onClose    — callback to close the modal
 */
export default function SelectorGuiaEstudio({ materia, materiaId, onClose }) {
  const navigate = useNavigate();

  function handleSeleccion(formato) {
    onClose();
    navigate(`/alumno/materia/rojo/${materiaId}/${formato.ruta}`);
  }

  return (
    <div className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center p-xl">
      <div className="bg-surface-night border border-hairline-violet rounded-xl p-xxl w-full max-w-[32rem]">
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
      </div>
    </div>
  );
}
