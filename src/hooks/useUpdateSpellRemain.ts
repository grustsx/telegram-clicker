import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSpellsOnCooldoown } from '../app/selectors';
import { updateSpellsTimer } from '../state/spellsSlice';

export default function useUpdateSpellRemailn() {
  const dispatch = useAppDispatch();

  const spellOnCooldown = useAppSelector(selectSpellsOnCooldoown);

  React.useEffect(() => {
    const currencyInterval = setInterval(() => {
      if (!spellOnCooldown.length) return;
      dispatch(updateSpellsTimer(1));
    }, 1000);

    return () => {
      clearInterval(currencyInterval);
    };
  }, [dispatch, spellOnCooldown]);
}
