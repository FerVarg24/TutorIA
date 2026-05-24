# ROADMAP.md — TutorIA
> Fuente de verdad sobre el estado de implementación del proyecto. Leer antes de tocar cualquier archivo.
> Para el contexto completo del producto, ver [Context.md](Context.md). Para el sistema de diseño, ver [DESIGN.md](DESIGN.md).

---

## Estado General del Proyecto

**IMPLEMENTACIÓN: DESDE CERO**

La configuración base está lista. No hay lógica de aplicación implementada aún.

---

## Archivos Conservados (Base Lista)

| Archivo | Descripción |
|---------|-------------|
| `Context.md` | Fuente de verdad del producto completo |
| `DESIGN.md` | Sistema de diseño (tokens, colores, tipografía) |
| `package.json` | Dependencias instaladas |
| `vite.config.js` | Configuración de Vite |
| `index.html` | HTML base |
| `src/main.jsx` | Entry point de React |
| `src/styles/global.css` | Tokens Tailwind v4 + animaciones CSS de mascota |
| `.env.example` | Template de variables de entorno |

---

## Estructura de Carpetas (Vacías, Listas)

```
src/
  assets/          ← aquí va mascota.png
  components/      ← componentes reutilizables
  context/         ← AppContext.jsx
  pages/
    profesor/      ← páginas del flujo profesor
    alumno/        ← páginas del flujo alumno
  services/        ← mockData.js y anthropicService.js
  styles/          ← global.css (YA EXISTE)
  App.jsx          ← placeholder mínimo
  main.jsx         ← entry point (YA EXISTE)
```

---

## Tokens de Diseño Disponibles en global.css

Los tokens ya están configurados como clases Tailwind. Usar siempre estos, nunca colores hardcodeados.

### Colores principales
| Clase Tailwind | Hex | Uso |
|----------------|-----|-----|
| `bg-primary` / `text-primary` | `#150f23` | Fondo más profundo, botones primarios |
| `bg-ink-deep` | `#1f1633` | Canvas oscuro, cards |
| `text-on-primary` | `#ffffff` | Texto sobre fondos oscuros |
| `bg-accent-lime` | `#c2ef4e` | Highlights, keywords en títulos |
| `bg-accent-violet` | `#6a5fc1` | Mensajes del usuario en chat |
| `bg-accent-violet-deep` | `#422082` | Cards spotlight, burbujas |
| `bg-surface-canvas-dark` | `#1f1633` | Fondo de páginas |
| `bg-surface-night` | `#150f23` | Cards sobre canvas oscuro |
| `text-on-dark-muted` | `#bdb8c0` | Texto secundario |
| `border-hairline-violet` | `#362d59` | Bordes de cards |

### Colores semánticos de riesgo académico
| Clase Tailwind | Hex | Uso |
|----------------|-----|-----|
| `text-riesgo-alto` / `bg-riesgo-alto` | `#E94F4F` | Alumnos/materias en riesgo alto |
| `text-riesgo-medio` / `bg-riesgo-medio` | `#E9A94F` | Riesgo medio |
| `text-riesgo-bajo` / `bg-riesgo-bajo` | `#4FE97A` | Sin riesgo |
| `text-iniciativa-alumno` / `bg-iniciativa-alumno` | `#9B4FE9` | Materias moradas |

### Tipografía
| Clase | Fuente |
|-------|--------|
| `font-display` | Space Grotesk (títulos, headings) |
| `font-ui` | Rubik (cuerpo, UI) |

### Espaciado
`p-xs` (4px) · `p-sm` (8px) · `p-md` (12px) · `p-lg` (16px) · `p-xl` (24px) · `p-xxl` (32px) · `p-section` (96px)

### Border radius
`rounded-xs` (4px) · `rounded-sm` (6px) · `rounded-md` (8px) · `rounded-xl` (12px) · `rounded-xxl` (18px)

### Animaciones de mascota (clases CSS ya definidas)
| Clase CSS | Comportamiento |
|-----------|----------------|
| `.mascota--flotando` | Esquina inferior derecha, flota suavemente |
| `.mascota--bounce` | Centro abajo, bounce suave |
| `.mascota--entrada-derecha` | Entra desde la derecha con fade-in |
| `.mascota--hablando` | Lado izquierdo, pulsa mientras habla |

