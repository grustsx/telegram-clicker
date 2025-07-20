import { useAppSelector } from '../app/hooks';
import { selectSkillPoints } from '../app/selectors';
import type { PositionType, SkillStatusType } from '../types/types';

function Skill({
  onClick,
  icon,
  status,
  id,
  position,
  price,
}: {
  onClick: (id: number) => void;
  icon: string;
  status: SkillStatusType;
  price: number;
  id: number;
  position: PositionType;
}) {
  const skillPoints = useAppSelector(selectSkillPoints);

  const getColor = (status: SkillStatusType): string => {
    switch (status) {
      case 'unlocked':
        return 'bg-emerald-700';
      case 'mysterious':
        return 'bg-tortik-white/15';
      case 'available':
        return skillPoints < price ? 'bg-gray-500' : 'bg-amber-400';
      default:
        return '';
    }
  };
  return (
    <div
      className={`absolute z-30 w-24 h-24 ${getColor(status)} rounded-lg p-2 text-center cursor-pointer flex justify-center items-center`}
      onClick={() => status !== 'mysterious' && onClick(id)}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {status === 'mysterious' ? (
        <div className="text-6xl">?</div>
      ) : (
        <img
          className="w-16 h-16"
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/skills/${icon}`}
        />
      )}
    </div>
  );
}

export default Skill;
