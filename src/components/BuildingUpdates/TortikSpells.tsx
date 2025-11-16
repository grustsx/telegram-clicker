import React from 'react';
import { sendActivateBooster, sendCastSpell } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectActiveBoosterIds,
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../../app/selectors';
import { CHEATING_BOOSTER_ID, STORAGE_SEGMENT } from '../../constants/const';
import GameText from '../../elements/GameText';
import { selectSpellById } from '../../state/spellsSlice';
import { activateBooster, castSpell } from '../../state/thunk';
import type { GameMessageType } from '../../types/types';
import { formatDuration } from '../../utils/format';

const DEP_ID = 3;
const BOOSTER_SPELL_ID = 4;
const CHEATING_SPELL_ID = 5;

const SPELLS_INFO: Record<number, string> = {
  [DEP_ID]: 'Депнуть весь капитал в казик, шанс победы чуть меньше 50%',
  [CHEATING_SPELL_ID]:
    'Потратить 1 комнату амбара, чтобы отвлечь крупье на 2 минуты и понизить шанс проигрыша в 2 раза',
  [BOOSTER_SPELL_ID]: 'Состредоточить 2 комнаты амбара в спавн бустера',
};

function getDepWin(boosters: number[]): boolean {
  const booster = (id: number) => {
    return boosters.includes(id) ? 1 : 0;
  };
  return Math.random() < 0.48 + 0.26 * booster(4);
}

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

      dispatch(castSpell({ spellId: id, spellPayload: { win } }));
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
      dispatch(castSpell({ spellId: id }));
      sendCastSpell(id, userId);
      dispatch(activateBooster({ boosterId: CHEATING_BOOSTER_ID }));
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

      dispatch(castSpell({ spellId: id }));
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
        <TortikSpell
          castSpell={() => castSpellById(DEP_ID)}
          title="Деп"
          description={SPELLS_INFO[DEP_ID]}
          remain={depRemainSeconds}
          cooldown={depCooldownSeconds}
          cost={depCost}
          icon="skills/cherry.png"
        />
        {unlockedSkills.includes(32) && (
          <TortikSpell
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
          <TortikSpell
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

function TortikSpell({
  castSpell,
  title,
  description,
  remain,
  cooldown,
  cost,
  icon,
}: {
  castSpell: () => void;
  title: string;
  description: string;
  remain: number;
  cooldown: number;
  cost: number;
  icon: string;
}) {
  const cps = useAppSelector(selectCurrencyPerSecond);
  const storageCurrency = useAppSelector(selectStorageCurrency);

  const message =
    cost * cps * STORAGE_SEGMENT > storageCurrency
      ? `Нужно ${cost} комнаты амбара`
      : null;

  return (
    <div className="w-full border-white border-2 text-white p-2 flex flex-row justify-between items-center gap-2">
      <div className="flex flex-col gap-2">
        <GameText text={title} />
        <GameText size="sm" text={description} />
      </div>
      <button
        onClick={castSpell}
        disabled={remain > 0 || cost * cps * STORAGE_SEGMENT > storageCurrency}
        className={`w-20 h-20 ${
          remain > 0 || cost * cps * STORAGE_SEGMENT > storageCurrency
            ? 'bg-tortik-orange'
            : 'bg-emerald-400 border-2 animate-pulse'
        }`}
      >
        <CooldownSquare
          remain={remain}
          cooldown={cooldown}
          icon={icon}
          message={message}
        />
      </button>
    </div>
  );
}

function CooldownSquare({
  remain,
  cooldown,
  message,
  icon,
}: {
  remain: number;
  cooldown: number;
  message: string | null;
  icon: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const progress = Math.min(1, Math.max(0, remain / cooldown));

  const text = remain > 0 ? formatDuration(remain) : message || '';

  return (
    <div
      onPointerDown={() => setIsOpen(true)}
      onPointerLeave={() => setIsOpen(false)}
      onPointerUp={() => setIsOpen(false)}
      className="relative inline-grid place-items-center text-white font-bold text-lg w-20 h-20"
    >
      {/* Затемняющий слой */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          width: `${progress * 100}%`,
          left: `${(1 - progress) * 100}%`,
        }}
      />
      <div>
        <img
          className="w-16 h-16 pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/${icon}`}
        />
        {isOpen && !!text.length && (
          <GameText
            className="z-10 bg-gray-900/70 p-2 absolute bottom-16 left-0"
            size="sm"
            text={text}
          />
        )}
      </div>
    </div>
  );
}
