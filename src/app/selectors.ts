import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick } from '../utils';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';
import { selectAllBuildings } from '../state/buildingsSlice';
import { selectAllSkills } from '../state/skillsSlice';
import getSkillStatus from '../utils/getSkillStatus';
import { selectAllSpells } from '../state/spellsSlice';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectLoading = (state: RootState) => state.game.loading;
export const selectAssetsLoading = (state: RootState) =>
  state.game.assetsLoading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectStorage = (state: RootState) => ({
  storage: state.game.storage,
  storageCurrency: state.game.storageCurrency,
});

export const selectUnlockedSkillsIds = createSelector(
  selectAllSkills,
  (skills) => skills.filter((skill) => skill.unlocked).map((skill) => skill.id),
);

export const selectVisibleSkills = createSelector(
  [selectAllSkills, selectUnlockedSkillsIds],
  (skills, unlockedSkillsIds) => {
    return skills.filter(
      (skill) => getSkillStatus(skill, unlockedSkillsIds) !== 'hidden',
    );
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
