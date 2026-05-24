import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { MATERIAS_ALUMNO } from '../../services/mockData.js';
import Navbar from '../../components/Navbar.jsx';
import MateriaCard from '../../components/MateriaCard.jsx';

const ESTADO_LABEL = {
  rojo: 'Tu profesor envió apoyo',
  morado: 'Anomalías detectadas',
  verde: 'Sin anomalías',
};

const ESTADO_CTA = {
  rojo: 'Ver apoyo de tu profesor',
  morado: 'Hablar con el agente',
  verde: 'Sin acción requerida',
};

export default function MateriasAlumno() {
  const { session, setMascota } = useApp();
  const navigate = useNavigate();

  const [tooltipId, setTooltipId] = useState(null);

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

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
        <div className="mb-xxl">
          <h1 className="font-display text-3xl font-bold text-ink-deep mb-xs">
            Hola, {session?.nombre ?? 'estudiante'}
          </h1>
          <p className="font-ui text-on-dark-muted">
            Aquí puedes ver el estado de tus materias este parcial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {MATERIAS_ALUMNO.map((materia, index) => (
            <MateriaCard
              key={materia.id}
              materiaId={materia.id}
              nombre={materia.nombre}
              variant={`alumno-${materia.estado}`}
              badge={ESTADO_LABEL[materia.estado]}
              meta={[`Profesor: ${materia.profesor}`, `${materia.creditos} créditos`]}
              parcial={materia.parcial}
              promedio={materia.promedio}
              cta={ESTADO_CTA[materia.estado]}
              ctaDisabled={materia.estado === 'verde'}
              showPulse={materia.estado === 'rojo'}
              tooltip={
                tooltipId === materia.id
                  ? 'Sin anomalías detectadas esta semana'
                  : undefined
              }
              index={index}
              onClick={() => handleCardClick(materia)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
