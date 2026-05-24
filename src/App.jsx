import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Mascota from './components/Mascota.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginProfesor from './pages/LoginProfesor.jsx';
import LoginAlumno from './pages/LoginAlumno.jsx';
import MateriasProfesor from './pages/profesor/MateriasProfesor.jsx';
import AlumnosMateria from './pages/profesor/AlumnosMateria.jsx';
import AlumnoDetalle from './pages/profesor/AlumnoDetalle.jsx';
import MateriasAlumno from './pages/alumno/MateriasAlumno.jsx';
import MateriaRoja from './pages/alumno/MateriaRoja.jsx';
import MateriaMonrada from './pages/alumno/MateriaMonrada.jsx';
import MapaConceptual from './pages/alumno/MapaConceptual.jsx';

export default function App() {
  return (
    <AppProvider>
      {/* Mascota persists across all routes — rendered outside <Routes> */}
      <Mascota />

      <Routes>
        {/* Phase 3: Public pages — no auth required */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/profesor" element={<LoginProfesor />} />
        <Route path="/login/alumno" element={<LoginAlumno />} />

        {/* Phase 4: Profesor flow — protected */}
        <Route path="/profesor/materias" element={<RequireAuth><MateriasProfesor /></RequireAuth>} />
        <Route path="/profesor/materia/:id" element={<RequireAuth><AlumnosMateria /></RequireAuth>} />
        <Route path="/profesor/alumno/:boleta" element={<RequireAuth><AlumnoDetalle /></RequireAuth>} />

        {/* Phase 5: Alumno flow — protected */}
        <Route path="/alumno/materias" element={<RequireAuth><MateriasAlumno /></RequireAuth>} />
        <Route path="/alumno/materia/rojo/:id" element={<RequireAuth><MateriaRoja /></RequireAuth>} />
        <Route path="/alumno/materia/rojo/:id/mapa" element={<RequireAuth><MapaConceptual /></RequireAuth>} />
        <Route path="/alumno/materia/morado/:id" element={<RequireAuth><MateriaMonrada /></RequireAuth>} />

        {/* Catch-all: redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}
