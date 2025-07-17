import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick } from '../utils';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';
import { findById } from '../utils/findById';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectBuildings = (state: RootState) => state.game.buildings;

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
  (state: RootState) => state.game.buildings,
  (buildings) => buildings.reduce((sum, b) => sum + b.level, 0),
);

export const selectSpellById = createSelector(
  [selectSpells, (_: RootState, id: number) => id],
  (spells, id) => findById(spells, id),
);

export const selectCurrencyPerClick = createSelector(
  [selectUnlockedSkillsIds, selectBuildings],
  (unlockedSkillsIds, buildings) => {
    return getCurrencyPerClick(
      unlockedSkillsIds,
      buildings.reduce((prev, building) => prev + building.level, 0),
    );
  },
);

export const selectCurrencyPerSecond = createSelector(
  [selectUnlockedSkillsIds, selectBuildings],
  (unlockedSkillsIds, buildings) => {
    return getCurrencyPerSecond(unlockedSkillsIds, buildings);
  },
);