---

## Fase 1: Infraestructura — PENDIENTE

### `src/services/mockData.js`
Centraliza todos los datos de prueba. Ningún componente debe hardcodear datos.

Exports requeridos:
```js
export const USUARIOS_PROFESOR   // [{ correo, password, nombre }]
export const USUARIOS_ALUMNO     // [{ boleta, password, nombre }]
export const MATERIAS_PROFESOR   // [{ id, nombre, grupo, alumnos, en_riesgo }]
export const ALUMNOS_POR_MATERIA // { calc1: [...], fis1: [...], prog1: [...] }
export const MATERIAS_ALUMNO     // [{ id, nombre, estado, profesor }]
export const RESPUESTAS_CUESTIONARIO // { '2021630042': { academico, economico, emocional } }
export const MATERIAL_POR_MATERIA   // { calc1: '...', fis1: '...', prog1: '...' }
export function getAlumnoByBoleta(boleta)
export function getMateriaById(id)
export function getMateriaAlumnoById(id)
```

Ver datos exactos en [Context.md](Context.md) secciones 7, 8, 11.

### `src/services/anthropicService.js`
Todas las llamadas a la API pasan por aquí. Ningún componente llama a `fetch` directamente.

Funciones requeridas:
```js
export async function analizarAlumno(datosAlumno)        // → string (120 palabras)
export async function analizarCuestionario(alumno, resp) // → string (reporte con soluciones)
export async function generarGuia(estilo, materia, temas, material) // → string markdown
export async function chatAgente(historial, mensajeNuevo) // → string (respuesta del agente)
```

- Modelo: `claude-sonnet-4-20250514`
- API key: `import.meta.env.VITE_ANTHROPIC_API_KEY`
- Incluir fallback en caso de error de API

### `src/context/AppContext.jsx`
Estado global de la app.

```jsx
// Estado
const [session, setSession]   // null | { nombre, rol, correo|boleta }
const [mascota, setMascota]   // { modo: string, mensaje: string }

// Exports del contexto
login(user)                   // guarda sesión
logout()                      // limpia sesión
setMascota({ modo, mensaje }) // controla la mascota

// Hook
export function useApp()
```

---

## Fase 2: Componentes Globales — PENDIENTE

### `src/assets/mascota.png`
Imagen 2D de la mascota. Formato PNG o SVG estático.

### `src/components/Mascota.jsx`
Componente global que persiste entre páginas. Se renderiza en `App.jsx` **fuera** de `<Routes>`.

```jsx
// Controlado via Context. Lee useApp().mascota
// Aplica clase CSS según modo: .mascota--flotando | .mascota--bounce | etc.
// Muestra .mascota__bubble solo cuando hay mensaje
<Mascota />
```

### `src/components/BotonPrimario.jsx`
```jsx
// Props: variant ('primary'|'inverted'|'ghost'), onClick, type, disabled, className, children
<BotonPrimario variant="inverted" onClick={...}>Soy Profesor</BotonPrimario>
```

### `src/components/Navbar.jsx`
```jsx
// Props: title (string)
// Muestra título + botón de logout (llama logout() del context)
<Navbar title="Dashboard Profesor" />
```

### `src/components/TypewriterText.jsx`
```jsx
// Props: text, speed (ms/char, default 30), onComplete, className
// Renderiza el texto letra por letra con setInterval
<TypewriterText text={analisis} onComplete={() => setAnalisisCompleto(true)} />
```

### `src/components/Dashboard.jsx`
```jsx
// Props: alumno, factores (string[]), showTrend (bool)
// Gráfica de barras: asistencia + tareas (Recharts BarChart)
// Gráfica de línea: tendencia de calificación (Recharts LineChart)
// Chips de factores detectados
<Dashboard alumno={alumno} factores={factores} />
```

### `src/components/ChatAgente.jsx`
```jsx
// Props: historial ([{ id, role, content }]), onSend(mensaje), loading
// Input de texto + botón Enviar
// Mensajes del agente alineados a la izquierda, del usuario a la derecha
<ChatAgente historial={historial} onSend={handleSend} loading={loading} />
```

