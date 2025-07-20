import { useState } from 'react';
import type { SkillStateType, SkillType } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { selectSkillPoints } from '../app/selectors';
import SkillHelper from './SkillHelper';
import { selectAllSkills } from '../state/skillsSlice';
import { SKILLS_INFO } from '../constants/skillsInfo';
import Skill from './Skill';
import SkillLine from './SkillLine';
import useSkillsLayoutSize from '../hooks/useSkillsLayoutSize';
import { getPositionWithLayout } from '../utils/getPositionWithLayout';

function SkillTree() {
  const skills = useAppSelector(selectAllSkills);
  const skillPoints = useAppSelector(selectSkillPoints);
  const layoutSize = useSkillsLayoutSize();

  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

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
    <div
      className={`relative z-30`}
      style={{
        width: `${layoutSize.width}px`,
        height: `${layoutSize.height}px`,
      }}
    >
      {selectedSkillId && (
        <SkillHelper
          skillId={selectedSkillId}
          skillPoints={skillPoints}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
      <div className="fixed z-30">{'Очки улучшения: ' + skillPoints}</div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <g>
          {skills
            .filter(
              (skill) => computeState(skill) !== 'hidden' && !skill.hidden,
            )
            .map((skill) => {
              if (!skill.requires) return null;
              return skill.requires.map((depId) => {
                const parentId = skills.find(
                  (skill) =>
                    skill.id === depId && computeState(skill) !== 'hidden',
                )?.id;
                const from = getPositionWithLayout(
                  SKILLS_INFO[skill.id].position,
                  layoutSize,
                );
                const to = getPositionWithLayout(
                  SKILLS_INFO[parentId || ''].position,
                  layoutSize,
                );

                return (
                  <SkillLine
                    key={`${from.x}-${from.y}-${to.x}-${to.y}`}
                    from={from}
                    to={to}
                  />
                );
              });
            })}
        </g>
      </svg>
      <div>
        {skills
          .filter((skill) => computeState(skill) !== 'hidden' && !skill.hidden)
          .map((skill) => (
            <Skill
              onClick={setSelectedSkillId}
              icon={SKILLS_INFO[skill.id].icon || 'star.png'}
              key={skill.id}
              state={computeState(skill)}
              id={skill.id}
              position={getPositionWithLayout(
                SKILLS_INFO[skill.id].position,
                layoutSize,
              )}
            />
          ))}
      </div>
    </div>
  );
}

export default SkillTree;
