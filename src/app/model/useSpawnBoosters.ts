import { BOOSTER_NORMAL_TIMEOUT } from '@/entities/booster';
import { selectVisibleBoosters, spawnBooster } from '@/entities/game';
import { selectUnlockedSkillsIds } from '@/entities/skill';
import { useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';

const INTERVAL_TIME = 1000;

export default function useSpawnBoosters() {
  const dispatch = useAppDispatch();
  const visibleBoosters = useAppSelector(selectVisibleBoosters);
  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);

  React.useEffect(() => {
    const skill = (id: number) => {
      return unlockedSkillsIds.includes(id) ? 1 : 0;
    };

    const spawnRandomlyBooster = (id: number) => {
      if (
        Math.random() <
          INTERVAL_TIME /
            (BOOSTER_NORMAL_TIMEOUT[id] / (1 + skill(47) + 2 * skill(49))) &&
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
  }, [dispatch, unlockedSkillsIds, visibleBoosters]);
}
