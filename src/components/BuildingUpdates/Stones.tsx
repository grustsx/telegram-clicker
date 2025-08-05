import { sendBuySkill, sendCastSpell } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUnlockedSkillsIds, selectUserId } from '../../app/selectors';
import GameText from '../../elements/GameText';
import { selectSpellById } from '../../state/spellsSlice';
import { buySkill, castSpell } from '../../state/thunk';
import { formatDuration } from '../../utils/format';

const STONES_SPELL_ID = 2;

const STONES_INFO: Record<number, string> = {
  22: '15% к cps',
  23: '50% к клику',
  24: 'откат быстрее',
};

export default function Stones() {
  const stonesSpell = useAppSelector((state) =>
    selectSpellById(state, STONES_SPELL_ID),
  );
  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();

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
      className={`flex flex-col gap-2 pixel-border--gr justify-between items-center`}
    >
      <GameText
        size="xs"
        text={
          remainSeconds > 0
            ? `${formatDuration(remainSeconds)} откат`
            : 'готов к использованию'
        }
      />

      <div className="flex flex-col gap-1 w-full">
        {[22, 23, 24].map((id) => (
          <button
            className={`w-full border-white border-2 text-white p-2 ${unlockedSkillsIds.includes(id) ? 'bg-amber-600' : remainSeconds > 0 ? 'bg-gray-400' : 'bg-emerald-400'}`}
            onClick={() => chooseStone(id)}
            disabled={remainSeconds > 0}
          >
            <GameText size="sm" text={STONES_INFO[id]} />
          </button>
        ))}
      </div>
    </div>
  );
}
