import dagre from '@dagrejs/dagre';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 56;
const CENTRAL_RADIUS = 250;

/**
 * @param {import('./anthropicService.js').MapaConceptualData} mapa
 * @returns {{ nodes: import('@xyflow/react').Node[], edges: import('@xyflow/react').Edge[] }}
 */
export function aplicarLayout(mapa) {
  if (!mapa?.nodes?.length) {
    return { nodes: [], edges: [] };
  }

  const positions = calcularPosiciones(mapa);

  const nodes = mapa.nodes.map((n) => ({
    id: n.id,
    type: 'concepto',
    position: positions[n.id] ?? { x: 0, y: 0 },
    data: {
      label: n.label,
      description: n.description,
      example: n.example,
      question: n.question,
      level: n.level,
    },
  }));

  const edges = mapa.edges.map((e, i) => ({
    id: `e-${e.source}-${e.target}-${i}`,
    source: e.source,
    target: e.target,
    label: e.label,
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#7ba7d4', strokeWidth: 2 },
    labelStyle: { fill: '#555555', fontSize: 11, fontWeight: 500 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.85 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 4,
  }));

  return { nodes, edges };
}

/**
 * @param {import('./anthropicService.js').MapaConceptualData} mapa
 * @returns {Record<string, { x: number, y: number }>}
 */
function calcularPosiciones(mapa) {
  const positions = {};
  const byLevel = {
    0: mapa.nodes.filter((n) => n.level === 0),
    1: mapa.nodes.filter((n) => n.level === 1),
    2: mapa.nodes.filter((n) => n.level === 2),
  };

  const central = byLevel[0][0];
  if (central) {
    positions[central.id] = { x: 0, y: 0 };
  }

  const childrenMap = buildChildrenMap(mapa.edges);

  if (byLevel[1].length > 0) {
    const angleStep = (2 * Math.PI) / byLevel[1].length;
    byLevel[1].forEach((node, i) => {
      const angle = angleStep * i - Math.PI / 2;
      positions[node.id] = {
        x: Math.cos(angle) * CENTRAL_RADIUS,
        y: Math.sin(angle) * CENTRAL_RADIUS,
      };
    });
  }

  if (byLevel[2].length > 0) {
    byLevel[2].forEach((node) => {
      const parentId = findParentId(node.id, mapa.edges);
      const parentPos = parentId ? positions[parentId] : null;

      if (parentPos) {
        const siblings = (childrenMap[parentId] ?? []).filter((id) => {
          const n = mapa.nodes.find((nd) => nd.id === id);
          return n?.level === 2;
        });
        const idx = siblings.indexOf(node.id);
        const count = siblings.length;
        const spread = 140;
        const offsetX = count > 1 ? (idx - (count - 1) / 2) * spread : 0;

        positions[node.id] = {
          x: parentPos.x + offsetX,
          y: parentPos.y + (parentPos.y >= 0 ? 120 : -120),
        };
      } else {
        positions[node.id] = { x: 0, y: 300 };
      }
    });
  }

  const unplaced = mapa.nodes.filter((n) => !positions[n.id]);
  if (unplaced.length > 0) {
    const dagrePositions = layoutWithDagre(mapa);
    unplaced.forEach((n) => {
      positions[n.id] = dagrePositions[n.id] ?? { x: 0, y: 400 };
    });
  }

  return positions;
}

/**
 * @param {import('./anthropicService.js').MapaConceptualData} mapa
 * @returns {Record<string, { x: number, y: number }>}
 */
function layoutWithDagre(mapa) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 120 });

  mapa.nodes.forEach((n) => {
    g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  mapa.edges.forEach((e) => {
    g.setEdge(e.source, e.target);
  });

  dagre.layout(g);

  const positions = {};
  mapa.nodes.forEach((n) => {
    const node = g.node(n.id);
    if (node) {
      positions[n.id] = {
        x: node.x - NODE_WIDTH / 2,
        y: node.y - NODE_HEIGHT / 2,
      };
    }
  });

  return positions;
}

/**
 * @param {import('./anthropicService.js').MapaConceptualData['edges']} edges
 * @returns {Record<string, string[]>}
 */
function buildChildrenMap(edges) {
  const childrenMap = {};
  edges.forEach(({ source, target }) => {
    if (!childrenMap[source]) childrenMap[source] = [];
    childrenMap[source].push(target);
  });
  return childrenMap;
}

/**
 * @param {string} nodeId
 * @param {import('./anthropicService.js').MapaConceptualData['edges']} edges
 * @returns {string | null}
 */
function findParentId(nodeId, edges) {
  const edge = edges.find((e) => e.target === nodeId);
  return edge?.source ?? null;
}
