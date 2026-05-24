const OPCIONES = [
  { id: 'basico', label: 'Básico' },
  { id: 'intermedio', label: 'Intermedio' },
  { id: 'detallado', label: 'Detallado' },
];

/**
 * @param {{
 *   profundidad: string,
 *   onChange: (id: string) => void,
 *   disabled?: boolean,
 * }} props
 */
export default function ControlProfundidad({ profundidad, onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-sm">
      <span className="font-ui text-xs text-on-dark-muted shrink-0">Profundidad:</span>
      <div className="flex rounded-lg border border-hairline-violet overflow-hidden">
        {OPCIONES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(id)}
            className={`px-md py-xs text-xs font-ui transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              profundidad === id
                ? 'bg-accent-violet text-on-primary font-semibold'
                : 'bg-surface-night text-on-dark-muted hover:bg-accent-violet/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
