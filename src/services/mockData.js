// Central mock data store — all demo data lives here.
// No component should hardcode data directly.

// ── Authentication ──────────────────────────────────────────────────────────

export const USUARIOS_PROFESOR = [
  {
    correo: "profesor@ipn.mx",
    password: "demo1234",
    nombre: "Dr. Carlos Ramírez",
  },
];

export const USUARIOS_ALUMNO = [
  {
    boleta: "2021630001",
    password: "demo1234",
    nombre: "María González López",
  },
];

// ── Professor flow ───────────────────────────────────────────────────────────

export const MATERIAS_PROFESOR = [
  {
    id: "calc1",
    nombre: "Cálculo Diferencial",
    grupo: "3BV1",
    alumnos: 38,
    en_riesgo: 7,
  },
  {
    id: "fis1",
    nombre: "Física I",
    grupo: "3BV2",
    alumnos: 42,
    en_riesgo: 3,
  },
  {
    id: "prog1",
    nombre: "Programación Orientada a Objetos",
    grupo: "4BV1",
    alumnos: 35,
    en_riesgo: 5,
  },
];

export const ALUMNOS_POR_MATERIA = {
  calc1: [
    {
      boleta: "2021630001",
      nombre: "María González López",
      asistencia: "63%",
      tareas_entregadas: "3/8",
      calificacion_actual: 5.2,
      calificacion_parcial_anterior: 7.8,
      declive: -2.6,
      nivel_riesgo: "alto",
    },
    {
      boleta: "2021630042",
      nombre: "Juan Pérez García",
      asistencia: "60%",
      tareas_entregadas: "4/8",
      calificacion_actual: 4.8,
      calificacion_parcial_anterior: 7.2,
      declive: -2.4,
      nivel_riesgo: "alto",
    },
    {
      boleta: "2021630055",
      nombre: "Carlos Méndez Torres",
      asistencia: "65%",
      tareas_entregadas: "5/8",
      calificacion_actual: 5.1,
      calificacion_parcial_anterior: 6.8,
      declive: -1.7,
      nivel_riesgo: "alto",
    },
    {
      boleta: "2021630078",
      nombre: "Ana Flores Reyes",
      asistencia: "75%",
      tareas_entregadas: "6/8",
      calificacion_actual: 6.2,
      calificacion_parcial_anterior: 7.0,
      declive: -0.8,
      nivel_riesgo: "medio",
    },
    {
      boleta: "2021630091",
      nombre: "Luis Herrera Díaz",
      asistencia: "80%",
      tareas_entregadas: "7/8",
      calificacion_actual: 6.9,
      calificacion_parcial_anterior: 7.4,
      declive: -0.5,
      nivel_riesgo: "medio",
    },
    {
      boleta: "2021630103",
      nombre: "Sofía Martínez Vega",
      asistencia: "95%",
      tareas_entregadas: "8/8",
      calificacion_actual: 9.1,
      calificacion_parcial_anterior: 8.8,
      declive: 0.3,
      nivel_riesgo: "bajo",
    },
    {
      boleta: "2021630114",
      nombre: "Diego Sánchez Luna",
      asistencia: "90%",
      tareas_entregadas: "8/8",
      calificacion_actual: 8.5,
      calificacion_parcial_anterior: 8.2,
      declive: 0.3,
      nivel_riesgo: "bajo",
    },
  ],
  fis1: [
    {
      boleta: "2021630001",
      nombre: "María González López",
      asistencia: "68%",
      tareas_entregadas: "4/7",
      calificacion_actual: 5.8,
      calificacion_parcial_anterior: 7.5,
      declive: -1.7,
      nivel_riesgo: "medio",
    },
    {
      boleta: "2021630120",
      nombre: "Valeria Ruiz Castro",
      asistencia: "58%",
      tareas_entregadas: "3/7",
      calificacion_actual: 4.5,
      calificacion_parcial_anterior: 7.8,
      declive: -3.3,
      nivel_riesgo: "alto",
    },
    {
      boleta: "2021630135",
      nombre: "Marco Jiménez Ríos",
      asistencia: "72%",
      tareas_entregadas: "5/7",
      calificacion_actual: 6.0,
      calificacion_parcial_anterior: 7.1,
      declive: -1.1,
      nivel_riesgo: "medio",
    },
    {
      boleta: "2021630148",
      nombre: "Daniela Moreno Paz",
      asistencia: "92%",
      tareas_entregadas: "7/7",
      calificacion_actual: 9.3,
      calificacion_parcial_anterior: 9.0,
      declive: 0.3,
      nivel_riesgo: "bajo",
    },
  ],
  prog1: [
    {
      boleta: "2021630200",
      nombre: "Rodrigo Vargas Nava",
      asistencia: "62%",
      tareas_entregadas: "3/6",
      calificacion_actual: 5.0,
      calificacion_parcial_anterior: 7.5,
      declive: -2.5,
      nivel_riesgo: "alto",
    },
    {
      boleta: "2021630215",
      nombre: "Itzel Ramírez Cruz",
      asistencia: "70%",
      tareas_entregadas: "4/6",
      calificacion_actual: 5.8,
      calificacion_parcial_anterior: 6.9,
      declive: -1.1,
      nivel_riesgo: "medio",
    },
    {
      boleta: "2021630229",
      nombre: "Fernando Castillo Mora",
      asistencia: "88%",
      tareas_entregadas: "6/6",
      calificacion_actual: 8.7,
      calificacion_parcial_anterior: 8.5,
      declive: 0.2,
      nivel_riesgo: "bajo",
    },
  ],
};

// ── Student flow ─────────────────────────────────────────────────────────────

export const MATERIAS_ALUMNO = [
  {
    id: "calc1",
    nombre: "Cálculo Diferencial",
    estado: "rojo",
    profesor: "Dr. Ramírez",
    creditos: 6,
    promedio: 5.2,
    parcial: 2,
  },
  {
    id: "fis1",
    nombre: "Física I",
    estado: "morado",
    profesor: "Ing. López",
    creditos: 5,
    promedio: 5.8,
    parcial: 2,
  },
  {
    id: "prog1",
    nombre: "Programación OO",
    estado: "verde",
    profesor: "M.C. Torres",
    creditos: 6,
    promedio: 8.7,
    parcial: 2,
  },
];

// ── Questionnaire responses (professor follow-up flow) ────────────────────────

export const RESPUESTAS_CUESTIONARIO = {
  "2021630001": {
    estiloAprendizaje: {
      pregunta1: "A) Hacer diagramas, mapas mentales o resúmenes con colores",
      pregunta2: "A) Busco infografías o videos visuales",
      resultado: "Visual",
    },
    academico: {
      horas_estudio: "2 a 4 horas",
      dificultad_material: "Entiendo la teoría pero no sé resolver ejercicios",
      temas_dificiles: ["Límites", "Derivadas"],
    },
    economico: {
      trabaja: "Sí, trabajo medio tiempo (10-25 hrs/semana)",
      dificultades_economicas: "He tenido algunas dificultades este semestre",
      conoce_becas: "No, no conocía los apoyos disponibles",
    },
    emocional: {
      motivacion: "2 / 5 — Poco motivada",
      nivel_estres: "4 / 5 — Me siento muy abrumada",
      situaciones: ["Ansiedad o estrés constante", "Baja motivación para estudiar"],
      comentario_libre: "Me cuesta mucho combinar el trabajo con la escuela, llego muy cansada.",
      dispuesto_psicologo: "Sí, estaría dispuesta",
    },
  },
  "2021630042": {
    // Juan Pérez García
    academico: {
      horas_estudio: "1-2 horas por semana",
      dificultad_material: "Sí, encuentro el material muy difícil de entender",
      acceso_tecnologia: "Sí, tengo computadora e internet",
    },
    economico: {
      trabaja: "Sí, trabajo tiempo parcial en las tardes",
      dificultades_economicas: "He tenido algunas dificultades este semestre",
      conoce_becas: "No, no conocía los apoyos disponibles",
    },
    emocional: {
      agotamiento: "Me he sentido muy agotado y sin motivación",
      red_apoyo: "Tengo poco apoyo de familiares",
      dispuesto_psicologo: "Sí, estaría dispuesto a hablar con alguien",
    },
  },
};

// ── Questionnaire results summary (for student-side agent context) ───────────

export const RESULTADOS_CUESTIONARIO = {
  "2021630001": {
    problema: "Academico y emocional (estres por carga laboral)",
    recomendaciones:
      "Guia visual de limites y derivadas, plan de estudio de 30 minutos diarios, tutorias semanales con el profesor",
    recursos:
      "Asesorias del departamento de matematicas, servicio de psicologia IPN, beca de apoyo a la continuidad",
  },
  "2021630042": {
    problema: "Academico y economico (poco tiempo de estudio)",
    recomendaciones:
      "Guia de estudio paso a paso, agenda semanal con bloques cortos, seguimiento con tutor academico",
    recursos:
      "Tutorias IPN, beca institucional de apoyo, canalizacion a orientacion estudiantil",
  },
};

