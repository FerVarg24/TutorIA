import { useCopilotReadable, useCopilotAction, useCopilotAdditionalInstructions } from '@copilotkit/react-core';

/**
 * @param {{
 *   materia: string,
 *   temaSeleccionado: string | null,
 *   profundidad: string,
 *   mapa: { nodes: unknown[], edges: unknown[] },
 *   nodoActivo: string | null,
 *   onResaltarNodo: (idOrLabel: string) => void,
 *   onAgregarConcepto: (label: string, parentId: string, relacion?: string) => void,
 *   onSimplificarMapa: () => void,
 * }} props
 */
export default function MapaCopilotBridge({
  materia,
  temaSeleccionado,
  profundidad,
  mapa,
  nodoActivo,
  onResaltarNodo,
  onAgregarConcepto,
  onSimplificarMapa,
}) {
  useCopilotAdditionalInstructions({
    instructions: `Eres TutorIA, asistente de estudio del IPN. El alumno está viendo un mapa conceptual interactivo.
Tienes acceso al estado actual del mapa (nodos, edges, tema, profundidad) via contexto.
Responde en español, de forma breve y clara (máximo 3 oraciones por respuesta).
Puedes explicar conceptos del mapa, resaltar nodos relevantes, sugerir simplificar el mapa o agregar conceptos.
No generes mapas completos en texto. Usa las acciones disponibles para modificar el mapa visual.
Si el alumno pregunta algo fuera del tema actual, redirígelo amablemente al tema del mapa.`,
  });

  useCopilotReadable({
    description: 'Estado actual del mapa conceptual del alumno',
    value: {
      materia,
      temaSeleccionado,
      profundidad,
      nodes: mapa.nodes,
      edges: mapa.edges,
      nodoActivo,
    },
  });

  useCopilotAction({
    name: 'resaltarNodo',
    description: 'Resalta y abre el panel de un nodo del mapa por su id o label',
    parameters: [
      {
        name: 'idOrLabel',
        type: 'string',
        description: 'Id o nombre del concepto a resaltar',
        required: true,
      },
    ],
    handler: ({ idOrLabel }) => {
      onResaltarNodo(idOrLabel);
      return `Nodo "${idOrLabel}" resaltado`;
    },
  });

  useCopilotAction({
    name: 'agregarConcepto',
    description: 'Agrega un nuevo concepto al mapa conectado a un nodo padre',
    parameters: [
      {
        name: 'label',
        type: 'string',
        description: 'Nombre del nuevo concepto',
        required: true,
      },
      {
        name: 'parentId',
        type: 'string',
        description: 'Id del nodo padre al que conectar',
        required: true,
      },
      {
        name: 'relacion',
        type: 'string',
        description: 'Etiqueta de la relación entre padre e hijo',
        required: false,
      },
    ],
    handler: ({ label, parentId, relacion }) => {
      onAgregarConcepto(label, parentId, relacion);
      return `Concepto "${label}" agregado al mapa`;
    },
  });

  useCopilotAction({
    name: 'simplificarMapa',
    description: 'Regenera el mapa con profundidad básica (menos nodos, lenguaje más simple)',
    parameters: [],
    handler: async () => {
      await onSimplificarMapa();
      return 'Mapa simplificado a nivel básico';
    },
  });

  return null;
}
