// All Anthropic API calls go through this module.
// No component should call fetch() directly for AI requests.

const BASE_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

/**
 * Low-level helper — sends a single-turn request to the API.
 * Returns the text content of the first message block.
 * Throws on network or API errors.
 */
async function llamarAPI(messages, maxTokens = 1024) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === "tu-api-key-aqui") {
    throw new Error("API key no configurada");
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      // Required by Anthropic when calling from a browser
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message ?? `Error HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// ── Public functions ──────────────────────────────────────────────────────────

/**
 * Analyzes a student's academic data and returns an explanation for the professor.
 * Falls back to static text when no API key is present.
 *
 * @param {object} alumno - Student data object from mockData
 * @returns {Promise<string>} Analysis text (~120 words)
 */
export async function analizarAlumno(alumno) {
  const prompt = `Eres un agente educativo del IPN. Analiza los siguientes datos académicos del alumno y explica al profesor de forma clara y empática cuál es la situación del alumno, qué señales de riesgo detectas y por qué recomiendas intervención. Habla directamente al profesor. Sé conciso (máximo 120 palabras).

Alumno: ${alumno.nombre}
Asistencia: ${alumno.asistencia}
Tareas entregadas: ${alumno.tareas_entregadas}
Calificación actual: ${alumno.calificacion_actual}
Calificación parcial anterior: ${alumno.calificacion_parcial_anterior}
Declive: ${alumno.declive} puntos`;

  try {
    return await llamarAPI([{ role: "user", content: prompt }], 300);
  } catch {
    // Fallback para demo sin API key
    return `Profesor, ${alumno.nombre} muestra señales claras de riesgo académico que requieren atención inmediata. Su calificación ha caído ${Math.abs(alumno.declive)} puntos respecto al parcial anterior, situándose en ${alumno.calificacion_actual}, por debajo de la línea de aprobación. Con una asistencia del ${alumno.asistencia} y solo ${alumno.tareas_entregadas} tareas entregadas, la tendencia es preocupante. Recomiendo iniciar un acompañamiento personalizado esta semana para identificar si los factores son académicos, económicos o emocionales, y actuar antes de que el parcial quede comprometido.`;
  }
}

/**
 * Analyzes questionnaire responses and generates a personalized report with solutions.
 * Falls back to static text when no API key is present.
 *
 * @param {object} alumno - Student data object
 * @param {object} respuestas - Questionnaire responses from mockData
 * @returns {Promise<string>} Report with detected problems and proposed solutions
 */
export async function analizarCuestionario(alumno, respuestas) {
  if (!respuestas) {
    return fallbackReporte(alumno);
  }

  const prompt = `Eres un orientador educativo del IPN. Analiza las siguientes respuestas del cuestionario diagnóstico de un alumno en riesgo y genera un reporte conciso para el profesor. Identifica si los problemas son académicos, económicos o emocionales (o una combinación) y propone soluciones concretas para cada área detectada. Incluye recursos institucionales del IPN cuando aplique. Máximo 200 palabras.

Alumno: ${alumno.nombre}

Respuestas del cuestionario:
ACADÉMICO:
- Horas de estudio: ${respuestas.academico?.horas_estudio}
- Dificultad con el material: ${respuestas.academico?.dificultad_material}
- Acceso a tecnología: ${respuestas.academico?.acceso_tecnologia}

ECONÓMICO:
- ¿Trabaja?: ${respuestas.economico?.trabaja}
- Dificultades económicas: ${respuestas.economico?.dificultades_economicas}
- Conoce becas: ${respuestas.economico?.conoce_becas}

EMOCIONAL:
- Agotamiento: ${respuestas.emocional?.agotamiento}
- Red de apoyo: ${respuestas.emocional?.red_apoyo}
- Disposición a psicólogo: ${respuestas.emocional?.dispuesto_psicologo}`;

  try {
    return await llamarAPI([{ role: "user", content: prompt }], 500);
  } catch {
    return fallbackReporte(alumno);
  }
}

/**
 * Generates a personalized study guide based on learning style and subject.
 * Falls back to a structured static guide when no API key is present.
 *
 * @param {string} estilo - Learning style: 'visual' | 'auditivo' | 'kinestesico'
 * @param {string} materia - Subject name
 * @param {string} temas - Difficult topics
 * @param {string} material - Course material content
 * @param {string|null} formato - Optional format: 'audio' | 'mapa' | 'diapositivas'
 * @returns {Promise<string>} Markdown-formatted study guide
 */
export async function generarGuia(estilo, materia, temas, material, formato = null) {
  const instruccionesFormato = {
    audio:
      'Genera un guion narrado paso a paso, como si fuera un podcast de 3-5 minutos. Usa un tono conversacional y explica los conceptos como si los estuvieras leyendo en voz alta.',
    mapa:
      'Genera un mapa conceptual en markdown con jerarquía clara: tema central → ramas principales → subnodos. Usa indentación, viñetas anidadas o notación tipo árbol.',
    diapositivas:
      'Genera una presentación de diapositivas numeradas (## Diapositiva 1, ## Diapositiva 2, ...) con bullets concisos en cada slide. Máximo 6-8 diapositivas.',
  };

  const instruccionFormato = formato ? instruccionesFormato[formato] ?? '' : '';
  const prompt = `Eres un tutor educativo del IPN especializado en ${materia}. El alumno tiene un estilo de aprendizaje predominantemente ${estilo}. Los temas en los que tiene más dificultad son: ${temas}. El material base del profesor cubre: ${material}.

Genera una guía de estudio personalizada de máximo 400 palabras. Usa el estilo de aprendizaje indicado. Incluye solo contenido relevante al material del profesor. Sé motivador y claro. Usa markdown para formatear el contenido.${instruccionFormato ? `\n\nInstrucción de formato: ${instruccionFormato}` : ''}`;

  try {
    return await llamarAPI([{ role: "user", content: prompt }], 800);
  } catch {
    return fallbackGuia(estilo, materia, temas, formato);
  }
}

/**
 * Multi-turn conversational agent for the student flow.
 * Falls back to contextual responses when no API key is present.
 *
 * @param {Array<{role: string, content: string}>} historial - Full conversation history
 * @param {string} mensajeNuevo - Latest student message
 * @returns {Promise<string>} Agent response
 */
export async function chatAgente(historial, mensajeNuevo) {
  const systemContext = `Eres TutorIA, un agente educativo empático del IPN. Tu objetivo es ayudar al alumno a identificar qué está dificultando su rendimiento académico mediante una conversación amigable y de confianza. Haz preguntas diagnósticas sobre su situación académica, económica y emocional. Al final de la conversación ofrece generarle una guía de estudio personalizada. Sé breve, cálido y alentador. Máximo 80 palabras por respuesta.`;

  const mensajes = [
    ...historial.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: mensajeNuevo },
  ];

  // Inject system context as a first user message when history is empty
  const mensajesConContexto =
    historial.length === 0
      ? [
          {
            role: "user",
            content: `[Contexto del sistema: ${systemContext}]\n\nAlumno dice: ${mensajeNuevo}`,
          },
        ]
      : mensajes;

  try {
    return await llamarAPI(mensajesConContexto, 200);
  } catch {
    return fallbackChat(mensajeNuevo, historial.length);
  }
}

// ── Mapa conceptual ───────────────────────────────────────────────────────────

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
    const text = await llamarAPI([{ role: 'user', content: prompt }], 1200);
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
    const text = await llamarAPI([{ role: 'user', content: prompt }], 800);
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

// ── Fallback responses ────────────────────────────────────────────────────────

function fallbackReporte(alumno) {
  return `## Reporte de intervención — ${alumno.nombre}

**Problemas detectados:**
- **Académico (Alto):** El alumno estudia menos de 2 horas semanales y encuentra el material difícil. Recomienda sesión de tutoría con el profesor o monitor de la materia.
- **Económico (Medio):** Trabaja tiempo parcial, lo que reduce su disponibilidad para estudiar. Puede aplicar a la Beca de Apoyo a la Continuación de Estudios del IPN.
- **Emocional (Medio-Alto):** Reporta agotamiento y poca motivación. Canalizar al Servicio de Psicología del CECYT/Escuela.

**Recursos sugeridos:**
- Tutoría académica del departamento de Cálculo
- Beca Benito Juárez / Beca IPN continuación de estudios
- Servicio de Psicología Estudiantil IPN — sin costo`;
}

function fallbackGuia(estilo, materia, temas, formato = null) {
  if (formato === 'audio') {
    return `# Resumen de audio — ${materia}

**Duración estimada:** 4 minutos

---

**[Intro — 0:00]**
Hola. En este resumen vamos a repasar los temas donde necesitas reforzar: ${temas}. Escucha con calma y repite mentalmente cada idea clave.

**[Bloque 1 — 0:45]**
Empecemos por lo esencial. Cada concepto de ${materia} se conecta con el anterior. Si algo no quedó claro en clase, no te preocupes: vamos paso a paso, como si estuviéramos en una tutoría.

**[Bloque 2 — 2:00]**
Enfócate en entender el *por qué* antes del *cómo*. Pregúntate: ¿para qué sirve esto? ¿dónde lo he visto antes? Esa pregunta te ayuda a fijar la idea en memoria.

**[Bloque 3 — 3:15]**
Repasa en voz alta los puntos principales. Explicárselos a alguien — o incluso a ti mismo — es una de las formas más efectivas de aprender.

**[Cierre — 3:45]**
Recuerda: dedica 20 minutos hoy a uno de estos temas. Mañana, otro. El avance constante es lo que marca la diferencia. ¡Tú puedes!`;
  }

  if (formato === 'mapa') {
    return `# Mapa conceptual — ${materia}

\`\`\`
${materia}
├── Temas a reforzar
│   ├── ${temas.split(',').join('\n│   ├── ')}
│   └── Conexiones con el parcial
├── Estrategia de estudio
│   ├── Revisar apuntes de clase
│   ├── Resolver ejercicios guiados
│   └── Pedir aclaración al profesor
└── Próximos pasos
    ├── 30 min diarios en el tema más difícil
    └── Formar equipo de estudio (2-3 compañeros)
\`\`\`

## Conexiones clave
- Los temas débiles suelen compartir conceptos base — identifica cuál es la raíz común.
- Repasa primero lo que ya dominas y luego conecta con lo nuevo.`;
  }

  if (formato === 'diapositivas') {
    return `# Presentación de diapositivas — ${materia}

## Diapositiva 1 — Introducción
- Guía personalizada para reforzar ${materia}
- Enfoque en tus áreas de oportunidad

## Diapositiva 2 — Temas a reforzar
- ${temas}
- Prioriza el que tenga menor calificación

## Diapositiva 3 — Conceptos clave
- Repasa definiciones fundamentales
- Identifica fórmulas o reglas que debes dominar

## Diapositiva 4 — Estrategia de estudio
- 30 minutos diarios en el tema más difícil
- Practica con ejercicios del libro antes del examen

## Diapositiva 5 — Recursos
- Apuntes de clase y material del profesor
- Tutoría con el profesor o monitor

## Diapositiva 6 — Próximos pasos
- Habla con tu profesor para aclarar dudas
- Revisa las sesiones que faltaste
- ¡Tú puedes lograrlo!`;
  }

  const estiloDesc = {
    visual: "diagramas y esquemas visuales",
    auditivo: "explicaciones narrativas paso a paso",
    kinestesico: "ejercicios prácticos y aplicaciones reales",
  }[estilo] ?? "explicaciones claras";

  return `# Guía de estudio personalizada — ${materia}

¡Hola! Esta guía fue creada especialmente para ti, usando ${estiloDesc}.

## Temas a reforzar
${temas}

## Estrategia de estudio recomendada

1. **Dedica 30 minutos diarios** a revisar el tema más difícil primero.
2. **Usa ${estiloDesc}** para entender los conceptos — pide al profesor ejemplos de este tipo.
3. **Practica con ejercicios del libro** antes de intentar los de examen.
4. **Forma un equipo de estudio** con 2-3 compañeros de clase.

## Próximos pasos
- Habla con tu profesor en la siguiente clase para aclarar dudas pendientes.
- Revisa las notas de las sesiones que faltaste.

¡Tú puedes lograrlo! Cada día de esfuerzo cuenta.`;
}

function fallbackChat(mensaje, turno) {
  const respuestas = [
    "¡Hola! Soy TutorIA, tu asistente del IPN. Noto que tu desempeño en esta materia ha tenido algunas variaciones. ¿Me puedes contar cómo te has sentido con la materia últimamente?",
    "Entiendo, gracias por compartirlo. ¿Estás teniendo alguna dificultad para encontrar tiempo de estudio? A veces el trabajo o las responsabilidades en casa pueden afectar el rendimiento.",
    "Eso es muy importante saberlo. ¿Sientes que el material de la clase es difícil de entender, o más bien es cuestión de falta de tiempo para estudiar?",
    "Gracias por tu honestidad. Basándome en lo que me dices, creo que podría ayudarte con una guía de estudio personalizada. ¿Te gustaría que la generara para ti ahora?",
  ];

  return respuestas[Math.min(turno, respuestas.length - 1)];
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
