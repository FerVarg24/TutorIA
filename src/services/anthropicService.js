const BASE_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

function getApiKey() {
  return import.meta.env.VITE_ANTHROPIC_API_KEY;
}

function buildPromptAnalisis(alumno) {
  return `
Eres un agente educativo del IPN. Analiza los siguientes datos académicos del alumno
y explica al profesor de forma clara y empática cuál es la situación del alumno,
qué señales de riesgo detectas y por qué recomiendas intervención.
Habla directamente al profesor. Sé conciso (máximo 120 palabras).

Alumno: ${alumno.nombre}
Asistencia: ${alumno.asistencia}
Tareas entregadas: ${alumno.tareas_entregadas}
Calificación actual: ${alumno.calificacion_actual}
Calificación parcial anterior: ${alumno.calificacion_parcial_anterior}
Declive: ${alumno.declive} puntos
`.trim();
}

function buildPromptCuestionario(alumno, respuestas) {
  return `
Eres un agente educativo del IPN. Analiza las respuestas del cuestionario diagnóstico
del alumno ${alumno.nombre} y clasifica el problema principal (académico, económico,
emocional o combinado). Propón soluciones personalizadas concretas.

Respuestas del cuestionario:
${JSON.stringify(respuestas, null, 2)}
`.trim();
}

function buildPromptGuia(estilo, materia, temas, materialProfesor) {
  return `
Eres un tutor educativo del IPN especializado en ${materia}.
El alumno tiene un estilo de aprendizaje predominantemente ${estilo}.
Los temas en los que tiene más dificultad son: ${temas}.
El material base del profesor cubre: ${materialProfesor}.

Genera una guía de estudio personalizada de máximo 400 palabras.
Usa el estilo de aprendizaje indicado.
Incluye solo contenido relevante al material del profesor.
Sé motivador y claro.
`.trim();
}

async function callAnthropic(messages, maxTokens = 1000) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('VITE_ANTHROPIC_API_KEY is not configured');
  }

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

export async function analizarAlumno(datosAlumno) {
  return callAnthropic([
    {
      role: 'user',
      content: buildPromptAnalisis(datosAlumno),
    },
  ]);
}

export async function analizarCuestionario(alumno, respuestas) {
  return callAnthropic([
    {
      role: 'user',
      content: buildPromptCuestionario(alumno, respuestas),
    },
  ]);
}

export async function generarGuia(estilo, materia, temas, materialProfesor) {
  return callAnthropic([
    {
      role: 'user',
      content: buildPromptGuia(estilo, materia, temas, materialProfesor),
    },
  ]);
}

export async function chatAgente(historial, mensajeNuevo) {
  const messages = [
    ...historial,
    { role: 'user', content: mensajeNuevo },
  ];

  return callAnthropic(messages);
}
