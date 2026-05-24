import { useParams, useNavigate } from 'react-router-dom';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { useApp } from '../../context/AppContext.jsx';
import {
  getMateriaAlumnoById,
  MATERIAL_POR_MATERIA,
} from '../../services/mockData.js';
import { getTemasConDominio } from '../../utils/dominioTema.js';
import { useMapaConceptual } from '../../hooks/useMapaConceptual.js';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import SelectorTemas from '../../components/mapa/SelectorTemas.jsx';
import ControlProfundidad from '../../components/mapa/ControlProfundidad.jsx';
import MapaFlow from '../../components/mapa/MapaFlow.jsx';
import PanelNodo from '../../components/mapa/PanelNodo.jsx';
import MapaCopilotBridge from '../../components/mapa/MapaCopilotBridge.jsx';

export default function MapaConceptual() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useApp();

  const materia = getMateriaAlumnoById(id);
  const temas = getTemasConDominio(session?.boleta, id);
  const material = MATERIAL_POR_MATERIA[id] ?? '';

  const {
    temaSeleccionado,
    profundidad,
    mapa,
    flowNodes,
    flowEdges,
    nodoActivo,
    nodoActivoData,
    cargando,
    expandido,
    error,
    seleccionarTema,
    generarMapa,
    cambiarProfundidad,
    expandirNodo,
    seleccionarNodo,
    cerrarPanel,
    resaltarNodo,
    agregarConcepto,
    simplificarMapa,
  } = useMapaConceptual({
    materia: materia?.nombre ?? '',
    material,
  });

  if (!materia || !session) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark flex items-center justify-center">
        <p className="font-ui text-on-dark-muted">Información no disponible.</p>
      </div>
    );
  }

  const mapaGenerado = mapa.nodes.length > 0;

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <div className="min-h-screen bg-surface-canvas-dark flex flex-col">
        <Navbar title={`${materia.nombre} — Mapa conceptual`} />

        <div className="flex-1 flex flex-col gap-lg p-xl min-h-0">
          <div className="flex items-center justify-between gap-md flex-wrap">
            <BotonPrimario variant="ghost" onClick={() => navigate(`/alumno/materia/rojo/${id}`)}>
              ← Volver
            </BotonPrimario>
            {mapaGenerado && (
              <ControlProfundidad
                profundidad={profundidad}
                onChange={cambiarProfundidad}
                disabled={cargando}
              />
            )}
          </div>

          <SelectorTemas
            temas={temas}
            temaSeleccionado={temaSeleccionado}
            onSeleccionar={seleccionarTema}
            onConfirmar={generarMapa}
            cargando={cargando}
            mapaGenerado={mapaGenerado}
          />

          <div className="flex-1 flex gap-lg min-h-0 relative">
            <div className="flex-1 flex flex-col min-h-0 relative">
              {cargando && (
                <div className="absolute inset-0 z-10 bg-surface-night/60 rounded-xl flex items-center justify-center">
                  <div className="flex flex-col items-center gap-md">
                    <div className="w-8 h-8 border-2 border-accent-violet border-t-accent-lime rounded-full animate-spin" />
                    <p className="font-ui text-sm text-on-dark-muted animate-pulse">
                      Generando mapa conceptual...
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <p className="font-ui text-sm text-riesgo-alto mb-sm">{error}</p>
              )}

              {mapaGenerado ? (
                <MapaFlow
                  flowNodes={flowNodes}
                  flowEdges={flowEdges}
                  onNodeClick={seleccionarNodo}
                  onExpand={expandirNodo}
                  expandido={expandido}
                  nodoActivo={nodoActivo}
                />
              ) : (
                <MapaFlow placeholder />
              )}
            </div>

            {nodoActivoData && (
              <PanelNodo nodo={nodoActivoData} onClose={cerrarPanel} />
            )}
          </div>
        </div>

        <MapaCopilotBridge
          materia={materia.nombre}
          temaSeleccionado={temaSeleccionado}
          profundidad={profundidad}
          mapa={mapa}
          nodoActivo={nodoActivo}
          onResaltarNodo={resaltarNodo}
          onAgregarConcepto={agregarConcepto}
          onSimplificarMapa={simplificarMapa}
        />

        <CopilotSidebar
          defaultOpen={false}
          clickOutsideToClose
          labels={{
            title: 'TutorIA',
            initial: 'Pregúntame sobre el mapa. Puedo explicar conceptos, resaltar nodos o simplificar el mapa.',
          }}
        />
      </div>
    </CopilotKit>
  );
}
