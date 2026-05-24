import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { getTendencia, getFactoresRiesgo } from '../services/mockData.js';

// Design-token hex values used as recharts color props (cannot use Tailwind classes inside SVG attrs)
const COLOR_LIME   = '#c2ef4e'; // accent-lime
const COLOR_VIOLET = '#6a5fc1'; // accent-violet
const COLOR_RIESGO = '#e94f4f'; // riesgo-alto

/**
 * Parses "60%" → 60
 */
function parsePercent(str) {
  if (!str) return 0;
  return parseFloat(str.replace('%', ''));
}

/**
 * Parses "4/8" → 50  (returns percentage)
 */
function parseFraction(str) {
  if (!str) return 0;
  const [num, den] = str.split('/').map(Number);
  if (!den) return 0;
  return Math.round((num / den) * 100);
}

/**
 * Custom tooltip styling for Recharts.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-night border border-hairline-violet rounded-md px-md py-sm text-sm font-ui">
      <p className="text-on-dark-muted mb-xs">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}%</span>
        </p>
      ))}
    </div>
  );
}

function CustomLineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-night border border-hairline-violet rounded-md px-md py-sm text-sm font-ui">
      <p className="text-on-dark-muted mb-xs">{label}</p>
      <p style={{ color: COLOR_RIESGO }}>
        Calificación: <span className="font-bold">{payload[0]?.value}</span>
      </p>
    </div>
  );
}

/**
 * Reusable academic dashboard.
 * Props:
 *   alumno    — student object with boleta, asistencia, tareas_entregadas, etc.
 *   factores  — string[] of risk factor labels to display as chips
 *   showTrend — whether to render the grade trend LineChart (default: false)
 */
export default function Dashboard({ alumno, factores = [], showTrend = false }) {
  if (!alumno) return null;

  const asistenciaVal  = parsePercent(alumno.asistencia);
  const tareasVal      = parseFraction(alumno.tareas_entregadas);
  const barData = [
    { name: 'Asistencia',  asistencia: asistenciaVal },
    { name: 'Tareas',      tareas: tareasVal },
  ];

  const trendData    = getTendencia(alumno.boleta);
  const riskFactors  = factores.length > 0 ? factores : getFactoresRiesgo(alumno.boleta);

  return (
    <div className="flex flex-col gap-xl">
      {/* ── Section 1: Bar chart ── */}
      <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl">
        <h3 className="font-display text-on-primary font-semibold mb-lg">
          Indicadores académicos
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barCategoryGap="30%" barGap={4}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#bdb8c0', fontSize: 13, fontFamily: 'Rubik' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#bdb8c0', fontSize: 12, fontFamily: 'Rubik' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(106,95,193,0.1)' }} />
            <Bar dataKey="asistencia" name="Asistencia" fill={COLOR_LIME}  radius={[4, 4, 0, 0]} />
            <Bar dataKey="tareas"     name="Tareas"     fill={COLOR_VIOLET} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex gap-lg mt-md">
          <span className="flex items-center gap-xs font-ui text-xs text-on-dark-muted">
            <span className="w-3 h-3 rounded-xs inline-block" style={{ background: COLOR_LIME }} />
            Asistencia
          </span>
          <span className="flex items-center gap-xs font-ui text-xs text-on-dark-muted">
            <span className="w-3 h-3 rounded-xs inline-block" style={{ background: COLOR_VIOLET }} />
            Tareas entregadas
          </span>
        </div>
      </div>

      {/* ── Section 2: Trend line (optional) ── */}
      {showTrend && (
        <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl">
          <h3 className="font-display text-on-primary font-semibold mb-lg">
            Tendencia de calificación
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <XAxis
                dataKey="semana"
                tick={{ fill: '#bdb8c0', fontSize: 12, fontFamily: 'Rubik' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fill: '#bdb8c0', fontSize: 12, fontFamily: 'Rubik' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: 'rgba(233,79,79,0.3)' }} />
              <Line
                type="monotone"
                dataKey="calificacion"
                stroke={COLOR_RIESGO}
                strokeWidth={2.5}
                dot={{ fill: COLOR_RIESGO, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Section 3: Risk factor chips ── */}
      {riskFactors.length > 0 && (
        <div className="bg-surface-night border border-hairline-violet rounded-xl p-xl">
          <h3 className="font-display text-on-primary font-semibold mb-md">
            Factores de riesgo detectados
          </h3>
          <div className="flex flex-wrap gap-sm">
            {riskFactors.map((factor) => (
              <span
                key={factor}
                className="bg-riesgo-alto/20 text-riesgo-alto border border-riesgo-alto/30 rounded-xs px-sm py-xs text-sm font-ui"
              >
                {factor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
