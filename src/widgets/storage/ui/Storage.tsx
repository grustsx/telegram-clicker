import { claimStorage, sendClaimStorage } from '@/entities/game';
import { STORAGE_SEGMENT } from '@/entities/skill';
import { GameText, useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';
import ProgressBar from './ProgressBar';
import { selectStorage } from '@/entities/skill/model/selectors';
import {
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectUserId,
} from '@/entities/game/model/selectors';

const ROOMS = [1, 2, 3, 4];

const Storage = () => {
  const dispatch = useAppDispatch();

  const storage = useAppSelector(selectStorage);
  const storageCurrency = useAppSelector(selectStorageCurrency);

  const userId = useAppSelector(selectUserId);

  const cps = useAppSelector(selectCurrencyPerSecond);

  const handleClick = () => {
    if (storageCurrency === 0) return;
    dispatch(claimStorage());
    sendClaimStorage(userId);
  };

  return (
    <div
      className={`flex flex-col gap-4 pixel-border--gr justify-between items-center p-4`}
    >
      <GameText
        size="sm"
        text="Амбар хранит в себе тортики и наполняется, пока ты не смотришь, нажми, чтобы собрать"
      />
      <div className="flex flex-row self-center" onClick={handleClick}>
        {ROOMS.map((i) => (
          <ProgressBar
            key={i}
            currentValue={storageCurrency - STORAGE_SEGMENT * cps * (i - 1)}
            maxValue={STORAGE_SEGMENT * cps}
            text={storage < STORAGE_SEGMENT * i ? '🔒' : String(i)}
          />
        ))}
      </div>
    </div>
  );
};
export default React.memo(Storage);
