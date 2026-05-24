import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const LEVEL_STYLES = {
  0: 'min-w-[160px] px-lg py-md text-base font-display font-bold border-accent-violet bg-accent-violet/15',
  1: 'min-w-[140px] px-md py-sm text-sm font-display font-semibold border-accent-violet/60 bg-surface-night',
  2: 'min-w-[120px] px-sm py-xs text-xs font-ui border-hairline-violet bg-surface-press-light',
};

/**
 * @param {import('@xyflow/react').NodeProps & {
 *   data: { label: string, level: number, onExpand?: (id: string) => void, expanding?: boolean }
 * }} props
 */
function NodoConcepto({ id, data, selected }) {
  const level = data.level ?? 1;
  const styleClass = LEVEL_STYLES[level] ?? LEVEL_STYLES[1];

  return (
    <div
      className={`rounded-xl border-2 shadow-sm transition-all duration-300 ${styleClass} ${
        selected ? 'ring-2 ring-accent-lime shadow-md' : ''
      }`}
    >
      {level > 0 && (
        <Handle type="target" position={Position.Top} className="!bg-accent-violet !w-2 !h-2" />
      )}

      <p className="text-ink-deep text-center leading-tight">{data.label}</p>

      {level < 2 && data.onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            data.onExpand(id);
          }}
          disabled={data.expanding}
          className="mt-xs w-full text-[10px] font-ui text-accent-violet-deep hover:text-accent-violet disabled:opacity-50 cursor-pointer"
        >
          {data.expanding ? 'Expandiendo...' : '+ Expandir'}
        </button>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-accent-violet !w-2 !h-2" />
    </div>
  );
}

export default memo(NodoConcepto);
