/**
 * Scripts hardcodeados para resúmenes de audio por materia y tema.
 * Cada resumen tiene secciones con título y texto narrado.
 */

export const RESUMENES_AUDIO = {
  calc1: {
    Límites: {
      duracion: '3:30',
      secciones: [
        {
          titulo: 'Intro',
          texto:
            'Hola. En este resumen repasaremos límites, uno de los conceptos más importantes de Cálculo Diferencial. Escucha con calma y repite mentalmente cada idea clave.',
        },
        {
          titulo: 'Definición intuitiva',
          texto:
            'Un límite describe el comportamiento de una función cuando x se acerca a un valor, sin necesariamente evaluar la función en ese punto. Si lim de x hacia a de f de x es igual a L, significa que f de x se acerca a L cuando x tiende a a.',
        },
        {
          titulo: 'Límites laterales',
          texto:
            'Recuerda que el límite existe solo si el límite izquierdo y el límite derecho existen y son iguales. Si uno es distinto del otro, el límite no existe en ese punto.',
        },
        {
          titulo: 'Formas indeterminadas',
          texto:
            'Ante formas como cero entre cero, factoriza, racionaliza o usa conjugados antes de sustituir. La clave es simplificar algebraicamente la expresión.',
        },
        {
          titulo: 'Cierre',
          texto:
            'Practica con los ejercicios de la Tarea 1 sobre límites laterales. Explicar en voz alta cada paso te ayudará a fijar el concepto. ¡Mucho éxito en tu repaso!',
        },
      ],
    },
    Continuidad: {
      duracion: '3:00',
      secciones: [
        {
          titulo: 'Intro',
          texto:
            'Bienvenido a este resumen sobre continuidad. Vamos a conectar lo que ya sabes de límites con la idea de funciones continuas.',
        },
        {
          titulo: 'Definición de continuidad',
          texto:
            'Una función f es continua en un punto a si se cumplen tres condiciones: f está definida en a, el límite de f cuando x tiende a a existe, y ese límite es igual a f de a.',
        },
        {
          titulo: 'Tipos de discontinuidad',
          texto:
            'Puede haber discontinuidad removible, cuando el límite existe pero no coincide con el valor de la función. O discontinuidad esencial, cuando el límite no existe.',
        },
        {
          titulo: 'Cierre',
          texto:
            'Para verificar continuidad, siempre revisa las tres condiciones. Repasa los ejemplos de la Unidad 1 y practica identificando puntos de discontinuidad.',
        },
      ],
    },
    Derivadas: {
      duracion: '3:45',
      secciones: [
        {
          titulo: 'Intro',
          texto:
            'Hola. Hoy repasaremos derivadas: la herramienta central del cálculo para medir cómo cambia una función.',
        },
        {
          titulo: 'Definición',
          texto:
            'La derivada de f en un punto a es el límite del cociente incremental cuando h tiende a cero. Geométricamente, representa la pendiente de la recta tangente en ese punto.',
        },
        {
          titulo: 'Reglas básicas',
          texto:
            'Memoriza las reglas de suma, producto y cociente. La derivada de x elevado a n es n por x elevado a n menos uno. La derivada de una constante es cero.',
        },
        {
          titulo: 'Derivadas trigonométricas',
          texto:
            'Recuerda: la derivada de seno de x es coseno de x, y la derivada de coseno de x es menos seno de x. Estas aparecen frecuentemente en tus tareas.',
        },
        {
          titulo: 'Cierre',
          texto:
            'Practica derivando funciones paso a paso. Si te atoras, regresa a la definición por límite. La práctica constante es la clave para dominar este tema.',
        },
      ],
    },
  },
};

function fallbackResumen(tema, materiaNombre) {
  return {
    duracion: '2:30',
    secciones: [
      {
        titulo: 'Intro',
        texto: `Hola. En este resumen repasaremos ${tema} de ${materiaNombre}. Escucha con calma y repite mentalmente cada idea clave.`,
      },
      {
        titulo: 'Concepto principal',
        texto: `Enfócate en entender el por qué de ${tema} antes del cómo. Pregúntate: ¿para qué sirve esto? ¿dónde lo he visto antes?`,
      },
      {
        titulo: 'Repaso activo',
        texto:
          'Repasa en voz alta los puntos principales. Explicárselos a alguien, o incluso a ti mismo, es una de las formas más efectivas de aprender.',
      },
      {
        titulo: 'Cierre',
        texto: 'Sigue practicando con el material que tu profesor compartió en Teams. ¡Mucho éxito en tu repaso!',
      },
    ],
  };
}

/**
 * @param {string} materiaId
 * @param {string} tema
 * @param {string} [materiaNombre]
 * @returns {{ duracion: string, secciones: Array<{ titulo: string, texto: string }> }}
 */
export function getResumenAudio(materiaId, tema, materiaNombre = 'la materia') {
  const resumen = RESUMENES_AUDIO[materiaId]?.[tema];
  if (resumen) return resumen;
  return fallbackResumen(tema, materiaNombre);
}

/**
 * @param {{ secciones: Array<{ titulo: string, texto: string }> }} resumen
 * @returns {string}
 */
export function getTextoCompleto(resumen) {
  return resumen.secciones.map((s) => s.texto).join(' ');
}
