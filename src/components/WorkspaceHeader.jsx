import { cva } from 'class-variance-authority';
import GlassPanel from './ui/GlassPanel.jsx';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'ml-auto shrink-0 rounded-full border px-sm py-xs text-xs font-bold font-ui whitespace-nowrap backdrop-blur-sm',
  {
    variants: {
      variant: {
        rojo: 'bg-riesgo-alto/15 text-riesgo-alto border-riesgo-alto/30',
        morado: 'bg-iniciativa-alumno/15 text-iniciativa-alumno border-iniciativa-alumno/30',
        profesor: 'bg-riesgo-alto/15 text-riesgo-alto border-riesgo-alto/30',
      },
    },
    defaultVariants: {
      variant: 'rojo',
    },
  },
);

const avatarVariants = cva(
  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-bold font-display',
  {
    variants: {
      variant: {
        rojo: 'bg-riesgo-alto/20 border-riesgo-alto/40 text-riesgo-alto',
        morado: 'bg-iniciativa-alumno/20 border-iniciativa-alumno/40 text-iniciativa-alumno',
        profesor: 'bg-riesgo-alto/20 border-riesgo-alto/40 text-riesgo-alto',
      },
    },
    defaultVariants: {
      variant: 'rojo',
    },
  },
);

const ringVariants = cva('absolute inset-0 rounded-full border-2 workspace-avatar-ring', {
  variants: {
    variant: {
      rojo: 'border-riesgo-alto/30',
      morado: 'border-iniciativa-alumno/30',
      profesor: 'border-accent-violet/30',
    },
  },
  defaultVariants: {
    variant: 'rojo',
  },
});

export default function WorkspaceHeader({
  variant = 'rojo',
  name,
  subtitle,
  badge,
  avatarLetter,
  contextLine = 'Parcial 2 · Semana 3',
  className,
}) {
  const letter = avatarLetter ?? name?.charAt(0) ?? '?';

  return (
    <GlassPanel
      variant={variant}
      padding="lg"
      className={cn('flex shrink-0 items-center gap-lg', className)}
    >
      <div className="relative">
        <div className={cn(ringVariants({ variant }))} aria-hidden="true" />
        <div className={avatarVariants({ variant })}>{letter}</div>
      </div>
      <div className="min-w-0">
        <p className="font-display font-semibold text-ink-deep truncate">{name}</p>
        {subtitle && (
          <p className="font-ui text-xs text-on-dark-muted truncate">{subtitle}</p>
        )}
        {contextLine && (
          <p className="font-ui text-[11px] text-on-dark-muted/80 mt-xs">{contextLine}</p>
        )}
      </div>
      {badge && <span className={badgeVariants({ variant })}>{badge}</span>}
    </GlassPanel>
  );
}