---

## Fase 3: Páginas Comunes — PENDIENTE

### `src/pages/LandingPage.jsx` — Ruta: `/`
- `setMascota({ modo: 'entrada-derecha', mensaje: '' })`
- Fondo: `<div className="landing-gradient absolute inset-0 -z-10" />`
- Formas: `<div className="landing-shapes absolute inset-0 -z-10" />`
- Título en `font-display`, keyword "antes" envuelto en `bg-accent-lime text-ink-deep`
- Dos botones grandes: `<BotonPrimario variant="inverted">` y `<BotonPrimario variant="ghost">`

### `src/pages/LoginProfesor.jsx` — Ruta: `/login/profesor`
- `setMascota({ modo: 'bounce', mensaje: '' })`
- Campos: correo + contraseña
- Valida contra `USUARIOS_PROFESOR`
- En éxito: `login({ ...user, rol: 'profesor' })` → navigate a `/profesor/materias`

### `src/pages/LoginAlumno.jsx` — Ruta: `/login/alumno`
- `setMascota({ modo: 'bounce', mensaje: '' })`
- Campos: boleta + contraseña + CAPTCHA (suma aritmética simple en React)
- Valida contra `USUARIOS_ALUMNO`
- En éxito: `login({ ...user, rol: 'alumno' })` → navigate a `/alumno/materias`

---

## Fase 4: Flujo Profesor — PENDIENTE

### `src/pages/profesor/MateriasProfesor.jsx` — Ruta: `/profesor/materias`
- `setMascota({ modo: 'flotando', mensaje: '' })`
- Grid de cards con `MATERIAS_PROFESOR`
- Badge rojo con `en_riesgo` alumnos
- Botón "Cargar registro del grupo" (UI solo, sin funcionalidad real)
- Click en card → navigate a `/profesor/materia/${materia.id}`

### `src/pages/profesor/AlumnosMateria.jsx` — Ruta: `/profesor/materia/:id`
- `setMascota({ modo: 'flotando', mensaje: '' })`
- Lee `ALUMNOS_POR_MATERIA[id]` ordenado por riesgo: alto → medio → bajo
- Tabla con colores: `text-riesgo-alto`, `text-riesgo-medio`, `text-riesgo-bajo`
- Click en alumno `nivel_riesgo === 'alto'` → navigate a `/profesor/alumno/${alumno.boleta}`
- Click en otros → tooltip "Sin intervención requerida aún"

### `src/pages/profesor/AlumnoDetalle.jsx` — Ruta: `/profesor/alumno/:boleta` ⭐
- `setMascota({ modo: 'hablando', mensaje: '' })`
- Layout: `grid lg:grid-cols-2`
- **Izquierda:** loading state → luego `<TypewriterText text={analisis} onComplete={() => setAnalisisCompleto(true)} />`
- **Derecha:** `<Dashboard alumno={alumno} factores={analisisCompleto ? FACTORES : []} />`
- Al completar: botón "Dar seguimiento a este alumno" → abre `<Seguimiento />`
- API call: `analizarAlumno(alumno)` con fallback

### `src/pages/profesor/Seguimiento.jsx`
- Modal overlay (fixed inset-0)
- **Paso 'confirm':** "¿Enviar cuestionario a [nombre]?" + botones "Sí, enviar" / "No por ahora"
- **Paso 'sent':** "Cuestionario enviado — recibirá el link por Teams" + botón "Ver respuestas del alumno"
- Botón "Ver respuestas" → abre `<Reporte />`

### `src/pages/profesor/Reporte.jsx`
- Panel lateral (fixed inset-y-0 right-0, max-w-md)
- Llama `analizarCuestionario(alumno, RESPUESTAS_CUESTIONARIO[alumno.boleta])`
- Muestra reporte en card con texto pre-wrap
- Fallback si no hay respuestas

---

## Fase 5: Flujo Alumno — PENDIENTE

