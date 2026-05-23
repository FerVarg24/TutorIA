export const USUARIOS_PROFESOR = [
  {
    correo: 'profesor@ipn.mx',
    password: 'demo1234',
    nombre: 'Dr. Carlos Ramírez',
  },
];

export const USUARIOS_ALUMNO = [
  {
    boleta: '2021630001',
    password: 'demo1234',
    nombre: 'María González López',
  },
];

export const MATERIAS_PROFESOR = [
  {
    id: 'calc1',
    nombre: 'Cálculo Diferencial',
    grupo: '3BV1',
    alumnos: 38,
    en_riesgo: 7,
  },
  {
    id: 'fis1',
    nombre: 'Física I',
    grupo: '3BV2',
    alumnos: 42,
    en_riesgo: 3,
  },
  {
    id: 'prog1',
    nombre: 'Programación Orientada a Objetos',
    grupo: '4BV1',
    alumnos: 35,
    en_riesgo: 5,
  },
];

export const ALUMNOS_POR_MATERIA = {
  calc1: [
    {
      boleta: '2021630042',
      nombre: 'Juan Pérez García',
      asistencia: '60%',
      tareas_entregadas: '4/8',
      calificacion_actual: 4.8,
      calificacion_parcial_anterior: 7.2,
      declive: -2.4,
      nivel_riesgo: 'alto',
    },
    {
      boleta: '2021630015',
      nombre: 'Ana Martínez Ruiz',
      asistencia: '75%',
      tareas_entregadas: '6/8',
      calificacion_actual: 6.5,
      calificacion_parcial_anterior: 7.0,
      declive: -0.5,
      nivel_riesgo: 'medio',
    },
    {
      boleta: '2021630023',
      nombre: 'Carlos Hernández López',
      asistencia: '95%',
      tareas_entregadas: '8/8',
      calificacion_actual: 9.2,
      calificacion_parcial_anterior: 9.0,
      declive: 0.2,
      nivel_riesgo: 'bajo',
    },
  ],
  fis1: [
    {
      boleta: '2021630055',
      nombre: 'Laura Sánchez Vega',
      asistencia: '55%',
      tareas_entregadas: '3/8',
      calificacion_actual: 4.2,
      calificacion_parcial_anterior: 6.8,
      declive: -2.6,
      nivel_riesgo: 'alto',
    },
    {
      boleta: '2021630033',
      nombre: 'Diego Morales Cruz',
      asistencia: '88%',
      tareas_entregadas: '7/8',
      calificacion_actual: 8.1,
      calificacion_parcial_anterior: 8.3,
      declive: -0.2,
      nivel_riesgo: 'bajo',
    },
  ],
  prog1: [
    {
      boleta: '2021630067',
      nombre: 'Sofía Ramírez Torres',
      asistencia: '50%',
      tareas_entregadas: '2/8',
      calificacion_actual: 3.9,
      calificacion_parcial_anterior: 7.5,
      declive: -3.6,
      nivel_riesgo: 'alto',
    },
    {
      boleta: '2021630078',
      nombre: 'Miguel Ángel Flores',
      asistencia: '70%',
      tareas_entregadas: '5/8',
      calificacion_actual: 6.0,
      calificacion_parcial_anterior: 6.8,
      declive: -0.8,
      nivel_riesgo: 'medio',
    },
  ],
};

export const MATERIAS_ALUMNO = [
  {
    id: 'calc1',
    nombre: 'Cálculo Diferencial',
    estado: 'rojo',
    profesor: 'Dr. Ramírez',
  },
  {
    id: 'fis1',
    nombre: 'Física I',
    estado: 'morado',
    profesor: 'Ing. López',
  },
  {
    id: 'prog1',
    nombre: 'Programación OO',
    estado: 'verde',
    profesor: 'M.C. Torres',
  },
];

export const RESPUESTAS_CUESTIONARIO = {
  '2021630042': {
    academico: {
      horas_estudio: '3-5 horas',
      material_dificil: true,
      acceso_internet: true,
    },
    economico: {
      trabaja: true,
      dificultades_economicas: true,
      conoce_becas: false,
    },
    emocional: {
      agotado: true,
      apoyo_social: false,
      dispuesto_psicologo: true,
    },
  },
};

export const MATERIAL_POR_MATERIA = {
  calc1: 'Límites, derivadas, regla de la cadena, aplicaciones de derivadas',
  fis1: 'Cinemática, dinámica, leyes de Newton, trabajo y energía',
  prog1: 'Clases, herencia, polimorfismo, interfaces, patrones de diseño',
};

export function getAlumnoByBoleta(boleta) {
  for (const alumnos of Object.values(ALUMNOS_POR_MATERIA)) {
    const alumno = alumnos.find((a) => a.boleta === boleta);
    if (alumno) return alumno;
  }
  return null;
}

export function getMateriaById(id) {
  return MATERIAS_PROFESOR.find((m) => m.id === id) ?? null;
}

export function getMateriaAlumnoById(id) {
  return MATERIAS_ALUMNO.find((m) => m.id === id) ?? null;
}
