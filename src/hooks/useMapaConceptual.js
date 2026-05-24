import { useCallback, useState } from 'react';
import {
  generarMapaConceptual,
  expandirNodoMapa,
} from '../services/anthropicService.js';
import { aplicarLayout } from '../services/mapaLayout.js';

/**
 * @param {{ materia: string, material: string }} config
 */
export function useMapaConceptual({ materia, material }) {
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [profundidad, setProfundidad] = useState('basico');
  const [mapa, setMapa] = useState({ nodes: [], edges: [] });
  const [flowNodes, setFlowNodes] = useState([]);
  const [flowEdges, setFlowEdges] = useState([]);
  const [nodoActivo, setNodoActivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [expandido, setExpandido] = useState(null);
  const [error, setError] = useState(null);

  const actualizarFlow = useCallback((mapaData) => {
    const { nodes, edges } = aplicarLayout(mapaData);
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, []);

  const seleccionarTema = useCallback((tema) => {
    setTemaSeleccionado(tema);
    setError(null);
  }, []);

  const generarMapa = useCallback(async () => {
    if (!temaSeleccionado) return;

    setCargando(true);
    setError(null);
    setNodoActivo(null);

    try {
      const resultado = await generarMapaConceptual(
        materia,
        temaSeleccionado,
        material,
        profundidad,
      );
      setMapa(resultado);
      actualizarFlow(resultado);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar el mapa');
    } finally {
      setCargando(false);
    }
  }, [temaSeleccionado, materia, material, profundidad, actualizarFlow]);

  const cambiarProfundidad = useCallback(
    async (nueva) => {
      if (nueva === profundidad) return;
      setProfundidad(nueva);

      if (!temaSeleccionado || mapa.nodes.length === 0) return;

      setCargando(true);
      setError(null);
      setNodoActivo(null);

      try {
        const resultado = await generarMapaConceptual(
          materia,
          temaSeleccionado,
          material,
          nueva,
        );
        setMapa(resultado);
        actualizarFlow(resultado);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al regenerar el mapa');
      } finally {
        setCargando(false);
      }
    },
    [profundidad, temaSeleccionado, mapa.nodes.length, materia, material, actualizarFlow],
  );

  const expandirNodo = useCallback(
    async (nodeId) => {
      const nodo = mapa.nodes.find((n) => n.id === nodeId);
      if (!nodo || !temaSeleccionado) return;

      setExpandido(nodeId);
      setError(null);

      try {
        const expansion = await expandirNodoMapa(
          materia,
          temaSeleccionado,
          nodo,
          mapa,
          profundidad,
        );

        const idsExistentes = new Set(mapa.nodes.map((n) => n.id));
        const nuevosNodos = expansion.nodes.filter((n) => !idsExistentes.has(n.id));
        const edgeKeys = new Set(mapa.edges.map((e) => `${e.source}-${e.target}`));
        const nuevosEdges = expansion.edges.filter(
          (e) => !edgeKeys.has(`${e.source}-${e.target}`),
        );

        const mapaActualizado = {
          nodes: [...mapa.nodes, ...nuevosNodos],
          edges: [...mapa.edges, ...nuevosEdges],
        };

        setMapa(mapaActualizado);
        actualizarFlow(mapaActualizado);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al expandir el nodo');
      } finally {
        setExpandido(null);
      }
    },
    [mapa, temaSeleccionado, materia, profundidad, actualizarFlow],
  );

  const seleccionarNodo = useCallback((id) => {
    setNodoActivo(id);
  }, []);

  const cerrarPanel = useCallback(() => {
    setNodoActivo(null);
  }, []);

  const resaltarNodo = useCallback(
    (idOrLabel) => {
      const byId = mapa.nodes.find((n) => n.id === idOrLabel);
      const byLabel = mapa.nodes.find(
        (n) => n.label.toLowerCase() === String(idOrLabel).toLowerCase(),
      );
      const nodo = byId ?? byLabel;
      if (nodo) setNodoActivo(nodo.id);
    },
    [mapa.nodes],
  );

  const agregarConcepto = useCallback(
    (label, parentId, relacion = 'se relaciona con') => {
      if (!label) return;

      const maxId = mapa.nodes.reduce((max, n) => {
        const num = parseInt(n.id, 10);
        return Number.isNaN(num) ? max : Math.max(max, num);
      }, 0);

      const parent = mapa.nodes.find((n) => n.id === parentId) ?? mapa.nodes.find((n) => n.level === 0);
      if (!parent) return;

      const newId = String(maxId + 1);
      const nuevoNodo = {
        id: newId,
        label,
        description: `Concepto relacionado con ${parent.label}.`,
        example: 'Un ejemplo sencillo para practicar.',
        question: `¿Cómo se conecta ${label} con ${parent.label}?`,
        level: Math.min(parent.level + 1, 2),
      };

      const mapaActualizado = {
        nodes: [...mapa.nodes, nuevoNodo],
        edges: [...mapa.edges, { source: parent.id, target: newId, label: relacion }],
      };

      setMapa(mapaActualizado);
      actualizarFlow(mapaActualizado);
      setNodoActivo(newId);
    },
    [mapa, actualizarFlow],
  );

  const simplificarMapa = useCallback(async () => {
    await cambiarProfundidad('basico');
  }, [cambiarProfundidad]);

  const nodoActivoData = mapa.nodes.find((n) => n.id === nodoActivo) ?? null;

  return {
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
    setFlowNodes,
    setFlowEdges,
  };
}
