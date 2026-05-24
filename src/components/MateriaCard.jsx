import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowRight, Atom, BookOpen, Calculator, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const MATERIA_ICONS = {
  calc1: Calculator,
  fis1: Atom,
  prog1: Code2,
};

const cardVariants = cva(
  'relative w-full text-left border rounded-xl p-xl cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        'alumno-rojo':
          'bg-gradient-to-br from-riesgo-alto/12 via-riesgo-alto/5 to-white border-riesgo-alto/25 hover:border-riesgo-alto/40 hover:shadow-md',
        'alumno-morado':
          'bg-gradient-to-br from-iniciativa-alumno/12 via-iniciativa-alumno/5 to-white border-iniciativa-alumno/25 hover:border-iniciativa-alumno/40 hover:shadow-md',
        'alumno-verde':
          'bg-exito-surface border-exito-border hover:border-exito-text/40 hover:shadow-md',
        profesor:
          'bg-gradient-to-br from-accent-violet/10 via-accent-violet/5 to-white border-hairline-violet hover:border-accent-violet hover:shadow-md',
      },
    },
    defaultVariants: {
      variant: 'profesor',
    },
  },
);

const badgeVariants = cva(
  'shrink-0 border rounded-full px-sm py-xs text-xs font-bold font-ui whitespace-nowrap',
  {
    variants: {
      variant: {
        'alumno-rojo': 'bg-riesgo-alto/20 text-riesgo-alto border-riesgo-alto/30',
        'alumno-morado': 'bg-iniciativa-alumno/20 text-iniciativa-alumno border-iniciativa-alumno/30',
        'alumno-verde': 'bg-exito-surface-strong text-exito-text border-exito-border font-semibold',
        profesor: 'bg-riesgo-alto/20 text-riesgo-alto border-riesgo-alto/30',
      },
    },
    defaultVariants: {
      variant: 'profesor',
    },
  },
);

const ctaVariants = cva(
  'mt-lg w-full flex items-center justify-center gap-sm rounded-lg px-md py-sm text-sm font-semibold font-ui transition-colors',
  {
    variants: {
      variant: {
        'alumno-rojo': 'bg-riesgo-alto/10 text-riesgo-alto group-hover:bg-riesgo-alto/15',
        'alumno-morado': 'bg-iniciativa-alumno/10 text-iniciativa-alumno group-hover:bg-iniciativa-alumno/15',
        'alumno-verde': 'bg-exito-surface-strong text-exito-text-deep cursor-default',
        profesor: 'bg-accent-violet/10 text-accent-violet-deep group-hover:bg-accent-violet/15',
      },
      disabled: {
        true: 'opacity-60',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'profesor',
      disabled: false,
    },
  },
);

function MateriaIcon({ materiaId, variant }) {
  const Icon = MATERIA_ICONS[materiaId] ?? BookOpen;
  const isVerde = variant === 'alumno-verde';
  const iconColor =
    variant === 'alumno-rojo'
      ? 'text-riesgo-alto'
      : variant === 'alumno-morado'
        ? 'text-iniciativa-alumno'
        : isVerde
          ? 'text-exito-text'
          : 'text-accent-violet-deep';

  return (
    <div
      className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
        isVerde ? 'bg-exito-surface-strong' : 'bg-accent-violet/10',
      )}
    >
      <Icon className={cn('h-5 w-5', iconColor)} aria-hidden />
    </div>
  );
}

function PulseDot({ className }) {
  return (
    <span className={cn('relative flex h-2.5 w-2.5 shrink-0', className)} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-riesgo-alto opacity-60" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-riesgo-alto" />
    </span>
  );
}

