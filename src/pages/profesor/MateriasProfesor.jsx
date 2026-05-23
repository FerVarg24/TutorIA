import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { MATERIAS_PROFESOR } from '../../services/mockData.js';

export default function MateriasProfesor() {
  const { setMascota } = useApp();

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title="Dashboard Profesor" />
      <main className="mx-auto max-w-6xl px-xl py-xxl">
        <div className="mb-xxl flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-on-primary">Mis Materias</h1>
          <button
            type="button"
            className="rounded-md border border-hairline-violet bg-accent-violet-deep px-lg py-md text-sm font-semibold uppercase text-on-primary"
            aria-label="Cargar registro del grupo"
          >
            Cargar registro del grupo
          </button>
        </div>

        <div className="grid gap-xl md:grid-cols-2 lg:grid-cols-3">
          {MATERIAS_PROFESOR.map((materia) => (
            <Link
              key={materia.id}
              to={`/profesor/materia/${materia.id}`}
              className="rounded-xxl border border-hairline-violet bg-ink-deep p-xxl transition-transform hover:scale-[1.02]"
            >
              <h2 className="mb-sm font-display text-xl font-medium text-on-primary">
                {materia.nombre}
              </h2>
              <p className="mb-lg text-sm text-on-dark-muted">Grupo {materia.grupo}</p>
              <p className="mb-md text-sm text-on-dark-muted">{materia.alumnos} alumnos</p>
              <span className="inline-block rounded-xs bg-riesgo-alto px-md py-xs text-sm font-semibold text-on-primary">
                {materia.en_riesgo} en riesgo
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
