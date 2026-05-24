import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  getMateriaAlumnoById,
  getAlumnoEnMateria,
  getFactoresRiesgo,
} from '../../services/mockData.js';
import TypewriterText from '../../components/TypewriterText.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';

export default function MateriaRoja() {
  const { id } = useParams();
  const { session, setMascota } = useApp();
  const navigate = useNavigate();

  const [mensajeCompleto, setMensajeCompleto] = useState(false);
  const [quizRespondido, setQuizRespondido] = useState(false);

  const materia = getMateriaAlumnoById(id);
  const alumno = getAlumnoEnMateria(session?.boleta, id);

  useEffect(() => {
    setMascota({ modo: 'hablando', mensaje: '' });
  }, [setMascota]);

  // Build the hardcoded empathy message for the typewriter
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

  return (
    <div className="min-h-screen bg-surface-canvas-dark flex flex-col">
      <Navbar title={materia.nombre} />

      <div className="flex-1 grid lg:grid-cols-2 gap-xl p-xl min-h-0">

        {/* ── Left column: agent message ── */}
        <div className="flex flex-col gap-xl">
          {/* Student + subject header strip */}
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex items-center gap-lg">
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

          {/* Agent message card */}
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex-1 flex flex-col gap-lg">
            <h2 className="font-display text-lg font-semibold text-ink-deep">
              Mensaje de TutorIA
            </h2>

            <div className="bg-accent-violet-deep/30 border border-accent-violet/20 rounded-xl p-xl flex-1">
              <TypewriterText
                text={mensajeAgente}
                speed={25}
                onComplete={() => setMensajeCompleto(true)}
                className="font-ui text-sm text-ink-deep leading-relaxed whitespace-pre-line"
              />
            </div>
          </div>

          {/* Back button */}
          <BotonPrimario variant="ghost" onClick={() => navigate('/alumno/materias')}>
            ← Volver a mis materias
          </BotonPrimario>
        </div>

        {/* ── Right column: dashboard + resources ── */}
        <div className="flex flex-col gap-xl overflow-y-auto">
          <Dashboard
            alumno={alumno}
            materiaId={id}
            factores={mensajeCompleto ? getFactoresRiesgo(alumno.boleta) : []}
            showTrend={true}
          />

          {/* Resource buttons — revealed once typewriter completes */}
          {mensajeCompleto && (
            <div className="flex flex-col gap-md">
              {!quizRespondido ? (
                <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col gap-md">
                  <h3 className="font-display text-base font-semibold text-ink-deep">
                    Cuestionario Diagnóstico
                  </h3>
                  <p className="font-ui text-sm text-on-dark-muted">
                    Tu profesor quiere conocer mejor tu situación para darte apoyo personalizado. Solo toma 3 minutos.
                  </p>
                  <BotonPrimario
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => {
                      const url = 'https://forms.office.com/Pages/ResponsePage.aspx?id=2fRL-ZeAlEet9qVGbKKFY3P5AuTpSp1Mla03QS3vIkVUNEUxVUxRODY3NkNQSDFSU05NUzk5WFBTWS4u';
                      window.open(url, '_blank');
                      setTimeout(() => setQuizRespondido(true), 1500);
                    }}
                  >
                    📋 Responder cuestionario
                  </BotonPrimario>
                </div>
              ) : (
                <>
                  <div className="bg-surface-night border border-hairline-violet bg-riesgo-bajo/10 border-riesgo-bajo/30 rounded-xl p-xl flex flex-col gap-md">
                    <div className="flex items-center gap-sm">
                      <span className="text-riesgo-bajo text-lg">✅</span>
                      <h3 className="font-display text-base font-semibold text-ink-deep">
                        ¡Cuestionario enviado!
                      </h3>
                    </div>
                    <p className="font-ui text-sm text-on-dark-muted">
                      El Dr. Ramírez ya recibió tus respuestas. Recibirás tu guía personalizada pronto.
                    </p>
                  </div>
                  <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col gap-md">
                    <h3 className="font-display text-base font-semibold text-ink-deep mb-xs">
                      Recursos de apoyo preparados para ti
                    </h3>
                    <BotonPrimario variant="primary" className="w-full justify-center">
                      Ver guía de estudio
                    </BotonPrimario>
                    <BotonPrimario variant="ghost" className="w-full justify-center">
                      Becas IPN disponibles
                    </BotonPrimario>
                    <BotonPrimario variant="ghost" className="w-full justify-center">
                      Psicología estudiantil
                    </BotonPrimario>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
