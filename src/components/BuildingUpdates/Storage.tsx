import React from 'react';
import { sendClaimStorage } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCurrencyPerSecond,
  selectStorage,
  selectStorageCurrency,
  selectUserId,
} from '../../app/selectors';
import { claimStorage } from '../../state/gameSlice';
import ProgressBar from '../ProgressBar';
import { STORAGE_SEGMENT } from '../../constants/const';

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
      className={`flex flex-col gap-2 pixel-border--gr justify-between items-center p-4`}
    >
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
