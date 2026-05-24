import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { getMateriaAlumnoById } from '../../services/mockData.js';
import { getTemasConDominio } from '../../utils/dominioTema.js';
import { getPresentacion } from '../../data/presentaciones.js';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import SelectorTemas from '../../components/mapa/SelectorTemas.jsx';
import VisorPresentacion from '../../components/presentacion/VisorPresentacion.jsx';

export default function PresentacionEstudio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useApp();

  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [presentacionActiva, setPresentacionActiva] = useState(null);

  const materia = getMateriaAlumnoById(id);
  const temas = getTemasConDominio(session?.boleta, id);

  useEffect(() => {
    if (id === 'calc1' && temas.some((t) => t.tema === 'Límites')) {
      setTemaSeleccionado('Límites');
    }
  }, [id, temas]);

  function handleConfirmar() {
    if (!temaSeleccionado || !materia) return;
    const presentacion = getPresentacion(id, temaSeleccionado, materia.nombre);
    setPresentacionActiva(presentacion);
  }

  function handleSeleccionarTema(tema) {
    setTemaSeleccionado(tema);
    setPresentacionActiva(null);
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
      <Navbar title={`${materia.nombre} — Presentación`} />

      <div className="flex-1 flex flex-col gap-lg p-xl max-w-4xl mx-auto w-full">
        <BotonPrimario variant="ghost" onClick={() => navigate(`/alumno/materia/rojo/${id}`)}>
          ← Volver
        </BotonPrimario>

        <SelectorTemas
          temas={temas}
          temaSeleccionado={temaSeleccionado}
          onSeleccionar={handleSeleccionarTema}
          onConfirmar={handleConfirmar}
          cargando={false}
          confirmado={!!presentacionActiva}
          confirmLabel="Ver presentación"
          subtitle="Elige un tema para ver su presentación"
        />

        {presentacionActiva && temaSeleccionado && (
          <VisorPresentacion
            presentacion={presentacionActiva}
            tema={temaSeleccionado}
            materia={materia.nombre}
          />
        )}

        {!presentacionActiva && (
          <div className="flex flex-col items-center justify-center py-xxl text-center gap-md opacity-60">
            <span className="text-5xl" aria-hidden="true">📊</span>
            <p className="font-ui text-on-dark-muted text-sm max-w-sm">
              Selecciona un tema y pulsa «Ver presentación» para explorar las diapositivas visuales.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