function PromedioBar({ promedio }) {
  const pct = Math.min(100, Math.max(0, (promedio / 10) * 100));
  const isGood = promedio >= 7;
  const barColor = promedio < 6
    ? 'bg-riesgo-alto'
    : promedio < 7
      ? 'bg-riesgo-medio'
      : isGood
        ? 'bg-exito-text'
        : 'bg-riesgo-bajo';
  const textColor = promedio < 6
    ? 'text-riesgo-alto'
    : promedio < 7
      ? 'text-riesgo-medio'
      : isGood
        ? 'text-exito-text-deep'
        : 'text-riesgo-bajo';

  return (
    <div className="mb-lg">
      <div className="mb-sm flex items-center justify-between gap-md">
        <span className="font-ui text-xs text-on-dark-muted">Promedio parcial</span>
        <span className={cn('font-display text-lg font-bold tabular-nums', textColor)}>
          {promedio.toFixed(1)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-hairline-violet/60">
        <div
          className={cn('h-full rounded-full transition-all', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RiskBar({ enRiesgo, total }) {
  const pct = total > 0 ? Math.round((enRiesgo / total) * 100) : 0;
  const barColor =
    pct >= 20 ? 'bg-riesgo-alto' : pct >= 10 ? 'bg-riesgo-medio' : 'bg-riesgo-bajo';

  return (
    <div className="mb-md">
      <div className="mb-sm flex items-center justify-between gap-md">
        <span className="font-ui text-xs text-on-dark-muted">Riesgo del grupo</span>
        <span className="font-ui text-xs font-semibold text-on-dark-muted">{pct}% del grupo</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-hairline-violet/60">
        <div
          className={cn('h-full rounded-full transition-all', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function RiskBreakdown({ alto, medio, bajo }) {
  return (
    <div className="mb-lg flex flex-wrap gap-sm">
      <span className="rounded-full border border-riesgo-alto/30 bg-riesgo-alto/10 px-sm py-xs font-ui text-xs font-semibold text-riesgo-alto">
        {alto} alto
      </span>
      <span className="rounded-full border border-riesgo-medio/30 bg-riesgo-medio/10 px-sm py-xs font-ui text-xs font-semibold text-riesgo-medio">
        {medio} medio
      </span>
      <span className="rounded-full border border-riesgo-bajo/30 bg-riesgo-bajo/10 px-sm py-xs font-ui text-xs font-semibold text-riesgo-bajo">
        {bajo} bajo
      </span>
    </div>
  );
}

export default function MateriaCard({
  materiaId,
  nombre,
  variant,
  badge,
  meta = [],
  parcial,
  promedio,
  resumenRiesgo,
  cta,
  ctaDisabled = false,
  tooltip,
  showPulse = false,
  index = 0,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn('group', cardVariants({ variant }))}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={ctaDisabled ? undefined : { y: -3, scale: 1.01 }}
      whileTap={ctaDisabled ? undefined : { scale: 0.99 }}
    >
      <div className="mb-md flex items-start gap-md">
        <MateriaIcon materiaId={materiaId} variant={variant} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-sm">
            <h2 className="font-display text-lg font-semibold leading-snug text-ink-deep group-hover:text-primary transition-colors">
              {nombre}
            </h2>
            <div className="flex items-center gap-xs">
              {showPulse && <PulseDot />}
              <span className={badgeVariants({ variant })}>{badge}</span>
            </div>
          </div>

          {meta.length > 0 && (
            <p className="mt-xs font-ui text-sm text-on-dark-muted">
              {meta.map((line, i) => (
                <span key={i}>
                  {i > 0 && ' · '}
                  {line}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      {parcial != null && promedio != null && (
        <>
          <p className="mb-sm font-ui text-xs text-on-dark-muted">Parcial {parcial}</p>
          <PromedioBar promedio={promedio} />
        </>
      )}

      {resumenRiesgo && (
        <>
          <RiskBar enRiesgo={resumenRiesgo.en_riesgo} total={resumenRiesgo.total} />
          <RiskBreakdown
            alto={resumenRiesgo.alto}
            medio={resumenRiesgo.medio}
            bajo={resumenRiesgo.bajo}
          />
        </>
      )}

      {tooltip && (
        <p className="mb-sm font-ui text-xs font-medium text-exito-text animate-pulse">
          {tooltip}
        </p>
      )}

      {cta && (
        <div className={ctaVariants({ variant, disabled: ctaDisabled && variant !== 'alumno-verde' })}>
          {cta}
          {!ctaDisabled && <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />}
        </div>
      )}
    </motion.button>
  );
}
