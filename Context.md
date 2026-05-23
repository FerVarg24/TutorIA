# Context.md — Proyecto Hackathon Universitario de Impacto Social con AI (Microsoft)
> Este archivo es la fuente de verdad para todos los agentes y desarrolladores que trabajen en el proyecto. Leer completo antes de tocar cualquier archivo.

---

## 1. Visión general del proyecto

### ¿Qué es?
Una plataforma web que usa AI para detectar de forma temprana a estudiantes universitarios en riesgo de reprobación y activar un acompañamiento personalizado — todo dentro del ecosistema Microsoft Teams.

### ¿Para quién?
- **Profesores del IPN** que quieren saber cuáles de sus alumnos están en riesgo antes de que termine el parcial.
- **Alumnos del IPN** que quieren recibir apoyo personalizado o solicitarlo de forma autónoma.

### ¿Cuál es el problema que resuelve?
El sistema educativo universitario solo sabe que un alumno fracasó al final del parcial — cuando ya es demasiado tarde. Los profesores atienden grupos de 30–50 estudiantes y no tienen capacidad operativa de detectar individualmente quién está en riesgo. Los alumnos muchas veces no piden ayuda solos.

### ¿Cuál es el diferenciador clave?
La intervención ocurre **dentro del parcial (semanas 2–3)**, no después de él. Eso deja 2–3 semanas de margen real para que el alumno mejore antes de la evaluación.

### Contexto del hackathon
- Evento: Hackathon Universitario de Impacto Social con AI — Microsoft México
- Reto atacado: **Reto 1 — Educación y Brecha Digital**
- Stack permitido/recomendado: Microsoft Teams, Copilot Studio, Azure OpenAI, Power BI, Microsoft Fabric
- Lo que se presenta: **Demo navegable con mezcla de partes reales y simuladas (mockup funcional)**

---

## 2. Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | React + Vite | Componentes funcionales, hooks |
| Estilos | Tailwind CSS v4 | Tokens definidos en `DESIGN.md`, configurados en `src/styles/global.css` via `@theme` |
| Animaciones | CSS animations + Framer Motion | Para mascota y transiciones entre páginas |
| Gráficas | Recharts | Dashboard del análisis de alumno |
| AI / Análisis | API de Anthropic (claude-sonnet-4-20250514) | Análisis de riesgo y generación de guías |
| Integraciones reales | Microsoft Teams, Copilot Studio | Para demo: simulado con datos mock |
| Autenticación | Simulada (hardcoded) | 2–3 usuarios de prueba para demo |
| Routing | React Router v6 | Navegación entre páginas |
| Estado global | React Context API | Para persistir mascota y sesión entre rutas (`src/context/AppContext.jsx`) |

---

## 3. Arquitectura de la solución

La plataforma tiene **dos flujos principales** completamente separados: el del Profesor y el del Alumno. Ambos comparten landing page y sistema de login, pero divergen totalmente después.

```
Landing Page
    ├── [Botón Profesor] → Login Profesor → Dashboard Profesor
    │                                           ├── Vista de Materias
    │                                           ├── Vista de Alumnos por Materia
    │                                           └── Vista de Alumno Individual (pantalla dividida)
    │                                                   └── Flujo de seguimiento → Cuestionario → Reporte
    │
    └── [Botón Alumno] → Login Alumno (boleta + contraseña + captcha)
                              └── Mis Materias
                                      ├── Materia en ROJO → Desglose con agente (iniciativa del profesor)
                                      └── Materia en MORADO → Chat con agente (iniciativa del alumno)
```

---

## 4. La mascota

### Descripción
- Es una mascota 2D en formato PNG estático (imagen única, sin capas separadas).
- Viaja y persiste entre todas las páginas de la aplicación.
- Tiene animaciones CSS que la hacen flotar, entrar desde un lado, o pulsar.
- En la pantalla dividida del análisis del alumno (módulo 6), la mascota "habla" — se acompaña de una burbuja de diálogo animada y texto typewriter.

### Comportamiento por página

| Página | Animación de la mascota |
|---|---|
| Landing | Entra desde la derecha con fade-in, flota suavemente (loop) |
| Login | Aparece centrada abajo, hace bounce suave |
| Dashboard Profesor — Materias | Esquina inferior derecha, flotando |
| Vista de Alumno (pantalla dividida) | Lado izquierdo, ocupa mitad de pantalla, pulsa al "hablar" |
| Dashboard Alumno — Materias | Esquina inferior derecha, flotando |
| Vista de materia del Alumno | Lado izquierdo, acompaña el desglose con voz |

