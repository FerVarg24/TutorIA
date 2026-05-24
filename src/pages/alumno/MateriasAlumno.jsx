import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { MATERIAS_ALUMNO } from '../../services/mockData.js';
import Navbar from '../../components/Navbar.jsx';

// Maps estado value to Tailwind border + background classes
const ESTADO_CARD_CLASS = {
  rojo: 'border-riesgo-alto bg-riesgo-alto/10 hover:bg-riesgo-alto/15',
  morado: 'border-iniciativa-alumno bg-iniciativa-alumno/10 hover:bg-iniciativa-alumno/15',
  verde: 'border-riesgo-bajo bg-riesgo-bajo/10 hover:bg-riesgo-bajo/15',
};

const ESTADO_BADGE_CLASS = {
  rojo: 'bg-riesgo-alto/20 text-riesgo-alto border-riesgo-alto/30',
  morado: 'bg-iniciativa-alumno/20 text-iniciativa-alumno border-iniciativa-alumno/30',
  verde: 'bg-riesgo-bajo/20 text-riesgo-bajo border-riesgo-bajo/30',
};

const ESTADO_LABEL = {
  rojo: 'Tu profesor envió apoyo',
  morado: 'Anomalías detectadas',
  verde: 'Sin anomalías',
};

export default function MateriasAlumno() {
  const { session, setMascota } = useApp();
  const navigate = useNavigate();

  // Tracks which materia id is showing the inline tooltip (verde cards only)
  const [tooltipId, setTooltipId] = useState(null);

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

  // Auto-dismiss tooltip after 2.5 s
  useEffect(() => {
    if (!tooltipId) return;
    const timer = setTimeout(() => setTooltipId(null), 2500);
    return () => clearTimeout(timer);
  }, [tooltipId]);

  function handleCardClick(materia) {
    if (materia.estado === 'rojo') {
      navigate(`/alumno/materia/rojo/${materia.id}`);
    } else if (materia.estado === 'morado') {
      navigate(`/alumno/materia/morado/${materia.id}`);
    } else {
      setTooltipId(materia.id);
    }
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title="Mis Materias" />

      <main className="p-xl">
        {/* Header */}
        <div className="mb-xxl">
          <h1 className="font-display text-3xl font-bold text-ink-deep mb-xs">
            Hola, {session?.nombre ?? 'estudiante'}
          </h1>
          <p className="font-ui text-on-dark-muted">
            Aquí puedes ver el estado de tus materias este parcial.
          </p>
        </div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {MATERIAS_ALUMNO.map((materia) => {
            const cardClass = ESTADO_CARD_CLASS[materia.estado] ?? 'border-hairline-violet bg-surface-night';
            const badgeClass = ESTADO_BADGE_CLASS[materia.estado] ?? '';
            const showTooltip = tooltipId === materia.id;

            return (
              <button
                key={materia.id}
                type="button"
                onClick={() => handleCardClick(materia)}
                className={`text-left border rounded-xl p-xl cursor-pointer transition-all group ${cardClass}`}
              >
                {/* Top: name + estado badge */}
                <div className="flex items-start justify-between gap-md mb-md">
                  <h2 className="font-display text-lg font-semibold text-ink-deep leading-snug">
                    {materia.nombre}
                  </h2>
                  <span
                    className={`shrink-0 border rounded-full px-sm py-xs text-xs font-bold font-ui whitespace-nowrap ${badgeClass}`}
                  >
                    {ESTADO_LABEL[materia.estado]}
                  </span>
                </div>

                {/* Meta */}
                <p className="font-ui text-sm text-on-dark-muted mb-xs">
                  Profesor: <span className="text-ink-deep font-medium">{materia.profesor}</span>
                </p>
                <p className="font-ui text-sm text-on-dark-muted mb-lg">
                  Créditos: <span className="text-ink-deep font-medium">{materia.creditos}</span>
                </p>

                {/* Tooltip for verde cards */}
                {showTooltip && (
                  <p className="font-ui text-xs text-riesgo-bajo font-medium animate-pulse mb-sm">
                    Sin anomalías detectadas esta semana
                  </p>
                )}

                {/* Footer hint */}
                {materia.estado !== 'verde' && (
                  <p className="font-ui text-xs text-on-dark-muted group-hover:text-primary transition-colors">
                    {materia.estado === 'rojo' ? 'Ver apoyo de tu profesor →' : 'Hablar con el agente →'}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
