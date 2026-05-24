import { cn } from '@/lib/utils';

export function TypewriterCursor({ className }) {
  return (
    <span
      className={cn(
        'typewriter-cursor ml-0.5 inline-block w-[2px] translate-y-[1px] self-end rounded-full bg-on-primary/70',
        className,
      )}
      style={{ height: '1em' }}
      aria-hidden="true"
    />
  );
}
