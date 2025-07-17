import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick } from '../utils';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';
import { findById } from '../utils/findById';
import { selectAllBuildings } from '../state/buildingsSlice';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectLoading = (state: RootState) => state.game.loading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectSpells = (state: RootState) => state.game.spells;

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

export const selectBuildingLevelsSum = createSelector(
  (state: RootState) => state.buildings,
  (buildings) =>
    buildings.ids
      .map((id) => buildings.entities[id])
      .reduce((sum, b) => sum + b.level, 0),
);

export const selectSpellById = createSelector(
  [selectSpells, (_: RootState, id: number) => id],
  (spells, id) => findById(spells, id),
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
