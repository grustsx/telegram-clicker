import { sendCastSpell } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../../app/selectors';
import { STORAGE_SEGMENT } from '../../constants/const';
import GameText from '../../elements/GameText';
import { selectSpellById } from '../../state/spellsSlice';
import { castSpell } from '../../state/thunk';
import type { GameMessageType } from '../../types/types';
import { formatDuration } from '../../utils/format';

const DEP_ID = 3;
const BOOSTER_SPELL_ID = 4;

const SPELLS_INFO: Record<number, string> = {
  [DEP_ID]: 'Депнуть весь капитал в казик, шанс победы',
  [BOOSTER_SPELL_ID]: 'Состредоточить комнату амбара в спавн бустера',
};

function getDepWin(skills: number[]): boolean {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };
  return Math.random() > 0.45 + 0.05 * skill(32);
}

export default function TortikSpells({
  showEventMessages,
}: {
  showEventMessages: (messages: GameMessageType[], time?: number) => void;
}) {
  const { remainSeconds: depRemainSeconds } = useAppSelector((state) =>
    selectSpellById(state, DEP_ID),
  );

  const { remainSeconds: boosterSpellSeconds, cost: boosterCost } =
    useAppSelector((state) => selectSpellById(state, BOOSTER_SPELL_ID));
  const userId = useAppSelector(selectUserId);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const cps = useAppSelector(selectCurrencyPerSecond);
  const storageCurrency = useAppSelector(selectStorageCurrency);
  const dispatch = useAppDispatch();

  const castSpellById = (id: number) => {
    if (DEP_ID === id) {
      if (depRemainSeconds > 0) return;

      const win = getDepWin(unlockedSkills);

      dispatch(castSpell({ spellId: id, spellPayload: { win } }));
      sendCastSpell(id, userId, { win });

      if (win) {
        showEventMessages([
          {
            name: 'Никита',
            description: 'Ну респектос ничё не могу сказать',
            face: 'nikita_smile',
          },
        ]);
      } else {
        showEventMessages([
          {
            name: 'Никита',
            description: 'АХАХАХА ЛОШАРА!!!!',
            face: 'nikita_smile',
          },
        ]);
      }
    }

    if (BOOSTER_SPELL_ID === id) {
      if (boosterSpellSeconds > 0) return;
      if (boosterCost * cps * STORAGE_SEGMENT > storageCurrency) return;

      dispatch(castSpell({ spellId: id }));
      sendCastSpell(id, userId);

      showEventMessages([
        {
          name: 'Никита',
          description: 'Что-то где-то появилось, это точно',
          face: 'nikita_smile',
        },
      ]);
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 pixel-border--gr justify-between items-center`}
    >
      <div className="flex flex-col gap-1 w-full">
        <button
          className={`w-full border-white border-2 text-white p-2 ${depRemainSeconds > 0 ? 'bg-gray-400' : 'bg-emerald-400'}`}
          onClick={() => castSpellById(DEP_ID)}
          disabled={depRemainSeconds > 0}
        >
          <GameText size="xs" text={formatDuration(depRemainSeconds)} />
          <GameText
            size="sm"
            text={`${SPELLS_INFO[DEP_ID]} ${
              unlockedSkills.includes(32) ? '50%' : 'чуть меньше 50%'
            }`}
          />
        </button>
        <button
          className={`w-full border-white border-2 text-white p-2 ${boosterSpellSeconds > 0 || boosterCost * cps * STORAGE_SEGMENT > storageCurrency ? 'bg-gray-400' : 'bg-emerald-400'}`}
          onClick={() => castSpellById(BOOSTER_SPELL_ID)}
          disabled={
            boosterSpellSeconds > 0 ||
            boosterCost * cps * STORAGE_SEGMENT > storageCurrency
          }
        >
          <GameText size="xs" text={formatDuration(boosterSpellSeconds)} />
          <GameText size="sm" text={SPELLS_INFO[BOOSTER_SPELL_ID]} />
        </button>
      </div>
    </div>
  );
}
