import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  getMateriaAlumnoById,
  getAlumnoByBoleta,
  getAlumnoEnMateria,
  MATERIAL_POR_MATERIA,
} from '../../services/mockData.js';
import { chatAgente, generarGuia } from '../../services/anthropicService.js';
import ChatAgente from '../../components/ChatAgente.jsx';
import KpiStrip from '../../components/KpiStrip.jsx';
import SplitWorkspaceLayout from '../../components/SplitWorkspaceLayout.jsx';
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import GlassPanel from '../../components/ui/GlassPanel.jsx';
import { showCuestionarioToast, dismissCuestionarioToast } from '../../utils/cuestionarioToast.js';

export default function MateriaMonrada() {
  const { id } = useParams();
  const { session, setMascota } = useApp();
  const navigate = useNavigate();

  const materia = getMateriaAlumnoById(id);
  const alumno = getAlumnoByBoleta(session?.boleta);
  const alumnoMateria = getAlumnoEnMateria(session?.boleta, id);

  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guia, setGuia] = useState(null);
  const [guiaLoading, setGuiaLoading] = useState(false);
  const [quizRespondido, setQuizRespondido] = useState(false);
  const toastIdRef = useRef(null);

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

  useEffect(() => {
    if (!materia && !alumno) return;
    const mensajeInicial = `¡Hola ${alumno?.nombre ?? 'estudiante'}! Notamos algunas variaciones en tu desempeño en ${materia?.nombre ?? 'esta materia'}. ¿Quieres que revisemos juntos cómo estás?`;
    setHistorial([
      { id: 'init-0', role: 'assistant', content: mensajeInicial },
    ]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userTurnCount = historial.filter((m) => m.role === 'user').length;

  const handleSend = useCallback(async (mensaje) => {
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: mensaje };
    const nextHistorial = [...historial, userMsg];
    setHistorial(nextHistorial);
    setLoading(true);

    try {
      const respuesta = await chatAgente(historial, mensaje);
      const assistantMsg = { id: `a-${Date.now()}`, role: 'assistant', content: respuesta };
      setHistorial((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }

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

  const kpiAlumno = alumnoMateria ?? alumno;

  return (
    <SplitWorkspaceLayout
      variant="morado"
      breadcrumbs={[
        { label: 'Mis Materias', href: '/alumno/materias' },
      ]}
      header={
        <WorkspaceHeader
          layout="compact"
          variant="morado"
          name={alumno?.nombre ?? session?.nombre ?? 'Estudiante'}
          subtitle={materia.nombre}
          badge="Chat con TutorIA"
        />
      }
      left={
        <div className="flex-1 min-h-0">
          <ChatAgente
            historial={historial}
            onSend={handleSend}
            loading={loading}
            variant="morado"
          />
        </div>
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
          {kpiAlumno && <KpiStrip alumno={kpiAlumno} variant="morado" />}

          {guiaLoading ? (
            <GlassPanel variant="morado" className="flex flex-col items-center gap-lg py-xxl">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-violet border-t-accent-lime" />
              <p className="animate-pulse text-center font-ui text-sm text-on-dark-muted">
                Generando tu guía de estudio personalizada...
              </p>
            </GlassPanel>
          ) : guia ? (
            <GlassPanel variant="morado" className="flex flex-col gap-md overflow-y-auto">
              <div className="mb-xs flex items-center gap-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent-lime" />
                <h3 className="font-display text-base font-semibold text-ink-deep">
                  Tu guía de estudio personalizada
                </h3>
              </div>
              <div className="rounded-xl border border-accent-violet/15 bg-gradient-to-br from-accent-violet-deep/20 to-accent-violet/10 p-lg">
                <pre className="whitespace-pre-wrap font-ui text-sm leading-relaxed text-ink-deep">
                  {guia}
                </pre>
              </div>
            </GlassPanel>
          ) : (
            <GlassPanel variant="morado" className="flex flex-col items-center gap-lg py-xxl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-iniciativa-alumno/30 bg-iniciativa-alumno/20">
                <span className="text-2xl" role="img" aria-label="chat">💬</span>
              </div>
              <div className="text-center">
                <p className="mb-xs font-display font-semibold text-ink-deep">
                  Guía personalizada en camino
                </p>
                <p className="font-ui text-sm text-on-dark-muted">
                  Responde las preguntas del agente para generar tu guía personalizada
                </p>
              </div>
              <div className="mt-sm flex items-center gap-sm">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      userTurnCount >= step
                        ? 'bg-iniciativa-alumno'
                        : 'bg-hairline-violet'
                    }`}
                  />
                ))}
                <p className="ml-xs font-ui text-xs text-on-dark-muted">
                  {userTurnCount}/3 respuestas
                </p>
              </div>
            </GlassPanel>
          )}
        </>
      }
    />
  );
}
