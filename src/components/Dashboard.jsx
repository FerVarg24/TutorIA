import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import {
  getAsistenciaSemanal,
  getCalificacionesPorTarea,
  getDominioPorTema,
  getEstadoEntregas,
  getFactoresRiesgo,
  getMateriaIdByBoleta,
  getTendenciaConGrupo,
} from '../services/mockData.js';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart.jsx';

const COLOR_APROBADO = '#4fe97a';
const COLOR_REPROBADO = '#e94f4f';
const COLOR_NO_ENTREGADA = '#94A3B8';
const COLOR_VIOLET = '#8B5CF6';
const COLOR_LIME = '#F59E0B';
const COLOR_RIESGO = '#e94f4f';
const MIN_APROBATORIO = 6;

const CHART_ENTER_EASE = [0.22, 1, 0.36, 1];
const CHART_STAGGER_DELAY = 0.12;
const CHART_ENTER_DURATION = 0.55;

const dashboardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: CHART_STAGGER_DELAY },
  },
};

function getTaskBarColor(tarea) {
  if (!tarea.entregada) return COLOR_NO_ENTREGADA;
  if (tarea.calificacion >= MIN_APROBATORIO) return COLOR_APROBADO;
  return COLOR_REPROBADO;
}

const GLASS_TOOLTIP =
  'border-hairline-violet/80 bg-white/90 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.12)]';

const CHART_HEADER_GRADIENT = {
  radar: 'bg-gradient-to-r from-accent-violet/10 via-transparent to-transparent',
  entregas: 'bg-gradient-to-r from-exito-surface/80 via-transparent to-transparent',
  tareas: 'bg-gradient-to-r from-accent-violet/8 via-transparent to-transparent',
  asistencia: 'bg-gradient-to-r from-accent-lime/20 via-transparent to-transparent',
  tendencia: 'bg-gradient-to-r from-riesgo-alto/8 via-transparent to-transparent',
  parcial: 'bg-gradient-to-r from-accent-violet/10 via-transparent to-transparent',
  riesgo: 'bg-gradient-to-r from-riesgo-alto/10 via-transparent to-transparent',
};

function ChartCard({
  title,
  description,
  children,
  className = '',
  accent = 'radar',
  featured = false,
}) {
  return (
    <Card
      elevated
      className={cn(
        'min-w-0 w-full',
        featured && 'lg:shadow-[0_12px_40px_rgba(15,23,42,0.1)] lg:ring-1 lg:ring-accent-violet/15',
        className,
      )}
    >
      <CardHeader className={cn('rounded-t-xl', CHART_HEADER_GRADIENT[accent])}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ChartPlaceholder({ className }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-surface-canvas-light/60', className)}
      aria-hidden="true"
    />
  );
}

function useChartReveal() {
  const reduceMotion = useReducedMotion();
  const skipMotion = reduceMotion === true;
  const [chartReady, setChartReady] = useState(skipMotion);

  useEffect(() => {
    setChartReady(skipMotion);
  }, [skipMotion]);

  const revealChart = () => {
    setChartReady(true);
  };

  return { skipMotion, chartReady, revealChart };
}

function AnimatedChartCard({
  index,
  title,
  description,
  children,
  className = '',
  accent = 'radar',
  featured = false,
  chartClassName = '',
}) {
  const { skipMotion, chartReady, revealChart } = useChartReveal();

  return (
    <motion.div
      initial={skipMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: CHART_ENTER_DURATION,
        delay: skipMotion ? 0 : index * CHART_STAGGER_DELAY,
        ease: CHART_ENTER_EASE,
      }}
      onAnimationComplete={skipMotion ? undefined : revealChart}
    >
      <ChartCard
        title={title}
        description={description}
        accent={accent}
        featured={featured}
        className={className}
      >
        {chartReady ? children : <ChartPlaceholder className={chartClassName} />}
      </ChartCard>
    </motion.div>
  );
}

