import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import Navbar from '../../components/Navbar.jsx';
import TypewriterText from '../../components/TypewriterText.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { analizarAlumno } from '../../services/anthropicService.js';
import { getAlumnoByBoleta } from '../../services/mockData.js';
import Seguimiento from './Seguimiento.jsx';

const FACTORES = [
  'Declive de 2.4 puntos',
  '3 faltas consecutivas',
  'Última tarea no entregada',
];

export default function AlumnoDetalle() {
  const { boleta } = useParams();
  const { setMascota } = useApp();
  const alumno = getAlumnoByBoleta(boleta);
  const [analisis, setAnalisis] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSeguimiento, setShowSeguimiento] = useState(false);
  const [analisisCompleto, setAnalisisCompleto] = useState(false);

  useEffect(() => {
    setMascota({ modo: 'hablando', mensaje: '' });
  }, [setMascota]);

  useEffect(() => {
    if (!alumno) return;

    let cancelled = false;

    async function fetchAnalisis() {
      setLoading(true);
      try {
        const result = await analizarAlumno(alumno);
        if (!cancelled) {
          setAnalisis(result);
          setMascota({ modo: 'hablando', mensaje: result });
        }
      } catch {
        const fallback = `El alumno ${alumno.nombre} presenta señales de riesgo académico. Su asistencia es del ${alumno.asistencia}, ha entregado ${alumno.tareas_entregadas} tareas y su calificación bajó ${Math.abs(alumno.declive)} puntos. Recomiendo intervención temprana.`;
        if (!cancelled) {
          setAnalisis(fallback);
          setMascota({ modo: 'hablando', mensaje: fallback });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAnalisis();
    return () => {
      cancelled = true;
    };
  }, [alumno, setMascota]);

  if (!alumno) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark p-xxl text-on-primary">
        Alumno no encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title={`Análisis — ${alumno.nombre}`} />
      <main className="grid min-h-[calc(100vh-65px)] lg:grid-cols-2">
        <section className="border-r border-hairline-violet p-xxl">
          <h2 className="mb-xl font-display text-xl font-medium text-on-primary">Agente TutorIA</h2>
          {loading ? (
            <p className="text-on-dark-muted">Analizando datos del alumno...</p>
          ) : (
            <TypewriterText
              text={analisis}
              className="text-base leading-relaxed text-on-primary"
              onComplete={() => setAnalisisCompleto(true)}
            />
          )}
        </section>

        <section className="p-xxl">
          <Dashboard alumno={alumno} factores={analisisCompleto ? FACTORES : []} />
          {analisisCompleto && (
            <div className="mt-xxl">
              <BotonPrimario onClick={() => setShowSeguimiento(true)}>
                Dar seguimiento a este alumno
              </BotonPrimario>
            </div>
          )}
        </section>
      </main>

      {showSeguimiento && (
        <Seguimiento alumno={alumno} onClose={() => setShowSeguimiento(false)} />
      )}
    </div>
  );
}
