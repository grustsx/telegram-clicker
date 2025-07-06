import { useState } from 'react';
import type { SkillType } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { selectSkillPoints, selectSkillTree } from '../app/selectors';
import SkillHelper from './SkillHelper';

type SkillState = 'locked' | 'available' | 'unlocked';
export type HelpInfo = {
  id: string;
  name: string;
  description: string;
  price: number;
  unlocked?: boolean;
};

function SkillTree() {
  const [helpInfo, setHelpInfo] = useState<HelpInfo | null>(null);

  const skills = useAppSelector(selectSkillTree);
  const skillPoints = useAppSelector(selectSkillPoints);

  const computeState = (skill: SkillType): SkillState => {
    if (skill.unlocked) return 'unlocked';
    const deps = skill.requires ?? [];
    const available = deps.every(
      (id) => skills.find((skill) => skill.id === id)?.unlocked,
    );
    return available ? 'available' : 'locked';
  };

  const onClick = (skill: SkillType) => {
    setHelpInfo({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      price: skill.price,
      unlocked: skill.unlocked,
    });
  };

  return (
    <div className="relative min-w-[1200px] w-full min-h-[2200px] h-full bg-radial from-tortik-orange via-indigo-900 to-black">
      {helpInfo && (
        <SkillHelper
          helpInfo={helpInfo}
          skillPoints={skillPoints}
          onClose={() => setHelpInfo(null)}
        />
      )}
      <div className="fixed">{'Очки улучшения: ' + skillPoints}</div>
      {skills
        .filter((skill) => computeState(skill) !== 'locked')
        .map((skill) => {
          const state = computeState(skill);
          const color =
            state === 'unlocked'
              ? 'bg-green-500'
              : skillPoints < skill.price
                ? 'bg-gray-500'
                : 'bg-yellow-500';

          return (
            <div
              key={skill.id}
              className={`absolute w-24 h-24 ${color} rounded-lg p-2 text-center cursor-pointer`}
              style={{
                left: `${skill.position.x}px`,
                top: `${skill.position.y + 200}px`,
              }}
              onClick={() => onClick(skill)}
            >
              <strong>{skill.name}</strong>
            </div>
          );
        })}
    </div>
  );
}

export default SkillTree;
