import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick } from '../utils';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';

export const selectCurrency = (state: RootState) => state.game.currency;

// export const selectCurrencyPerSecond = (state: RootState) =>
//   state.game.currencyPerSecond;

// export const selectCurrencyPerClick = (state: RootState) =>
//   state.game.currencyPerClick;

export const selectBuildings = (state: RootState) => state.game.buildings;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectLoading = (state: RootState) => state.game.loading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectSkillTree = (state: RootState) => state.game.skillsTree;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectStorage = (state: RootState) => ({
  storage: state.game.storage,
  storageCurrency: state.game.storageCurrency,
});

export const selectUnlockedSkillsIds = createSelector(
  [selectSkillTree],
  (skills) => {
    return skills.filter((skill) => skill.unlocked).map((skill) => skill.id);
  },
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
    return getCurrencyPerSecond(
      unlockedSkillsIds,
      buildings.map((building) => ({
        level: building.level,
        income: building.incomePerSecond,
        id: building.buildingId,
      })),
    );
  },
);