### Implementación técnica
- La mascota se define como componente `<Mascota />` fuera del árbol de `<Routes>` para que persista entre navegaciones.
- Cada página le pasa una prop `modo` que define su animación (`flotando | hablando | bounce | entrada-derecha`).
- Las animaciones son CSS keyframes, sin librerías externas adicionales para esto.

```jsx
// Ejemplo de uso
<Mascota modo="hablando" mensaje="Juan tiene 3 faltas esta semana..." />
<Mascota modo="flotando" />
```

---

## 5. Módulo 1 — Landing Page

### Descripción
Primera pantalla que ve cualquier usuario. Llama la atención, presenta la propuesta de valor y da acceso a los dos flujos.

### Elementos visuales
- Fondo con **gradiente animado** que cambia lentamente de color (CSS animation en el body o un div full-screen).
- **Texto principal** con efecto typewriter: la frase central aparece letra por letra al cargar.
- **Dos botones grandes**: "Soy Profesor" y "Soy Alumno" — con hover effect llamativo (glow, escala, color).
- **Mascota** entrando desde la derecha con fade-in al cargar.
- **Formas geométricas flotantes** de fondo (círculos o hexágonos con opacidad baja, CSS puro).
- Logo o nombre del proyecto en la parte superior.

### Comportamiento
- Botón "Soy Profesor" → navega a `/login/profesor`
- Botón "Soy Alumno" → navega a `/login/alumno`
- No hay scroll complejo ni secciones adicionales. Es una sola pantalla impactante.

### Rutas
- Path: `/`

---

## 6. Módulo 2 — Login

### Hay dos variantes del login:

#### Login Profesor (`/login/profesor`)
- Campos: correo institucional + contraseña
- Sin captcha
- Credenciales hardcodeadas para demo (ej. `profesor@ipn.mx` / `demo1234`)
- Al autenticar → redirige a `/profesor/materias`

#### Login Alumno (`/login/alumno`)
- Campos: número de boleta + contraseña + **CAPTCHA** (puede ser un captcha visual simple implementado en React, no necesariamente Google reCAPTCHA)
- Credenciales hardcodeadas para demo (ej. boleta `2021630001` / contraseña `demo1234`)
- Al autenticar → redirige a `/alumno/materias`

### Elementos visuales
- Diseño limpio, centrado
- Mascota presente con animación `bounce`
- Misma paleta de colores que la landing

---

## 7. Módulo 3 — Dashboard Profesor: Vista de Materias

### Ruta: `/profesor/materias`

### Descripción
Primera pantalla del profesor después de login. Muestra todas sus materias del semestre actual para las cuales ya existe una lista de alumnos analizada.

### Datos (mockeados para demo)
```json
[
  { "id": "calc1", "nombre": "Cálculo Diferencial", "grupo": "3BV1", "alumnos": 38, "en_riesgo": 7 },
  { "id": "fis1", "nombre": "Física I", "grupo": "3BV2", "alumnos": 42, "en_riesgo": 3 },
  { "id": "prog1", "nombre": "Programación Orientada a Objetos", "grupo": "4BV1", "alumnos": 35, "en_riesgo": 5 }
]
```

### Elementos visuales
- Cards por materia con: nombre, grupo, número de alumnos, badge con alumnos en riesgo
- El badge de "en riesgo" es llamativo (rojo, con número)
- Al hacer clic en una card → navega a `/profesor/materia/:id`

---

## 8. Módulo 4 — Dashboard Profesor: Vista de Alumnos por Materia

### Ruta: `/profesor/materia/:id`

### Descripción
Tabla de alumnos de esa materia ordenada por nivel de riesgo: los de mayor riesgo aparecen hasta arriba en rojo.

### Lógica de colores
| Color | Significado |
|---|---|
| 🔴 Rojo | Riesgo alto — requiere intervención inmediata |
| 🟡 Amarillo | Riesgo medio — monitorear |
| 🟢 Verde | Sin riesgo detectado |

### Datos por alumno (mockeados)
```json
{
  "boleta": "2021630042",
  "nombre": "Juan Pérez García",
  "asistencia": "60%",
  "tareas_entregadas": "4/8",
  "calificacion_actual": 4.8,
  "calificacion_parcial_anterior": 7.2,
  "declive": -2.4,
  "nivel_riesgo": "alto"
}
```

