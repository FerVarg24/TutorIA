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
  },
  {
    id: "fis1",
    nombre: "Física I",
    estado: "morado",
    profesor: "Ing. López",
    creditos: 5,
  },
  {
    id: "prog1",
    nombre: "Programación OO",
    estado: "verde",
    profesor: "M.C. Torres",
    creditos: 6,
  },
];

// ── Questionnaire responses (professor follow-up flow) ────────────────────────

export const RESPUESTAS_CUESTIONARIO = {
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
};

// ── Helper functions ─────────────────────────────────────────────────────────

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
