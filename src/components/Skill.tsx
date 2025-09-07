import { useAppSelector } from '../app/hooks';
import { selectSkillPoints, selectUnlockedSkillsIds } from '../app/selectors';
import type { PositionType, SkillType } from '../types/types';
import getSkillStatus from '../utils/getSkillStatus';

function Skill({
  onClick,
  icon,
  skill,
  position,
  selected,
}: {
  onClick: (id: number) => void;
  icon: string;
  skill: SkillType;
  position: PositionType | null;
  selected?: boolean;
}) {
  const skillPoints = useAppSelector(selectSkillPoints);
  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);
  const status = getSkillStatus(skill, unlockedSkillsIds);

  if (!position) return;

  const getColor = (): string => {
    switch (status) {
      case 'unlocked':
        return 'bg-emerald-400/30';
      case 'mysterious':
        return 'bg-tortik-white/15';
      case 'available':
        return skillPoints < skill.price ? '' : 'bg-amber-400/30';
      default:
        return '';
    }
  };
  return (
    <div
      className={`absolute z-30 w-24 h-24 ${getColor()} p-2 text-center cursor-pointer flex justify-center items-center ${selected ? 'border-2 border-solid' : ''}`}
      onClick={() => status !== 'mysterious' && onClick(skill.id)}
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
