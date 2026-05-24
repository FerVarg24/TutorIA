/** @typedef {{ color: string, bg: string, border: string, name: string }} BranchTheme */

/** @type {BranchTheme[]} */
export const PALETA_RAMAS = [
  { color: '#5b9bd5', bg: 'rgba(91, 155, 213, 0.12)', border: '#5b9bd5', name: 'primary' },
  { color: '#9B4FE9', bg: 'rgba(155, 79, 233, 0.12)', border: '#9B4FE9', name: 'violet' },
  { color: '#E9A94F', bg: 'rgba(233, 169, 79, 0.14)', border: '#E9A94F', name: 'amber' },
  { color: '#047857', bg: 'rgba(4, 120, 87, 0.1)', border: '#047857', name: 'green' },
  { color: '#c9b8f0', bg: 'rgba(201, 184, 240, 0.2)', border: '#9b7fd4', name: 'pink' },
  { color: '#4a7fb5', bg: 'rgba(74, 127, 181, 0.12)', border: '#4a7fb5', name: 'deep-blue' },
];

export const CENTRAL_THEME = {
  color: '#4a7fb5',
  bg: 'rgba(123, 167, 212, 0.18)',
  border: '#7ba7d4',
  name: 'central',
};

/**
 * @param {string} label
 * @param {number} [level]
 * @returns {string}
 */
export function getIconKeyForLabel(label, level = 1) {
  const text = label.toLowerCase();

  if (/lateral/.test(text)) return 'ArrowLeftRight';
  if (/propiedad/.test(text)) return 'Layers';
  if (/indeterminada|0\/0|∞/.test(text)) return 'HelpCircle';
  if (/continuidad|continua/.test(text)) return 'Link2';
  if (/ε|delta|formal|demostr/.test(text)) return 'Sigma';
  if (/infinito|∞/.test(text)) return 'Infinity';
  if (/trig|sen|cos|onda/.test(text)) return 'Waveform';
  if (/sustitu|direct/.test(text)) return 'Replace';
  if (/inexistente|no existe/.test(text)) return 'Ban';
  if (/notaci|lim/.test(text)) return 'FunctionSquare';
  if (/trozo|pieza/.test(text)) return 'Puzzle';
  if (/criterio|existencia/.test(text)) return 'CheckCircle2';
  if (/factor|simplif/.test(text)) return 'Scissors';
  if (/producto/.test(text)) return 'X';
  if (/cociente|divisi/.test(text)) return 'Divide';
  if (/racional/.test(text)) return 'SquareRadical';
  if (/l\'?h[oô]pital|hopital/.test(text)) return 'TrendingUp';
  if (/discontinu|salto|hueco/.test(text)) return 'Unlink';
  if (/removible/.test(text)) return 'CircleDot';
  if (/δ|delta/.test(text)) return 'Circle';
  if (/ejemplo/.test(text)) return 'Lightbulb';

  if (level === 0) return 'Target';
  if (level === 2) return 'Dot';
  return 'CircleDot';
}

/**
 * @param {import('../services/mapaGeminiService.js').MapaConceptualData} mapa
 * @returns {Record<string, { branchIndex: number, branchColor: string, branchBg: string, branchBorder: string }>}
 */
export function buildBranchMetadata(mapa) {
  /** @type {Record<string, { branchIndex: number, branchColor: string, branchBg: string, branchBorder: string }>} */
  const meta = {};
  const central = mapa.nodes.find((n) => n.level === 0);
  if (!central) return meta;

  const level1Children = mapa.edges
    .filter((e) => e.source === central.id)
    .map((e) => e.target);

  level1Children.forEach((childId, index) => {
    const theme = PALETA_RAMAS[index % PALETA_RAMAS.length];
    meta[childId] = {
      branchIndex: index,
      branchColor: theme.color,
      branchBg: theme.bg,
      branchBorder: theme.border,
    };
  });

  const childrenMap = {};
  mapa.edges.forEach(({ source, target }) => {
    if (!childrenMap[source]) childrenMap[source] = [];
    childrenMap[source].push(target);
  });

  /** @param {string} nodeId */
  function propagate(nodeId) {
    const parentMeta = meta[nodeId];
    if (!parentMeta) return;
    (childrenMap[nodeId] ?? []).forEach((childId) => {
      if (!meta[childId]) {
        meta[childId] = { ...parentMeta };
        propagate(childId);
      }
    });
  }

  level1Children.forEach(propagate);

  if (central) {
    meta[central.id] = {
      branchIndex: -1,
      branchColor: CENTRAL_THEME.color,
      branchBg: CENTRAL_THEME.bg,
      branchBorder: CENTRAL_THEME.border,
    };
  }

  return meta;
}

/**
 * @param {string} nodeId
 * @param {Record<string, { branchColor: string }>} branchMeta
 * @param {import('../services/mapaGeminiService.js').MapaConceptualData['edges']} edges
 * @returns {string}
 */
export function getBranchColorForNode(nodeId, branchMeta, edges) {
  if (branchMeta[nodeId]?.branchColor) {
    return branchMeta[nodeId].branchColor;
  }

  let current = nodeId;
  const visited = new Set();
  while (current && !visited.has(current)) {
    visited.add(current);
    if (branchMeta[current]?.branchColor) {
      return branchMeta[current].branchColor;
    }
    const parentEdge = edges.find((e) => e.target === current);
    current = parentEdge?.source ?? '';
  }

  return '#7ba7d4';
}

/**
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */
export function hexWithAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
