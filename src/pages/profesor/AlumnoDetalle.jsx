import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import {
  getAlumnoEnMateria,
  getFactoresRiesgo,
  getMateriaAlumnoById,
  getMateriaIdByBoleta,
} from '../../services/mockData.js';
import { analizarAlumno } from '../../services/anthropicService.js';
import AgentMessagePanel from '../../components/AgentMessagePanel.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import KpiStrip from '../../components/KpiStrip.jsx';
import SplitWorkspaceLayout from '../../components/SplitWorkspaceLayout.jsx';
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import Seguimiento from './Seguimiento.jsx';

export default function AlumnoDetalle() {
  const { boleta } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setMascota } = useApp();

  const [analisis, setAnalisis] = useState('');
  const [loading, setLoading] = useState(true);
  const [analisisCompleto, setAnalisisCompleto] = useState(false);
  const [showSeguimiento, setShowSeguimiento] = useState(false);

  const materiaId = location.state?.materiaId ?? getMateriaIdByBoleta(boleta);
  const alumno = materiaId ? getAlumnoEnMateria(boleta, materiaId) : null;

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

  const materia = materiaId ? getMateriaAlumnoById(materiaId) : null;

  const breadcrumbs = [
    { label: 'Mis Alumnos', href: '/profesor/materias' },
    ...(materia ? [{ label: materia.nombre, href: '#' }] : []),
  ];

  return (
    <>
      <SplitWorkspaceLayout
        variant="profesor"
        breadcrumbs={breadcrumbs}
        header={
          <WorkspaceHeader
            layout="compact"
            variant="profesor"
            name={alumno.nombre}
            subtitle={`Boleta: ${alumno.boleta}`}
            badge="Riesgo Alto"
          />
        }
        left={
          <div className="flex flex-1 min-h-0 flex-col gap-lg overflow-hidden">
            <AgentMessagePanel
              variant="profesor"
              title="Análisis del agente TutorIA"
              text={loading ? undefined : analisis}
              loading={loading}
              loadingMessage="Analizando datos del alumno..."
              onComplete={() => setAnalisisCompleto(true)}
              className="flex-1"
            />
            {analisisCompleto && !loading && (
              <BotonPrimario
                variant="primary"
                className="w-full justify-center shrink-0"
                onClick={() => setShowSeguimiento(true)}
              >
                Dar seguimiento a este alumno
              </BotonPrimario>
            )}
          </div>
        }
        leftFooter={
          <BotonPrimario
            variant="ghost"
            onClick={() => navigate('/profesor/materias')}
            className="w-full justify-center shrink-0"
          >
            ← Volver a mis alumnos
          </BotonPrimario>
        }
        right={
          <>
            <KpiStrip alumno={alumno} variant="profesor" />
            <Dashboard
              alumno={alumno}
              materiaId={materiaId}
              factores={analisisCompleto ? getFactoresRiesgo(alumno.boleta) : []}
              showTrend={true}
            />
          </>
        }
      />

      {showSeguimiento && (
        <Seguimiento
          alumno={alumno}
          onClose={() => setShowSeguimiento(false)}
        />
      )}
    </>
  );
}
