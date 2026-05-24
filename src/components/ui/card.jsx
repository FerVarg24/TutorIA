import { cn } from '@/lib/utils';

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface-night border border-hairline-violet rounded-xl text-ink-deep',
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
