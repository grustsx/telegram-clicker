import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

import { getCurrencyPerSecond } from '../lib/getCurrencyPerSecond';
import { getCurrencyPerClick } from '../lib/getCurrencyPerClick';
import {
  selectAllSkills,
  selectUnlockedSkillsIds,
} from '@/entities/skill/model/selectors';
import {
  selectAllBuildings,
  selectBuildingLevelsSum,
} from '@/entities/building/model/selectors';
import { selectActiveBoosterIds } from '@/entities/booster/model/selectors';
import {
  getBuildingAssetLevel,
  getIsBuildingShowed,
  getPrice,
} from '@/entities/building';
import getSkillStatus from '@/entities/skill/lib/getSkillStatus';

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectVisibleBoosters = (state: RootState) =>
  state.game.visibleBoosters;

export const selectUserBanned = (state: RootState) => state.game.banned;

export const selectLoading = (state: RootState) => state.game.loading;

export const selectConnectionLoading = (state: RootState) =>
  state.game.connectionLoading;

export const selectAssetsLoading = (state: RootState) =>
  state.game.assetsLoading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectStorageCurrency = (state: RootState) =>
  state.game.storageCurrency;

export const selectCurrencyPerSecond = createSelector(
  [selectUnlockedSkillsIds, selectAllBuildings, selectActiveBoosterIds],
  (unlockedSkillsIds, buildings, activeBoosterIds) => {
    return getCurrencyPerSecond(unlockedSkillsIds, buildings, activeBoosterIds);
  },
);

export const selectCurrencyPerClick = createSelector(
  [selectUnlockedSkillsIds, selectBuildingLevelsSum, selectCurrencyPerSecond],
  (unlockedSkillsIds, buildingsCount, cps) => {
    return getCurrencyPerClick(unlockedSkillsIds, buildingsCount, cps);
  },
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

export const selectVisibleSkills = createSelector(
  [selectAllSkills, selectUnlockedSkillsIds, selectAllBuildings],
  (skills, unlockedSkillsIds, buildings) =>
    skills.filter(
      (skill) =>
        getSkillStatus(skill, unlockedSkillsIds, buildings) !== 'hidden',
    ),
);

export const selectVisibleSkillsIds = createSelector(
  selectVisibleSkills,
  (skills) => skills.map((skill) => skill.id),
);

export const selectIsAnySkillAvailable = createSelector(
  [
    selectAllSkills,
    selectUnlockedSkillsIds,
    selectSkillPoints,
    selectAllBuildings,
  ],
  (skills, unlockedSkillsIds, skillPoints, buildings) =>
    skills.some(
      (skill) =>
        getSkillStatus(skill, unlockedSkillsIds, buildings) === 'available' &&
        skillPoints >= skill.price,
    ),
);