// ── Course material (for study guide generation) ─────────────────────────────

export const MATERIAL_POR_MATERIA = {
  calc1: `
    Unidad 1: Límites y continuidad — definición épsilon-delta, propiedades de límites, continuidad en un punto.
    Unidad 2: La derivada — definición como límite, reglas de derivación (potencia, producto, cociente, cadena).
    Unidad 3: Aplicaciones — valores extremos, teorema de Rolle, valor medio, optimización.
    Unidad 4: Funciones trascendentes — derivadas de funciones trigonométricas, exponenciales y logarítmicas.
  `,
  fis1: `
    Unidad 1: Cinemática — posición, velocidad, aceleración, movimiento uniformemente acelerado, caída libre.
    Unidad 2: Dinámica — leyes de Newton, fricción, fuerzas normales, planos inclinados.
    Unidad 3: Trabajo y energía — trabajo, energía cinética, potencial, conservación de energía.
    Unidad 4: Cantidad de movimiento — impulso, colisiones, centro de masa.
  `,
  prog1: `
    Unidad 1: Conceptos de POO — clases, objetos, atributos, métodos, encapsulamiento.
    Unidad 2: Herencia — herencia simple y múltiple, sobreescritura de métodos, constructores.
    Unidad 3: Polimorfismo — sobrecarga de métodos, polimorfismo de subtipo, interfaces.
    Unidad 4: Estructuras de datos — arreglos de objetos, listas enlazadas simples.
  `,
};

// ── Teams course material metadata (PDFs uploaded by professor) ───────────────

export const MATERIAL_TEAMS_POR_MATERIA = {
  calc1: {
    canal: 'Cálculo Diferencial — 3BV1 — Dr. Ramírez',
    archivos: [
      {
        id: 'u1-limites',
        nombre: 'Unidad_1_Limites_y_continuidad.pdf',
        unidad: 1,
        temas: ['Límites', 'Continuidad'],
        paginas: '1–28',
      },
      {
        id: 'u2-derivadas',
        nombre: 'Unidad_2_La_derivada.pdf',
        unidad: 2,
        temas: ['Derivadas', 'Reglas de derivación'],
        paginas: '1–34',
      },
      {
        id: 'u3-aplicaciones',
        nombre: 'Unidad_3_Aplicaciones_de_la_derivada.pdf',
        unidad: 3,
        temas: ['Aplicaciones'],
        paginas: '1–26',
      },
    ],
  },
};

/**
 * @param {string} materiaId
 * @param {string} tema
 * @returns {Array<{ id: string, nombre: string, unidad: number, temas: string[], paginas: string }>}
 */
export function getFuentesTeamsPorTema(materiaId, tema) {
  const config = MATERIAL_TEAMS_POR_MATERIA[materiaId];
  if (!config || !tema) return [];
  return config.archivos.filter((archivo) => archivo.temas.includes(tema));
}

/**
 * @param {string} materiaId
 * @returns {string | null}
 */
export function getCanalTeams(materiaId) {
  return MATERIAL_TEAMS_POR_MATERIA[materiaId]?.canal ?? null;
}

// ── Conceptual maps (demo fallback — no API required) ───────────────────────

