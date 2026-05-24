import { getDominioPorTema } from '../services/mockData.js';

export const NIVEL_DOMINIO = {
  domina: {
    id: 'domina',
    label: 'Domina',
    color: '#4FE97A',
    bgClass: 'bg-riesgo-bajo/15 border-riesgo-bajo/40 text-riesgo-bajo',
  },
  parcial: {
    id: 'parcial',
    label: 'Parcial',
    color: '#E9A94F',
    bgClass: 'bg-riesgo-medio/15 border-riesgo-medio/40 text-riesgo-medio',
  },
  bajo: {
    id: 'bajo',
    label: 'Bajo',
    color: '#E94F4F',
    bgClass: 'bg-riesgo-alto/15 border-riesgo-alto/40 text-riesgo-alto',
  },
};

/**
 * @param {number} promedio
 * @returns {'domina' | 'parcial' | 'bajo'}
 */
export function getNivelDominio(promedio) {
  if (promedio >= 6) return 'domina';
  if (promedio >= 4) return 'parcial';
  return 'bajo';
}

/**
 * @param {string} boleta
 * @param {string} materiaId
 * @returns {Array<{ tema: string, promedio: number, nivel: string }>}
 */
export function getTemasConDominio(boleta, materiaId) {
  return getDominioPorTema(boleta, materiaId).map(({ tema, promedio }) => ({
    tema,
    promedio,
    nivel: getNivelDominio(promedio),
  }));
}
