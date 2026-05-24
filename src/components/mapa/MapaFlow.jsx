import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodoConcepto from './NodoConcepto.jsx';

const nodeTypes = { concepto: NodoConcepto };

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

  useEffect(() => {
    setNodes(nodesWithHandlers);
    setEdges(flowEdges);
  }, [nodesWithHandlers, flowEdges, setNodes, setEdges]);

  useEffect(() => {
    if (flowNodes.length > 0) {
      const timer = setTimeout(() => {
        fitView({ padding: 0.2, duration: 400 });
      }, 50);
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
      fitView
      minZoom={0.3}
      maxZoom={1.5}
      proOptions={{ hideAttribution: true }}
      className="bg-surface-press-light/30 rounded-xl"
    >
      <Background color="#c5d9ef" gap={20} />
      <Controls showInteractive={false} />
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
 * }} props
 */
export default function MapaFlow(props) {
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
    <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden border border-hairline-violet">
      <ReactFlowProvider>
        <MapaFlowInner {...props} />
      </ReactFlowProvider>
    </div>
  );
}
