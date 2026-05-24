import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  ArrowLeftRight,
  Ban,
  CheckCircle2,
  Circle,
  CircleDot,
  Divide,
  Dot,
  FunctionSquare,
  HelpCircle,
  Infinity,
  Layers,
  Lightbulb,
  Link2,
  Loader2,
  Puzzle,
  Replace,
  Scissors,
  Sigma,
  SquareRadical,
  Target,
  TrendingUp,
  Unlink,
  AudioWaveform,
  X,
} from 'lucide-react';

/** @type {Record<string, import('react').ComponentType<{ size?: number, className?: string, style?: React.CSSProperties }>>} */
const ICON_MAP = {
  ArrowLeftRight,
  Ban,
  CheckCircle2,
  Circle,
  CircleDot,
  Divide,
  Dot,
  FunctionSquare,
  HelpCircle,
  Infinity,
  Layers,
  Lightbulb,
  Link2,
  Puzzle,
  Replace,
  Scissors,
  Sigma,
  SquareRadical,
  Target,
  TrendingUp,
  Unlink,
  Waveform: AudioWaveform,
  X,
};

const LEVEL_SIZE = {
  0: { minW: 'min-w-[180px]', px: 'px-lg', py: 'py-md', text: 'text-base', icon: 22 },
  1: { minW: 'min-w-[150px]', px: 'px-md', py: 'py-sm', text: 'text-sm', icon: 18 },
  2: { minW: 'min-w-[130px]', px: 'px-sm', py: 'py-xs', text: 'text-xs', icon: 14 },
};

/**
 * @param {import('@xyflow/react').NodeProps & {
 *   data: {
 *     label: string,
 *     level: number,
 *     branchColor?: string,
 *     branchBg?: string,
 *     branchBorder?: string,
 *     iconKey?: string,
 *     onExpand?: (id: string) => void,
 *     expanding?: boolean,
 *   }
 * }} props
 */
function NodoConcepto({ id, data, selected }) {
  const level = data.level ?? 1;
  const size = LEVEL_SIZE[level] ?? LEVEL_SIZE[1];
  const branchColor = data.branchColor ?? '#7ba7d4';
  const branchBg = data.branchBg ?? 'rgba(123, 167, 212, 0.12)';
  const branchBorder = data.branchBorder ?? '#7ba7d4';
  const IconComponent = ICON_MAP[data.iconKey ?? 'CircleDot'] ?? CircleDot;
  const isCentral = level === 0;

  return (
    <div
      className={`mapa-nodo-inner group rounded-2xl border-2 shadow-sm transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg ${size.minW} ${size.px} ${size.py} ${
        selected ? 'scale-[1.02] shadow-lg' : ''
      } ${data.expanding ? 'animate-pulse' : ''}`}
      style={{
        backgroundColor: isCentral ? branchBg : branchBg,
        borderColor: branchBorder,
        boxShadow: selected
          ? `0 0 0 3px ${branchColor}55, 0 8px 24px ${branchColor}33`
          : undefined,
      }}
    >
      {level > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          className="!opacity-0 !w-3 !h-3 !border-0"
          style={{ backgroundColor: branchColor }}
        />
      )}

      <div className="flex flex-col items-center gap-xs">
        <div
          className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
          style={{
            width: size.icon + 14,
            height: size.icon + 14,
            backgroundColor: `${branchColor}22`,
            color: branchColor,
          }}
        >
          <IconComponent size={size.icon} strokeWidth={2.2} />
        </div>

        <p
          className={`text-ink-deep text-center leading-tight font-display font-semibold ${size.text} ${
            isCentral ? 'font-bold' : ''
          }`}
        >
          {data.label}
        </p>
      </div>

      {level < 2 && data.onExpand && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            data.onExpand(id);
          }}
          disabled={data.expanding}
          className="mt-sm w-full flex items-center justify-center gap-xxs text-[10px] font-ui font-medium rounded-lg py-xxs transition-colors disabled:opacity-50 cursor-pointer hover:opacity-80"
          style={{ color: branchColor }}
        >
          {data.expanding ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Expandiendo...
            </>
          ) : (
            '+ Expandir'
          )}
        </button>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!opacity-0 !w-3 !h-3 !border-0"
        style={{ backgroundColor: branchColor }}
      />
    </div>
  );
}

export default memo(NodoConcepto);
