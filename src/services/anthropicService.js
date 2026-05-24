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

  const prompt = `Eres un orientador educativo del IPN. Analiza las siguientes respuestas del cuestionario diagnóstico de un alumno en riesgo y genera un reporte conciso para el profesor. Identifica si los problemas son académicos, económicos, emocionales o de estilo de aprendizaje (o combinación) y propone soluciones concretas para cada área. Incluye recursos institucionales del IPN cuando aplique. Máximo 220 palabras.

Alumno: ${alumno.nombre}

ESTILO DE APRENDIZAJE:
- Resultado detectado: ${respuestas.estiloAprendizaje?.resultado ?? 'No registrado'}

ACADÉMICO:
- Horas de estudio: ${respuestas.academico?.horas_estudio}
- Dificultad principal: ${respuestas.academico?.dificultad_material}
- Temas difíciles: ${(respuestas.academico?.temas_dificiles ?? []).join(', ')}
- Acceso a tecnología: ${respuestas.academico?.acceso_tecnologia ?? 'No especificado'}

ECONÓMICO:
- ¿Trabaja?: ${respuestas.economico?.trabaja}
- Dificultades económicas: ${respuestas.economico?.dificultades_economicas}
- Conoce becas: ${respuestas.economico?.conoce_becas}

EMOCIONAL:
- Motivación: ${respuestas.emocional?.motivacion}
- Nivel de estrés: ${respuestas.emocional?.nivel_estres}
- Situaciones reportadas: ${(respuestas.emocional?.situaciones ?? []).join(', ')}
- Comentario libre: ${respuestas.emocional?.comentario_libre ?? 'Ninguno'}
- Disposición a orientación psicológica: ${respuestas.emocional?.dispuesto_psicologo}`;

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
 * @returns {Promise<string>} Markdown-formatted study guide
 */
export async function generarGuia(estilo, materia, temas, material) {
  const prompt = `Eres un tutor educativo del IPN especializado en ${materia}. El alumno tiene un estilo de aprendizaje predominantemente ${estilo}. Los temas en los que tiene más dificultad son: ${temas}. El material base del profesor cubre: ${material}.

Genera una guía de estudio personalizada de máximo 400 palabras. Usa el estilo de aprendizaje indicado. Incluye solo contenido relevante al material del profesor. Sé motivador y claro. Usa markdown para formatear el contenido.`;

  try {
    return await llamarAPI([{ role: "user", content: prompt }], 800);
  } catch {
    return fallbackGuia(estilo, materia, temas);
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

function fallbackGuia(estilo, materia, temas) {
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

¡Tú puedes lograrlo! Cada día de esfuerzo cuenta. 💪`;
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
