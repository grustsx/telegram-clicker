import type { PositionType } from '../types/types';

function SkillLine({ from, to }: { from?: PositionType; to?: PositionType }) {
  if (!from || !to) return null;

  return (
    <line
      x1={from.x + 50}
      y1={from.y + 250}
      x2={to.x + 50}
      y2={to.y + 250}
      stroke="white"
      strokeWidth="2"
      strokeOpacity="0.5"
    />
  );
}

export default SkillLine;
