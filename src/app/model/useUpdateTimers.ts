import { updateBoostersTimer } from '@/entities/booster';
import { selectActiveBoosterIds } from '@/entities/booster';
import { updateSpellsTimer } from '@/entities/spell';
import { selectSpellsOnCooldoown } from '@/entities/spell';
import { useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';

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
