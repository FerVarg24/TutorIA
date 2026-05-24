import { cn } from '@/lib/utils';

export function Card({ className, elevated = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface-night border border-hairline-violet rounded-xl text-ink-deep',
        elevated &&
          'bg-white/80 backdrop-blur-sm shadow-[0_8px_32px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn('flex flex-col gap-sm p-xl pb-0', className)} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn('font-display text-base font-semibold leading-none', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={cn('font-ui text-sm text-on-dark-muted', className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-xl pt-lg', className)} {...props} />;
}
