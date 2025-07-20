import { useAppSelector } from '../app/hooks';
import { selectAllSkills } from '../state/skillsSlice';
import { SKILLS_INFO } from '../constants/skillsInfo';
import Skill from './Skill';
import SkillLine from './SkillLine';
import useSkillsLayoutSize from '../hooks/useSkillsLayoutSize';
import { getPositionWithLayout } from '../utils/getPositionWithLayout';
import React from 'react';

function SkillTree({
  setSelectedSkillId,
}: {
  setSelectedSkillId: (id: number | null) => void;
}) {
  const skills = useAppSelector(selectAllSkills);
  const layoutSize = useSkillsLayoutSize();

  return (
    <div
      className={`relative z-30`}
      style={{
        width: `${layoutSize.width}px`,
        height: `${layoutSize.height}px`,
      }}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <g>
          {skills
            .filter((skill) => skill.status !== 'hidden')
            .map((skill) => {
              if (!skill.requires) return null;
              return skill.requires.map((depId) => {
                const parentId = skills.find(
                  (skill) => skill.id === depId && skill.status !== 'hidden',
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
          .filter((skill) => skill.status !== 'hidden')
          .map((skill) => (
            <Skill
              onClick={setSelectedSkillId}
              icon={SKILLS_INFO[skill.id].icon || 'star.png'}
              key={skill.id}
              price={skill.price}
              status={skill.status}
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

export default React.memo(SkillTree);
