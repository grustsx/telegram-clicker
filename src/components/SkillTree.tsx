import { useMemo, useState } from 'react';
import type { SkillStateType, SkillType } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { selectSkillPoints, selectUnlockedSkillsIds } from '../app/selectors';
import SkillHelper from './SkillHelper';
import { selectAllSkills } from '../state/skillsSlice';
import { SKILLS_INFO } from '../constants/skillsInfo';
import Skill from './Skill';
import SkillLine from './SkillLine';

function SkillTree() {
  const skills = useAppSelector(selectAllSkills);
  const skillPoints = useAppSelector(selectSkillPoints);
  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);

  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [scale, setScale] = useState(0.8);

  const layoutSize = useMemo(() => {
    const positions = unlockedSkillsIds.map(
      (skillId) => SKILLS_INFO[skillId].position,
    );

    if (positions.length === 0) return { width: 0, height: 0 };

    const minX = Math.min(...positions.map((p) => p.x));
    const maxX = Math.max(...positions.map((p) => p.x));

    const minY = Math.min(...positions.map((p) => p.y));
    const maxY = Math.max(...positions.map((p) => p.y));

    const width = maxX - minX;
    const height = maxY - minY;

    return { width, height };
  }, [unlockedSkillsIds]);

  console.log(layoutSize);

  const zoomIn = () =>
    setScale((prev) => Math.min(2, +(prev + 0.1).toFixed(2)));
  const zoomOut = () =>
    setScale((prev) => Math.max(0.5, +(prev - 0.1).toFixed(2)));

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
    <div className="relative min-w-[1200px] w-full min-h-[2200px] h-full z-30">
      <div className="fixed z-40 top-1/2 right-4 flex flex-col gap-2">
        <div onClick={zoomIn} className="w-20 h-20 text-8xl">
          +
        </div>
        <div onClick={zoomOut} className="w-20 h-20 text-8xl">
          −
        </div>
      </div>
      {selectedSkillId && (
        <SkillHelper
          skillId={selectedSkillId}
          skillPoints={skillPoints}
          onClose={() => setSelectedSkillId(null)}
        />
      )}
      <div className="fixed z-30">{'Очки улучшения: ' + skillPoints}</div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <g
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
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
                const from = SKILLS_INFO[skill.id].position;
                const to = SKILLS_INFO[parentId || ''].position;

                return <SkillLine from={from} to={to} />;
              });
            })}
        </g>
      </svg>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
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
    </div>
  );
}

export default SkillTree;
