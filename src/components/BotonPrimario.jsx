/**
 * Primary action button with three visual variants.
 * Props:
 *   variant   — 'primary' | 'inverted' | 'ghost'  (default: 'primary')
 *   onClick   — click handler
 *   type      — button type attr  (default: 'button')
 *   disabled  — disables interaction and reduces opacity
 *   className — extra classes merged at the end
 *   children  — button label
 */
const VARIANT_CLASSES = {
  primary:  'bg-primary text-on-primary hover:opacity-90',
  inverted: 'bg-on-primary text-ink-deep hover:bg-surface-press-light',
  ghost:    'bg-on-dark-faint text-ink-deep hover:bg-accent-violet hover:text-on-primary',
};

const BASE_CLASSES =
  'font-ui font-bold uppercase tracking-wide rounded-md px-lg py-md transition-all';

export default function BotonPrimario({
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
}) {
  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE_CLASSES} ${variantClass} ${disabledClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
