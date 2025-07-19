import { useState } from 'react';
import type { SkillStateType, SkillType } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { selectSkillPoints } from '../app/selectors';
import SkillHelper from './SkillHelper';
import { selectAllSkills } from '../state/skillsSlice';
import { SKILLS_INFO } from '../constants/skillsInfo';
import Skill from './Skill';

function SkillTree() {
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  const skills = useAppSelector(selectAllSkills);
  const skillPoints = useAppSelector(selectSkillPoints);

  const computeState = (skill: SkillType): SkillStateType => {
    if (skill.unlocked) return 'unlocked';

    const deps = skill.requires ?? [];

    const available = deps.every(
      (id) => skills.find((skill) => skill.id === id)?.unlocked,
    );

    const isEnoughPoints = skillPoints >= skill.price;

    if (available && isEnoughPoints) return 'available';

    if (available && !isEnoughPoints) return 'disabled';

    const mysterious = deps.some(
      (id) => skills.find((skill) => skill.id === id)?.unlocked,
    );

    if (mysterious) return 'mysterious';

    return 'hidden';
  };

  return (
    <div className="relative min-w-[1200px] w-full min-h-[2200px] h-full bg-radial from-tortik-orange via-indigo-900 to-black">
      {selectedSkillId && (
        <SkillHelper
          skillId={selectedSkillId}
          skillPoints={skillPoints}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
      <div className="fixed z-20">{'Очки улучшения: ' + skillPoints}</div>
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {skills
          .filter((skill) => computeState(skill) !== 'hidden' && !skill.hidden)
          .map((skill) => {
            if (!skill.requires) return null;
            return skill.requires.map((depId) => {
              const parentId = skills.find(
                (skill) =>
                  skill.id === depId && computeState(skill) !== 'hidden',
              )?.id;
              const from = SKILLS_INFO[skill.id].position;
              const to = parentId && SKILLS_INFO[parentId].position;
              if (!from || !to) return null;

              return (
                <line
                  key={`${depId}->${skill.id}`}
                  x1={from.x + 50}
                  y1={from.y + 250}
                  x2={to.x + 50}
                  y2={to.y + 250}
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
              );
            });
          })}
      </svg>
      {skills
        .filter((skill) => computeState(skill) !== 'hidden' && !skill.hidden)
        .map((skill) => (
          <Skill
            onClick={setSelectedSkillId}
            icon={SKILLS_INFO[skill.id].icon || 'star.png'}
            key={skill.id}
            state={computeState(skill)}
            id={skill.id}
            position={SKILLS_INFO[skill.id].position}
          />
        ))}
    </div>
  );
}

export default SkillTree;