export const MAPAS_CONCEPTUALES_DEMO = {
  calc1: {
    'Límites': {
      nodes: [
        {
          id: '1',
          label: 'Límites',
          description: 'lim(x→a) f(x) = L significa que f(x) se acerca a L cuando x tiende a a, sin necesariamente evaluar f en a.',
          example: 'Tarea 1, ej. 1: lim(x→2) (3x − 1) = 5. Sustitución directa porque no hay indeterminación.',
          question: '¿En qué casos puedes sustituir directamente el valor de x?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 1–7 (Teams — Dr. Ramírez)',
          citaMaterial: '"El límite describe el comportamiento de f(x) cerca de un punto, no necesariamente en el punto." — Apuntes U1, §1.1',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 1 y 2',
          level: 0,
        },
        {
          id: '2',
          label: 'Límite lateral',
          description: 'lim(x→a⁻) f(x) y lim(x→a⁺) f(x). El límite existe solo si ambos laterales existen y son iguales.',
          example: 'Tarea 1, ej. 3: f(x) = |x|/x en x = 0 → límite izquierdo −1, derecho +1; no existe el límite.',
          question: '¿Cuándo falla la existencia del límite en un punto?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 8–11 (Teams — Dr. Ramírez)',
          citaMaterial: '"Para que exista lim f(x) cuando x→a, los límites laterales deben ser iguales." — Apuntes U1, §1.3',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 3, 5 y 7',
          level: 1,
        },
        {
          id: '3',
          label: 'Propiedades de límites',
          description: 'lim(f ± g) = lim f ± lim g; lim(f·g) = lim f · lim g; lim(f/g) = lim f / lim g (si lim g ≠ 0).',
          example: 'Tarea 1, ej. 5: lim(x→1) (x² + 2x − 3) = lim x² + 2 lim x − 3 = 0, aplicando suma y producto.',
          question: '¿Qué propiedad usarías para lim(x→0) (x·sen x)?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 12–15 (Teams — Dr. Ramírez)',
          citaMaterial: '"Las propiedades de límites permiten descomponer expresiones complejas en partes más simples." — Apuntes U1, §1.4',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 4 y 6',
          level: 1,
        },
        {
          id: '4',
          label: 'Formas indeterminadas',
          description: 'Expresiones 0/0, ∞/∞, ∞ − ∞ requieren factorización, racionalización o conjugados antes de evaluar.',
          example: 'Tarea 1, ej. 8: lim(x→2) (x² − 4)/(x − 2) = lim(x→2) (x + 2) = 4, factorizando numerador.',
          question: '¿Qué técnica aplicas primero ante una forma 0/0?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 16–19 (Teams — Dr. Ramírez)',
          citaMaterial: '"Ante 0/0, simplifica algebraicamente la expresión antes de sustituir." — Apuntes U1, §1.5',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 8, 9 y 10',
          level: 1,
        },
        {
          id: '5',
          label: 'Continuidad en a',
          description: 'f es continua en a si f(a) existe, lim(x→a) f(x) existe y ambos son iguales.',
          example: 'Tarea 2, ej. 2: f(x) = (x² − 1)/(x − 1) tiene discontinuidad removible en x = 1 (hueco).',
          question: '¿Qué condición de continuidad falla si hay un salto?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 20–23 (Teams — Dr. Ramírez)',
          citaMaterial: '"Continuidad en a: f(a) definida, límite existe y lim f(x) = f(a)." — Apuntes U1, §1.6',
          ejercicioReferencia: 'Tarea 2: Continuidad — ejercicios 1, 2 y 4',
          level: 1,
        },
        {
          id: '6',
          label: 'Definición ε-δ',
          description: 'Para todo ε > 0 existe δ > 0 tal que |x − a| < δ implica |f(x) − L| < ε. Formaliza la idea de "acercarse".',
          example: 'Demostración guiada en apuntes: lim(x→3) (2x + 1) = 7 usando δ = ε/2.',
          question: '¿Qué representa δ en la definición formal?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 24–26 (Teams — Dr. Ramírez)',
          citaMaterial: '"La definición ε-δ precisa qué tan cerca debe estar x de a para que f(x) esté a ε de L." — Apuntes U1, §1.7',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 12 (demostración ε-δ)',
          level: 1,
        },
        {
          id: '7',
          label: 'Límites al infinito',
          description: 'lim(x→∞) f(x) analiza la tendencia cuando x crece sin límite. Compara grados en racionales: mayor grado domina.',
          example: 'Tarea 1, ej. 11: lim(x→∞) (3x² + 1)/(x² − 2x) = 3, dividiendo entre x².',
          question: '¿Cómo determinas el límite de una función racional al infinito?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 27–28 (Teams — Dr. Ramírez)',
          citaMaterial: '"En funciones racionales al infinito, el término de mayor grado determina el comportamiento." — Apuntes U1, §1.8',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 11 y 13',
          level: 2,
        },
        {
          id: '8',
          label: 'Límites trigonométricos',
          description: 'Límite fundamental: lim(x→0) sen(x)/x = 1. Se usa para derivar funciones trig y resolver indeterminaciones.',
          example: 'Apuntes U1, ej. resuelto: lim(x→0) sen(3x)/x = 3 · lim(x→0) sen(3x)/(3x) = 3.',
          question: '¿Por qué lim(x→0) sen(x)/x es clave para la Unidad 2?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 17–18 (Teams — Dr. Ramírez)',
          citaMaterial: '"lim(x→0) sen(x)/x = 1 es la base para demostrar que d/dx sen(x) = cos(x)." — Apuntes U1, §1.5.2',
          ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 9',
          level: 2,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'se analiza con' },
        { source: '1', target: '3', label: 'se calcula con' },
        { source: '1', target: '4', label: 'puede generar' },
        { source: '1', target: '5', label: 'conduce a' },
        { source: '1', target: '6', label: 'se formaliza con' },
        { source: '2', target: '7', label: 'se extiende a' },
        { source: '3', target: '8', label: 'incluye' },
      ],
    },
    'Derivadas': {
      nodes: [
        {
          id: '1',
          label: 'Derivadas',
          description: 'f\'(a) mide la razón instantánea de cambio de f en x = a. Es la pendiente de la tangente en ese punto.',
          example: 'Tarea 3, ej. 1: si s(t) = t², entonces v(t) = s\'(t) = 2t — velocidad instantánea.',
          question: '¿Qué relación hay entre derivada y velocidad?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 1–5 (Teams — Dr. Ramírez)',
          citaMaterial: '"La derivada responde: ¿qué tan rápido cambia f en un instante dado?" — Apuntes U2, §2.1',
          ejercicioReferencia: 'Tarea 3: Definición de derivada — ejercicios 1 y 2',
          level: 0,
        },
        {
          id: '2',
          label: 'Definición como límite',
          description: 'f\'(x) = lim(h→0) [f(x+h) − f(x)] / h. Es el cociente incremental cuando h tiende a cero.',
          example: 'Tarea 3, ej. 3: f(x) = x² → f\'(x) = lim(h→0) [(x+h)² − x²]/h = 2x.',
          question: '¿Por qué h debe tender a 0 y no evaluarse en h = 0?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 6–10 (Teams — Dr. Ramírez)',
          citaMaterial: '"f\'(x) = lim(h→0) [f(x+h) − f(x)] / h — definición del cociente incremental." — Apuntes U2, §2.2',
          ejercicioReferencia: 'Tarea 3: Definición de derivada — ejercicios 3, 4 y 5',
          level: 1,
        },
        {
          id: '3',
          label: 'Interpretación geométrica',
          description: 'f\'(a) es la pendiente de la recta tangente a la gráfica de f en el punto (a, f(a)).',
          example: 'Tarea 3, ej. 6: f(x) = x² en x = 2 → pendiente f\'(2) = 4; tangente: y − 4 = 4(x − 2).',
          question: '¿Cómo escribes la ecuación de la tangente con f\'(a)?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 11–14 (Teams — Dr. Ramírez)',
          citaMaterial: '"La tangente en (a, f(a)) tiene pendiente f\'(a)." — Apuntes U2, §2.3',
          ejercicioReferencia: 'Tarea 3: Definición de derivada — ejercicios 6 y 7',
          level: 1,
        },
        {
          id: '4',
          label: 'Regla de la potencia',
          description: 'Si f(x) = xⁿ, entonces f\'(x) = n·xⁿ⁻¹. Aplica a polinomios término a término con la regla de la suma.',
          example: 'Tarea 3, ej. 8: d/dx (x⁴ − 3x² + 5) = 4x³ − 6x.',
          question: '¿Cuál es la derivada de x⁻² usando la regla de la potencia?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 15–18 (Teams — Dr. Ramírez)',
          citaMaterial: '"d/dx [xⁿ] = n·xⁿ⁻¹ — regla básica para polinomios y potencias." — Apuntes U2, §2.4',
          ejercicioReferencia: 'Tarea 3: Definición de derivada — ejercicios 8 y 9',
          level: 1,
        },
        {
          id: '5',
          label: 'Regla de la cadena',
          description: 'Si y = f(g(x)), entonces dy/dx = f\'(g(x)) · g\'(x). Deriva la función exterior evaluada en la interior, multiplicada por la derivada interior.',
          example: 'Tarea 4, ej. 2: d/dx [(2x + 1)⁵] = 5(2x + 1)⁴ · 2 = 10(2x + 1)⁴.',
          question: '¿Cómo identificas la función "interior" y "exterior"?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 25–30 (Teams — Dr. Ramírez)',
          citaMaterial: '"La regla de la cadena conecta la derivada de una composición con las derivadas de sus partes." — Apuntes U2, §2.7',
          ejercicioReferencia: 'Tarea 4: Regla de la cadena — ejercicios 1, 2, 3 y 5',
          level: 1,
        },
        {
          id: '6',
          label: 'Derivadas básicas',
          description: 'sen\'(x) = cos(x), cos\'(x) = −sen(x), (eˣ)\' = eˣ, (ln x)\' = 1/x. Tabla del apunte U2 §2.5.',
          example: 'Tarea 3, ej. 10: d/dx [eˣ + sen x] = eˣ + cos x.',
          question: '¿Cuál es la derivada de ln(2x) usando cadena + ln?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 19–22 (Teams — Dr. Ramírez)',
          citaMaterial: '"Memoriza la tabla de derivadas elementales antes de combinar reglas." — Apuntes U2, §2.5',
          ejercicioReferencia: 'Tarea 3: Definición de derivada — ejercicio 10',
          level: 1,
        },
        {
          id: '7',
          label: 'Aplicaciones',
          description: 'f\'(x) = 0 encuentra candidatos a máximos/mínimos. f\'\'(x) ayuda a clasificar con criterio de la segunda derivada.',
          example: 'Unidad 3, ej. 1: área máxima de rectángulo con perímetro fijo — plantear función y derivar.',
          question: '¿Qué significa f\'(x) cambiando de + a − en x = c?',
          fuente: 'Unidad_3_Aplicaciones_de_la_derivada.pdf, pp. 1–10 (Teams — Dr. Ramírez)',
          citaMaterial: '"Los puntos críticos (f\' = 0) son candidatos a extremos locales." — Apuntes U3, §3.1',
          ejercicioReferencia: 'Tarea 5: Optimización — ejercicios 1 y 2 (cuando esté disponible)',
          level: 2,
        },
        {
          id: '8',
          label: 'Errores comunes',
          description: 'Olvidar multiplicar por g\'(x) en la cadena; confundir producto con composición; derivar (2x)³ como 3(2x)² sin el factor 2.',
          example: 'Tarea 4, ej. 4 corregido: d/dx [sen(2x)] = cos(2x)·2, no solo cos(2x).',
          question: '¿Qué error cometiste en la Tarea 4 según la retroalimentación?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 31–34 (Teams — Dr. Ramírez)',
          citaMaterial: '"Error frecuente: aplicar la regla de la potencia a una composición sin usar la cadena." — Apuntes U2, §2.8',
          ejercicioReferencia: 'Tarea 4: Regla de la cadena — ejercicios 4 y 6 (revisión)',
          level: 2,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'se define como' },
        { source: '1', target: '3', label: 'tiene' },
        { source: '1', target: '4', label: 'usa' },
        { source: '1', target: '5', label: 'requiere' },
        { source: '1', target: '6', label: 'extiende a' },
        { source: '5', target: '7', label: 'permite' },
        { source: '5', target: '8', label: 'genera' },
      ],
    },
    'Continuidad': {
      nodes: [
        {
          id: '1',
          label: 'Continuidad',
          description: 'f es continua en a si se cumplen las tres condiciones: f(a) existe, lim(x→a) f(x) existe y lim(x→a) f(x) = f(a).',
          example: 'Tarea 2, ej. 1: verificar continuidad de f(x) = x² en x = 3 — las tres condiciones se cumplen.',
          question: '¿Qué significa continua en un punto?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 20–23 (Teams — Dr. Ramírez)',
          citaMaterial: '"Continuidad en a: f(a) definida, límite existe y lim f(x) = f(a)." — Apuntes U1, §1.6',
          level: 0,
        },
        {
          id: '2',
          label: 'Tres condiciones',
          description: '(1) f(a) está definida, (2) lim(x→a) f(x) existe, (3) lim(x→a) f(x) = f(a). Si falla alguna, hay discontinuidad.',
          example: 'Tarea 2, ej. 3: clasificar cuál condición falla en cada función dada.',
          question: '¿Cuáles son las tres condiciones?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 20–21 (Teams — Dr. Ramírez)',
          citaMaterial: '"Las tres condiciones deben cumplirse simultáneamente para continuidad." — Apuntes U1, §1.6.1',
          level: 1,
        },
        {
          id: '3',
          label: 'Discontinuidad removible',
          description: 'El límite existe pero f(a) no está definida o f(a) ≠ lim(x→a) f(x). Se puede "reparar" redefiniendo f(a) = lim.',
          example: 'Tarea 2, ej. 4: f(x) = (x² − 4)/(x − 2) en x = 2 — discontinuidad removible, límite = 4.',
          question: '¿Se puede reparar este tipo de discontinuidad?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 22–23 (Teams — Dr. Ramírez)',
          citaMaterial: '"Discontinuidad removible: el límite existe pero hay un hueco en la gráfica." — Apuntes U1, §1.6.2',
          level: 1,
        },
        {
          id: '4',
          label: 'Discontinuidad de salto',
          description: 'Los límites laterales existen pero son distintos. La gráfica tiene un "escalón" en x = a.',
          example: 'Tarea 2, ej. 5: función a trozos con distinto valor por la izquierda y derecha en x = 1.',
          question: '¿Qué pasa con los límites laterales?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 23–24 (Teams — Dr. Ramírez)',
          citaMaterial: '"Salto finito: lim(x→a⁻) f(x) ≠ lim(x→a⁺) f(x)." — Apuntes U1, §1.6.3',
          level: 1,
        },
        {
          id: '5',
          label: 'Teorema del valor intermedio',
          description: 'Si f es continua en [a, b], para todo N entre f(a) y f(b) existe c en (a, b) con f(c) = N.',
          example: 'Apuntes U1: si f(0) = −1 y f(2) = 3, existe c donde f(c) = 0 (cambio de signo).',
          question: '¿Qué garantiza este teorema?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 25–26 (Teams — Dr. Ramírez)',
          citaMaterial: '"Una función continua en un intervalo toma todos los valores intermedios." — Apuntes U1, §1.7',
          level: 1,
        },
        {
          id: '6',
          label: 'Relación con límites',
          description: 'La continuidad es la aplicación del concepto de límite: el valor de la función coincide con su tendencia.',
          example: 'Tarea 2, ej. 6: relacionar el límite calculado en ej. 4 con la redefinición de f(2) = 4.',
          question: '¿Cómo se conecta con límites?',
          fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 20–28 (Teams — Dr. Ramírez)',
          citaMaterial: '"Sin límites no hay continuidad: primero domina límites, luego continuidad." — Apuntes U1, §1.8',
          level: 1,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'requiere' },
        { source: '1', target: '3', label: 'puede tener' },
        { source: '1', target: '4', label: 'puede tener' },
        { source: '1', target: '5', label: 'permite' },
        { source: '1', target: '6', label: 'depende de' },
      ],
    },
    'Reglas de derivación': {
      nodes: [
        {
          id: '1',
          label: 'Reglas de derivación',
          description: 'Atajos algebraicos para derivar sin usar el cociente incremental: suma, producto, cociente y cadena.',
          example: 'Tarea 4: todas las reglas se aplican en ejercicios de composición y productos.',
          question: '¿Por qué memorizar estas reglas?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 15–30 (Teams — Dr. Ramírez)',
          citaMaterial: '"Las reglas de derivación evitan calcular el límite del cociente en cada problema." — Apuntes U2, §2.4–2.7',
          level: 0,
        },
        {
          id: '2',
          label: 'Regla de la suma',
          description: '(f + g)\' = f\' + g\'. La derivada de una suma es la suma de las derivadas.',
          example: '(x³ + sen x)\' = 3x² + cos x.',
          question: '¿Se puede derivar término a término?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 15–16 (Teams — Dr. Ramírez)',
          citaMaterial: '"(f ± g)\' = f\' ± g\' — deriva cada término por separado." — Apuntes U2, §2.4.1',
          level: 1,
        },
        {
          id: '3',
          label: 'Regla del producto',
          description: '(fg)\' = f\'g + fg\'. No derives factor por factor; hay que sumar ambos productos cruzados.',
          example: 'Tarea 4, ej. 7: d/dx [x²·eˣ] = 2x·eˣ + x²·eˣ.',
          question: '¿Cuál es la fórmula del producto?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 20–22 (Teams — Dr. Ramírez)',
          citaMaterial: '"(fg)\' = f\'g + fg\' — cuidado: no es f\'g\'." — Apuntes U2, §2.6',
          level: 1,
        },
        {
          id: '4',
          label: 'Regla del cociente',
          description: '(f/g)\' = (f\'g − fg\') / g². El denominador se eleva al cuadrado; orden en el numerador importa.',
          example: 'Tarea 4, ej. 8: d/dx [x/(x+1)] = [1·(x+1) − x·1] / (x+1)².',
          question: '¿Qué cuidado hay con el denominador?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 22–24 (Teams — Dr. Ramírez)',
          citaMaterial: '"(f/g)\' = (f\'g − fg\') / g² — g debe ser distinto de cero." — Apuntes U2, §2.6.2',
          level: 1,
        },
        {
          id: '5',
          label: 'Regla de la cadena',
          description: 'dy/dx = f\'(g(x)) · g\'(x). Es la regla más evaluada en el parcial según el Dr. Ramírez.',
          example: 'Tarea 4, ej. 2: d/dx [(2x+1)⁵] = 5(2x+1)⁴ · 2.',
          question: '¿Cuándo aplicas la cadena?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 25–30 (Teams — Dr. Ramírez)',
          citaMaterial: '"Si ves una función dentro de otra, usa la cadena." — Apuntes U2, §2.7',
          ejercicioReferencia: 'Tarea 4: Regla de la cadena — ejercicios 1–6',
          level: 1,
        },
        {
          id: '6',
          label: 'Derivadas trigonométricas',
          description: 'sen\' = cos, cos\' = −sen, tan\' = sec². Combinar con cadena para argumentos compuestos.',
          example: 'd/dx [cos(3x)] = −sen(3x) · 3.',
          question: '¿Cuál es la derivada de tan(x)?',
          fuente: 'Unidad_2_La_derivada.pdf, pp. 19–22 (Teams — Dr. Ramírez)',
          citaMaterial: '"Tabla trigonométrica + cadena para argumentos como sen(2x)." — Apuntes U2, §2.5',
          level: 1,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'incluye' },
        { source: '1', target: '3', label: 'incluye' },
        { source: '1', target: '4', label: 'incluye' },
        { source: '1', target: '5', label: 'incluye' },
        { source: '1', target: '6', label: 'extiende a' },
      ],
    },
  },
  fis1: {
    'Cinemática': {
      nodes: [
        {
          id: '1',
          label: 'Cinemática',
          description: 'Estudia el movimiento sin considerar las causas que lo producen.',
          example: 'Describir cómo se mueve un auto sin preguntar por qué acelera.',
          question: '¿Qué diferencia hay con la dinámica?',
          level: 0,
        },
        {
          id: '2',
          label: 'Posición y desplazamiento',
          description: 'La posición indica dónde está un objeto; el desplazamiento, cuánto se movió.',
          example: 'Dar vueltas a la manzana: posición igual, desplazamiento cero.',
          question: '¿Puede el desplazamiento ser cero?',
          level: 1,
        },
        {
          id: '3',
          label: 'Velocidad',
          description: 'Rapidez con dirección; es la derivada de la posición.',
          example: '60 km/h hacia el norte.',
          question: '¿Velocidad y rapidez son lo mismo?',
          level: 1,
        },
        {
          id: '4',
          label: 'Aceleración',
          description: 'Cambio de velocidad en el tiempo; derivada de la velocidad.',
          example: 'Frenar en un semáforo implica aceleración negativa.',
          question: '¿Qué significa aceleración constante?',
          level: 1,
        },
        {
          id: '5',
          label: 'MRUA',
          description: 'Movimiento rectilíneo uniformemente acelerado con ecuaciones clásicas.',
          example: 'Un auto que acelera uniformemente desde el semáforo.',
          question: '¿Cuál ecuación relaciona v, v₀ y a?',
          level: 1,
        },
        {
          id: '6',
          label: 'Caída libre',
          description: 'Movimiento bajo la gravedad con aceleración g ≈ 9.8 m/s².',
          example: 'Soltar una pelota desde un edificio.',
          question: '¿La masa afecta la caída libre?',
          level: 1,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'describe' },
        { source: '1', target: '3', label: 'mide con' },
        { source: '1', target: '4', label: 'incluye' },
        { source: '4', target: '5', label: 'modela con' },
        { source: '5', target: '6', label: 'aplica a' },
      ],
    },
    'Dinámica': {
      nodes: [
        {
          id: '1',
          label: 'Dinámica',
          description: 'Estudia las causas del movimiento: fuerzas y sus efectos.',
          example: 'Empujar un carrito explica por qué se mueve.',
          question: '¿Qué relaciona con la cinemática?',
          level: 0,
        },
        {
          id: '2',
          label: 'Primera ley de Newton',
          description: 'Un cuerpo mantiene su estado si la fuerza neta es cero.',
          example: 'Un libro en reposo sobre la mesa.',
          question: '¿Qué es la inercia?',
          level: 1,
        },
        {
          id: '3',
          label: 'Segunda ley de Newton',
          description: 'F = ma relaciona fuerza, masa y aceleración.',
          example: 'Empujar más fuerte produce más aceleración.',
          question: '¿Cómo se calcula la fuerza neta?',
          level: 1,
        },
        {
          id: '4',
          label: 'Tercera ley de Newton',
          description: 'A toda acción le corresponde una reacción igual y opuesta.',
          example: 'El cohete empuja los gases y estos lo impulsan.',
          question: '¿Las fuerzas de acción-reacción se cancelan?',
          level: 1,
        },
        {
          id: '5',
          label: 'Diagrama de cuerpo libre',
          description: 'Representa todas las fuerzas que actúan sobre un objeto.',
          example: 'Dibujar peso, normal y fricción en un bloque.',
          question: '¿Por qué es útil el DCL?',
          level: 1,
        },
        {
          id: '6',
          label: 'Planos inclinados',
          description: 'Descomponer el peso en componentes paralela y perpendicular.',
          example: 'Un carrito bajando una rampa.',
          question: '¿Qué fuerza impulsa en la rampa?',
          level: 1,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'se basa en' },
        { source: '1', target: '3', label: 'se basa en' },
        { source: '1', target: '4', label: 'se basa en' },
        { source: '3', target: '5', label: 'se analiza con' },
        { source: '5', target: '6', label: 'aplica a' },
      ],
    },
  },
  prog1: {
    'POO básica': {
      nodes: [
        {
          id: '1',
          label: 'POO básica',
          description: 'Paradigma que organiza el código en objetos con datos y comportamiento.',
          example: 'Un objeto Auto tiene color (dato) y acelerar() (comportamiento).',
          question: '¿Qué ventaja tiene sobre programación procedural?',
          level: 0,
        },
        {
          id: '2',
          label: 'Clase',
          description: 'Plantilla o molde para crear objetos.',
          example: 'La clase Estudiante define nombre y matrícula.',
          question: '¿Clase y objeto son lo mismo?',
          level: 1,
        },
        {
          id: '3',
          label: 'Objeto',
          description: 'Instancia concreta creada a partir de una clase.',
          example: 'estudiante1 = new Estudiante("Ana", "2021001").',
          question: '¿Cómo se crea un objeto?',
          level: 1,
        },
        {
          id: '4',
          label: 'Atributos',
          description: 'Variables que almacenan el estado del objeto.',
          example: 'nombre, edad, promedio en un Estudiante.',
          question: '¿Dónde viven los atributos?',
          level: 1,
        },
        {
          id: '5',
          label: 'Métodos',
          description: 'Funciones que definen lo que el objeto puede hacer.',
          example: 'calcularPromedio() en la clase Estudiante.',
          question: '¿Qué diferencia hay con una función suelta?',
          level: 1,
        },
        {
          id: '6',
          label: 'Encapsulamiento',
          description: 'Ocultar detalles internos y exponer solo lo necesario.',
          example: 'Getters y setters para acceder a atributos privados.',
          question: '¿Por qué usar private?',
          level: 1,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'define con' },
        { source: '2', target: '3', label: 'genera' },
        { source: '3', target: '4', label: 'tiene' },
        { source: '3', target: '5', label: 'tiene' },
        { source: '1', target: '6', label: 'protege con' },
      ],
    },
    'Herencia': {
      nodes: [
        {
          id: '1',
          label: 'Herencia',
          description: 'Mecanismo para reutilizar código creando clases hijas de una clase padre.',
          example: 'Perro y Gato heredan de Animal.',
          question: '¿Qué hereda una subclase?',
          level: 0,
        },
        {
          id: '2',
          label: 'Clase padre (superclase)',
          description: 'Clase base que define atributos y métodos comunes.',
          example: 'Animal con comer() y dormir().',
          question: '¿Qué es una superclase?',
          level: 1,
        },
        {
          id: '3',
          label: 'Clase hija (subclase)',
          description: 'Extiende la superclase y puede añadir o modificar comportamiento.',
          example: 'Perro extends Animal con ladrar().',
          question: '¿Puede una subclase tener métodos nuevos?',
          level: 1,
        },
        {
          id: '4',
          label: 'Sobreescritura',
          description: 'Redefinir un método de la clase padre en la hija.',
          example: 'Perro.sonido() devuelve "guau" en lugar del genérico.',
          question: '¿Cuándo usar @Override?',
          level: 1,
        },
        {
          id: '5',
          label: 'Constructores',
          description: 'Las subclases deben llamar al constructor del padre con super().',
          example: 'super(nombre) en el constructor de Perro.',
          question: '¿Qué hace super()?',
          level: 1,
        },
        {
          id: '6',
          label: 'Relación es-un',
          description: 'Un Perro es un Animal; la herencia modela esta relación.',
          example: 'Un Cuadrado es un Rectángulo (con cuidado en diseño).',
          question: '¿Cuándo tiene sentido heredar?',
          level: 1,
        },
      ],
      edges: [
        { source: '1', target: '2', label: 'parte de' },
        { source: '1', target: '3', label: 'crea' },
        { source: '3', target: '4', label: 'puede' },
        { source: '3', target: '5', label: 'requiere' },
        { source: '1', target: '6', label: 'modela' },
      ],
    },
  },
};

