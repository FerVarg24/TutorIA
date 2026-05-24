import { memo } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
} from '@xyflow/react';

/**
 * @param {import('@xyflow/react').EdgeProps & {
 *   data?: { branchColor?: string, highlighted?: boolean }
 * }} props
 */
function EdgeConcepto({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  selected,
}) {
  const branchColor = data?.branchColor ?? '#7ba7d4';
  const highlighted = selected || data?.highlighted;
  const strokeWidth = highlighted ? 3 : 2;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.25,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: branchColor,
          strokeWidth,
          strokeLinecap: 'round',
        }}
        markerEnd={`url(#arrow-${id})`}
      />
      <defs>
        <marker
          id={`arrow-${id}`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={branchColor} />
        </marker>
      </defs>
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="mapa-edge-label"
          >
            <span
              className="font-ui text-[10px] font-medium px-sm py-xxs rounded-full border whitespace-nowrap"
              style={{
                color: branchColor,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                borderColor: `${branchColor}40`,
              }}
            >
              {label}
            </span>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default memo(EdgeConcepto);
