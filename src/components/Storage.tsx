import React from 'react';
import { sendClaimStorage } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrencyPerSecond,
  selectStorage,
  selectUserId,
} from '../app/selectors';
import { claimStorage } from '../state/gameSlice';

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
      className={`text-2xl select-none ${storageCurrency > 0 ? 'text-tortik-yellow hover:bg-tortik-orange/50 cursor-pointer' : 'text-tortik-white'}`}
      onClick={handleClick}
    >{`Хранилище: ${storageCurrency} / ${storage * cps}${storageCurrency ? ' собрать' : ''}`}</div>
  );
};
export default React.memo(Storage);
