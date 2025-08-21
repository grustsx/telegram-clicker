import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick, getPrice } from '../utils';
import {
  getCurrencyPerSecond,
  getStorage,
} from '../utils/getCurrencyPerSecond';
import { selectAllBuildings } from '../state/buildingsSlice';
import { selectAllSkills } from '../state/skillsSlice';
import getSkillStatus from '../utils/getSkillStatus';
import { selectAllSpells } from '../state/spellsSlice';
import { selectAllBoosters } from '../state/boostersSlice';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectLoading = (state: RootState) => state.game.loading;
export const selectAssetsLoading = (state: RootState) =>
  state.game.assetsLoading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectVisibleBoosters = (state: RootState) =>
  state.game.visibleBoosters;

export const selectStorageCurrency = (state: RootState) =>
  state.game.storageCurrency;

export const selectUnlockedSkillsIds = createSelector(
  selectAllSkills,
  (skills) => skills.filter((skill) => skill.unlocked).map((skill) => skill.id),
);

export const selectStorage = createSelector(
  selectUnlockedSkillsIds,
  (unlockedSkillsIds) => {
    return getStorage(unlockedSkillsIds);
  },
);

export const selectActiveBoosters = createSelector(
  selectAllBoosters,
  (boosters) => boosters.filter((booster) => booster.remainSeconds > 0),
);

export const selectActiveBoosterIds = createSelector(
  selectAllBoosters,
  (boosters) =>
    boosters
      .filter((booster) => booster.remainSeconds > 0)
      .map((booster) => booster.id),
);

export const selectVisibleSkills = createSelector(
  [selectAllSkills, selectUnlockedSkillsIds],
  (skills, unlockedSkillsIds) => {
    return skills.filter(
      (skill) => getSkillStatus(skill, unlockedSkillsIds) !== 'hidden',
    );
  },
);

export const selectIsAnyBuildingAvailable = createSelector(
  [selectAllBuildings, selectUnlockedSkillsIds, selectCurrency],
  (buildings, unlockedSkillsIds, currency) => {
    let isAvailable = false;
    buildings.forEach((building) => {
      if (getPrice(building, unlockedSkillsIds) <= currency) {
        isAvailable = true;
      }
    });
    return isAvailable;
  },
);

export const selectIsAnySkillAvailable = createSelector(
  [selectAllSkills, selectUnlockedSkillsIds, selectSkillPoints],
  (skills, unlockedSkillsIds, skillPoints) => {
    let isAvailable = false;
    skills.forEach((skill) => {
      if (
        getSkillStatus(skill, unlockedSkillsIds) === 'available' &&
        skillPoints >= skill.price
      ) {
        isAvailable = true;
      }
    });
    return isAvailable;
  },
);

export const selectVisibleSkillsIds = createSelector(
  [selectVisibleSkills],
  (skills) => {
    return skills.map((skill) => skill.id);
  },
);

export const selectSpellsOnCooldoown = createSelector(
  selectAllSpells,
  (spells) => spells.filter((s) => s?.remainSeconds > 0),
);

export const selectBuildingLevelsSum = createSelector(
  selectAllBuildings,
  (buildings) => buildings.reduce((sum, b) => sum + b.level, 0),
);

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

export const selectAssetLevels = createSelector(
  [selectAllBuildings],
  (buildings) => {
    const result: Record<number, number> = {};

    for (const building of buildings) {
      const { id, level } = building;

      const isShowed = (() => {
        if (id === 1) return true;
        if (id === 7) return true;
        const prev = buildings.find((b) => b.id === id - 1);
        return (prev?.level || 0) > 0;
      })();

      if (!isShowed) {
        result[id] = 0;
      } else if (level === 0) {
        result[id] = 1;
      } else if (level < 10) {
        result[id] = 2;
      } else if (level < 20) {
        result[id] = 3;
      } else if (level < 30) {
        result[id] = 4;
      } else {
        result[id] = 5;
      }
    }

    return result;
  },
);
