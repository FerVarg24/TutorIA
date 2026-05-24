import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { CalendarCheck, ClipboardList, GraduationCap, TrendingDown } from 'lucide-react';
import GlassPanel from './ui/GlassPanel.jsx';
import { cn } from '@/lib/utils';

function AnimatedNumber({ value, decimals = 0, suffix = '' }) {
  const spring = useSpring(0, { stiffness: 80, damping: 18 });
  const display = useTransform(spring, (v) => {
    const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${formatted}${suffix}`;
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

function KpiCard({ icon: Icon, label, value, suffix, decimals, accentClass, variant }) {
  return (
    <GlassPanel
      variant={variant}
      padding="md"
      className="flex flex-col gap-sm min-w-0 flex-1"
    >
      <div className="flex items-center gap-sm">
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
            accentClass,
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <span className="font-ui text-xs text-on-dark-muted truncate">{label}</span>
      </div>
      <p className="font-display text-2xl font-semibold text-ink-deep tabular-nums">
        <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
      </p>
    </GlassPanel>
  );
}

function parseAsistencia(value) {
  if (typeof value === 'number') return value;
  const match = String(value ?? '').match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function parseTareas(value) {
  const str = String(value ?? '');
  const match = str.match(/(\d+)\s*\/\s*(\d+)/);
  if (match) return { entregadas: Number(match[1]), total: Number(match[2]) };
  return { entregadas: 0, total: 8 };
}

export default function KpiStrip({ alumno, variant = 'rojo', className }) {
  if (!alumno) return null;

  const asistenciaPct = parseAsistencia(alumno.asistencia);
  const { entregadas, total } = parseTareas(alumno.tareas_entregadas);
  const calificacion = alumno.calificacion_actual ?? 0;
  const declive = alumno.declive ?? 0;

  const accentMap = {
    rojo: 'bg-riesgo-alto/15 text-riesgo-alto',
    morado: 'bg-iniciativa-alumno/15 text-iniciativa-alumno',
    profesor: 'bg-accent-violet/15 text-accent-violet-deep',
  };

  const accent = accentMap[variant] ?? accentMap.rojo;

  return (
    <div className={cn('grid min-w-0 w-full grid-cols-2 gap-md lg:grid-cols-4', className)}>
      <KpiCard
        icon={CalendarCheck}
        label="Asistencia"
        value={asistenciaPct}
        suffix="%"
        accentClass={accent}
        variant={variant}
      />
      <KpiCard
        icon={ClipboardList}
        label="Tareas entregadas"
        value={entregadas}
        suffix={`/${total}`}
        accentClass={accent}
        variant={variant}
      />
      <KpiCard
        icon={GraduationCap}
        label="Calificación actual"
        value={calificacion}
        decimals={1}
        accentClass={accent}
        variant={variant}
      />
      <KpiCard
        icon={TrendingDown}
        label="Declive parcial"
        value={Math.abs(declive)}
        decimals={1}
        suffix={declive >= 0 ? ' ↑' : ' ↓'}
        accentClass={accent}
        variant={variant}
      />
    </div>
  );
}
