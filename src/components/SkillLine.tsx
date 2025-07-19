import type { PositionType } from '../types/types';

function SkillLine({ from, to }: { from?: PositionType; to?: PositionType }) {
  if (!from || !to) return null;

  const id = `grad-${from.x}-${from.y}-${to.x}-${to.y}`;

  const x1 = from.x + 250;
  const y1 = from.y + 250;
  const x2 = to.x + 250;
  const y2 = to.y + 250;

  return (
    <>
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        >
          <stop offset="10%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.5" />
          <stop offset="90%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={`url(#${id})`}
        strokeWidth="2"
      />
    </>
  );
}

export default SkillLine;
