// Google Gemini API calls for conceptual map generation and expansion.

/**
 * @param {string} prompt
 * @param {number} [maxTokens]
 * @returns {Promise<string>}
 */
async function llamarAPIGemini(prompt, maxTokens = 1024) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-2.0-flash';

  if (!apiKey || apiKey === 'tu-api-key-aqui') {
    throw new Error('Gemini API key no configurada');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message ?? `Error HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Respuesta vacía de Gemini');
  return text;
}

/** @typedef {{ id: string, label: string, description: string, example: string, question: string, level: number }} MapaNodo */
/** @typedef {{ source: string, target: string, label: string }} MapaEdge */
/** @typedef {{ nodes: MapaNodo[], edges: MapaEdge[] }} MapaConceptualData */

const LIMITES_PROFUNDIDAD = {
  basico: { min: 5, max: 7 },
  intermedio: { min: 8, max: 12 },
  detallado: { min: 13, max: 18 },
};

/**
 * @param {string} text
 * @param {'basico' | 'intermedio' | 'detallado'} [profundidad]
 * @returns {MapaConceptualData}
 */
export function parseMapaJSON(text, profundidad = 'basico') {
  let raw = text.trim();
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) raw = fenceMatch[1].trim();

  const parsed = JSON.parse(raw);
  if (!parsed?.nodes?.length || !Array.isArray(parsed.edges)) {
    throw new Error('JSON de mapa inválido');
  }

  const limites = LIMITES_PROFUNDIDAD[profundidad] ?? LIMITES_PROFUNDIDAD.basico;
  if (parsed.nodes.length > limites.max) {
    parsed.nodes = parsed.nodes.slice(0, limites.max);
    const ids = new Set(parsed.nodes.map((n) => n.id));
    parsed.edges = parsed.edges.filter((e) => ids.has(e.source) && ids.has(e.target));
  }

  parsed.nodes.forEach((n) => {
    if (!n.id || !n.label || n.description == null || n.example == null || n.question == null || n.level == null) {
      throw new Error(`Nodo incompleto: ${n.id ?? 'sin id'}`);
    }
  });

  parsed.edges.forEach((e) => {
    if (!e.source || !e.target || !e.label) {
      throw new Error('Edge incompleto');
    }
  });

  return parsed;
}

/**
 * @param {string} materia
 * @param {string} tema
 * @param {string} material
 * @param {'basico' | 'intermedio' | 'detallado'} profundidad
 * @returns {Promise<MapaConceptualData>}
 */
export async function generarMapaConceptual(materia, tema, material, profundidad = 'basico') {
  const prompt = `Eres TutorIA, un tutor del IPN. Genera un mapa conceptual para un principiante absoluto.

Materia: ${materia}
Tema a estudiar: ${tema}
Material de referencia del profesor: ${material}
Nivel de profundidad: ${profundidad}

REGLAS ESTRICTAS:
1. Responde ÚNICAMENTE con JSON válido, sin markdown, sin texto antes ni después.
2. Usa el formato exacto:
{
  "nodes": [
    { "id": "1", "label": "...", "description": "...", "example": "...", "question": "...", "level": 0 }
  ],
  "edges": [
    { "source": "1", "target": "2", "label": "..." }
  ]
}
3. Límites de nodos según profundidad:
   - basico: 5 a 7 nodos
   - intermedio: 8 a 12 nodos
   - detallado: 13 a 18 nodos
4. Jerarquía obligatoria:
   - Exactamente 1 nodo con level 0 (tema central, usa el tema "${tema}")
   - Nodos level 1: conceptos secundarios directamente relacionados
   - Nodos level 2: detalles o ejemplos específicos (solo si profundidad lo permite)
5. Cada edge debe tener label en español que explique la relación ("produce", "necesita", "es parte de", "conduce a", "se diferencia de", etc.)
6. Lenguaje:
   - basico: palabras cotidianas, sin jerga técnica
   - intermedio: introduce términos técnicos con breve contexto
   - detallado: más preciso pero aún comprensible para principiante
7. Cada nodo debe incluir:
   - description: máximo 2 oraciones simples
   - example: situación cotidiana o analogía
   - question: 1 pregunta corta de comprensión (máximo 15 palabras)
8. Los ids deben ser strings numéricos secuenciales ("1", "2", "3"...)
9. No repitas conceptos. No incluyas nodos desconectados.
10. Enfócate SOLO en "${tema}", no en toda la materia.`;

  try {
    const text = await llamarAPIGemini(prompt, 1200);
    return parseMapaJSON(text, profundidad);
  } catch {
    return fallbackMapaConceptual(tema, profundidad);
  }
}

/**
 * @param {string} materia
 * @param {string} tema
 * @param {MapaNodo} nodo
 * @param {MapaConceptualData} mapaActual
 * @param {'basico' | 'intermedio' | 'detallado'} profundidad
 * @returns {Promise<MapaConceptualData>}
 */
export async function expandirNodoMapa(materia, tema, nodo, mapaActual, profundidad = 'basico') {
  const prompt = `Eres TutorIA, un tutor del IPN. Expande un nodo específico de un mapa conceptual existente.

Materia: ${materia}
Tema general: ${tema}
Nivel de profundidad: ${profundidad}

Nodo a expandir:
- id: ${nodo.id}
- label: ${nodo.label}
- description: ${nodo.description}

Mapa actual (JSON):
${JSON.stringify(mapaActual)}

REGLAS ESTRICTAS:
1. Responde ÚNICAMENTE con JSON válido con este formato:
{
  "nodes": [ ...solo nodos NUEVOS... ],
  "edges": [ ...solo edges NUEVOS (conectando nodos nuevos entre sí o con "${nodo.id}")... ]
}
2. Genera entre 2 y 4 nodos nuevos como máximo.
3. Todos los nodos nuevos deben tener level ${nodo.level + 1}.
4. Usa ids que NO existan en el mapa actual (continúa la secuencia numérica).
5. Al menos 1 edge debe conectar un nodo nuevo con "${nodo.id}".
6. Cada nodo nuevo incluye: label, description, example, question, level.
7. Cada edge incluye label de relación en español.
8. No dupliques conceptos ya presentes en el mapa actual.
9. Lenguaje acorde a profundidad "${profundidad}".
10. Sin markdown, sin texto extra.`;

  try {
    const text = await llamarAPIGemini(prompt, 800);
    let raw = text.trim();
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) raw = fenceMatch[1].trim();
    const parsed = JSON.parse(raw);
    if (!parsed?.nodes?.length) throw new Error('Expansión vacía');
    parsed.nodes.forEach((n) => {
      if (!n.id || !n.label || n.description == null || n.example == null || n.question == null || n.level == null) {
        throw new Error('Nodo de expansión incompleto');
      }
    });
    return parsed;
  } catch {
    return fallbackExpandirNodo(nodo, mapaActual);
  }
}

/**
 * @param {string} tema
 * @param {'basico' | 'intermedio' | 'detallado'} profundidad
 * @returns {MapaConceptualData}
 */
function fallbackMapaConceptual(tema, profundidad) {
  const base = {
    nodes: [
      {
        id: '1',
        label: tema,
        description: `${tema} es un concepto clave que conecta varias ideas de la materia.`,
        example: `Piensa en ${tema.toLowerCase()} como una pieza central de un rompecabezas.`,
        question: `¿Por qué es importante entender ${tema.toLowerCase()}?`,
        level: 0,
      },
      {
        id: '2',
        label: 'Definición básica',
        description: 'Es la idea principal que debes conocer primero.',
        example: 'Como aprender las reglas antes de jugar un juego nuevo.',
        question: '¿Puedes explicarlo con tus palabras?',
        level: 1,
      },
      {
        id: '3',
        label: 'Aplicación práctica',
        description: 'Muestra cómo se usa este concepto en problemas reales.',
        example: 'Resolver un ejercicio paso a paso en clase.',
        question: '¿Dónde lo usarías en un examen?',
        level: 1,
      },
      {
        id: '4',
        label: 'Errores comunes',
        description: 'Son las confusiones que suelen cometer los principiantes.',
        example: 'Confundir términos parecidos al estudiar.',
        question: '¿Qué error te cuesta más evitar?',
        level: 1,
      },
      {
        id: '5',
        label: 'Conexión con otros temas',
        description: 'Relaciona este tema con lo que ya viste en la materia.',
        example: 'Unir dos capítulos del libro que parecen distintos.',
        question: '¿Con qué otro tema se relaciona?',
        level: 1,
      },
    ],
    edges: [
      { source: '1', target: '2', label: 'se define como' },
      { source: '1', target: '3', label: 'se aplica en' },
      { source: '1', target: '4', label: 'requiere evitar' },
      { source: '1', target: '5', label: 'conecta con' },
    ],
  };

  if (profundidad === 'intermedio' || profundidad === 'detallado') {
    base.nodes.push(
      {
        id: '6',
        label: 'Ejemplo resuelto',
        description: 'Un caso guiado que muestra el procedimiento completo.',
        example: 'Seguir un ejemplo del profesor en el pizarrón.',
        question: '¿Qué paso te resultó más difícil?',
        level: 2,
      },
      {
        id: '7',
        label: 'Propiedades clave',
        description: 'Características que distinguen este concepto de otros.',
        example: 'Las reglas que hacen único a cada tipo de problema.',
        question: '¿Cuál propiedad recuerdas mejor?',
        level: 2,
      },
    );
    base.edges.push(
      { source: '3', target: '6', label: 'muestra con' },
      { source: '2', target: '7', label: 'tiene' },
    );
  }

  if (profundidad === 'detallado') {
    base.nodes.push(
      {
        id: '8',
        label: 'Notación',
        description: 'Símbolos y formas de escribir el concepto correctamente.',
        example: 'Usar la misma abreviatura que en tus apuntes.',
        question: '¿Reconoces la notación en un ejercicio?',
        level: 2,
      },
      {
        id: '9',
        label: 'Casos especiales',
        description: 'Situaciones donde el concepto se comporta distinto.',
        example: 'Cuando el problema tiene condiciones extra.',
        question: '¿Qué caso especial te confunde más?',
        level: 2,
      },
    );
    base.edges.push(
      { source: '2', target: '8', label: 'se expresa con' },
      { source: '4', target: '9', label: 'incluye' },
    );
  }

  return base;
}

/**
 * @param {MapaNodo} nodo
 * @param {MapaConceptualData} mapaActual
 * @returns {MapaConceptualData}
 */
function fallbackExpandirNodo(nodo, mapaActual) {
  const maxId = mapaActual.nodes.reduce((max, n) => {
    const num = parseInt(n.id, 10);
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 0);

  const id1 = String(maxId + 1);
  const id2 = String(maxId + 2);

  return {
    nodes: [
      {
        id: id1,
        label: `Detalle de ${nodo.label}`,
        description: `Profundiza en una parte específica de ${nodo.label}.`,
        example: 'Como desarmar un problema grande en pasos pequeños.',
        question: '¿Qué parte te quedó más clara?',
        level: nodo.level + 1,
      },
      {
        id: id2,
        label: `Ejemplo de ${nodo.label}`,
        description: `Muestra cómo aparece ${nodo.label} en la práctica.`,
        example: 'Un ejercicio sencillo que puedes resolver en casa.',
        question: '¿Podrías resolver uno similar?',
        level: nodo.level + 1,
      },
    ],
    edges: [
      { source: nodo.id, target: id1, label: 'se descompone en' },
      { source: nodo.id, target: id2, label: 'se ilustra con' },
    ],
  };
}
