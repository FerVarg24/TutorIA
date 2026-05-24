import dagre from '@dagrejs/dagre';
import {
  buildBranchMetadata,
  getBranchColorForNode,
  getIconKeyForLabel,
} from '../utils/mapaVisual.js';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 88;
const CENTRAL_RADIUS = 300;
const LEVEL2_OFFSET = 150;
const LEVEL2_SPREAD_BASE = 160;

/**
 * @param {import('./mapaGeminiService.js').MapaConceptualData} mapa
 * @returns {{ nodes: import('@xyflow/react').Node[], edges: import('@xyflow/react').Edge[] }}
 */
export function aplicarLayout(mapa) {
  if (!mapa?.nodes?.length) {
    return { nodes: [], edges: [] };
  }

  const branchMeta = buildBranchMetadata(mapa);
  const positions = calcularPosiciones(mapa);

  const nodes = mapa.nodes.map((n) => {
    const meta = branchMeta[n.id];
    const iconKey = getIconKeyForLabel(n.label, n.level);

    return {
      id: n.id,
      type: 'concepto',
      position: positions[n.id] ?? { x: 0, y: 0 },
      data: {
        label: n.label,
        description: n.description,
        example: n.example,
        question: n.question,
        level: n.level,
        branchIndex: meta?.branchIndex ?? 0,
        branchColor: meta?.branchColor ?? '#7ba7d4',
        branchBg: meta?.branchBg ?? 'rgba(123, 167, 212, 0.12)',
        branchBorder: meta?.branchBorder ?? '#7ba7d4',
        iconKey,
      },
    };
  });

  const edges = mapa.edges.map((e, i) => {
    const branchColor = getBranchColorForNode(e.source, branchMeta, mapa.edges);

    return {
      id: `e-${e.source}-${e.target}-${i}`,
      source: e.source,
      target: e.target,
      label: e.label,
      type: 'concepto',
      animated: false,
      data: { branchColor },
      style: { stroke: branchColor, strokeWidth: 2 },
      labelStyle: { fill: branchColor, fontSize: 10, fontWeight: 600 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.92 },
      labelBgPadding: [4, 8],
      labelBgBorderRadius: 12,
    };
  });

  return { nodes, edges };
}

/**
 * @param {import('./mapaGeminiService.js').MapaConceptualData} mapa
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
    const count = byLevel[1].length;
    const angleStep = (2 * Math.PI) / count;
    const radius = CENTRAL_RADIUS + Math.max(0, count - 5) * 20;

    byLevel[1].forEach((node, i) => {
      const angle = angleStep * i - Math.PI / 2;
      positions[node.id] = {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
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
        const spread = Math.max(LEVEL2_SPREAD_BASE, count * 50);
        const offsetX = count > 1 ? (idx - (count - 1) / 2) * spread : 0;

        const direction = parentPos.y >= 0 ? 1 : parentPos.y < 0 ? -1 : parentPos.x >= 0 ? 0.6 : -0.6;
        const verticalOffset = parentPos.y === 0
          ? (parentPos.x >= 0 ? LEVEL2_OFFSET : -LEVEL2_OFFSET)
          : direction * LEVEL2_OFFSET;

        positions[node.id] = {
          x: parentPos.x + offsetX,
          y: parentPos.y + verticalOffset,
        };
      } else {
        positions[node.id] = { x: 0, y: 360 };
      }
    });
  }

  const deeperLevels = mapa.nodes.filter((n) => n.level > 2);
  deeperLevels.forEach((node) => {
    if (positions[node.id]) return;

    const parentId = findParentId(node.id, mapa.edges);
    const parentPos = parentId ? positions[parentId] : null;

    if (parentPos) {
      const siblings = childrenMap[parentId] ?? [];
      const idx = siblings.indexOf(node.id);
      const count = siblings.length;
      const spread = 130;
      const offsetX = count > 1 ? (idx - (count - 1) / 2) * spread : 0;

      positions[node.id] = {
        x: parentPos.x + offsetX,
        y: parentPos.y + (parentPos.y >= 0 ? 130 : -130),
      };
    }
  });

  const unplaced = mapa.nodes.filter((n) => !positions[n.id]);
  if (unplaced.length > 0) {
    const dagrePositions = layoutWithDagre(mapa);
    unplaced.forEach((n) => {
      positions[n.id] = dagrePositions[n.id] ?? { x: 0, y: 450 };
    });
  }

  return positions;
}

/**
 * @param {import('./mapaGeminiService.js').MapaConceptualData} mapa
 * @returns {Record<string, { x: number, y: number }>}
 */
function layoutWithDagre(mapa) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', nodesep: 100, ranksep: 140 });

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
 * @param {import('./mapaGeminiService.js').MapaConceptualData['edges']} edges
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
 * @param {import('./mapaGeminiService.js').MapaConceptualData['edges']} edges
 * @returns {string | null}
 */
function findParentId(nodeId, edges) {
  const edge = edges.find((e) => e.target === nodeId);
  return edge?.source ?? null;
}
