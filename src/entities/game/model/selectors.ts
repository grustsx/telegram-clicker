import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

import {
  selectAllBuildings,
  selectBuildingLevelsSum,
} from '@/entities/building';
import { selectUnlockedSkillsIds } from '@/entities/skill';
import { selectActiveBoosterIds } from '@/entities/booster';

import { getCurrencyPerSecond } from '../lib/getCurrencyPerSecond';
import { getCurrencyPerClick } from '../lib/getCurrencyPerClick';

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
