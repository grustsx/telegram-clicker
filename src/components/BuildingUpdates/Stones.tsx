import React from 'react';
import { sendBuySkill, sendCastSpell } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUnlockedSkillsIds, selectUserId } from '../../app/selectors';
import GameText from '../../elements/GameText';
import { selectSpellById } from '../../state/spellsSlice';
import { buySkill, castSpell } from '../../state/thunk';
import { formatDuration } from '../../utils/format';
import {
  STONES_SPELL_ID,
  STONES_UPGRADE_SKILL_ID,
} from '../../constants/const';

const STONES_INFO: Record<
  number,
  {
    title: string;
    description: string;
    upgradedDescription: string;
    icon: string;
  }
> = {
  22: {
    title: 'Прилив',
    description: 'Прибавляет 15% к торт/сек',
    upgradedDescription: 'Прибавляет 30% к торт/сек',
    icon: 'star',
  },
  23: {
    title: 'Сила',
    description: 'Прибавляет 50% к мощности клика',
    upgradedDescription: 'Прибавляет 100% к мощности клика',
    icon: 'cursor',
  },
  24: {
    title: 'Усиление гравитации',
    description: 'Откат кулдаунов быстрее на 20%',
    upgradedDescription: 'Откат кулдаунов быстрее на 40%',
    icon: 'time',
  },
};

export default function Stones() {
  const stonesSpell = useAppSelector((state) =>
    selectSpellById(state, STONES_SPELL_ID),
  );
  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

  const [selectedSkill, setSelectedSkill] = React.useState<number>(22);

  if (!stonesSpell) return;

  const { remainSeconds } = stonesSpell;

  const chooseStone = (id: number) => {
    if (remainSeconds > 0) return;

    dispatch(castSpell({ spellId: STONES_SPELL_ID }));
    sendCastSpell(STONES_SPELL_ID, userId);

    dispatch(buySkill(id));
    sendBuySkill(id, userId);
  };

  return (
    <div
      className={`flex flex-col gap-2 p-2 pixel-border--gr justify-between items-center`}
    >
      {selectedSkill && (
        <>
          <GameText size="md" text={STONES_INFO[selectedSkill].title} />
          <GameText
            size="sm"
            text={
              unlockedSkillsIds.includes(STONES_UPGRADE_SKILL_ID)
                ? STONES_INFO[selectedSkill].upgradedDescription
                : STONES_INFO[selectedSkill].description
            }
          />

          <button
            className={`w-full border-white border-2 text-white p-2 ${unlockedSkillsIds.includes(selectedSkill) ? 'bg-amber-600' : remainSeconds <= 0 ? 'bg-emerald-600' : 'bg-gray-400'}`}
            onClick={() => chooseStone(selectedSkill)}
            disabled={
              remainSeconds > 0 || unlockedSkillsIds.includes(selectedSkill)
            }
          >
            <GameText
              size="sm"
              text={
                unlockedSkillsIds.includes(selectedSkill)
                  ? 'АКТИВЕН'
                  : remainSeconds > 0
                    ? `${formatDuration(remainSeconds)} ОТКАТ`
                    : 'ВЫБРАТЬ'
              }
            />
          </button>
        </>
      )}

      <div className="flex flex-row gap-2 justify-around w-full">
        {[22, 23, 24].map((id) => (
          <button
            key={id}
            className={`w-20 h-20 flex ite justify-center border-white border-${id === selectedSkill ? 2 : 0} text-white p-2 m-2 ${unlockedSkillsIds.includes(id) ? 'bg-amber-600' : 'bg-emerald-800'}`}
            onClick={() => setSelectedSkill(id)}
          >
            <img
              className="w-16 h-16"
              style={{
                imageRendering: 'pixelated',
              }}
              src={`/assets/icons/skills/${STONES_INFO[id].icon}.png`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
