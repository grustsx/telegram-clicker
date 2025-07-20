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
    <div onClick={handleClick}>
      <ProgressBar
        currentValue={storageCurrency}
        maxValue={storage * cps}
        text="амбар"
      />
    </div>
  );
};
export default React.memo(Storage);
