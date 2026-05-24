import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { getResumenRiesgoMateria, MATERIAS_PROFESOR } from '../../services/mockData.js';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import MateriaCard from '../../components/MateriaCard.jsx';

export default function MateriasProfesor() {
  const { setMascota } = useApp();
  const navigate = useNavigate();

  const [uploadState, setUploadState] = useState('idle');
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

      <input
        type="file"
        accept=".csv,.xlsx,.pdf,image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <main className="p-xl">
        <div className="flex items-center justify-between mb-xxl">
          <div>
            <h1 className="font-display text-3xl font-bold text-ink-deep mb-xs">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {MATERIAS_PROFESOR.map((materia, index) => {
            const breakdown = getResumenRiesgoMateria(materia.id);

            return (
              <MateriaCard
                key={materia.id}
                materiaId={materia.id}
                nombre={materia.nombre}
                variant="profesor"
                badge={`${materia.en_riesgo} en riesgo`}
                meta={[`Grupo ${materia.grupo}`, `${materia.alumnos} inscritos`]}
                resumenRiesgo={{
                  ...breakdown,
                  total: materia.alumnos,
                  en_riesgo: materia.en_riesgo,
                }}
                cta="Ver lista de alumnos"
                showPulse={materia.en_riesgo >= 5}
                index={index}
                onClick={() => navigate(`/profesor/materia/${materia.id}`)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
