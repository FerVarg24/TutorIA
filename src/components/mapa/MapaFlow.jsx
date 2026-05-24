import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodoConcepto from './NodoConcepto.jsx';
import EdgeConcepto from './EdgeConcepto.jsx';
import MapaLoadingSkeleton from './MapaLoadingSkeleton.jsx';

const nodeTypes = { concepto: NodoConcepto };
const edgeTypes = { concepto: EdgeConcepto };

function MapaFlowInner({
  flowNodes,
  flowEdges,
  onNodeClick,
  onExpand,
  expandido,
  nodoActivo,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);
  const { fitView } = useReactFlow();

  const nodesWithHandlers = useMemo(
    () =>
      flowNodes.map((n) => ({
        ...n,
        selected: n.id === nodoActivo,
        data: {
          ...n.data,
          onExpand,
          expanding: expandido === n.id,
        },
      })),
    [flowNodes, onExpand, expandido, nodoActivo],
  );

  const edgesWithHighlight = useMemo(
    () =>
      flowEdges.map((e) => ({
        ...e,
        data: {
          ...e.data,
          highlighted:
            e.source === nodoActivo ||
            e.target === nodoActivo,
        },
        animated: e.source === nodoActivo || e.target === nodoActivo,
      })),
    [flowEdges, nodoActivo],
  );

  useEffect(() => {
    setNodes(nodesWithHandlers);
    setEdges(edgesWithHighlight);
  }, [nodesWithHandlers, edgesWithHighlight, setNodes, setEdges]);

  useEffect(() => {
    if (flowNodes.length > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.25, duration: 500 });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [flowNodes, fitView]);

  const handleNodeClick = useCallback(
    (_event, node) => {
      onNodeClick(node.id);
    },
    [onNodeClick],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      minZoom={0.25}
      maxZoom={1.6}
      proOptions={{ hideAttribution: true }}
      className="mapa-flow-canvas"
    >
      <Background
        variant={BackgroundVariant.Dots}
        color="#b8d0e8"
        gap={24}
        size={1.2}
      />
      <Controls showInteractive={false} className="mapa-flow-controls" />
    </ReactFlow>
  );
}

/**
 * @param {{
 *   flowNodes: import('@xyflow/react').Node[],
 *   flowEdges: import('@xyflow/react').Edge[],
 *   onNodeClick: (id: string) => void,
 *   onExpand: (id: string) => void,
 *   expandido: string | null,
 *   nodoActivo: string | null,
 *   placeholder?: boolean,
 *   loading?: boolean,
 *   temaLabel?: string | null,
 * }} props
 */
export default function MapaFlow(props) {
  if (props.loading) {
    return <MapaLoadingSkeleton tema={props.temaLabel} />;
  }

  if (props.placeholder) {
    return (
      <div className="flex-1 min-h-[400px] bg-surface-press-light/20 border border-dashed border-hairline-violet rounded-xl flex items-center justify-center">
        <p className="font-ui text-sm text-on-dark-muted text-center px-xl">
          Selecciona un tema y presiona &quot;Generar mapa&quot; para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden border border-hairline-violet mapa-flow-wrapper">
      <ReactFlowProvider>
        <MapaFlowInner {...props} />
      </ReactFlowProvider>
    </div>
  );
}
