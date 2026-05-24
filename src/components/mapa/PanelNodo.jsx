/**
 * @param {{
 *   nodo: { id: string, label: string, description: string, example: string, question: string, level: number } | null,
 *   onClose: () => void,
 * }} props
 */
export default function PanelNodo({ nodo, onClose }) {
  if (!nodo) return null;

  return (
    <aside className="w-72 shrink-0 bg-surface-night border border-hairline-violet rounded-xl p-lg flex flex-col gap-md">
      <div className="flex items-start justify-between gap-sm">
        <div>
          <span className="text-[10px] font-ui uppercase tracking-wide text-on-dark-muted">
            Nivel {nodo.level}
          </span>
          <h3 className="font-display font-semibold text-ink-deep leading-tight">
            {nodo.label}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-on-dark-muted hover:text-ink-deep text-lg leading-none cursor-pointer"
          aria-label="Cerrar panel"
        >
          ×
        </button>
      </div>

      <section>
        <h4 className="font-ui text-xs font-semibold text-accent-violet-deep mb-xs">
          Explicación
        </h4>
        <p className="font-ui text-sm text-ink-deep leading-relaxed">{nodo.description}</p>
      </section>

      <section>
        <h4 className="font-ui text-xs font-semibold text-accent-violet-deep mb-xs">
          Ejemplo cotidiano
        </h4>
        <p className="font-ui text-sm text-on-dark-muted leading-relaxed">{nodo.example}</p>
      </section>

      <section className="bg-accent-violet/10 border border-accent-violet/20 rounded-lg p-md">
        <h4 className="font-ui text-xs font-semibold text-accent-violet-deep mb-xs">
          Pregunta de comprensión
        </h4>
        <p className="font-ui text-sm text-ink-deep italic">{nodo.question}</p>
      </section>
    </aside>
  );
}