### Comportamiento
- Tabla ordenada: rojo → amarillo → verde
- Clic en alumno rojo → navega a `/profesor/alumno/:boleta`
- Clic en alumno verde o amarillo → en esta demo, solo muestra un tooltip "Sin intervención requerida aún"

---

## 9. Módulo 5 — Vista de Alumno Individual (pantalla dividida) ⭐ Pantalla principal del demo

### Ruta: `/profesor/alumno/:boleta`

### Descripción
Esta es la pantalla más importante y visualmente impactante del proyecto. Se divide en dos mitades:

```
┌─────────────────────┬─────────────────────────────┐
│                     │                             │
│   MASCOTA + TEXTO   │   DASHBOARD / ANÁLISIS      │
│   (agente habla)    │   (se genera progresivamente)│
│                     │                             │
└─────────────────────┴─────────────────────────────┘
```

### Lado izquierdo — El agente habla
- La mascota ocupa el tercio superior izquierdo
- Tiene animación `hablando`: pulsa o hace un efecto de bounce suave mientras el texto aparece
- Debajo de la mascota: **texto typewriter** que va apareciendo palabra por palabra
- El texto es el análisis generado por la API (ver abajo)
- Burbuja de diálogo animada alrededor del texto

### Lado derecho — Dashboard que se construye progresivamente
El dashboard aparece en secciones conforme avanza el texto de la izquierda. Secciones:

1. **Indicadores de riesgo** (barras o gauge charts con Recharts)
   - Asistencia: 60%
   - Tareas entregadas: 50%
   - Tendencia de calificación: gráfica de línea mostrando la caída

2. **Factores detectados** (chips o badges que aparecen uno por uno)
   - Ej: "Declive de 2.4 puntos", "3 faltas consecutivas", "Última tarea no entregada"

3. **Nivel de riesgo global** (gauge o semáforo visual)

### Integración con API (real para demo)
- Al cargar la página se hace una llamada a la API de Anthropic con los datos del alumno
- El prompt incluye: asistencia, tareas, calificaciones, declive
- La respuesta se muestra con efecto typewriter en el lado izquierdo
- El dashboard del lado derecho se sincroniza con el texto (aparece conforme avanza)

```javascript
// Prompt al modelo
const prompt = `
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
`;
```

### Al terminar el análisis
- Aparece un botón: **"Dar seguimiento a este alumno"**
- Al hacer clic → se activa el Módulo 6

---

## 10. Módulo 6 — Flujo de seguimiento del Profesor

### Paso A: Confirmación
- Modal o sección que pregunta: *"¿Deseas enviarle un cuestionario diagnóstico a Juan Pérez?"*
- Botones: "Sí, enviar" / "No por ahora"

### Paso B: Envío del cuestionario
- Al confirmar, se simula el envío de un link de cuestionario al alumno
- UI muestra: "✅ Cuestionario enviado a Juan Pérez — recibirá el link por Teams"
- El cuestionario está **prediseñado** (Google Forms o form propio en la app)

### Cuestionario (preguntas clave)
El cuestionario detecta si el problema es económico, emocional, académico o una combinación:

```
Sección 1 — Situación académica
- ¿Cuántas horas estudias por semana para esta materia?
- ¿Sientes que el material es muy difícil de entender?
- ¿Tienes acceso a internet y computadora para estudiar?

Sección 2 — Situación económica
- ¿Trabajas actualmente además de estudiar?
- ¿Has tenido dificultades económicas este semestre?
- ¿Conoces las becas y apoyos disponibles en el IPN?

Sección 3 — Situación emocional
- ¿Te has sentido agotado o sin motivación últimamente?
- ¿Tienes personas de confianza con quien hablar si tienes problemas?
- ¿Estarías dispuesto a hablar con el psicólogo de la escuela?
```

### Paso C: Análisis de respuestas y generación de reporte
- Una vez que el alumno completa el cuestionario (simulado en demo: botón "Ver respuestas del alumno")
- Se hace una segunda llamada a la API con las respuestas
- Se genera un reporte con soluciones personalizadas

### Tipos de solución por problema detectado

