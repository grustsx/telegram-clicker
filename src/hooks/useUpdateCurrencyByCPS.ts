import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrencyPerSecond } from '../app/selectors';
import { updateCurrencyByCPS } from '../state/thunk';

export default function useUpdateCurrencyByCPS() {
  const dispatch = useAppDispatch();

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  React.useEffect(() => {
    const currencyInterval = setInterval(() => {
      if (currencyPerSecond > 0) {
        dispatch(updateCurrencyByCPS());
      }
    }, 1000);

    return () => {
      clearInterval(currencyInterval);
    };
  }, [currencyPerSecond, dispatch]);
}
