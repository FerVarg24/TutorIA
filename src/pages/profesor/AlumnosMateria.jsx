import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { ALUMNOS_POR_MATERIA, getMateriaById } from '../../services/mockData.js';
import Navbar from '../../components/Navbar.jsx';
import BotonPrimario from '../../components/BotonPrimario.jsx';

// Lower number = shown first in sorted order
const RIESGO_PRIORITY = { alto: 0, medio: 1, bajo: 2 };

const RIESGO_TEXT_CLASS = {
  alto: 'text-riesgo-alto',
  medio: 'text-riesgo-medio',
  bajo: 'text-riesgo-bajo',
};

const RIESGO_LABEL = {
  alto: 'Alto',
  medio: 'Medio',
  bajo: 'Bajo',
};

export default function AlumnosMateria() {
  const { id } = useParams();
  const { setMascota } = useApp();
  const navigate = useNavigate();

  // Tracks which non-alto boleta is showing the inline tooltip
  const [tooltipBoleta, setTooltipBoleta] = useState(null);

  useEffect(() => {
    setMascota({ modo: 'flotando', mensaje: '' });
  }, [setMascota]);

  // Auto-dismiss tooltip after 2.5 s
  useEffect(() => {
    if (!tooltipBoleta) return;
    const timer = setTimeout(() => setTooltipBoleta(null), 2500);
    return () => clearTimeout(timer);
  }, [tooltipBoleta]);

  const materia = getMateriaById(id);
  const alumnos = (ALUMNOS_POR_MATERIA[id] ?? []).slice().sort(
    (a, b) => (RIESGO_PRIORITY[a.nivel_riesgo] ?? 3) - (RIESGO_PRIORITY[b.nivel_riesgo] ?? 3),
  );

  function handleRowClick(alumno) {
    if (alumno.nivel_riesgo === 'alto') {
      navigate(`/profesor/alumno/${alumno.boleta}`);
    } else {
      setTooltipBoleta(alumno.boleta);
    }
  }

  return (
    <div className="min-h-screen bg-surface-canvas-dark">
      <Navbar title={materia?.nombre ?? 'Materia'} />

      <main className="p-xl">
        {/* Header row */}
        <div className="flex items-center justify-between mb-xl">
          <div>
            <h1 className="font-display text-3xl font-bold text-on-primary mb-xs">
              {materia?.nombre ?? 'Materia'}
            </h1>
            {materia && (
              <p className="font-ui text-on-dark-muted">
                Grupo {materia.grupo} · {materia.alumnos} alumnos
              </p>
            )}
          </div>
          <BotonPrimario variant="ghost" onClick={() => navigate('/profesor/materias')}>
            ← Volver a materias
          </BotonPrimario>
        </div>

        {alumnos.length === 0 ? (
          <p className="font-ui text-on-dark-muted">No hay alumnos registrados para esta materia.</p>
        ) : (
          <div className="bg-surface-night border border-hairline-violet rounded-xl overflow-hidden">
            <table className="w-full font-ui text-sm">
              <thead>
                <tr className="border-b border-hairline-violet text-on-dark-muted text-xs uppercase tracking-wider">
                  <th className="text-left px-xl py-md">Alumno</th>
                  <th className="text-left px-md py-md">Asistencia</th>
                  <th className="text-left px-md py-md">Tareas</th>
                  <th className="text-left px-md py-md">Calif. actual</th>
                  <th className="text-left px-md py-md">Declive</th>
                  <th className="text-left px-md py-md">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => {
                  const isAlto = alumno.nivel_riesgo === 'alto';
                  const textClass = RIESGO_TEXT_CLASS[alumno.nivel_riesgo] ?? 'text-on-primary';
                  const showTooltip = tooltipBoleta === alumno.boleta;

                  return (
                    <tr
                      key={alumno.boleta}
                      onClick={() => handleRowClick(alumno)}
                      className={[
                        'border-b border-hairline-violet/50 last:border-0 transition-colors',
                        isAlto
                          ? 'cursor-pointer hover:bg-riesgo-alto/5'
                          : 'cursor-pointer hover:bg-accent-violet/5',
                      ].join(' ')}
                    >
                      {/* Name + boleta */}
                      <td className="px-xl py-md">
                        <span className={`font-medium ${textClass}`}>{alumno.nombre}</span>
                        <br />
                        <span className="text-xs text-on-dark-muted">{alumno.boleta}</span>
                        {showTooltip && (
                          <span className="ml-md text-xs text-accent-violet font-medium animate-pulse">
                            Sin intervención requerida aún
                          </span>
                        )}
                      </td>

                      <td className={`px-md py-md ${textClass}`}>{alumno.asistencia}</td>
                      <td className={`px-md py-md ${textClass}`}>{alumno.tareas_entregadas}</td>
                      <td className={`px-md py-md ${textClass} font-bold`}>
                        {alumno.calificacion_actual}
                      </td>
                      <td className={`px-md py-md ${isAlto ? 'text-riesgo-alto font-bold' : textClass}`}>
                        {alumno.declive > 0 ? `+${alumno.declive}` : alumno.declive}
                      </td>

                      {/* Risk badge */}
                      <td className="px-md py-md">
                        <span
                          className={[
                            'rounded-xs px-sm py-xs text-xs font-bold font-ui border',
                            alumno.nivel_riesgo === 'alto'
                              ? 'bg-riesgo-alto/15 text-riesgo-alto border-riesgo-alto/30'
                              : alumno.nivel_riesgo === 'medio'
                              ? 'bg-riesgo-medio/15 text-riesgo-medio border-riesgo-medio/30'
                              : 'bg-riesgo-bajo/15 text-riesgo-bajo border-riesgo-bajo/30',
                          ].join(' ')}
                        >
                          {RIESGO_LABEL[alumno.nivel_riesgo] ?? alumno.nivel_riesgo}
                        </span>
                        {isAlto && (
                          <span className="ml-sm text-xs text-on-dark-muted">Ver detalle →</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
