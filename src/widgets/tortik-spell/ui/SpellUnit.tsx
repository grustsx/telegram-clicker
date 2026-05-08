import { STORAGE_SEGMENT } from '@/entities/skill';
import { GameText, useAppSelector } from '@/shared';
import { CooldownSquare } from './CooldownSquare';
import { selectStorageCurrency } from '@/entities/game/model/selectors';
import { selectCurrencyPerSecond } from '@/features/game-progress/model/selectors';

export function SpellUnit({
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
