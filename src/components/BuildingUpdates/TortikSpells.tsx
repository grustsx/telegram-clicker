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
        <TortikSpell
          castSpell={() => castSpellById(DEP_ID)}
          title="Деп"
          description={`${SPELLS_INFO[DEP_ID]} ${
            unlockedSkills.includes(32) ? '50%' : 'чуть меньше 50%'
          }`}
          remain={depRemainSeconds}
          cooldown={depCooldownSeconds}
          cost={depCost}
        />

        <TortikSpell
          castSpell={() => castSpellById(BOOSTER_SPELL_ID)}
          title="Ритуал"
          description={SPELLS_INFO[BOOSTER_SPELL_ID]}
          remain={boosterSpellSeconds}
          cooldown={boosterCooldownSeconds}
          cost={boosterCost}
        />
      </div>
    </div>
  );
}

function TortikSpell({
  castSpell,
  title,
  description,
  remain,
  cooldown,
  cost,
}: {
  castSpell: () => void;
  title: string;
  description: string;
  remain: number;
  cooldown: number;
  cost: number;
}) {
  const cps = useAppSelector(selectCurrencyPerSecond);
  const storageCurrency = useAppSelector(selectStorageCurrency);

  if (cost * cps * STORAGE_SEGMENT > storageCurrency)
    return (
      <div className="w-full border-white border-2 text-white p-2">
        <GameText size="md" text={`Нужно комнат амбара: ${cost}`} />
      </div>
    );

  return (
    <div className="w-full border-white border-2 text-white p-2 flex gap-2">
      <div className="flex flex-col gap-2">
        <GameText size="lg" text={title} />

        <GameText size="xs" text={description} />
      </div>
      <button
        onClick={castSpell}
        disabled={remain > 0}
        className={remain > 0 ? 'bg-tortik-orange' : 'bg-emerald-400'}
      >
        <CooldownSquare remain={remain} cooldown={cooldown} />
      </button>
    </div>
  );
}

function CooldownSquare({
  remain,
  cooldown,
}: {
  remain: number;
  cooldown: number;
}) {
  const progress = Math.min(1, Math.max(0, remain / cooldown));

  return (
    <div className="relative inline-grid place-items-center  text-white font-bold text-lg w-20 h-full">
      {/* Затемняющий слой */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          width: `${progress * 100}%`,
          left: `${(1 - progress) * 100}%`,
        }}
      />
      <GameText
        size="sm"
        className="z-10"
        text={remain > 0 ? formatDuration(remain) : 'Каст'}
      />
    </div>
  );
}
