import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  getMateriaAlumnoById,
  getAlumnoByBoleta,
  MATERIAL_POR_MATERIA,
} from '../../services/mockData.js';
import { chatAgente, generarGuia } from '../../services/anthropicService.js';
import ChatAgente from '../../components/ChatAgente.jsx';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';

export default function MateriaMonrada() {
  const { id } = useParams();
  const { session, setMascota } = useApp();
  const navigate = useNavigate();

  const materia = getMateriaAlumnoById(id);
  const alumno = getAlumnoByBoleta(session?.boleta);

  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guia, setGuia] = useState(null);
  const [guiaLoading, setGuiaLoading] = useState(false);
  const [quizRespondido, setQuizRespondido] = useState(false);

  useEffect(() => {
    setMascota({ modo: 'hablando', mensaje: '' });
  }, [setMascota]);

  // Inject the initial agent greeting on mount, once materia/alumno are resolved
  useEffect(() => {
    if (!materia && !alumno) return;
    const mensajeInicial = `¡Hola ${alumno?.nombre ?? 'estudiante'}! Notamos algunas variaciones en tu desempeño en ${materia?.nombre ?? 'esta materia'}. ¿Quieres que revisemos juntos cómo estás?`;
    setHistorial([
      { id: 'init-0', role: 'assistant', content: mensajeInicial },
    ]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Count only user messages to decide when to generate the guide
  const userTurnCount = historial.filter((m) => m.role === 'user').length;

  const handleSend = useCallback(async (mensaje) => {
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: mensaje };
    const nextHistorial = [...historial, userMsg];
    setHistorial(nextHistorial);
    setLoading(true);

    try {
      // Pass only the messages before the new user message as context
      const respuesta = await chatAgente(historial, mensaje);
      const assistantMsg = { id: `a-${Date.now()}`, role: 'assistant', content: respuesta };
      setHistorial((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }

    // On the 3rd user turn, trigger guide generation
    const newUserCount = nextHistorial.filter((m) => m.role === 'user').length;
    if (newUserCount === 3 && !guia && !guiaLoading) {
      setGuiaLoading(true);
      try {
        const resultado = await generarGuia(
          'visual',
          materia?.nombre ?? 'la materia',
          'temas detectados en la conversación',
          MATERIAL_POR_MATERIA[id] ?? '',
        );
        setGuia(resultado);
      } finally {
        setGuiaLoading(false);
      }
    }
  }, [historial, guia, guiaLoading, id, materia]);

  if (!materia) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark flex items-center justify-center">
        <p className="font-ui text-on-dark-muted">Materia no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark flex flex-col">
      <Navbar title={materia.nombre} />

      <div className="flex-1 grid lg:grid-cols-2 gap-xl p-xl">

        {/* ── Left column: chat ── */}
        <div className="flex flex-col gap-xl min-h-0">
          {/* Subject + student header */}
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex items-center gap-lg shrink-0">
            <div className="w-12 h-12 rounded-full bg-iniciativa-alumno/20 border border-iniciativa-alumno/40 flex items-center justify-center shrink-0">
              <span className="text-iniciativa-alumno text-lg font-bold font-display">
                {(alumno?.nombre ?? session?.nombre ?? 'A').charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-ink-deep">
                {alumno?.nombre ?? session?.nombre ?? 'Estudiante'}
              </p>
              <p className="font-ui text-xs text-on-dark-muted">{materia.nombre}</p>
            </div>
            <span className="ml-auto bg-iniciativa-alumno/15 text-iniciativa-alumno border border-iniciativa-alumno/30 rounded-xs px-sm py-xs text-xs font-bold font-ui">
              Chat con TutorIA
            </span>
          </div>

          {/* Chat takes remaining height */}
          <div style={{ height: '500px' }}>
            <ChatAgente historial={historial} onSend={handleSend} loading={loading} />
          </div>

          {/* Back button */}
          <BotonPrimario variant="ghost" onClick={() => navigate('/alumno/materias')} className="shrink-0">
            ← Volver a mis materias
          </BotonPrimario>
        </div>

        {/* ── Right column: guide or waiting card ── */}
        <div className="flex flex-col gap-xl">
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
          )}
          {guiaLoading ? (
            /* Generating state */
            <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col items-center gap-lg py-xxl">
              <div className="w-8 h-8 border-2 border-accent-violet border-t-accent-lime rounded-full animate-spin" />
              <p className="font-ui text-on-dark-muted text-sm animate-pulse text-center">
                Generando tu guía de estudio personalizada...
              </p>
            </div>
          ) : guia ? (
            /* Study guide card */
            <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col gap-md overflow-y-auto">
              <div className="flex items-center gap-sm mb-xs">
                <span className="w-2 h-2 rounded-full bg-accent-lime shrink-0" />
                <h3 className="font-display text-base font-semibold text-ink-deep">
                  Tu guía de estudio personalizada
                </h3>
              </div>
              <div className="bg-accent-violet-deep/20 border border-accent-violet/15 rounded-xl p-lg">
                <pre className="font-ui text-sm text-ink-deep leading-relaxed whitespace-pre-wrap">
                  {guia}
                </pre>
              </div>
            </div>
          ) : (
            /* Waiting card — shown while userTurnCount < 3 */
            <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex flex-col items-center gap-lg py-xxl">
              <div className="w-16 h-16 rounded-full bg-iniciativa-alumno/20 border border-iniciativa-alumno/30 flex items-center justify-center">
                <span className="text-2xl" role="img" aria-label="chat">💬</span>
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-ink-deep mb-xs">
                  Guía personalizada en camino
                </p>
                <p className="font-ui text-sm text-on-dark-muted">
                  Responde las preguntas del agente para generar tu guía personalizada
                </p>
              </div>
              {/* Progress indicator */}
              <div className="flex gap-sm items-center mt-sm">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      userTurnCount >= step
                        ? 'bg-iniciativa-alumno'
                        : 'bg-hairline-violet'
                    }`}
                  />
                ))}
                <p className="font-ui text-xs text-on-dark-muted ml-xs">
                  {userTurnCount}/3 respuestas
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