// ── Conceptual map node expansions (demo fallback) ────────────────────────────
// Edges use targetIndex (0-based into nodes[]) — source is always the parent node.

export const EXPANSIONES_MAPA_DEMO = {
  calc1: {
    'Límites': {
      '1': {
        nodes: [
          {
            label: 'Sustitución directa',
            description: 'Si f es continua en a, entonces lim(x→a) f(x) = f(a). Aplica cuando no hay 0/0 ni ∞/∞.',
            example: 'Tarea 1, ej. 1: lim(x→2) (3x − 1) = 3(2) − 1 = 5.',
            question: '¿Cuándo puedes sustituir x = a directamente?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 4–5 (Teams — Dr. Ramírez)',
            citaMaterial: '"Si f es continua en a, el límite se obtiene evaluando f(a)." — Apuntes U1, §1.2',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 1 y 2',
          },
          {
            label: 'Límite inexistente',
            description: 'Ocurre cuando los límites laterales difieren, o cuando f(x) crece sin límite al acercarse a a.',
            example: 'Tarea 1, ej. 3: lim(x→0) |x|/x no existe porque los laterales son −1 y +1.',
            question: '¿Qué condición falla si el límite no existe?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 8–9 (Teams — Dr. Ramírez)',
            citaMaterial: '"El límite no existe si los laterales difieren o si la función diverge." — Apuntes U1, §1.3.2',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 3',
          },
          {
            label: 'Notación lim',
            description: 'lim(x→a) f(x) = L se lee: el límite de f(x) cuando x tiende a a es L.',
            example: 'Apuntes U1: lim(x→3) (x² − 9)/(x − 3) = lim(x→3) (x + 3) = 6.',
            question: '¿Qué representa L en la notación?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 1–3 (Teams — Dr. Ramírez)',
            citaMaterial: '"Usamos lim(x→a) para indicar acercamiento a a sin alcanzar necesariamente a." — Apuntes U1, §1.1',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 2',
          },
        ],
        edges: [
          { targetIndex: 0, label: 'incluye' },
          { targetIndex: 1, label: 'puede no existir' },
          { targetIndex: 2, label: 'se expresa con' },
        ],
      },
      '2': {
        nodes: [
          {
            label: 'Notación x→a⁻ y x→a⁺',
            description: 'x→a⁻ significa acercarse por la izquierda; x→a⁺ por la derecha. Se escribe con superíndice − o +.',
            example: 'Apuntes U1: lim(x→0⁻) f(x) vs lim(x→0⁺) f(x) en funciones a trozos.',
            question: '¿Cómo distingues izquierda de derecha en la notación?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 8–9 (Teams — Dr. Ramírez)',
            citaMaterial: '"El superíndice − indica aproximación por valores menores que a." — Apuntes U1, §1.3.1',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 5',
          },
          {
            label: 'Función a trozos',
            description: 'En funciones definidas distinto a cada lado de a, hay que calcular cada límite lateral por separado.',
            example: 'Tarea 1, ej. 7: f(x) = { x+1 si x<2; 3 si x≥2 } → laterales distintos en x=2.',
            question: '¿Por qué las funciones a trozos requieren laterales?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 10–11 (Teams — Dr. Ramírez)',
            citaMaterial: '"En un punto de cambio de fórmula, evalúa cada tramo por separado." — Apuntes U1, §1.3.3',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 5 y 7',
          },
          {
            label: 'Criterio de existencia',
            description: 'lim(x→a) f(x) existe ⟺ lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = L (mismo valor finito).',
            example: 'Tarea 1, ej. 3: |x|/x en 0 → −1 ≠ +1, límite no existe.',
            question: '¿Qué deben cumplir ambos laterales?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 9–10 (Teams — Dr. Ramírez)',
            citaMaterial: '"Existencia del límite ⟺ laterales iguales y finitos." — Apuntes U1, §1.3',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 3 y 6',
          },
        ],
        edges: [
          { targetIndex: 0, label: 'usa' },
          { targetIndex: 1, label: 'aplica a' },
          { targetIndex: 2, label: 'verifica con' },
        ],
      },
      '3': {
        nodes: [
          {
            label: 'Límite de suma',
            description: 'lim(f + g) = lim f + lim g, siempre que ambos límites existan.',
            example: 'Tarea 1, ej. 4: lim(x→1) (x² + 2x) = lim x² + lim 2x = 1 + 2 = 3.',
            question: '¿Puedes separar el límite de una suma?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 12–13 (Teams — Dr. Ramírez)',
            citaMaterial: '"La suma de límites es el límite de la suma (si existen)." — Apuntes U1, §1.4.1',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 4',
          },
          {
            label: 'Límite de producto',
            description: 'lim(f · g) = lim f · lim g, cuando ambos límites existen.',
            example: 'Tarea 1, ej. 6: lim(x→0) x·sen(x) = 0 · 0 = 0 (usando lim sen(x)/x = 1).',
            question: '¿Cómo calculas lim(x→0) x·sen(x)?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 13–14 (Teams — Dr. Ramírez)',
            citaMaterial: '"El producto de límites es el límite del producto." — Apuntes U1, §1.4.2',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 6',
          },
          {
            label: 'Límite de cociente',
            description: 'lim(f/g) = lim f / lim g, si lim g ≠ 0.',
            example: 'Tarea 1, ej. 8: lim(x→2) (x²−4)/(x−2) — primero simplificar, no aplicar cociente directo.',
            question: '¿Cuándo NO puedes usar la regla del cociente directamente?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 14–15 (Teams — Dr. Ramírez)',
            citaMaterial: '"Solo divide límites si el límite del denominador no es cero." — Apuntes U1, §1.4.3',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 8',
          },
        ],
        edges: [
          { targetIndex: 0, label: 'incluye' },
          { targetIndex: 1, label: 'incluye' },
          { targetIndex: 2, label: 'incluye' },
        ],
      },
      '4': {
        nodes: [
          {
            label: 'Factorización (0/0)',
            description: 'Ante 0/0, factoriza numerador y denominador para cancelar el factor que causa la indeterminación.',
            example: 'Tarea 1, ej. 8: (x²−4)/(x−2) = (x+2)(x−2)/(x−2) = x+2 → límite 4.',
            question: '¿Qué buscas al factorizar en un límite?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 16–17 (Teams — Dr. Ramírez)',
            citaMaterial: '"Factoriza y simplifica antes de sustituir cuando obtienes 0/0." — Apuntes U1, §1.5.1',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicios 8 y 9',
          },
          {
            label: 'Racionalización',
            description: 'Multiplica por el conjugado para eliminar raíces en numerador o denominador.',
            example: 'Apuntes U1: lim(x→0) (√(1+x)−1)/x → multiplicar por (√(1+x)+1)/(√(1+x)+1).',
            question: '¿Cuándo usas el conjugado?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 17–18 (Teams — Dr. Ramírez)',
            citaMaterial: '"La racionalización elimina raíces cuadradas en indeterminaciones." — Apuntes U1, §1.5.2',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 10',
          },
          {
            label: 'lim sen(x)/x = 1',
            description: 'Límite fundamental: lim(x→0) sen(x)/x = 1. Base para límites trigonométricos.',
            example: 'Apuntes U1: lim(x→0) sen(3x)/x = 3·lim(x→0) sen(3x)/(3x) = 3.',
            question: '¿Por qué este límite es especial?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 17–18 (Teams — Dr. Ramírez)',
            citaMaterial: '"lim(x→0) sen(x)/x = 1 — memoriza este resultado." — Apuntes U1, §1.5.2',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 9',
          },
        ],
        edges: [
          { targetIndex: 0, label: 'resuelve con' },
          { targetIndex: 1, label: 'resuelve con' },
          { targetIndex: 2, label: 'usa' },
        ],
      },
      '5': {
        nodes: [
          {
            label: 'Tres condiciones',
            description: '(1) f(a) definida, (2) lim(x→a) f(x) existe, (3) lim(x→a) f(x) = f(a). Las tres son necesarias.',
            example: 'Tarea 2, ej. 1: verificar las tres condiciones para f(x) = x² en x = 3.',
            question: '¿Cuál condición falla en una discontinuidad de salto?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 20–21 (Teams — Dr. Ramírez)',
            citaMaterial: '"Continuidad exige las tres condiciones simultáneamente." — Apuntes U1, §1.6.1',
            ejercicioReferencia: 'Tarea 2: Continuidad — ejercicio 1',
          },
          {
            label: 'Discontinuidad removible',
            description: 'El límite existe pero f(a) no está definida o f(a) ≠ lim. Se repara definiendo f(a) = lim.',
            example: 'Tarea 2, ej. 4: (x²−4)/(x−2) en x=2 — límite 4, f(2) no definida → removible.',
            question: '¿Cómo reparas una discontinuidad removible?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 22–23 (Teams — Dr. Ramírez)',
            citaMaterial: '"Discontinuidad removible: basta redefinir f(a) = lim f(x)." — Apuntes U1, §1.6.2',
            ejercicioReferencia: 'Tarea 2: Continuidad — ejercicio 4',
          },
          {
            label: 'Discontinuidad de salto',
            description: 'Laterales existen pero son distintos. No se puede reparar redefiniendo un solo punto.',
            example: 'Tarea 2, ej. 5: función a trozos con valores distintos a izquierda y derecha de x=1.',
            question: '¿Se puede eliminar un salto redefiniendo f(a)?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 23–24 (Teams — Dr. Ramírez)',
            citaMaterial: '"En un salto finito, los laterales difieren — no es removible." — Apuntes U1, §1.6.3',
            ejercicioReferencia: 'Tarea 2: Continuidad — ejercicio 5',
          },
        ],
        edges: [
          { targetIndex: 0, label: 'requiere' },
          { targetIndex: 1, label: 'tipo de' },
          { targetIndex: 2, label: 'tipo de' },
        ],
      },
      '6': {
        nodes: [
          {
            label: 'Rol de ε',
            description: 'ε > 0 es la tolerancia: qué tan cerca debe estar f(x) del límite L (|f(x) − L| < ε).',
            example: 'Apuntes U1: si quieres error menor a 0.1, encuentra δ tal que |f(x)−7| < 0.1.',
            question: '¿Qué controla ε en la definición?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 24–25 (Teams — Dr. Ramírez)',
            citaMaterial: '"ε mide la distancia máxima permitida entre f(x) y L." — Apuntes U1, §1.7.1',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 12',
          },
          {
            label: 'Rol de δ',
            description: 'δ > 0 es el radio alrededor de a: si |x − a| < δ, entonces |f(x) − L| < ε.',
            example: 'Demostración U1: lim(x→3)(2x+1)=7 → dado ε, elige δ = ε/2.',
            question: '¿Cómo se relacionan ε y δ?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 25–26 (Teams — Dr. Ramírez)',
            citaMaterial: '"δ depende de ε: a menor ε, suele requerirse menor δ." — Apuntes U1, §1.7.2',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 12',
          },
          {
            label: 'Ejemplo lim(2x+1)=7',
            description: 'Demostración completa en apuntes: |2x+1−7| = 2|x−3| < ε ⟹ |x−3| < ε/2, toma δ = ε/2.',
            example: 'Apuntes U1 §1.7: plantilla para demostrar límites lineales con ε-δ.',
            question: '¿Por qué δ = ε/2 en este caso?',
            fuente: 'Unidad_1_Limites_y_continuidad.pdf, pp. 26–27 (Teams — Dr. Ramírez)',
            citaMaterial: '"Para f(x)=2x+1 en x=3, δ=ε/2 satisface la definición." — Apuntes U1, §1.7.3',
            ejercicioReferencia: 'Tarea 1: Límites laterales — ejercicio 12',
          },
        ],
        edges: [
          { targetIndex: 0, label: 'define' },
          { targetIndex: 1, label: 'define' },
          { targetIndex: 2, label: 'ilustra' },
        ],
      },
    },
  },
};

