import type { PositionType, SkillStateType } from '../types/types';

function Skill({
  onClick,
  icon,
  state,
  id,
  position,
}: {
  onClick: (id: number) => void;
  icon: string;
  state: SkillStateType;
  id: number;
  position: PositionType;
}) {
  const getColor = (state: SkillStateType): string => {
    switch (state) {
      case 'unlocked':
        return 'bg-green-500';
      case 'mysterious':
        return 'bg-tortik-white/15';
      case 'available':
        return 'bg-yellow-500';
      case 'disabled':
        return 'bg-gray-500';
      default:
        return '';
    }
  };
  return (
    <div
      className={`absolute z-30 w-24 h-24 ${getColor(state)} rounded-lg p-2 text-center cursor-pointer flex justify-center items-center`}
      onClick={() => state !== 'mysterious' && onClick(id)}
      style={{
        left: `${position.x}px`,
        top: `${position.y + 200}px`,
      }}
    >
      {state === 'mysterious' ? (
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