function AnimatedSectionCard({ index, title, accent = 'riesgo', children }) {
  const reduceMotion = useReducedMotion();
  const skipMotion = reduceMotion === true;

  return (
    <motion.div
      initial={skipMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: CHART_ENTER_DURATION,
        delay: skipMotion ? 0 : index * CHART_STAGGER_DELAY,
        ease: CHART_ENTER_EASE,
      }}
    >
      <Card elevated className="min-w-0 w-full">
        <CardHeader className={cn('rounded-t-xl', CHART_HEADER_GRADIENT[accent])}>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{children}</CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Academic dashboard with shadcn chart components.
 * Props:
 *   alumno    — student object
 *   materiaId — subject id for granular data (defaults to first enrollment)
 *   factores  — risk factor labels (chips)
 *   showTrend — kept for compatibility; trend chart always shown when alumno exists
 */
export default function Dashboard({
  alumno,
  materiaId: materiaIdProp,
  factores = [],
  showTrend = true,
}) {
  if (!alumno) return null;

  const materiaId = materiaIdProp ?? getMateriaIdByBoleta(alumno.boleta);
  const animationKey = `${alumno.boleta}-${materiaId}`;

  const tareas = getCalificacionesPorTarea(alumno.boleta, materiaId);
  const dominioPorTema = getDominioPorTema(alumno.boleta, materiaId);
  const asistenciaSemanal = getAsistenciaSemanal(alumno.boleta, materiaId).map((row) => ({
    semana: row.semana,
    asistencia: Math.round((row.asistio / row.total) * 100),
    asistio: row.asistio,
    total: row.total,
  }));
  const tendenciaConGrupo = getTendenciaConGrupo(alumno.boleta, materiaId);
  const estadoEntregas = getEstadoEntregas(alumno.boleta, materiaId);
  const riskFactors = factores.length > 0 ? factores : getFactoresRiesgo(alumno.boleta);

  const tareasChartData = tareas.map((tarea) => ({
    tarea: `T${tarea.id}`,
    nombre: tarea.nombre,
    calificacion: tarea.entregada && tarea.calificacion != null ? tarea.calificacion : 0,
    entregada: tarea.entregada,
    fill: getTaskBarColor(tarea),
  }));

  const entregasChartData = [
    { estado: 'aprobadas', cantidad: estadoEntregas.aprobadas, fill: 'var(--color-aprobadas)' },
    { estado: 'reprobadas', cantidad: estadoEntregas.reprobadas, fill: 'var(--color-reprobadas)' },
    { estado: 'noEntregadas', cantidad: estadoEntregas.noEntregadas, fill: 'var(--color-noEntregadas)' },
  ].filter((item) => item.cantidad > 0);

  const parcialChartData = [
    {
      periodo: 'Parcial anterior',
      calificacion: alumno.calificacion_parcial_anterior,
    },
    {
      periodo: 'Parcial actual',
      calificacion: alumno.calificacion_actual,
    },
  ];

  const radarConfig = {
    promedio: { label: 'Promedio', color: COLOR_VIOLET },
  };

  const tareasConfig = {
    calificacion: { label: 'Calificación', color: COLOR_VIOLET },
  };

  const asistenciaConfig = {
    asistencia: { label: 'Asistencia', color: COLOR_LIME },
  };

  const tendenciaConfig = {
    calificacion: { label: 'Alumno', color: COLOR_RIESGO },
    promedioGrupo: { label: 'Promedio del grupo', color: COLOR_VIOLET },
  };

  const entregasConfig = {
    aprobadas: { label: 'Aprobadas', color: COLOR_APROBADO },
    reprobadas: { label: 'Reprobadas', color: COLOR_REPROBADO },
    noEntregadas: { label: 'No entregadas', color: COLOR_NO_ENTREGADA },
  };

  const parcialConfig = {
    calificacion: { label: 'Calificación', color: COLOR_VIOLET },
  };

  return (
    <motion.div
      className="flex min-w-0 w-full flex-col gap-xl"
      initial="hidden"
      animate="visible"
      variants={dashboardContainerVariants}
    >
      {/* Row 1: Radar + Donut */}
      <div className="grid min-w-0 gap-xl lg:grid-cols-[1.4fr_1fr]">
        <AnimatedChartCard
          key={`${animationKey}-0`}
          index={0}
          title="Dominio por tema"
          description="Promedio por área temática — identifica en qué unidades falla el alumno"
          accent="radar"
          featured
          chartClassName="mx-auto aspect-square max-h-[280px]"
        >
          <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-[280px]">
            <RadarChart data={dominioPorTema}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis
                dataKey="tema"
                tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Rubik' }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className={GLASS_TOOLTIP}
                    formatter={(value) => [`${value}`, 'Promedio']}
                  />
                }
              />
              <Radar
                dataKey="promedio"
                stroke="var(--color-promedio)"
                fill="var(--color-promedio)"
                fillOpacity={0.35}
                strokeWidth={2}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </RadarChart>
          </ChartContainer>
        </AnimatedChartCard>

        <AnimatedChartCard
          key={`${animationKey}-1`}
          index={1}
          title="Estado de entregas"
          description={`${estadoEntregas.total} tareas en el parcial`}
          accent="entregas"
          featured
          chartClassName="mx-auto aspect-square max-h-[280px]"
        >
          <ChartContainer config={entregasConfig} className="mx-auto aspect-square max-h-[280px]">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className={GLASS_TOOLTIP}
                    nameKey="estado"
                    formatter={(value, name) => {
                      const labels = {
                        aprobadas: 'Aprobadas',
                        reprobadas: 'Reprobadas',
                        noEntregadas: 'No entregadas',
                      };
                      return [`${value} tareas`, labels[name] ?? name];
                    }}
                  />
                }
              />
              <Pie
                data={entregasChartData}
                dataKey="cantidad"
                nameKey="estado"
                innerRadius={55}
                outerRadius={90}
                strokeWidth={2}
                stroke="#FFFFFF"
                animationDuration={650}
                animationEasing="ease-out"
              >
                {entregasChartData.map((entry) => (
                  <Cell key={entry.estado} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="cantidad"
                  className="fill-ink-deep font-ui text-xs"
                  stroke="none"
                  formatter={(value) => (value > 0 ? value : '')}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="estado" />} />
            </PieChart>
          </ChartContainer>
        </AnimatedChartCard>
      </div>

      {/* Row 2: Bar chart per task (full width) */}
      <AnimatedChartCard
        key={`${animationKey}-2`}
        index={2}
        title="Calificación por tarea"
        description="Evolución cronológica — verde ≥6, rojo <6, gris = no entregada"
        accent="tareas"
        chartClassName="aspect-[2/1] max-h-[260px] w-full"
      >
        <ChartContainer config={tareasConfig} className="aspect-[2/1] max-h-[260px] w-full">
          <BarChart data={tareasChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="4 4" />
            <XAxis
              dataKey="tarea"
              tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine
              y={MIN_APROBATORIO}
              stroke={COLOR_RIESGO}
              strokeDasharray="4 4"
              label={{
                value: 'Mín. 6.0',
                position: 'insideTopRight',
                fill: COLOR_RIESGO,
                fontSize: 11,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className={GLASS_TOOLTIP}
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.nombre ?? ''}
                  formatter={(value, _name, item) => {
                    if (!item.payload.entregada) return ['No entregada', 'Estado'];
                    return [`${value}`, 'Calificación'];
                  }}
                />
              }
            />
            <Bar
              dataKey="calificacion"
              radius={[4, 4, 0, 0]}
              animationDuration={700}
              animationEasing="ease-out"
            >
              {tareasChartData.map((entry) => (
                <Cell key={entry.tarea} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-md flex flex-wrap gap-lg font-ui text-xs text-on-dark-muted">
          <span className="flex items-center gap-xs">
            <span className="inline-block h-3 w-3 rounded-xs" style={{ background: COLOR_APROBADO }} />
            Aprobada (≥6)
          </span>
          <span className="flex items-center gap-xs">
            <span className="inline-block h-3 w-3 rounded-xs" style={{ background: COLOR_REPROBADO }} />
            Reprobada (&lt;6)
          </span>
          <span className="flex items-center gap-xs">
            <span className="inline-block h-3 w-3 rounded-xs" style={{ background: COLOR_NO_ENTREGADA }} />
            No entregada
          </span>
        </div>
      </AnimatedChartCard>

      {/* Row 3: Area + Line */}
      <div className="grid min-w-0 gap-xl lg:grid-cols-2">
        <AnimatedChartCard
          key={`${animationKey}-3`}
          index={3}
          title="Asistencia semanal"
          description="Patrón de inasistencias a lo largo del parcial"
          accent="asistencia"
          chartClassName="aspect-[4/3] max-h-[240px] w-full"
        >
          <ChartContainer config={asistenciaConfig} className="aspect-[4/3] max-h-[240px] w-full">
            <AreaChart data={asistenciaSemanal}>
              <defs>
                <linearGradient id="fillAsistencia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLOR_LIME} stopOpacity={0.45} />
                  <stop offset="95%" stopColor={COLOR_LIME} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="4 4" />
              <XAxis
                dataKey="semana"
                tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className={GLASS_TOOLTIP}
                    formatter={(value, _name, item) => [
                      `${value}% (${item.payload.asistio}/${item.payload.total} clases)`,
                      'Asistencia',
                    ]}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="asistencia"
                stroke={COLOR_LIME}
                fill="url(#fillAsistencia)"
                strokeWidth={2}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ChartContainer>
        </AnimatedChartCard>

        {showTrend && (
          <AnimatedChartCard
            key={`${animationKey}-4`}
            index={4}
            title="Tendencia vs promedio del grupo"
            description="Compara el rendimiento individual con el resto del grupo"
            accent="tendencia"
            chartClassName="aspect-[4/3] max-h-[240px] w-full"
          >
            <ChartContainer config={tendenciaConfig} className="aspect-[4/3] max-h-[240px] w-full">
              <LineChart data={tendenciaConGrupo}>
                <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="4 4" />
                <XAxis
                  dataKey="semana"
                  tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
                  axisLine={false}
                  tickLine={false}
                />
                <ReferenceLine
                  y={MIN_APROBATORIO}
                  stroke={COLOR_RIESGO}
                  strokeDasharray="4 4"
                />
                <ChartTooltip content={<ChartTooltipContent className={GLASS_TOOLTIP} />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="calificacion"
                  stroke="var(--color-calificacion)"
                  strokeWidth={2.5}
                  dot={{ fill: COLOR_RIESGO, r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="promedioGrupo"
                  stroke="var(--color-promedioGrupo)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={{ fill: COLOR_VIOLET, r: 3 }}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ChartContainer>
          </AnimatedChartCard>
        )}
      </div>

      {/* Row 4: Partial comparison */}
      <AnimatedChartCard
        key={`${animationKey}-5`}
        index={5}
        title="Parcial anterior vs actual"
        description={`Declive de ${alumno.declive > 0 ? '+' : ''}${alumno.declive} puntos`}
        accent="parcial"
        chartClassName="aspect-[3/1] max-h-[200px] w-full"
      >
        <ChartContainer config={parcialConfig} className="aspect-[3/1] max-h-[200px] w-full">
          <BarChart data={parcialChartData} barCategoryGap="35%">
            <CartesianGrid vertical={false} stroke="#E2E8F0" strokeDasharray="4 4" />
            <XAxis
              dataKey="periodo"
              tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'Rubik' }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine y={MIN_APROBATORIO} stroke={COLOR_RIESGO} strokeDasharray="4 4" />
            <ChartTooltip content={<ChartTooltipContent className={GLASS_TOOLTIP} />} />
            <Bar
              dataKey="calificacion"
              fill="var(--color-calificacion)"
              radius={[6, 6, 0, 0]}
              animationDuration={700}
              animationEasing="ease-out"
            >
              {parcialChartData.map((entry) => (
                <Cell
                  key={entry.periodo}
                  fill={
                    entry.periodo === 'Parcial actual' && entry.calificacion < MIN_APROBATORIO
                      ? COLOR_RIESGO
                      : entry.periodo === 'Parcial actual'
                        ? COLOR_VIOLET
                        : COLOR_LIME
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </AnimatedChartCard>

      {/* Row 5: Risk factors */}
      {riskFactors.length > 0 && (
        <AnimatedSectionCard
          key={`${animationKey}-6`}
          index={6}
          title="Factores de riesgo detectados"
        >
          <div className="flex flex-wrap gap-sm">
            {riskFactors.map((factor) => (
              <span
                key={factor}
                className="rounded-xs border border-riesgo-alto/30 bg-riesgo-alto/20 px-sm py-xs font-ui text-sm text-riesgo-alto"
              >
                {factor}
              </span>
            ))}
          </div>
        </AnimatedSectionCard>
      )}
    </motion.div>
  );
}
