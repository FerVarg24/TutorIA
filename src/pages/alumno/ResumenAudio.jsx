import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { getMateriaAlumnoById } from '../../services/mockData.js';
import { getTemasConDominio } from '../../utils/dominioTema.js';
import { getResumenAudio } from '../../data/resumenesAudio.js';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import SelectorTemas from '../../components/mapa/SelectorTemas.jsx';
import ReproductorAudio from '../../components/audio/ReproductorAudio.jsx';

export default function ResumenAudio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useApp();

  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [resumenActivo, setResumenActivo] = useState(null);

  const materia = getMateriaAlumnoById(id);
  const temas = getTemasConDominio(session?.boleta, id);

  useEffect(() => {
    if (id === 'calc1' && temas.some((t) => t.tema === 'Límites')) {
      setTemaSeleccionado('Límites');
    }
  }, [id, temas]);

  function handleConfirmar() {
    if (!temaSeleccionado || !materia) return;
    const resumen = getResumenAudio(id, temaSeleccionado, materia.nombre);
    setResumenActivo(resumen);
  }

  function handleSeleccionarTema(tema) {
    setTemaSeleccionado(tema);
    setResumenActivo(null);
  }

  if (!materia || !session) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark flex items-center justify-center">
        <p className="font-ui text-on-dark-muted">Información no disponible.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark flex flex-col">
      <Navbar title={`${materia.nombre} — Resumen de audio`} />

      <div className="flex-1 flex flex-col gap-lg p-xl max-w-3xl mx-auto w-full">
        <BotonPrimario variant="ghost" onClick={() => navigate(`/alumno/materia/rojo/${id}`)}>
          ← Volver
        </BotonPrimario>

        <SelectorTemas
          temas={temas}
          temaSeleccionado={temaSeleccionado}
          onSeleccionar={handleSeleccionarTema}
          onConfirmar={handleConfirmar}
          cargando={false}
          confirmado={!!resumenActivo}
          confirmLabel="Escuchar resumen"
          subtitle="Elige un tema para escuchar su resumen"
        />

        {resumenActivo && temaSeleccionado && (
          <ReproductorAudio
            resumen={resumenActivo}
            tema={temaSeleccionado}
            materia={materia.nombre}
          />
        )}

        {!resumenActivo && (
          <div className="flex flex-col items-center justify-center py-xxl text-center gap-md opacity-60">
            <span className="text-5xl" aria-hidden="true">🎧</span>
            <p className="font-ui text-on-dark-muted text-sm max-w-sm">
              Selecciona un tema y pulsa «Escuchar resumen» para comenzar tu sesión de repaso auditivo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