/**
 * @param {string} materiaId
 * @param {string} tema
 * @param {string} nodoId
 * @returns {{ nodes: object[], edges: Array<{ targetIndex: number, label: string }> } | null}
 */
export function getExpansionMapaDemo(materiaId, tema, nodoId) {
  return EXPANSIONES_MAPA_DEMO[materiaId]?.[tema]?.[nodoId] ?? null;
}

/**
 * @param {string} materiaId
 * @param {string} tema
 * @returns {{ nodes: object[], edges: object[] } | null}
 */
export function getMapaConceptualDemo(materiaId, tema) {
  const mapas = MAPAS_CONCEPTUALES_DEMO[materiaId];
  if (!mapas) return null;
  return mapas[tema] ?? null;
}

// ── Detected risk factors per student (shown as chips in dashboard) ───────────

export const FACTORES_RIESGO = {
  "2021630001": [
    "Declive de 2.6 puntos en calificación",
    "3 faltas en las últimas 2 semanas",
    "5 tareas sin entregar",
    "Calificación por debajo del mínimo aprobatorio",
  ],
  "2021630042": [
    "Declive de 2.4 puntos en calificación",
    "3 faltas consecutivas",
    "Última tarea no entregada",
    "Trabaja tiempo parcial",
    "Bajo rendimiento parcial anterior",
  ],
  "2021630055": [
    "Declive de 1.7 puntos",
    "2 faltas en últimas 2 semanas",
    "4 tareas sin entregar",
  ],
  "2021630120": [
    "Declive de 3.3 puntos — crítico",
    "4 faltas consecutivas",
    "Solo 3 de 7 tareas entregadas",
  ],
  "2021630200": [
    "Declive de 2.5 puntos",
    "3 inasistencias esta semana",
    "50% de tareas sin entregar",
  ],
};

