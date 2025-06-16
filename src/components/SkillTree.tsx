import { useState } from 'react';
import type { SkillType } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { selectSkillTree } from '../app/selectors';

type SkillState = 'locked' | 'available' | 'unlocked';

function SkillTree() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set(['root']));

  const skills = useAppSelector(selectSkillTree);

  const computeState = (skill: SkillType): SkillState => {
    if (unlocked.has(skill.id)) return 'unlocked';
    const deps = skill.requires ?? [];
    const available = deps.every((id) => unlocked.has(id));
    return available ? 'available' : 'locked';
  };

  const onClick = (skill: SkillType) => {
    if (computeState(skill) === 'available') {
      setUnlocked(new Set([...unlocked, skill.id]));
    }
  };

  return (
    <div className="relative w-[1200px] h-[1200px] bg-radial from-tortik-orange via-indigo-900 to-black">
      {skills.map((skill) => {
        const state = computeState(skill);
        const color =
          state === 'unlocked'
            ? 'bg-green-500'
            : state === 'available'
              ? 'bg-yellow-500'
              : 'bg-gray-500';

        return (
          <div
            key={skill.id}
            className={`absolute w-24 h-24 ${color} rounded-lg p-2 text-center cursor-pointer`}
            style={{
              left: `${skill.position.x * 100 + 250}px`,
              top: `${skill.position.y * 100}px`,
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
