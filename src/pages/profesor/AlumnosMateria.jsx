import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { ALUMNOS_POR_MATERIA, getMateriaById } from '../../services/mockData.js';

const RIESGO_ORDER = { alto: 0, medio: 1, bajo: 2 };
const RIESGO_COLORS = {
  alto: 'text-riesgo-alto',
  medio: 'text-riesgo-medio',
  bajo: 'text-riesgo-bajo',
};

export default function AlumnosMateria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMascota } = useApp();
  const materia = getMateriaById(id);
  const alumnos = [...(ALUMNOS_POR_MATERIA[id] ?? [])].sort(
    (a, b) => RIESGO_ORDER[a.nivel_riesgo] - RIESGO_ORDER[b.nivel_riesgo],
  );

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

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
      <main className="mx-auto max-w-6xl px-xl py-xxl">
        <h1 className="mb-xxl font-display text-3xl font-bold text-on-primary">
          Alumnos — Grupo {materia.grupo}
        </h1>

        <div className="overflow-x-auto rounded-xxl border border-hairline-violet">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-night text-on-dark-muted">
              <tr>
                <th className="px-lg py-md">Alumno</th>
                <th className="px-lg py-md">Boleta</th>
                <th className="px-lg py-md">Asistencia</th>
                <th className="px-lg py-md">Tareas</th>
                <th className="px-lg py-md">Calificación</th>
                <th className="px-lg py-md">Riesgo</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => {
                const isAlto = alumno.nivel_riesgo === 'alto';
                const rowContent = (
                  <>
                    <td className="px-lg py-md text-on-primary">{alumno.nombre}</td>
                    <td className="px-lg py-md text-on-dark-muted">{alumno.boleta}</td>
                    <td className="px-lg py-md text-on-dark-muted">{alumno.asistencia}</td>
                    <td className="px-lg py-md text-on-dark-muted">{alumno.tareas_entregadas}</td>
                    <td className="px-lg py-md text-on-dark-muted">{alumno.calificacion_actual}</td>
                    <td className={`px-lg py-md font-semibold capitalize ${RIESGO_COLORS[alumno.nivel_riesgo]}`}>
                      {alumno.nivel_riesgo}
                    </td>
                  </>
                );

                return (
                  <tr
                    key={alumno.boleta}
                    className={`border-t border-hairline-violet bg-ink-deep ${
                      isAlto ? 'cursor-pointer hover:bg-accent-violet-deep/20' : ''
                    }`}
                    title={isAlto ? undefined : 'Sin intervención requerida aún'}
                    onClick={() => {
                      if (isAlto) navigate(`/profesor/alumno/${alumno.boleta}`);
                    }}
                  >
                    {rowContent}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
