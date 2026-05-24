import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { MATERIAS_PROFESOR } from '../../services/mockData.js';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';

export default function MateriasProfesor() {
  const { setMascota } = useApp();
  const navigate = useNavigate();

  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'loading' | 'done'
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

  function handleFileChange() {
    setUploadState('loading');
    setTimeout(() => {
      setUploadState('done');
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title="Mis Materias" />

      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv,.xlsx,.pdf,image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <main className="p-xl">
        {/* Header row */}
        <div className="flex items-center justify-between mb-xxl">
          <div>
            <h1 className="font-display text-3xl font-bold text-on-primary mb-xs">
              Materias del semestre
            </h1>
            <p className="font-ui text-on-dark-muted">
              Selecciona una materia para ver el estado de tus alumnos.
            </p>
          </div>

          {uploadState === 'idle' && (
            <BotonPrimario variant="ghost" onClick={() => fileInputRef.current.click()}>
              Cargar registro del grupo
            </BotonPrimario>
          )}

          {uploadState === 'loading' && (
            <BotonPrimario variant="ghost" disabled className="flex items-center gap-sm">
              <span className="w-4 h-4 border-2 border-accent-violet border-t-accent-lime rounded-full animate-spin shrink-0" />
              Analizando lista...
            </BotonPrimario>
          )}

          {uploadState === 'done' && (
            <BotonPrimario variant="ghost" disabled className="text-riesgo-bajo">
              Lista cargada ✓
            </BotonPrimario>
          )}
        </div>

        {/* Subjects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {MATERIAS_PROFESOR.map((materia) => (
            <button
              key={materia.id}
              type="button"
              onClick={() => navigate(`/profesor/materia/${materia.id}`)}
              className="text-left bg-surface-night border border-hairline-violet rounded-xl p-xl cursor-pointer hover:border-accent-violet transition-all group"
            >
              {/* Top row: name + risk badge */}
              <div className="flex items-start justify-between gap-md mb-md">
                <h2 className="font-display text-lg font-semibold text-on-primary group-hover:text-accent-lime transition-colors leading-snug">
                  {materia.nombre}
                </h2>
                <span className="shrink-0 bg-riesgo-alto/20 text-riesgo-alto border border-riesgo-alto/30 rounded-full px-sm py-xs text-sm font-bold font-ui whitespace-nowrap">
                  {materia.en_riesgo} en riesgo
                </span>
              </div>

              {/* Meta */}
              <p className="font-ui text-sm text-on-dark-muted mb-sm">
                Grupo: <span className="text-on-primary font-medium">{materia.grupo}</span>
              </p>
              <p className="font-ui text-sm text-on-dark-muted">
                {materia.alumnos} alumnos inscritos
              </p>

              {/* Footer hint */}
              <p className="mt-lg font-ui text-xs text-accent-violet group-hover:text-accent-lime transition-colors">
                Ver lista de alumnos →
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
