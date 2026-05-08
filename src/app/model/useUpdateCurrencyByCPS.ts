import { selectCurrencyPerSecond } from '@/features/game-progress/model/selectors';
import { updateCurrencyByCPSThunk } from '@/features/game-progress/model/updateCurrencyByCPSThunk';
import { useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';

export default function useUpdateCurrencyByCPS() {
  const dispatch = useAppDispatch();

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  React.useEffect(() => {
    const currencyInterval = setInterval(() => {
      if (currencyPerSecond > 0) {
        dispatch(updateCurrencyByCPSThunk());
      }
    }, 1000);

    return () => {
      clearInterval(currencyInterval);
    };
  }, [currencyPerSecond, dispatch]);
}
