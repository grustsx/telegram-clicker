import { sendCastSpell } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserId } from '../../app/selectors';
import GameText from '../../elements/GameText';
import { selectSpellById } from '../../state/spellsSlice';
import { castSpell } from '../../state/thunk';
import type { GameMessageType } from '../../types/types';
import { formatDuration } from '../../utils/format';

const DEP_ID = 3;

const SPELLS_INFO: Record<number, string> = {
  [DEP_ID]: 'Депнуть весь капитал в казик, шанс победы чуть меньше 50%',
};

function getDepWin(): boolean {
  return Math.random() > 0.45;
}

export default function TortikSpells({
  showEventMessages,
}: {
  showEventMessages: (messages: GameMessageType[], time?: number) => void;
}) {
  const { remainSeconds: depRemainSeconds } = useAppSelector((state) =>
    selectSpellById(state, 3),
  );
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

  const castSpellById = (id: number) => {
    if (depRemainSeconds > 0) return;

    if (DEP_ID === id) {
      const win = getDepWin();

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
  };

  return (
    <div
      className={`flex flex-col gap-2 pixel-border--gr justify-between items-center`}
    >
      <GameText size="xs" text={formatDuration(depRemainSeconds)} />

      <div className="flex flex-col gap-1 w-full">
        <button
          className={`w-full border-white border-2 text-white p-2 ${depRemainSeconds > 0 ? 'bg-gray-400' : 'bg-emerald-400'}`}
          onClick={() => castSpellById(DEP_ID)}
          disabled={depRemainSeconds > 0}
        >
          <GameText size="sm" text={SPELLS_INFO[DEP_ID]} />
        </button>
      </div>
    </div>
  );
}
