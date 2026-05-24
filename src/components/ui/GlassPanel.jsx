import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const glassPanelVariants = cva(
  'rounded-xl border backdrop-blur-md shadow-[0_8px_32px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]',
  {
    variants: {
      variant: {
        rojo: 'bg-gradient-to-br from-riesgo-alto/8 via-white/75 to-white/60 border-riesgo-alto/20',
        morado:
          'bg-gradient-to-br from-iniciativa-alumno/8 via-white/75 to-white/60 border-iniciativa-alumno/20',
        profesor:
          'bg-gradient-to-br from-accent-violet/10 via-white/75 to-white/60 border-accent-violet/25',
        neutral:
          'bg-white/70 border-hairline-violet/80',
      },
      padding: {
        none: '',
        sm: 'p-md',
        md: 'p-lg',
        lg: 'p-xl',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      padding: 'lg',
    },
  },
);

export default function GlassPanel({
  variant = 'neutral',
  padding = 'lg',
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(glassPanelVariants({ variant, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
