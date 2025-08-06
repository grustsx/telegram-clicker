import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectActiveBoosterIds,
  selectSpellsOnCooldoown,
} from '../app/selectors';
import { updateSpellsTimer } from '../state/spellsSlice';
import { updateBoostersTimer } from '../state/boostersSlice';

export default function useUpdateTimers() {
  const dispatch = useAppDispatch();

  const spellOnCooldown = useAppSelector(selectSpellsOnCooldoown);
  const activeBoosters = useAppSelector(selectActiveBoosterIds);

  React.useEffect(() => {
    const currencyInterval = setInterval(() => {
      if (spellOnCooldown.length) {
        dispatch(updateSpellsTimer(1));
      }

      if (activeBoosters.length) {
        dispatch(updateBoostersTimer(1));
      }
    }, 1000);

    return () => {
      clearInterval(currencyInterval);
    };
  }, [activeBoosters, dispatch, spellOnCooldown]);
}
