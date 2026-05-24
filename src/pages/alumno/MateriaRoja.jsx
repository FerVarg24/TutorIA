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
import AgentMessagePanel from '../../components/AgentMessagePanel.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import KpiStrip from '../../components/KpiStrip.jsx';
import SplitWorkspaceLayout from '../../components/SplitWorkspaceLayout.jsx';
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import GlassPanel from '../../components/ui/GlassPanel.jsx';
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
    <>
      <SplitWorkspaceLayout
        variant="rojo"
        title={materia.nombre}
        breadcrumbs={breadcrumbs}
        header={
          <WorkspaceHeader
            variant="rojo"
            name={alumno.nombre}
            subtitle={materia.nombre}
            badge="Apoyo del Profesor"
          />
        }
        left={
          <AgentMessagePanel
            variant="rojo"
            title="Mensaje de TutorIA"
            text={mensajeAgente}
            speed={25}
          />
        }
        leftFooter={
          <BotonPrimario
            variant="ghost"
            onClick={() => navigate('/alumno/materias')}
            className="w-full justify-center shrink-0 transition-all hover:border-accent-violet hover:text-accent-violet"
          >
            ← Volver a mis materias
          </BotonPrimario>
        }
        right={
          <>
            <KpiStrip alumno={alumno} variant="rojo" />
            <Dashboard
              alumno={alumno}
              materiaId={id}
              factores={getFactoresRiesgo(alumno.boleta)}
              showTrend={true}
            />
            {quizRespondido && (
              <GlassPanel variant="rojo" className="flex flex-col gap-md">
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
              </GlassPanel>
            )}
          </>
        }
      />

      {showSelectorGuia && (
        <SelectorGuiaEstudio
          materia={materia.nombre}
          materiaId={id}
          temasDificiles={temasDificiles}
          material={MATERIAL_POR_MATERIA[id] ?? ''}
          onClose={() => setShowSelectorGuia(false)}
        />
      )}
    </>
  );
}
