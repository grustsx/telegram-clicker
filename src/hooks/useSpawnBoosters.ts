import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { spawnBooster } from '../state/gameSlice';
import { selectVisibleBoosters } from '../app/selectors';

const BOOSTER_NORMAL_TIMEOUT: Record<number, number> = {
  1: 30000,
  2: 180000,
  3: 120000,
};

const INTERVAL_TIME = 1000;

export default function useSpawnBoosters() {
  const dispatch = useAppDispatch();
  const visibleBoosters = useAppSelector(selectVisibleBoosters);

  React.useEffect(() => {
    const spawnRandomlyBooster = (id: number) => {
      if (
        Math.random() < INTERVAL_TIME / BOOSTER_NORMAL_TIMEOUT[id] &&
        !visibleBoosters.includes(id)
      ) {
        dispatch(spawnBooster(id));
      }
    };
    const currencyInterval = setInterval(() => {
      Object.keys(BOOSTER_NORMAL_TIMEOUT).forEach((key) =>
        spawnRandomlyBooster(Number(key)),
      );
    }, INTERVAL_TIME);

    return () => {
      clearInterval(currencyInterval);
    };
  }, [dispatch, visibleBoosters]);
}
