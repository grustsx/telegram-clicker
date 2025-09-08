import React from 'react';
import { useAppSelector } from '../app/hooks';
import {
  selectCurrencyPerSecond,
  selectStorageCurrency,
} from '../app/selectors';
import { STORAGE_SEGMENT } from '../constants/const';

const ROOMS = [1, 2, 3, 4];

const StorageIndicator = () => {
  const storageCurrency = useAppSelector(selectStorageCurrency);

  const cps = useAppSelector(selectCurrencyPerSecond);

  return (
    <div className={`flex flex-col items-center`}>
      <div className="flex flex-row flex-wrap w-4 self-center">
        {ROOMS.map((i) => (
          <div
            key={i}
            className={`w-2 h-2 border-1 
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
