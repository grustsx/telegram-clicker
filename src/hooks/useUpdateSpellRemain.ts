import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { updateSpellsRemain } from '../state/gameSlice';

export default function useUpdateSpellRemailn() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const currencyInterval = setInterval(() => {
      dispatch(updateSpellsRemain(1));
    }, 1000);

    return () => {
      clearInterval(currencyInterval);
    };
  }, [dispatch]);
}