// ── Per-task grades by topic (for dashboard charts) ──────────────────────────

export const CALIFICACIONES_POR_TAREA = {
  "2021630042": {
    calc1: [
      { id: 1, tema: "Límites", nombre: "Tarea 1: Límites laterales", calificacion: 7.5, entregada: true },
      { id: 2, tema: "Continuidad", nombre: "Tarea 2: Continuidad", calificacion: 6.8, entregada: true },
      { id: 3, tema: "Derivadas", nombre: "Tarea 3: Definición de derivada", calificacion: 5.2, entregada: true },
      { id: 4, tema: "Reglas de derivación", nombre: "Tarea 4: Regla de la cadena", calificacion: 4.0, entregada: true },
      { id: 5, tema: "Aplicaciones", nombre: "Tarea 5: Optimización", calificacion: null, entregada: false },
      { id: 6, tema: "Aplicaciones", nombre: "Tarea 6: Teorema valor medio", calificacion: null, entregada: false },
      { id: 7, tema: "Func. trascendentes", nombre: "Tarea 7: Derivadas trig.", calificacion: 3.5, entregada: true },
      { id: 8, tema: "Func. trascendentes", nombre: "Tarea 8: Derivadas exp.", calificacion: null, entregada: false },
    ],
  },
  "2021630001": {
    calc1: [
      { id: 1, tema: "Límites", nombre: "Tarea 1: Límites laterales", calificacion: 8.0, entregada: true },
      { id: 2, tema: "Continuidad", nombre: "Tarea 2: Continuidad", calificacion: 7.2, entregada: true },
      { id: 3, tema: "Derivadas", nombre: "Tarea 3: Definición de derivada", calificacion: 6.5, entregada: true },
      { id: 4, tema: "Reglas de derivación", nombre: "Tarea 4: Regla de la cadena", calificacion: 5.8, entregada: true },
      { id: 5, tema: "Aplicaciones", nombre: "Tarea 5: Optimización", calificacion: null, entregada: false },
      { id: 6, tema: "Aplicaciones", nombre: "Tarea 6: Teorema valor medio", calificacion: null, entregada: false },
      { id: 7, tema: "Func. trascendentes", nombre: "Tarea 7: Derivadas trig.", calificacion: null, entregada: false },
      { id: 8, tema: "Func. trascendentes", nombre: "Tarea 8: Derivadas exp.", calificacion: null, entregada: false },
    ],
    fis1: [
      { id: 1, tema: "Cinemática", nombre: "Tarea 1: MRU y MRUA", calificacion: 7.0, entregada: true },
      { id: 2, tema: "Cinemática", nombre: "Tarea 2: Caída libre", calificacion: 6.5, entregada: true },
      { id: 3, tema: "Dinámica", nombre: "Tarea 3: Leyes de Newton", calificacion: 6.0, entregada: true },
      { id: 4, tema: "Dinámica", nombre: "Tarea 4: Planos inclinados", calificacion: 5.5, entregada: true },
      { id: 5, tema: "Trabajo y energía", nombre: "Tarea 5: Energía cinética", calificacion: null, entregada: false },
      { id: 6, tema: "Trabajo y energía", nombre: "Tarea 6: Conservación", calificacion: null, entregada: false },
      { id: 7, tema: "Cantidad de movimiento", nombre: "Tarea 7: Impulso", calificacion: null, entregada: false },
    ],
  },
  "2021630055": {
    calc1: [
      { id: 1, tema: "Límites", nombre: "Tarea 1: Límites laterales", calificacion: 7.0, entregada: true },
      { id: 2, tema: "Continuidad", nombre: "Tarea 2: Continuidad", calificacion: 6.5, entregada: true },
      { id: 3, tema: "Derivadas", nombre: "Tarea 3: Definición de derivada", calificacion: 5.5, entregada: true },
      { id: 4, tema: "Reglas de derivación", nombre: "Tarea 4: Regla de la cadena", calificacion: 5.0, entregada: true },
      { id: 5, tema: "Aplicaciones", nombre: "Tarea 5: Optimización", calificacion: 4.8, entregada: true },
      { id: 6, tema: "Aplicaciones", nombre: "Tarea 6: Teorema valor medio", calificacion: null, entregada: false },
      { id: 7, tema: "Func. trascendentes", nombre: "Tarea 7: Derivadas trig.", calificacion: null, entregada: false },
      { id: 8, tema: "Func. trascendentes", nombre: "Tarea 8: Derivadas exp.", calificacion: null, entregada: false },
    ],
  },
  "2021630120": {
    fis1: [
      { id: 1, tema: "Cinemática", nombre: "Tarea 1: MRU y MRUA", calificacion: 7.5, entregada: true },
      { id: 2, tema: "Cinemática", nombre: "Tarea 2: Caída libre", calificacion: 6.0, entregada: true },
      { id: 3, tema: "Dinámica", nombre: "Tarea 3: Leyes de Newton", calificacion: 5.0, entregada: true },
      { id: 4, tema: "Dinámica", nombre: "Tarea 4: Planos inclinados", calificacion: 3.8, entregada: true },
      { id: 5, tema: "Trabajo y energía", nombre: "Tarea 5: Energía cinética", calificacion: null, entregada: false },
      { id: 6, tema: "Trabajo y energía", nombre: "Tarea 6: Conservación", calificacion: null, entregada: false },
      { id: 7, tema: "Cantidad de movimiento", nombre: "Tarea 7: Impulso", calificacion: null, entregada: false },
    ],
  },
  "2021630200": {
    prog1: [
      { id: 1, tema: "POO básica", nombre: "Tarea 1: Clases y objetos", calificacion: 7.0, entregada: true },
      { id: 2, tema: "Encapsulamiento", nombre: "Tarea 2: Getters y setters", calificacion: 6.2, entregada: true },
      { id: 3, tema: "Herencia", nombre: "Tarea 3: Herencia simple", calificacion: 5.0, entregada: true },
      { id: 4, tema: "Polimorfismo", nombre: "Tarea 4: Sobrecarga", calificacion: null, entregada: false },
      { id: 5, tema: "Polimorfismo", nombre: "Tarea 5: Interfaces", calificacion: null, entregada: false },
      { id: 6, tema: "Estructuras de datos", nombre: "Tarea 6: Listas enlazadas", calificacion: null, entregada: false },
    ],
  },
};

