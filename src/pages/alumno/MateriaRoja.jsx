import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BotonPrimario from '../../components/BotonPrimario.jsx';
import Dashboard from '../../components/Dashboard.jsx';
import Navbar from '../../components/Navbar.jsx';
import TypewriterText from '../../components/TypewriterText.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { USUARIOS_ALUMNO, getMateriaAlumnoById } from '../../services/mockData.js';

const SOLUCIONES = [
  { label: 'Guía de estudio personalizada', href: '#' },
  { label: 'Información de becas IPN', href: '#' },
  { label: 'Servicio de psicología escolar', href: '#' },
];

export default function MateriaRoja() {
  const { id } = useParams();
  const { session, setMascota } = useApp();
  const materia = getMateriaAlumnoById(id);
  const nombre = session?.nombre ?? USUARIOS_ALUMNO[0].nombre;
  const [mensajeCompleto, setMensajeCompleto] = useState(false);

  const mensaje = `Hola ${nombre.split(' ')[0]}, tu profesor notó que has tenido algunas dificultades en ${materia?.nombre ?? 'esta materia'}. No te preocupes, estamos aquí para apoyarte. Detectamos declive en calificaciones, baja asistencia y tareas pendientes.`;

  useEffect(() => {
    setMascota({ modo: 'hablando', mensaje });
  }, [setMascota, mensaje]);

  if (!materia) {
    return (
      <div className="min-h-screen bg-surface-canvas-dark p-xxl text-on-primary">
        Materia no encontrada
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title={materia.nombre} />
      <main className="grid min-h-[calc(100vh-65px)] lg:grid-cols-2">
        <section className="border-r border-hairline-violet p-xxl">
          <TypewriterText
            text={mensaje}
            className="text-base leading-relaxed text-on-primary"
            onComplete={() => setMensajeCompleto(true)}
          />
        </section>

        <section className="p-xxl">
          <Dashboard
            alumno={{
              asistencia: '60%',
              tareas_entregadas: '4/8',
              calificacion_actual: 4.8,
              calificacion_parcial_anterior: 7.2,
            }}
            factores={mensajeCompleto ? ['Declive académico', 'Baja asistencia'] : []}
          />

          {mensajeCompleto && (
            <div className="mt-xxl flex flex-wrap gap-md">
              {SOLUCIONES.map((sol) => (
                <a key={sol.label} href={sol.href}>
                  <BotonPrimario variant="ghost">{sol.label}</BotonPrimario>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