| Problema | Solución propuesta |
|---|---|
| Académico | Guía de estudio personalizada (visual/auditiva/kinestésica) generada con el material del profesor |
| Económico | Información de becas institucionales IPN, apoyos gubernamentales (Benito Juárez, etc.) |
| Emocional | Acercamiento al servicio de psicología del IPN, recursos de bienestar estudiantil |
| Combinado | Combinación de las anteriores, priorizada por urgencia |

### Paso D: Reporte al profesor
- El reporte aparece en el chat de la app (panel lateral o sección nueva)
- Formato: card con nombre del alumno, problemas detectados, soluciones propuestas, recursos institucionales con links

---

## 11. Módulo 7 — Dashboard Alumno: Vista de Materias

### Ruta: `/alumno/materias`

### Descripción
Primera pantalla del alumno después de login. Muestra sus materias con código de color que indica el estado:

### Código de colores

| Color | Significado | Quién lo activó |
|---|---|---|
| 🔴 Rojo | El profesor ya pidió y envió ayuda — hay un reporte listo | Iniciativa del profesor |
| 🟣 Morado | La plataforma detectó anomalías de desempeño — el alumno puede pedir apoyo | Iniciativa de la plataforma/alumno |
| 🟢 Verde | Sin anomalías detectadas | — |

### Datos mockeados
```json
[
  { "id": "calc1", "nombre": "Cálculo Diferencial", "estado": "rojo", "profesor": "Dr. Ramírez" },
  { "id": "fis1", "nombre": "Física I", "estado": "morado", "profesor": "Ing. López" },
  { "id": "prog1", "nombre": "Programación OO", "estado": "verde", "profesor": "M.C. Torres" }
]
```

### Comportamiento
- Clic en materia roja → `/alumno/materia/rojo/:id`
- Clic en materia morada → `/alumno/materia/morado/:id`
- Clic en materia verde → tooltip "Sin anomalías detectadas esta semana 🎉"

---

## 12. Módulo 8 — Vista de Materia Roja (Alumno)

### Ruta: `/alumno/materia/rojo/:id`

### Descripción
El profesor ya activó el seguimiento y envió apoyo. El alumno ve:

1. **Pantalla dividida** (igual que la del profesor pero desde la perspectiva del alumno)
   - Lado izquierdo: mascota + texto typewriter donde el agente le explica al alumno qué fue detectado y qué soluciones se le proponen
   - Lado derecho: dashboard con sus indicadores + las soluciones propuestas (guía de estudio, recursos, etc.)

2. El agente habla directamente al alumno:
   > *"Hola [nombre], tu profesor notó que has tenido algunas dificultades esta semana. No te preocupes, estamos aquí para apoyarte. Detectamos que..."*

3. Al final: botones de acceso directo a los recursos propuestos (link a guía de estudio, link a becas, etc.)

---

## 13. Módulo 9 — Vista de Materia Morada (Alumno)

### Ruta: `/alumno/materia/morado/:id`

### Descripción
El alumno detectó (o la plataforma detectó) anomalías pero el profesor no ha intervenido. El alumno toma la iniciativa.

### Flujo
1. La mascota aparece y le dice: *"Notamos algunas variaciones en tu desempeño en Física I. ¿Quieres que revisemos juntos cómo estás?"*
2. Se abre un **chat interactivo** con el agente (no solo typewriter, sino input para que el alumno responda)
3. El agente hace preguntas diagnósticas conversacionalmente
4. Al final genera recomendaciones y, si el alumno quiere, le genera su guía de estudio personalizada

### Integración con API
- Chat multi-turno usando el historial de conversación
- El agente mantiene contexto de lo que el alumno respondió
- Al final de la conversación: llamada a API para generar guía de estudio

---

## 14. Generación de Guías de Estudio

### ¿Cómo funciona?
A partir de:
- Las respuestas del cuestionario (estilo de aprendizaje detectado)
- El material que el profesor subió a Teams (para demo: contenido mockeado por materia)
- El área de dificultad detectada

Se genera una guía personalizada con la API.

### Tres estilos de guía

| Estilo | Características del output |
|---|---|
| Visual | Diagramas tipo Mermaid, mapas conceptuales en texto, tablas comparativas, esquemas |
| Auditivo | Explicaciones narrativas paso a paso, analogías, descripciones detalladas en prosa |
| Kinestésico | Ejercicios aplicados, problemas con contexto real, pasos para "hacer" algo |

