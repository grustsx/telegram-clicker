import { createSelector } from '@reduxjs/toolkit';

import { selectAllBuildings } from './buildingsSlice';
import { getPrice } from '../lib/getPrice';
import { getIsBuildingShowed } from '../lib/getIsBuildingShowed';
import { getBuildingAssetLevel } from '../lib/getBuildingAssetLevel';

import { selectCurrency } from '@/entities/game';
import { selectUnlockedSkillsIds } from '@/entities/skill';

export const selectBuildingLevelsSum = createSelector(
  selectAllBuildings,
  (buildings) => buildings.reduce((sum, building) => sum + building.level, 0),
);

export const selectIsAnyBuildingAvailable = createSelector(
  [selectAllBuildings, selectUnlockedSkillsIds, selectCurrency],
  (buildings, unlockedSkillsIds, currency) =>
    buildings.some(
      (building) =>
        getPrice(building, unlockedSkillsIds) <= currency &&
        getIsBuildingShowed(building.id, unlockedSkillsIds, buildings),
    ),
);

export const selectAssetLevels = createSelector(
  [selectAllBuildings, selectUnlockedSkillsIds],
  (buildings, unlockedSkillsIds) => {
    const result: Record<number, number> = {};

    for (const building of buildings) {
      const { id, level } = building;

      const isShowed = (() => {
        if (id === 1) return true;
        if (id === 7) return true;

        const prev = buildings.find((b) => b.id === id - 1);
        return (prev?.level || 0) > 0;
      })();

      result[id] = isShowed
        ? 1 + Math.min(level, 1) + getBuildingAssetLevel(unlockedSkillsIds, id)
        : 0;
    }

    return result;
  },
);
