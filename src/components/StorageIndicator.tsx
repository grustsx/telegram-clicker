import React from 'react';
import { sendClaimStorage } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectUserId,
} from '../app/selectors';
import { claimStorage } from '../state/gameSlice';
import { STORAGE_SEGMENT } from '../constants/const';

const ROOMS = [1, 2, 3, 4];

const StorageIndicator = () => {
  const dispatch = useAppDispatch();

  const storageCurrency = useAppSelector(selectStorageCurrency);

  const userId = useAppSelector(selectUserId);

  const cps = useAppSelector(selectCurrencyPerSecond);

  const handleClick = () => {
    if (storageCurrency === 0) return;
    dispatch(claimStorage());
    sendClaimStorage(userId);
  };

  return (
    <div className={`flex flex-col items-center`}>
      <div className="flex flex-row self-center gap-2" onClick={handleClick}>
        {ROOMS.map((i) => (
          <div
            className={`w-4 h-4 rounded-xl
              ${
                storageCurrency <= STORAGE_SEGMENT * cps * (i - 1)
                  ? 'bg-gray-800'
                  : storageCurrency < STORAGE_SEGMENT * cps * i
                    ? 'bg-amber-400'
                    : 'bg-green-700'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
export default React.memo(StorageIndicator);
