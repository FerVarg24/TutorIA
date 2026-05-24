/**
 * @param {{
 *   nodo: {
 *     id: string,
 *     label: string,
 *     description: string,
 *     example: string,
 *     question: string,
 *     level: number,
 *     fuente?: string,
 *     citaMaterial?: string,
 *     ejercicioReferencia?: string,
 *   } | null,
 *   onClose: () => void,
 * }} props
 */
export default function PanelNodo({ nodo, onClose }) {
  if (!nodo) return null;

  const ejemploLabel = nodo.ejercicioReferencia
    ? 'Ejercicio / ejemplo del parcial'
    : 'Ejemplo cotidiano';

  return (
    <aside className="w-80 max-w-sm shrink-0 bg-surface-night border border-hairline-violet rounded-xl p-lg flex flex-col gap-md max-h-[calc(100vh-8rem)] overflow-y-auto">
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
          {ejemploLabel}
        </h4>
        <p className="font-ui text-sm text-on-dark-muted leading-relaxed">{nodo.example}</p>
        {nodo.ejercicioReferencia && (
          <p className="font-ui text-xs text-accent-violet mt-xs">
            {nodo.ejercicioReferencia}
          </p>
        )}
      </section>

      {nodo.fuente && (
        <section className="bg-surface-canvas-dark/50 border border-hairline-violet rounded-lg p-md">
          <h4 className="font-ui text-xs font-semibold text-accent-violet-deep mb-sm">
            Del material del profesor (Teams)
          </h4>
          <span className="inline-flex items-center gap-xs text-[11px] font-ui bg-accent-violet/15 text-accent-violet border border-accent-violet/25 rounded-md px-sm py-xs mb-sm">
            <span aria-hidden="true">📄</span>
            {nodo.fuente}
          </span>
          {nodo.citaMaterial && (
            <blockquote className="font-ui text-xs text-on-dark-muted leading-relaxed border-l-2 border-accent-violet/40 pl-md italic">
              {nodo.citaMaterial}
            </blockquote>
          )}
        </section>
      )}

      <section className="bg-accent-violet/10 border border-accent-violet/20 rounded-lg p-md">
        <h4 className="font-ui text-xs font-semibold text-accent-violet-deep mb-xs">
          Pregunta de comprensión
        </h4>
        <p className="font-ui text-sm text-ink-deep italic">{nodo.question}</p>
      </section>
    </aside>
  );
}
