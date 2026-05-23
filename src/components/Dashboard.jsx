import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Dashboard({ alumno, factores = [], showTrend = true }) {
  if (!alumno) return null;

  const asistenciaValue = parseInt(alumno.asistencia, 10) || 0;
  const tareasParts = alumno.tareas_entregadas?.split('/') ?? [0, 1];
  const tareasValue = Math.round((Number(tareasParts[0]) / Number(tareasParts[1])) * 100);

  const indicadores = [
    { name: 'Asistencia', value: asistenciaValue },
    { name: 'Tareas', value: tareasValue },
  ];

  const trendData = [
    { periodo: 'Parcial anterior', calificacion: alumno.calificacion_parcial_anterior },
    { periodo: 'Actual', calificacion: alumno.calificacion_actual },
  ];

  return (
    <div className="flex flex-col gap-xl">
      <section>
        <h3 className="mb-md font-display text-lg font-medium text-on-primary">
          Indicadores de riesgo
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={indicadores}>
            <CartesianGrid strokeDasharray="3 3" stroke="#362d59" />
            <XAxis dataKey="name" stroke="#bdb8c0" />
            <YAxis stroke="#bdb8c0" domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#6a5fc1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {showTrend && (
        <section>
          <h3 className="mb-md font-display text-lg font-medium text-on-primary">
            Tendencia de calificación
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#362d59" />
              <XAxis dataKey="periodo" stroke="#bdb8c0" />
              <YAxis stroke="#bdb8c0" domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="calificacion" stroke="#c2ef4e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {factores.length > 0 && (
        <section>
          <h3 className="mb-md font-display text-lg font-medium text-on-primary">
            Factores detectados
          </h3>
          <div className="flex flex-wrap gap-sm">
            {factores.map((factor) => (
              <span
                key={factor}
                className="rounded-xs bg-accent-violet-deep px-md py-xs text-sm text-on-primary"
              >
                {factor}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