### Prompt base para generación de guía
```javascript
const prompt = `
Eres un tutor educativo del IPN especializado en ${materia}.
El alumno tiene un estilo de aprendizaje predominantemente ${estilo}.
Los temas en los que tiene más dificultad son: ${temas_dificiles}.
El material base del profesor cubre: ${material_profesor}.

Genera una guía de estudio personalizada de máximo 400 palabras.
Usa el estilo de aprendizaje indicado.
Incluye solo contenido relevante al material del profesor.
Sé motivador y claro.
`;
```

---

## 15. Carga de lista/registro por parte del profesor (Módulo de ingesta)

### Descripción
El profesor puede subir un archivo (CSV, Excel, foto de lista o PDF) dentro de la plataforma. Este archivo contiene: nombres de alumnos, asistencias, calificaciones de tareas y evaluaciones.

### Para la demo
- Se simula con un botón "Cargar lista de alumnos" en el Dashboard del Profesor
- Al "subir" el archivo, la UI muestra una animación de procesamiento y luego muestra los datos ya parseados
- En el backend real esto pasaría por Azure Document Intelligence o un parser de CSV
- Para demo: el archivo se ignora y se cargan los datos mockeados automáticamente

### UI del flujo
1. Botón "Cargar registro del grupo"
2. File picker (acepta CSV, XLSX, PDF, imagen)
3. Animación: "Analizando lista... ✨"
4. Resultado: tabla de alumnos con niveles de riesgo calculados

---

## 16. Estructura de carpetas del proyecto

```
/src
  /assets
    mascota.png              ← imagen de la mascota
    /icons
  /components
    Mascota.jsx              ← componente global de la mascota
    Navbar.jsx
    BotonPrimario.jsx
    TypewriterText.jsx       ← componente de texto que aparece letra por letra
    Dashboard.jsx            ← componente reutilizable de dashboard/gráficas
    ChatAgente.jsx           ← chat interactivo multi-turno con el agente
  /pages
    LandingPage.jsx
    LoginProfesor.jsx
    LoginAlumno.jsx
    /profesor
      MateriasProfesor.jsx
      AlumnosMateria.jsx
      AlumnoDetalle.jsx      ← pantalla dividida ⭐
      Seguimiento.jsx
      Reporte.jsx
    /alumno
      MateriasAlumno.jsx
      MateriaRoja.jsx
      MateriaMonrada.jsx
  /context
    AppContext.jsx            ← estado global: sesión, mascota, modo actual
  /services
    anthropicService.js      ← llamadas a la API de Anthropic
    mockData.js              ← todos los datos mockeados centralizados aquí
  /styles
    global.css               ← Tailwind + tokens de DESIGN.md (@theme)
  App.jsx
  main.jsx
```

> **Nota:** La fuente de verdad del sistema de diseño es `DESIGN.md`. Los tokens se configuran en `src/styles/global.css` y se consumen como clases de Tailwind (ej. `bg-primary`, `text-accent-lime`).

---

## 17. Paleta de colores y diseño

> **Fuente de verdad:** [DESIGN.md](DESIGN.md). No usar paletas alternativas.

### Tokens principales (DESIGN.md)

| Token Tailwind | Color | Uso |
|---|---|---|
| `primary` | `#150f23` | Botones primarios, fondos profundos |
| `ink-deep` | `#1f1633` | Canvas oscuro, cards |
| `on-primary` | `#ffffff` | Texto sobre fondos oscuros |
| `accent-lime` | `#c2ef4e` | Highlights, acentos de atención |
| `accent-violet` | `#6a5fc1` | Acentos secundarios |
| `accent-violet-deep` | `#422082` | Cards spotlight, burbujas |

### Tokens semánticos (riesgo académico)

| Token Tailwind | Color | Uso |
|---|---|---|
| `riesgo-alto` | `#E94F4F` | Alumnos/materias en riesgo alto |
| `riesgo-medio` | `#E9A94F` | Riesgo medio |
| `riesgo-bajo` | `#4FE97A` | Sin riesgo |
| `iniciativa-alumno` | `#9B4FE9` | Materias moradas (iniciativa del alumno) |

**Tipografía:** `Rubik` (UI) + `Space Grotesk` (display) — según DESIGN.md.

**Tema general:** canvas oscuro violeta-medianoche con acentos lime vibrantes. Sensación de tecnología accesible y confiable.

---