### `src/pages/alumno/MateriasAlumno.jsx` — Ruta: `/alumno/materias`
- `setMascota({ modo: 'flotando', mensaje: '' })`
- Cards de `MATERIAS_ALUMNO` con borde de color según estado:
  - `rojo` → `border-riesgo-alto bg-riesgo-alto/10`
  - `morado` → `border-iniciativa-alumno bg-iniciativa-alumno/10`
  - `verde` → `border-riesgo-bajo bg-riesgo-bajo/10`
- `rojo` → navigate a `/alumno/materia/rojo/${id}`
- `morado` → navigate a `/alumno/materia/morado/${id}`
- `verde` → tooltip "Sin anomalías detectadas esta semana"

### `src/pages/alumno/MateriaRoja.jsx` — Ruta: `/alumno/materia/rojo/:id`
- `setMascota({ modo: 'hablando', mensaje })`
- Layout: `grid lg:grid-cols-2`
- **Izquierda:** `<TypewriterText>` con mensaje al alumno (sin llamada a API, texto hardcoded)
- **Derecha:** `<Dashboard>` con datos fijos + botones de soluciones al completar

### `src/pages/alumno/MateriaMonrada.jsx` — Ruta: `/alumno/materia/morado/:id`
- `setMascota({ modo: 'hablando', mensaje: INITIAL_MESSAGE })`
- Layout: `grid lg:grid-cols-2`
- **Izquierda:** `<ChatAgente>` interactivo con `chatAgente()` multi-turno
- **Derecha:** al alcanzar 3 turnos → llama `generarGuia()` → muestra guía en card
- Fallback en error de API

---

## Fase 6: Routing Final — PENDIENTE

### `src/App.jsx`
```jsx
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Mascota from './components/Mascota.jsx';
// ... imports de páginas

export default function App() {
  return (
    <AppProvider>
      <Mascota />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/profesor" element={<LoginProfesor />} />
        <Route path="/login/alumno" element={<LoginAlumno />} />
        <Route path="/profesor/materias" element={<MateriasProfesor />} />
        <Route path="/profesor/materia/:id" element={<AlumnosMateria />} />
        <Route path="/profesor/alumno/:boleta" element={<AlumnoDetalle />} />
        <Route path="/alumno/materias" element={<MateriasAlumno />} />
        <Route path="/alumno/materia/rojo/:id" element={<MateriaRoja />} />
        <Route path="/alumno/materia/morado/:id" element={<MateriaMonrada />} />
      </Routes>
    </AppProvider>
  );
}
```

---

## Reglas para Agentes

1. **No inventar datos** — usar siempre los mocks de `mockData.js`
2. **No hardcodear colores** — usar siempre tokens Tailwind de `global.css`
3. **La mascota es global** — se renderiza en `App.jsx` fuera de `<Routes>`
4. **TypewriterText es reutilizable** — no reimplementar el efecto en cada página
5. **Todas las llamadas a API van por `anthropicService.js`** — ningún componente usa fetch directamente
6. **React Router v6** — usar `useParams`, `useNavigate`, `<Link>`
7. **Optimizado para 1280px+** — demo en pantalla de laptop/proyector
8. **Comentarios en inglés** en el código, texto de UI en español
9. **`aria-label`** en botones de ícono, **`alt`** en imágenes

---

## Credenciales de Demo

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Profesor | `profesor@ipn.mx` | `demo1234` |
| Alumno | `2021630001` (boleta) | `demo1234` |

Variable de entorno requerida: `VITE_ANTHROPIC_API_KEY`

---

## Flujo de Demo para Presentación

### Flujo Profesor
```
/ → /login/profesor → /profesor/materias
  → /profesor/materia/calc1
  → /profesor/alumno/2021630042  (Juan Pérez García — riesgo alto)
  → [análisis IA aparece] → "Dar seguimiento"
  → [modal] → "Sí, enviar" → "Ver respuestas"
  → [reporte lateral con soluciones]
```

### Flujo Alumno
```
/ → /login/alumno → /alumno/materias
  → /alumno/materia/rojo/calc1    (materia roja)
  → /alumno/materia/morado/fis1   (chat con agente → guía de estudio)
```

---

*ROADMAP.md — última actualización: Mayo 2026*
*Hackathon Universitario de Impacto Social con AI — Microsoft México*
