import { STONES_SPELL_ID } from '@/entities/building';
import { castSpellThunk, selectUserId } from '@/entities/game';
import {
  buySkillThunk,
  selectUnlockedSkillsIds,
  sendBuySkill,
  STONES_UPGRADE_SKILL_ID,
} from '@/entities/skill';
import { selectSpellById, sendCastSpell } from '@/entities/spell';
import {
  formatDuration,
  GameButton,
  GameText,
  useAppDispatch,
  useAppSelector,
} from '@/shared';
import React from 'react';
import { STONES_INFO } from '../config/info';

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

    dispatch(castSpellThunk({ spellId: STONES_SPELL_ID }));
    sendCastSpell(STONES_SPELL_ID, userId);

    dispatch(buySkillThunk(id));
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
          <GameButton
            theme={
              unlockedSkillsIds.includes(selectedSkill) ? 'orange' : 'green'
            }
            onClick={() => {
              if (unlockedSkillsIds.includes(selectedSkill)) return;
              chooseStone(selectedSkill);
            }}
            disabled={
              remainSeconds > 0 && !unlockedSkillsIds.includes(selectedSkill)
            }
            text={
              unlockedSkillsIds.includes(selectedSkill)
                ? 'АКТИВЕН'
                : remainSeconds > 0
                  ? `${formatDuration(remainSeconds)} ОТКАТ`
                  : 'ВЫБРАТЬ'
            }
          />
        </>
      )}

      <div className="flex flex-row gap-2 justify-around w-full">
        {[22, 23, 24].map((id) => (
          <GameButton
            theme={unlockedSkillsIds.includes(id) ? 'orange' : 'green'}
            className="box-border"
            size="large"
            bordered={id === selectedSkill}
            onClick={() => setSelectedSkill(id)}
            icon={`skills/${STONES_INFO[id].icon}.png`}
          />
        ))}
      </div>
    </div>
  );
}
