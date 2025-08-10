import { useAppSelector } from '../app/hooks';
import { SKILLS_INFO } from '../constants/skillsInfo';
import Skill from './Skill';
import SkillLine from './SkillLine';
import useSkillsLayoutSize from '../hooks/useSkillsLayoutSize';
import { getPositionWithLayout } from '../utils/getPositionWithLayout';
import React from 'react';
import { selectVisibleSkills } from '../app/selectors';

function SkillTree({
  setSelectedSkillId,
}: {
  setSelectedSkillId: (id: number | null) => void;
}) {
  const visibleSkills = useAppSelector(selectVisibleSkills);

  const layoutSize = useSkillsLayoutSize();

  return (
    <div
      className={`relative z-30`}
      style={{
        scale: 0.5,
        width: `${layoutSize.width}px`,
        height: `${layoutSize.height}px`,
      }}
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <g>
          {visibleSkills.map((skill) => {
            if (!skill.requires) return null;
            return skill.requires.map((depId) => {
              const parentId = visibleSkills.find(
                (skill) => skill.id === depId,
              )?.id;
              const from = getPositionWithLayout(
                SKILLS_INFO[skill.id]?.position,
                layoutSize,
              );
              const to = getPositionWithLayout(
                SKILLS_INFO[parentId || '']?.position,
                layoutSize,
              );

              if (!from || !to) return;

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
        {visibleSkills.map((skill) => (
          <Skill
            onClick={setSelectedSkillId}
            icon={SKILLS_INFO[skill.id]?.icon || 'star.png'}
            key={skill.id}
            skill={skill}
            position={getPositionWithLayout(
              SKILLS_INFO[skill.id]?.position,
              layoutSize,
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(SkillTree);
