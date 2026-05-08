import { CHEATING_BOOSTER_ID, sendActivateBooster } from '@/entities/booster';
import type { GameMessageType } from '@/entities/dialog';
import { activateBoosterThunk, castSpellThunk } from '@/entities/game';
import { STORAGE_SEGMENT } from '@/entities/skill';
import {
  BOOSTER_SPELL_ID,
  CHEATING_SPELL_ID,
  DEP_ID,
  sendCastSpell,
  SPELLS_INFO,
} from '@/entities/spell';
import { useAppDispatch, useAppSelector } from '@/shared';
import { SpellUnit } from './SpellUnit';
import { getDepWin } from '../lib/getDepWin';
import { selectActiveBoosterIds } from '@/entities/booster/model/selectors';
import { selectSpellById } from '@/entities/spell/model/selectors';
import {
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectUserId,
} from '@/entities/game/model/selectors';
import { selectUnlockedSkillsIds } from '@/entities/skill/model/selectors';

export default function TortikSpells({
  showEventMessages,
}: {
  showEventMessages: (messages: GameMessageType[], time?: number) => void;
}) {
  const activeBoosterIds = useAppSelector(selectActiveBoosterIds);

  const {
    remainSeconds: depRemainSeconds,
    cooldownSeconds: depCooldownSeconds,
    cost: depCost,
  } = useAppSelector((state) => selectSpellById(state, DEP_ID));

  const {
    remainSeconds: boosterSpellSeconds,
    cooldownSeconds: boosterCooldownSeconds,
    cost: boosterCost,
  } = useAppSelector((state) => selectSpellById(state, BOOSTER_SPELL_ID));

  const {
    remainSeconds: cheatingSpellSeconds,
    cooldownSeconds: cheatingCooldownSeconds,
    cost: cheatingCost,
  } = useAppSelector((state) => selectSpellById(state, CHEATING_SPELL_ID));

  const userId = useAppSelector(selectUserId);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const cps = useAppSelector(selectCurrencyPerSecond);
  const storageCurrency = useAppSelector(selectStorageCurrency);
  const dispatch = useAppDispatch();

  const castSpellById = (id: number) => {
    if (DEP_ID === id) {
      if (depRemainSeconds > 0) return;

      const win = getDepWin(activeBoosterIds);

      dispatch(castSpellThunk({ spellId: id, spellPayload: { win } }));
      sendCastSpell(id, userId, { win });

      if (win) {
        showEventMessages([
          {
            name: 'Никита',
            description: 'Ну респектос, ничё не могу сказать',
            face: 'Nikita-notbad',
          },
        ]);
      } else {
        showEventMessages([
          {
            name: 'Никита',
            description: 'АХАХАХА ЛОШАРА!!!!',
            face: 'Nikita-smile',
          },
        ]);
      }
    }

    if (CHEATING_SPELL_ID === id) {
      dispatch(castSpellThunk({ spellId: id }));
      sendCastSpell(id, userId);
      dispatch(activateBoosterThunk({ boosterId: CHEATING_BOOSTER_ID }));
      sendActivateBooster(CHEATING_BOOSTER_ID, userId);

      showEventMessages([
        {
          name: 'Никита',
          description: 'Уважаемая, скажите стоп в любом месте!',
          face: 'Nikita-smile',
        },
      ]);
    }

    if (BOOSTER_SPELL_ID === id) {
      if (boosterSpellSeconds > 0) return;
      if (boosterCost * cps * STORAGE_SEGMENT > storageCurrency) return;

      dispatch(castSpellThunk({ spellId: id }));
      sendCastSpell(id, userId);

      showEventMessages([
        {
          name: 'Никита',
          description: 'Что-то где-то появилось, это точно',
          face: 'Nikita-smile',
        },
      ]);
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 pixel-border--gr justify-between items-center`}
    >
      <div className="flex flex-col gap-1 w-full">
        <SpellUnit
          castSpell={() => castSpellById(DEP_ID)}
          title="Деп"
          description={SPELLS_INFO[DEP_ID]}
          remain={depRemainSeconds}
          cooldown={depCooldownSeconds}
          cost={depCost}
          icon="skills/cherry.png"
        />
        {unlockedSkills.includes(32) && (
          <SpellUnit
            castSpell={() => castSpellById(CHEATING_SPELL_ID)}
            title="Фокус"
            description={SPELLS_INFO[CHEATING_SPELL_ID]}
            remain={cheatingSpellSeconds}
            cooldown={cheatingCooldownSeconds}
            cost={cheatingCost}
            icon="skills/ace.png"
          />
        )}
        {unlockedSkills.includes(33) && (
          <SpellUnit
            castSpell={() => castSpellById(BOOSTER_SPELL_ID)}
            title="Ритуал"
            description={SPELLS_INFO[BOOSTER_SPELL_ID]}
            remain={boosterSpellSeconds}
            cooldown={boosterCooldownSeconds}
            cost={boosterCost}
            icon="skills/ritual.png"
          />
        )}
      </div>
    </div>
  );
}
