import { useState } from 'react';
import type { SkillType } from '../types/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSkillPoints, selectSkillTree } from '../app/selectors';
import { buySkill } from '../state/gameSlice';

type SkillState = 'locked' | 'available' | 'unlocked';
type HelpInfo = {
  id: string;
  name: string;
  description: string;
  price: number;
};

function SkillTree() {
  const [helpInfo, setHelpInfo] = useState<HelpInfo | null>(null);
  const dispatch = useAppDispatch();

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
    });
  };

  const buyChosenSkill = (skillId: string) => {
    dispatch(buySkill(skillId));
  };

  return (
    <div className="relative min-w-[1200px] w-full min-h-[2200px] h-full bg-radial from-tortik-orange via-indigo-900 to-black">
      {helpInfo ? (
        <div className="fixed top-0 w-full h-48 bg-amber-900/20 z-10">
          <div>{'Очки улучшения: ' + skillPoints}</div>
          <button onClick={() => setHelpInfo(null)}>Закрыть</button>
          <button
            disabled={skillPoints < helpInfo.price}
            onClick={() => buyChosenSkill(helpInfo.id)}
          >
            Купить
          </button>
          <div>{helpInfo.name}</div>
          <div>{helpInfo.description}</div>
          <div>{'Цена: ' + helpInfo.price + 'ОУ'}</div>
        </div>
      ) : (
        <div className="fixed">{'Очки улучшения: ' + skillPoints}</div>
      )}
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
                top: `${skill.position.y + +!!helpInfo * 200}px`,
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
