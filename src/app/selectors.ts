import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick } from '../utils';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';
import { selectAllBuildings } from '../state/buildingsSlice';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectLoading = (state: RootState) => state.game.loading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectStorage = (state: RootState) => ({
  storage: state.game.storage,
  storageCurrency: state.game.storageCurrency,
});

export const selectUnlockedSkillsIds = createSelector(
  (state: RootState) => state.skills,
  (skills) =>
    skills.ids
      .map((id) => skills.entities[id])
      .filter((s) => s?.unlocked)
      .map((s) => s!.id),
);

export const selectSpellsOnCooldoown = createSelector(
  (state: RootState) => state.spells,
  (spells) =>
    spells.ids
      .map((id) => spells.entities[id])
      .filter((s) => s?.remainSeconds > 0),
);

export const selectBuildingLevelsSum = createSelector(
  (state: RootState) => state.buildings,
  (buildings) =>
    buildings.ids
      .map((id) => buildings.entities[id])
      .reduce((sum, b) => sum + b.level, 0),
);

export const selectCurrencyPerClick = createSelector(
  [selectUnlockedSkillsIds, selectBuildingLevelsSum],
  (unlockedSkillsIds, buildingsCount) => {
    return getCurrencyPerClick(unlockedSkillsIds, buildingsCount);
  },
);

export const selectCurrencyPerSecond = createSelector(
  [selectUnlockedSkillsIds, selectAllBuildings],
  (unlockedSkillsIds, buildings) => {
    return getCurrencyPerSecond(unlockedSkillsIds, buildings);
  },
);