// ── Weekly attendance breakdown ──────────────────────────────────────────────

export const ASISTENCIA_SEMANAL = {
  "2021630042": {
    calc1: [
      { semana: "Sem 1", asistio: 3, total: 3 },
      { semana: "Sem 2", asistio: 3, total: 3 },
      { semana: "Sem 3", asistio: 2, total: 3 },
      { semana: "Sem 4", asistio: 1, total: 3 },
      { semana: "Sem 5", asistio: 0, total: 3 },
    ],
  },
  "2021630001": {
    calc1: [
      { semana: "Sem 1", asistio: 3, total: 3 },
      { semana: "Sem 2", asistio: 2, total: 3 },
      { semana: "Sem 3", asistio: 2, total: 3 },
      { semana: "Sem 4", asistio: 2, total: 3 },
      { semana: "Sem 5", asistio: 1, total: 3 },
    ],
    fis1: [
      { semana: "Sem 1", asistio: 3, total: 3 },
      { semana: "Sem 2", asistio: 3, total: 3 },
      { semana: "Sem 3", asistio: 2, total: 3 },
      { semana: "Sem 4", asistio: 2, total: 3 },
      { semana: "Sem 5", asistio: 2, total: 3 },
    ],
  },
  "2021630055": {
    calc1: [
      { semana: "Sem 1", asistio: 3, total: 3 },
      { semana: "Sem 2", asistio: 2, total: 3 },
      { semana: "Sem 3", asistio: 2, total: 3 },
      { semana: "Sem 4", asistio: 2, total: 3 },
      { semana: "Sem 5", asistio: 1, total: 3 },
    ],
  },
  "2021630120": {
    fis1: [
      { semana: "Sem 1", asistio: 3, total: 3 },
      { semana: "Sem 2", asistio: 2, total: 3 },
      { semana: "Sem 3", asistio: 1, total: 3 },
      { semana: "Sem 4", asistio: 1, total: 3 },
      { semana: "Sem 5", asistio: 0, total: 3 },
    ],
  },
  "2021630200": {
    prog1: [
      { semana: "Sem 1", asistio: 3, total: 3 },
      { semana: "Sem 2", asistio: 2, total: 3 },
      { semana: "Sem 3", asistio: 2, total: 3 },
      { semana: "Sem 4", asistio: 1, total: 3 },
      { semana: "Sem 5", asistio: 1, total: 3 },
    ],
  },
};

// ── Group average grade trend (for comparison line) ──────────────────────────

