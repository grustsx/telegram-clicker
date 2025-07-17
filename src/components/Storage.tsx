import React from 'react';
import { sendClaimStorage } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrencyPerSecond,
  selectStorage,
  selectUserId,
} from '../app/selectors';
import { claimStorage } from '../state/gameSlice';
import ProgressBar from './ProgressBar';

const Storage = () => {
  const dispatch = useAppDispatch();

  const { storage, storageCurrency } = useAppSelector(selectStorage);
  const userId = useAppSelector(selectUserId);

  const cps = useAppSelector(selectCurrencyPerSecond);

  const handleClick = () => {
    if (storageCurrency === 0) return;
    dispatch(claimStorage());
    sendClaimStorage(userId);
  };

  return (
    <div
      className={`text-2xl text-shadow-lg ${storageCurrency > 0 ? 'text-tortik-yellow hover:bg-tortik-orange/50 cursor-pointer' : 'text-tortik-white'}`}
      onClick={handleClick}
    >
      {`Хранилище: ${storageCurrency} / ${storage * cps}${storageCurrency ? ' собрать' : ''}`}
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <ProgressBar currentValue={storageCurrency} maxValue={storage * cps} />
      </div>
    </div>
  );
};
export default React.memo(Storage);
