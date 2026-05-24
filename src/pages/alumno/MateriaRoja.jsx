import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  getMateriaAlumnoById,
  getAlumnoEnMateria,
  getFactoresRiesgo,
  getDominioPorTema,
  MATERIAL_POR_MATERIA,
} from '../../services/mockData.js';
import TypewriterText from '../../components/TypewriterText.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import SelectorGuiaEstudio from '../../components/SelectorGuiaEstudio.jsx';
import { showCuestionarioToast, dismissCuestionarioToast } from '../../utils/cuestionarioToast.js';

export default function MateriaRoja() {
  const { id } = useParams();
  const { session, setMascota } = useApp();
  const navigate = useNavigate();

  const [showSelectorGuia, setShowSelectorGuia] = useState(false);
  const [quizRespondido, setQuizRespondido] = useState(false);
  const toastIdRef = useRef(null);

  const materia = getMateriaAlumnoById(id);
  const alumno = getAlumnoEnMateria(session?.boleta, id);

  const temasDificiles = getDominioPorTema(alumno?.boleta, id)
    .filter((t) => t.promedio < 6)
    .map((t) => t.tema)
    .join(', ') || 'temas del parcial actual';

  useEffect(() => {
    setMascota({ modo: 'hablando', mensaje: '' });
  }, [setMascota]);

  useEffect(() => {
    if (quizRespondido) return;
    const timer = window.setTimeout(() => {
      toastIdRef.current = showCuestionarioToast({
        onRespondido: () => setQuizRespondido(true),
      });
    }, 0);
    return () => {
      clearTimeout(timer);
      dismissCuestionarioToast(toastIdRef.current);
    };
  }, [quizRespondido]);

  const mensajeAgente = alumno && materia
    ? `Hola ${alumno.nombre}, tu profesor notó que has tenido algunas dificultades esta semana en ${materia.nombre}. No te preocupes, estamos aquí para apoyarte.\n\nDetectamos que tu asistencia está en ${alumno.asistencia} y llevas ${alumno.tareas_entregadas} tareas entregadas. Tu calificación ha tenido un cambio de ${alumno.declive} puntos respecto al parcial anterior.\n\nTu profesor ya preparó recursos de apoyo para ti. A continuación puedes ver tus indicadores y las soluciones propuestas.`
    : '';

  if (!alumno || !materia) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark flex items-center justify-center">
        <p className="font-ui text-on-dark-muted">Información no disponible.</p>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Mis Materias', href: '/alumno/materias' },
    { label: materia.nombre, href: '#' },
  ];

  return (
    <div className="min-h-screen lg:h-screen bg-surface-canvas-dark flex flex-col lg:overflow-hidden">
      <Navbar title={materia.nombre} breadcrumbs={breadcrumbs} />

      <div className="flex-1 min-h-0 p-xl">
        <div className="grid h-full min-h-0 lg:grid-cols-2 gap-xl">

        {/* ── Left column: agent message ── */}
        <div className="flex flex-col gap-xl min-h-0 h-full overflow-hidden">
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex items-center gap-lg shrink-0">
            <div className="w-12 h-12 rounded-full bg-riesgo-alto/20 border border-riesgo-alto/40 flex items-center justify-center shrink-0">
              <span className="text-riesgo-alto text-lg font-bold font-display">
                {alumno.nombre.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-ink-deep">{alumno.nombre}</p>
              <p className="font-ui text-xs text-on-dark-muted">{materia.nombre}</p>
            </div>
            <span className="ml-auto bg-riesgo-alto/15 text-riesgo-alto border border-riesgo-alto/30 rounded-xs px-sm py-xs text-xs font-bold font-ui">
              Apoyo del Profesor
            </span>
          </div>

          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex-1 min-h-0 flex flex-col gap-lg overflow-hidden">
            <h2 className="font-display text-lg font-semibold text-ink-deep shrink-0">
              Mensaje de TutorIA
            </h2>

            <div className="bg-accent-violet-deep/30 border border-accent-violet/20 rounded-xl p-xl flex-1 min-h-0 overflow-y-auto">
              <TypewriterText
                text={mensajeAgente}
                speed={25}
                className="font-ui text-sm text-ink-deep leading-relaxed whitespace-pre-line"
              />
            </div>
          </div>

          <BotonPrimario
            variant="ghost"
            onClick={() => navigate('/alumno/materias')}
            className="w-full justify-center shrink-0 transition-all hover:border-accent-violet hover:text-accent-violet"
          >
            ← Volver a mis materias
          </BotonPrimario>
        </div>

        {/* ── Right column: dashboard + resources ── */}
        <div className="flex flex-col gap-xl min-h-0 h-full overflow-y-auto">
          <Dashboard
            alumno={alumno}
            materiaId={id}
            factores={getFactoresRiesgo(alumno.boleta)}
            showTrend={true}
          />

          {quizRespondido && (
            <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col gap-md">
              <h3 className="font-display text-base font-semibold text-ink-deep mb-xs">
                Recursos de apoyo preparados para ti
              </h3>
              <BotonPrimario
                variant="primary"
                className="w-full justify-center"
                onClick={() => setShowSelectorGuia(true)}
              >
                Ver guía de estudio
              </BotonPrimario>
              <BotonPrimario variant="ghost" className="w-full justify-center">
                Becas IPN disponibles
              </BotonPrimario>
              <BotonPrimario variant="ghost" className="w-full justify-center">
                Psicología estudiantil
              </BotonPrimario>
            </div>
          )}
        </div>
        </div>
      </div>

      {showSelectorGuia && (
        <SelectorGuiaEstudio
          materia={materia.nombre}
          materiaId={id}
          temasDificiles={temasDificiles}
          material={MATERIAL_POR_MATERIA[id] ?? ''}
          onClose={() => setShowSelectorGuia(false)}
        />
      )}
    </div>
  );
}