export const PROMEDIO_GRUPO_SEMANAL = {
  calc1: [
    { semana: "Sem 1", promedio: 7.8 },
    { semana: "Sem 2", promedio: 7.5 },
    { semana: "Sem 3", promedio: 7.2 },
    { semana: "Sem 4", promedio: 7.0 },
    { semana: "Sem 5", promedio: 6.8 },
  ],
  fis1: [
    { semana: "Sem 1", promedio: 7.6 },
    { semana: "Sem 2", promedio: 7.4 },
    { semana: "Sem 3", promedio: 7.1 },
    { semana: "Sem 4", promedio: 6.9 },
    { semana: "Sem 5", promedio: 6.7 },
  ],
  prog1: [
    { semana: "Sem 1", promedio: 7.9 },
    { semana: "Sem 2", promedio: 7.6 },
    { semana: "Sem 3", promedio: 7.3 },
    { semana: "Sem 4", promedio: 7.0 },
    { semana: "Sem 5", promedio: 6.9 },
  ],
};

// ── Grade trend data for LineChart ───────────────────────────────────────────

export const TENDENCIA_CALIFICACIONES = {
  "2021630001": [
    { semana: "Sem 1", calificacion: 8.0 },
    { semana: "Sem 2", calificacion: 7.8 },
    { semana: "Sem 3", calificacion: 7.0 },
    { semana: "Sem 4", calificacion: 5.9 },
    { semana: "Sem 5", calificacion: 5.2 },
  ],
  "2021630042": [
    { semana: "Sem 1", calificacion: 7.5 },
    { semana: "Sem 2", calificacion: 7.2 },
    { semana: "Sem 3", calificacion: 6.1 },
    { semana: "Sem 4", calificacion: 5.4 },
    { semana: "Sem 5", calificacion: 4.8 },
  ],
  "2021630120": [
    { semana: "Sem 1", calificacion: 8.0 },
    { semana: "Sem 2", calificacion: 7.8 },
    { semana: "Sem 3", calificacion: 6.5 },
    { semana: "Sem 4", calificacion: 5.2 },
    { semana: "Sem 5", calificacion: 4.5 },
  ],
  "2021630055": [
    { semana: "Sem 1", calificacion: 7.2 },
    { semana: "Sem 2", calificacion: 6.8 },
    { semana: "Sem 3", calificacion: 6.2 },
    { semana: "Sem 4", calificacion: 5.6 },
    { semana: "Sem 5", calificacion: 5.1 },
  ],
  "2021630200": [
    { semana: "Sem 1", calificacion: 7.8 },
    { semana: "Sem 2", calificacion: 7.0 },
    { semana: "Sem 3", calificacion: 6.2 },
    { semana: "Sem 4", calificacion: 5.5 },
    { semana: "Sem 5", calificacion: 5.0 },
  ],
};

// ── Helper functions ─────────────────────────────────────────────────────────

const DEFAULT_TAREAS = [
  { id: 1, tema: "Unidad 1", nombre: "Tarea 1", calificacion: 7.0, entregada: true },
  { id: 2, tema: "Unidad 2", nombre: "Tarea 2", calificacion: 6.5, entregada: true },
  { id: 3, tema: "Unidad 3", nombre: "Tarea 3", calificacion: 6.0, entregada: true },
  { id: 4, tema: "Unidad 4", nombre: "Tarea 4", calificacion: null, entregada: false },
];

const DEFAULT_ASISTENCIA = [
  { semana: "Sem 1", asistio: 3, total: 3 },
  { semana: "Sem 2", asistio: 2, total: 3 },
  { semana: "Sem 3", asistio: 2, total: 3 },
  { semana: "Sem 4", asistio: 2, total: 3 },
  { semana: "Sem 5", asistio: 2, total: 3 },
];

/**
 * Returns student data by boleta across all subjects.
 */
export function getAlumnoByBoleta(boleta) {
  for (const alumnos of Object.values(ALUMNOS_POR_MATERIA)) {
    const alumno = alumnos.find((a) => a.boleta === boleta);
    if (alumno) return alumno;
  }
  return null;
}

/**
 * Returns summarized questionnaire results for a student boleta.
 */
export function getResultadoCuestionario(boleta) {
  if (!boleta) return null;
  return RESULTADOS_CUESTIONARIO[boleta] ?? null;
}

/**
 * Returns student data for a specific subject enrollment.
 */
export function getAlumnoEnMateria(boleta, materiaId) {
  const alumnos = ALUMNOS_POR_MATERIA[materiaId] ?? [];
  return alumnos.find((a) => a.boleta === boleta) ?? null;
}

/**
 * Returns the first subject id where the student is enrolled.
 */
export function getMateriaIdByBoleta(boleta) {
  for (const [materiaId, alumnos] of Object.entries(ALUMNOS_POR_MATERIA)) {
    if (alumnos.some((a) => a.boleta === boleta)) return materiaId;
  }
  return null;
}

/**
 * Returns professor-side subject by id.
 */
export function getMateriaById(id) {
  return MATERIAS_PROFESOR.find((m) => m.id === id) ?? null;
}

/**
 * Returns student-side subject by id.
 */
export function getMateriaAlumnoById(id) {
  return MATERIAS_ALUMNO.find((m) => m.id === id) ?? null;
}

/**
 * Aggregates risk counts for a subject from ALUMNOS_POR_MATERIA.
 * en_riesgo = alto + medio (students requiring attention).
 */
export function getResumenRiesgoMateria(materiaId) {
  const alumnos = ALUMNOS_POR_MATERIA[materiaId] ?? [];
  const alto = alumnos.filter((a) => a.nivel_riesgo === 'alto').length;
  const medio = alumnos.filter((a) => a.nivel_riesgo === 'medio').length;
  const bajo = alumnos.filter((a) => a.nivel_riesgo === 'bajo').length;
  const total = alumnos.length;
  const en_riesgo = alto + medio;

  return { alto, medio, bajo, total, en_riesgo };
}

/**
 * Returns grade trend data for a student boleta, or a default array if not found.
 */
export function getTendencia(boleta) {
  return (
    TENDENCIA_CALIFICACIONES[boleta] ?? [
      { semana: "Sem 1", calificacion: 7.0 },
      { semana: "Sem 5", calificacion: 6.0 },
    ]
  );
}

/**
 * Returns risk factors for a student boleta, or an empty array.
 */
export function getFactoresRiesgo(boleta) {
  return FACTORES_RIESGO[boleta] ?? [];
}

/**
 * Returns per-task grades for a student in a subject.
 */
export function getCalificacionesPorTarea(boleta, materiaId) {
  const resolvedMateriaId = materiaId ?? getMateriaIdByBoleta(boleta);
  return CALIFICACIONES_POR_TAREA[boleta]?.[resolvedMateriaId] ?? DEFAULT_TAREAS;
}

/**
 * Returns weekly attendance for a student in a subject.
 */
export function getAsistenciaSemanal(boleta, materiaId) {
  const resolvedMateriaId = materiaId ?? getMateriaIdByBoleta(boleta);
  return ASISTENCIA_SEMANAL[boleta]?.[resolvedMateriaId] ?? DEFAULT_ASISTENCIA;
}

/**
 * Returns group average grade trend for a subject.
 */
export function getPromedioGrupoSemanal(materiaId) {
  return PROMEDIO_GRUPO_SEMANAL[materiaId] ?? PROMEDIO_GRUPO_SEMANAL.calc1;
}

/**
 * Aggregates task grades by topic for radar chart (0 if no delivered tasks).
 */
export function getDominioPorTema(boleta, materiaId) {
  const tareas = getCalificacionesPorTarea(boleta, materiaId);
  const porTema = {};

  for (const tarea of tareas) {
    if (!porTema[tarea.tema]) {
      porTema[tarea.tema] = { suma: 0, count: 0 };
    }
    if (tarea.entregada && tarea.calificacion != null) {
      porTema[tarea.tema].suma += tarea.calificacion;
      porTema[tarea.tema].count += 1;
    }
  }

  return Object.entries(porTema).map(([tema, { suma, count }]) => ({
    tema,
    promedio: count > 0 ? Math.round((suma / count) * 10) / 10 : 0,
  }));
}

/**
 * Counts delivery status for donut chart.
 */
export function getEstadoEntregas(boleta, materiaId) {
  const tareas = getCalificacionesPorTarea(boleta, materiaId);
  let aprobadas = 0;
  let reprobadas = 0;
  let noEntregadas = 0;

  for (const tarea of tareas) {
    if (!tarea.entregada) {
      noEntregadas += 1;
    } else if (tarea.calificacion >= 6) {
      aprobadas += 1;
    } else {
      reprobadas += 1;
    }
  }

  return { aprobadas, reprobadas, noEntregadas, total: tareas.length };
}

/**
 * Merges student trend with group average for comparison line chart.
 */
export function getTendenciaConGrupo(boleta, materiaId) {
  const alumnoTrend = getTendencia(boleta);
  const grupoTrend = getPromedioGrupoSemanal(materiaId);

  return alumnoTrend.map((point, index) => ({
    semana: point.semana,
    calificacion: point.calificacion,
    promedioGrupo: grupoTrend[index]?.promedio ?? null,
  }));
}
