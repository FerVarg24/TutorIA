import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { MATERIAS_ALUMNO } from '../../services/mockData.js';

const ESTADO_STYLES = {
  rojo: 'border-riesgo-alto bg-riesgo-alto/10',
  morado: 'border-iniciativa-alumno bg-iniciativa-alumno/10',
  verde: 'border-riesgo-bajo bg-riesgo-bajo/10',
};

export default function MateriasAlumno() {
  const { setMascota } = useApp();

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

  const handleClick = (materia, e) => {
    if (materia.estado === 'verde') {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title="Mis Materias" />
      <main className="mx-auto max-w-4xl px-xl py-xxl">
        <h1 className="mb-xxl font-display text-3xl font-bold text-on-primary">Mis Materias</h1>

        <div className="grid gap-xl">
          {MATERIAS_ALUMNO.map((materia) => {
            const href =
              materia.estado === 'rojo'
                ? `/alumno/materia/rojo/${materia.id}`
                : materia.estado === 'morado'
                  ? `/alumno/materia/morado/${materia.id}`
                  : '#';

            return (
              <Link
                key={materia.id}
                to={href}
                onClick={(e) => handleClick(materia, e)}
                title={
                  materia.estado === 'verde'
                    ? 'Sin anomalías detectadas esta semana'
                    : undefined
                }
                className={`block rounded-xxl border-2 p-xxl transition-transform hover:scale-[1.01] ${ESTADO_STYLES[materia.estado]}`}
              >
                <h2 className="mb-sm font-display text-xl font-medium text-on-primary">
                  {materia.nombre}
                </h2>
                <p className="text-sm text-on-dark-muted">Prof. {materia.profesor}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
