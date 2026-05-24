import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { getAlumnoByBoleta, getFactoresRiesgo } from '../../services/mockData.js';
import { analizarAlumno } from '../../services/anthropicService.js';
import TypewriterText from '../../components/TypewriterText.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import Seguimiento from './Seguimiento.jsx';

export default function AlumnoDetalle() {
  const { boleta } = useParams();
  const { setMascota } = useApp();

  const [analisis, setAnalisis] = useState('');
  const [loading, setLoading] = useState(true);
  const [analisisCompleto, setAnalisisCompleto] = useState(false);
  const [showSeguimiento, setShowSeguimiento] = useState(false);

  const alumno = getAlumnoByBoleta(boleta);

  useEffect(() => {
    setMascota({ modo: 'hablando', mensaje: '' });
  }, [setMascota]);

  useEffect(() => {
    if (!alumno) return;

    setLoading(true);
    setAnalisis('');
    setAnalisisCompleto(false);

    analizarAlumno(alumno)
      .then((text) => setAnalisis(text))
      .finally(() => setLoading(false));
  }, [alumno?.boleta]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!alumno) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark flex items-center justify-center">
        <p className="font-ui text-on-dark-muted">Alumno no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark flex flex-col">
      <Navbar title={alumno.nombre} />

      <div className="flex-1 grid lg:grid-cols-2 gap-xl p-xl">

        {/* ── Left column: mascot analysis ── */}
        <div className="flex flex-col gap-xl">
          {/* Student quick-info strip */}
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex items-center gap-lg">
            <div className="w-12 h-12 rounded-full bg-riesgo-alto/20 border border-riesgo-alto/40 flex items-center justify-center shrink-0">
              <span className="text-riesgo-alto text-lg font-bold font-display">
                {alumno.nombre.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-ink-deep">{alumno.nombre}</p>
              <p className="font-ui text-xs text-on-dark-muted">Boleta: {alumno.boleta}</p>
            </div>
            <span className="ml-auto bg-riesgo-alto/15 text-riesgo-alto border border-riesgo-alto/30 rounded-xs px-sm py-xs text-xs font-bold font-ui">
              Riesgo Alto
            </span>
          </div>

          {/* Analysis card */}
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl flex-1 flex flex-col gap-lg">
            <h2 className="font-display text-lg font-semibold text-ink-deep">
              Análisis del agente TutorIA
            </h2>

            {loading ? (
              <div className="flex flex-col items-center gap-lg py-xl flex-1 justify-center">
                <div className="w-8 h-8 border-2 border-accent-violet border-t-accent-lime rounded-full animate-spin" />
                <p className="font-ui text-on-dark-muted text-sm animate-pulse">
                  Analizando datos del alumno...
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-xl">
                <div className="bg-accent-violet-deep/30 border border-accent-violet/20 rounded-xl p-xl">
                  <TypewriterText
                    text={analisis}
                    speed={25}
                    onComplete={() => setAnalisisCompleto(true)}
                    className="font-ui text-sm text-ink-deep leading-relaxed"
                  />
                </div>

                {analisisCompleto && (
                  <BotonPrimario
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => setShowSeguimiento(true)}
                  >
                    Dar seguimiento a este alumno
                  </BotonPrimario>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Right column: dashboard ── */}
        <div className="flex flex-col gap-xl overflow-y-auto">
          <Dashboard
            alumno={alumno}
            factores={analisisCompleto ? getFactoresRiesgo(alumno.boleta) : []}
            showTrend={true}
          />
        </div>
      </div>

      {/* Follow-up modal — rendered on top of everything */}
      {showSeguimiento && (
        <Seguimiento
          alumno={alumno}
          onClose={() => setShowSeguimiento(false)}
        />
      )}
    </div>
  );
}
