import { useState } from 'react';
import type { SkillType } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { selectSkillPoints } from '../app/selectors';
import SkillHelper from './SkillHelper';
import { selectAllSkills } from '../state/skillsSlice';

type SkillState = 'locked' | 'available' | 'unlocked' | 'mysterious';

function SkillTree() {
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  const skills = useAppSelector(selectAllSkills);
  const skillPoints = useAppSelector(selectSkillPoints);

  const computeState = (skill: SkillType): SkillState => {
    if (skill.unlocked) return 'unlocked';

    const deps = skill.requires ?? [];
    const available = deps.every(
      (id) => skills.find((skill) => skill.id === id)?.unlocked,
    );

    if (available) return 'available';

    const mysterious = deps.some(
      (id) => skills.find((skill) => skill.id === id)?.unlocked,
    );

    if (mysterious) return 'mysterious';

    return 'locked';
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
          .filter((skill) => computeState(skill) !== 'locked' && !skill.hidden)
          .map((skill) => {
            if (!skill.requires) return null;
            return skill.requires.map((depId) => {
              const from = skill.position;
              const to = skills.find(
                (skill) =>
                  skill.id === depId && computeState(skill) !== 'locked',
              )?.position;
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
        .filter((skill) => computeState(skill) !== 'locked' && !skill.hidden)
        .map((skill) => {
          const state = computeState(skill);
          const getColor = (state: SkillState): string => {
            switch (state) {
              case 'unlocked':
                return 'bg-green-500';
              case 'mysterious':
                return 'bg-tortik-white/15';
              case 'available':
                return skillPoints < skill.price
                  ? 'bg-gray-500'
                  : 'bg-yellow-500';
              default:
                return '';
            }
          };

          return (
            <div
              key={skill.id}
              className={`absolute w-24 h-24 ${getColor(state)} rounded-lg p-2 text-center cursor-pointer`}
              style={{
                left: `${skill.position.x}px`,
                top: `${skill.position.y + 200}px`,
              }}
              onClick={() =>
                state !== 'mysterious' && setSelectedSkillId(skill.id)
              }
            >
              <strong>{state === 'mysterious' ? '???' : skill.name}</strong>
            </div>
          );
        })}
    </div>
  );
}

export default SkillTree;
