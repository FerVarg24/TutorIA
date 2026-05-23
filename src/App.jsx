import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Mascota from './components/Mascota.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginProfesor from './pages/LoginProfesor.jsx';
import LoginAlumno from './pages/LoginAlumno.jsx';
import MateriasProfesor from './pages/profesor/MateriasProfesor.jsx';
import AlumnosMateria from './pages/profesor/AlumnosMateria.jsx';
import AlumnoDetalle from './pages/profesor/AlumnoDetalle.jsx';
import MateriasAlumno from './pages/alumno/MateriasAlumno.jsx';
import MateriaRoja from './pages/alumno/MateriaRoja.jsx';
import MateriaMonrada from './pages/alumno/MateriaMonrada.jsx';

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