## 18. Llamadas a la API de Anthropic

### Configuración base
```javascript
// src/services/anthropicService.js
const BASE_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

export async function analizarAlumno(datosAlumno) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: buildPromptAnalisis(datosAlumno)
      }]
    })
  });
  const data = await response.json();
  return data.content[0].text;
}

export async function generarGuia(estilo, materia, temas) {
  // similar estructura
}

export async function chatAgente(historial, mensajeNuevo) {
  // multi-turno: pasar historial completo en messages[]
}
```

### Funciones necesarias
| Función | Cuándo se llama | Output esperado |
|---|---|---|
| `analizarAlumno()` | Al cargar `/profesor/alumno/:boleta` | Texto explicando la situación del alumno (120 palabras) |
| `analizarCuestionario()` | Al completar el cuestionario | Clasificación de problema + soluciones |
| `generarGuia()` | Al confirmar el tipo de guía | Guía de estudio formateada en markdown |
| `chatAgente()` | En la vista de materia morada del alumno | Respuesta conversacional del agente |

---

## 19. Datos mockeados centralizados

Todo el mock data vive en `/src/services/mockData.js`. Nunca hardcodear datos directamente en los componentes.

```javascript
// mockData.js (estructura)
export const USUARIOS_PROFESOR = [
  { correo: "profesor@ipn.mx", password: "demo1234", nombre: "Dr. Carlos Ramírez" }
];

export const USUARIOS_ALUMNO = [
  { boleta: "2021630001", password: "demo1234", nombre: "María González López" }
];

export const MATERIAS_PROFESOR = [ /* ver módulo 3 */ ];
export const ALUMNOS_POR_MATERIA = { /* ver módulo 4 */ };
export const MATERIAS_ALUMNO = [ /* ver módulo 7 */ ];
```

---

## 20. Reglas de desarrollo para agentes

1. **No inventar datos** — usar siempre los mocks de `mockData.js`
2. **No hardcodear colores** — usar siempre los tokens de Tailwind definidos en `src/styles/global.css` (basados en `DESIGN.md`)
3. **La mascota es un componente global** — se renderiza en `App.jsx` fuera de `<Routes>`, nunca dentro de una página individual
4. **Cada página le pasa props a la mascota** vía Context: `{ modo, mensaje }`
5. **TypewriterText es reutilizable** — no reimplementar el efecto en cada componente
6. **Todas las llamadas a la API van por `anthropicService.js`** — ningún componente llama a fetch directamente
7. **El routing usa React Router v6** — usar `<Outlet>` y loaders donde aplique
8. **Mobile-first no es prioridad** — la demo es en pantalla de laptop/proyector, optimizar para 1280px+
9. **Accesibilidad básica** — usar `aria-label` en botones de ícono, `alt` en imágenes
10. **Comentarios en inglés** en el código, texto de UI en español

---

## 21. Flujo completo en secuencia (para validar que nada se omite)

```
1. Usuario llega a / (Landing)
2. Elige "Soy Profesor" o "Soy Alumno"

── FLUJO PROFESOR ──
3. /login/profesor → ingresa correo + contraseña
4. /profesor/materias → ve sus materias con badges de riesgo
5. Click en materia → /profesor/materia/:id → tabla de alumnos con semáforo
6. Click en alumno rojo → /profesor/alumno/:boleta
   → pantalla dividida: mascota habla + dashboard se construye progresivamente
   → API call: analizarAlumno()
7. Click "Dar seguimiento" → modal de confirmación
8. Confirma → se "envía" cuestionario al alumno (simulado)
9. Demo: click "Ver respuestas del alumno" → API call: analizarCuestionario()
10. Se muestra reporte con soluciones en panel lateral

── FLUJO ALUMNO ──
3. /login/alumno → boleta + contraseña + captcha
4. /alumno/materias → ve materias con colores (rojo, morado, verde)
5a. Click en materia ROJA → /alumno/materia/rojo/:id
    → pantalla dividida: mascota + desglose de lo detectado + soluciones propuestas
5b. Click en materia MORADA → /alumno/materia/morado/:id
    → chat interactivo con el agente
    → API call: chatAgente() multi-turno
    → Al final: API call: generarGuia()
    → Guía de estudio mostrada en la app
```

---

*Context.md — última actualización: Mayo 2026*
*Proyecto: Hackathon Universitario de Impacto Social con AI — Microsoft México*
