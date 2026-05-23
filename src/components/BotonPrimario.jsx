export default function BotonPrimario({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) {
  const base =
    'inline-flex items-center justify-center rounded-md px-lg py-md text-sm font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-surface-press-stronger hover:text-ink-press',
    inverted: 'bg-on-primary text-ink-deep hover:bg-surface-press-light hover:text-ink-press',
    ghost: 'bg-on-dark-faint text-on-primary hover:bg-hairline-violet',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
