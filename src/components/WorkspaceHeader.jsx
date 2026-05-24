import { cva } from 'class-variance-authority';
import GlassPanel from './ui/GlassPanel.jsx';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'shrink-0 rounded-full border font-bold font-ui whitespace-nowrap backdrop-blur-sm',
  {
    variants: {
      variant: {
        rojo: 'bg-riesgo-alto/15 text-riesgo-alto border-riesgo-alto/30',
        morado: 'bg-iniciativa-alumno/15 text-iniciativa-alumno border-iniciativa-alumno/30',
        profesor: 'bg-riesgo-alto/15 text-riesgo-alto border-riesgo-alto/30',
      },
      layout: {
        card: 'ml-auto px-sm py-xs text-xs',
        compact: 'hidden sm:inline-flex px-sm py-xxs text-[10px]',
      },
    },
    defaultVariants: {
      variant: 'rojo',
      layout: 'card',
    },
  },
);

const avatarVariants = cva(
  'flex shrink-0 items-center justify-center rounded-full border font-bold font-display',
  {
    variants: {
      variant: {
        rojo: 'bg-riesgo-alto/20 border-riesgo-alto/40 text-riesgo-alto',
        morado: 'bg-iniciativa-alumno/20 border-iniciativa-alumno/40 text-iniciativa-alumno',
        profesor: 'bg-riesgo-alto/20 border-riesgo-alto/40 text-riesgo-alto',
      },
      layout: {
        card: 'h-12 w-12 text-lg',
        compact: 'h-8 w-8 text-sm',
      },
    },
    defaultVariants: {
      variant: 'rojo',
      layout: 'card',
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
    layout: {
      card: '',
      compact: 'border',
    },
  },
  defaultVariants: {
    variant: 'rojo',
    layout: 'card',
  },
});

const compactShellVariants = cva(
  'flex w-full min-w-0 items-center gap-sm rounded-full border backdrop-blur-md shadow-sm px-sm py-xs sm:gap-md sm:px-md',
  {
    variants: {
      variant: {
        rojo: 'border-riesgo-alto/20 bg-gradient-to-r from-riesgo-alto/8 via-white/80 to-white/70',
        morado:
          'border-iniciativa-alumno/20 bg-gradient-to-r from-iniciativa-alumno/8 via-white/80 to-white/70',
        profesor:
          'border-accent-violet/25 bg-gradient-to-r from-accent-violet/10 via-white/80 to-white/70',
      },
    },
    defaultVariants: {
      variant: 'rojo',
    },
  },
);

export default function WorkspaceHeader({
  variant = 'rojo',
  layout = 'card',
  name,
  subtitle,
  badge,
  avatarLetter,
  contextLine = 'Parcial 2 · Semana 3',
  className,
}) {
  const letter = avatarLetter ?? name?.charAt(0) ?? '?';
  const isCompact = layout === 'compact';

  const identityBlock = (
    <>
      <div className="relative shrink-0">
        <div className={cn(ringVariants({ variant, layout }))} aria-hidden="true" />
        <div className={avatarVariants({ variant, layout })}>{letter}</div>
      </div>
      <div className="min-w-0 flex-1">
        {isCompact ? (
          <p className="truncate font-display text-sm font-semibold text-ink-deep">
            {name}
            {subtitle && (
              <>
                <span className="mx-xs font-normal text-on-dark-muted">·</span>
                <span className="font-ui text-xs font-normal text-on-dark-muted">{subtitle}</span>
              </>
            )}
          </p>
        ) : (
          <>
            <p className="truncate font-display font-semibold text-ink-deep">{name}</p>
            {subtitle && (
              <p className="truncate font-ui text-xs text-on-dark-muted">{subtitle}</p>
            )}
            {contextLine && (
              <p className="mt-xs font-ui text-[11px] text-on-dark-muted/80">{contextLine}</p>
            )}
          </>
        )}
      </div>
      {badge && (
        <span className={badgeVariants({ variant, layout })}>{badge}</span>
      )}
    </>
  );

  if (isCompact) {
    return (
      <div className={cn(compactShellVariants({ variant }), className)}>
        {identityBlock}
      </div>
    );
  }

  return (
    <GlassPanel
      variant={variant}
      padding="lg"
      className={cn('flex shrink-0 items-center gap-lg', className)}
    >
      {identityBlock}
    </GlassPanel>
  );
}
