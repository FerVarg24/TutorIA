/**
 * Presentaciones hardcodeadas por materia y tema.
 * Cada slide tiene un tipo que determina su layout visual.
 */

export const PRESENTACIONES = {
  calc1: {
    Límites: {
      titulo: 'Límites',
      subtitulo: 'Cálculo Diferencial',
      slides: [
        {
          tipo: 'hero',
          titulo: 'Límites',
          subtitulo: 'El comportamiento de una función cerca de un punto',
          icono: '∞',
        },
        {
          tipo: 'cards',
          titulo: 'Conceptos clave',
          items: [
            {
              icono: 'target',
              titulo: 'Definición',
              texto: 'lim(x→a) f(x) = L significa que f(x) se acerca a L cuando x tiende a a.',
            },
            {
              icono: 'arrow',
              titulo: 'Límites laterales',
              texto: 'El límite existe solo si el izquierdo y el derecho existen y son iguales.',
            },
            {
              icono: 'alert',
              titulo: 'Indeterminaciones',
              texto: 'Formas 0/0, ∞/∞ requieren factorizar o racionalizar antes de evaluar.',
            },
            {
              icono: 'check',
              titulo: 'Sustitución directa',
              texto: 'Si no hay indeterminación, evalúa f(a) directamente.',
            },
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Definición formal',
          formula: 'lim(x→a) f(x) = L',
          explicacion:
            'Para todo ε > 0 existe δ > 0 tal que si 0 < |x − a| < δ, entonces |f(x) − L| < ε. En la práctica: f(x) se acerca a L sin tocar necesariamente el punto a.',
        },
        {
          tipo: 'pasos',
          titulo: 'Cómo resolver un límite',
          pasos: [
            'Sustituye x = a y verifica si hay indeterminación',
            'Si hay 0/0, factoriza o racionaliza la expresión',
            'Calcula límites laterales si hay valor absoluto o piecewise',
            'Verifica tu respuesta con la gráfica o una tabla de valores',
          ],
        },
        {
          tipo: 'comparacion',
          titulo: '¿Existe el límite?',
          izquierda: {
            titulo: 'Sí existe',
            items: [
              'Límite izquierdo = límite derecho',
              'La gráfica no salta en el punto',
              'Sustitución directa funciona',
            ],
            positivo: true,
          },
          derecha: {
            titulo: 'No existe',
            items: [
              'Laterales distintos (salto)',
              'Oscilación infinita',
              'Asíntota vertical en x = a',
            ],
            positivo: false,
          },
        },
        {
          tipo: 'cierre',
          titulo: '¡Listo para practicar!',
          tips: [
            'Repasa la Tarea 1: Límites laterales (ejercicios 1–10)',
            'Explica cada paso en voz alta mientras resuelves',
            'Identifica qué técnica usar antes de calcular',
          ],
        },
      ],
    },
    Continuidad: {
      titulo: 'Continuidad',
      subtitulo: 'Cálculo Diferencial',
      slides: [
        {
          tipo: 'hero',
          titulo: 'Continuidad',
          subtitulo: 'Funciones sin saltos ni interrupciones',
          icono: '〰',
        },
        {
          tipo: 'cards',
          titulo: 'Tres condiciones',
          items: [
            {
              icono: 'check',
              titulo: 'f(a) existe',
              texto: 'La función está definida en el punto a.',
            },
            {
              icono: 'target',
              titulo: 'lim f(x) existe',
              texto: 'El límite cuando x tiende a a existe y es finito.',
            },
            {
              icono: 'arrow',
              titulo: 'lim = f(a)',
              texto: 'El límite coincide con el valor de la función.',
            },
            {
              icono: 'alert',
              titulo: 'Si falla alguna',
              texto: 'La función es discontinua en ese punto.',
            },
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Continuidad en un punto',
          formula: 'lim(x→a) f(x) = f(a)',
          explicacion:
            'Geometricamente: puedes dibujar la gráfica sin levantar el lápiz en x = a. Los límites son la base para entender continuidad.',
        },
        {
          tipo: 'pasos',
          titulo: 'Verificar continuidad',
          pasos: [
            'Evalúa f(a): ¿está definida?',
            'Calcula lim(x→a) f(x)',
            'Compara: ¿son iguales?',
            'Clasifica el tipo de discontinuidad si no lo es',
          ],
        },
        {
          tipo: 'comparacion',
          titulo: 'Tipos de discontinuidad',
          izquierda: {
            titulo: 'Removible',
            items: [
              'El límite existe',
              'f(a) no definida o distinta',
              'Se puede "reparar" redefiniendo f(a)',
            ],
            positivo: true,
          },
          derecha: {
            titulo: 'Esencial',
            items: [
              'El límite no existe',
              'Salto o asíntota vertical',
              'No se puede reparar',
            ],
            positivo: false,
          },
        },
        {
          tipo: 'cierre',
          titulo: 'Conecta con límites',
          tips: [
            'Continuidad = límites + valor de la función',
            'Practica con funciones piecewise de la Unidad 1',
            'Pregúntate: ¿puedo trazar sin saltos?',
          ],
        },
      ],
    },
    Derivadas: {
      titulo: 'Derivadas',
      subtitulo: 'Cálculo Diferencial',
      slides: [
        {
          tipo: 'hero',
          titulo: 'Derivadas',
          subtitulo: 'La razón de cambio instantánea',
          icono: '∂',
        },
        {
          tipo: 'cards',
          titulo: 'Ideas fundamentales',
          items: [
            {
              icono: 'target',
              titulo: 'Pendiente tangente',
              texto: 'f\'(a) es la pendiente de la recta tangente en x = a.',
            },
            {
              icono: 'arrow',
              titulo: 'Razón de cambio',
              texto: 'Mide qué tan rápido cambia f cuando cambia x.',
            },
            {
              icono: 'check',
              titulo: 'Reglas básicas',
              texto: '(xⁿ)\' = nxⁿ⁻¹, (c)\' = 0, (cf)\' = cf\'.',
            },
            {
              icono: 'alert',
              titulo: 'No derivable',
              texto: 'Picos, esquinas o discontinuidades impiden derivar.',
            },
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Definición por límite',
          formula: "f'(a) = lim(h→0) [f(a+h) − f(a)] / h",
          explicacion:
            'Es el límite del cociente incremental. Cuando existe, la función es derivable en a y la tangente está bien definida.',
        },
        {
          tipo: 'pasos',
          titulo: 'Derivar paso a paso',
          pasos: [
            'Identifica el tipo de función (polinomio, trig, producto...)',
            'Aplica la regla correspondiente (potencia, producto, cociente)',
            'Simplifica el resultado algebraicamente',
            'Verifica evaluando f\' en un punto conocido',
          ],
        },
        {
          tipo: 'comparacion',
          titulo: 'Derivable vs continua',
          izquierda: {
            titulo: 'Derivable → continua',
            items: [
              'Si f es derivable en a, entonces es continua en a',
              'La tangente existe y es única',
              'No hay saltos ni picos',
            ],
            positivo: true,
          },
          derecha: {
            titulo: 'Continua ≠ derivable',
            items: [
              'f(x) = |x| en x = 0 es continua pero no derivable',
              'Esquinas y picos son contraejemplos',
              'Continuidad es necesaria pero no suficiente',
            ],
            positivo: false,
          },
        },
        {
          tipo: 'cierre',
          titulo: 'Domina las derivadas',
          tips: [
            'Memoriza derivadas de sen, cos, eˣ y ln x',
            'Practica regla del producto y del cociente',
            'Relaciona la derivada con la gráfica de f',
          ],
        },
      ],
    },
  },
};

function fallbackPresentacion(tema, materiaNombre) {
  return {
    titulo: tema,
    subtitulo: materiaNombre,
    slides: [
      {
        tipo: 'hero',
        titulo: tema,
        subtitulo: `Repaso visual de ${materiaNombre}`,
        icono: '📊',
      },
      {
        tipo: 'cards',
        titulo: 'Puntos clave',
        items: [
          {
            icono: 'target',
            titulo: 'Concepto',
            texto: `Enfócate en entender el por qué de ${tema} antes del cómo.`,
          },
          {
            icono: 'arrow',
            titulo: 'Conexiones',
            texto: 'Relaciona este tema con lo que ya dominas.',
          },
          {
            icono: 'check',
            titulo: 'Práctica',
            texto: 'Resuelve ejercicios del material del profesor.',
          },
          {
            icono: 'alert',
            titulo: 'Dudas',
            texto: 'Anota lo que no queda claro para tutoría.',
          },
        ],
      },
      {
        tipo: 'pasos',
        titulo: 'Estrategia de estudio',
        pasos: [
          'Lee las definiciones del material en Teams',
          'Resuelve 3 ejercicios sin ver la solución',
          'Explica el procedimiento en voz alta',
          'Repasa los errores más comunes',
        ],
      },
      {
        tipo: 'cierre',
        titulo: '¡Sigue adelante!',
        tips: [
          '30 minutos diarios en el tema más difícil',
          'Pide tutoría si algo no queda claro',
          '¡Tú puedes lograrlo!',
        ],
      },
    ],
  };
}

/**
 * @param {string} materiaId
 * @param {string} tema
 * @param {string} [materiaNombre]
 */
export function getPresentacion(materiaId, tema, materiaNombre = 'la materia') {
  const presentacion = PRESENTACIONES[materiaId]?.[tema];
  if (presentacion) return presentacion;
  return fallbackPresentacion(tema, materiaNombre);
}
