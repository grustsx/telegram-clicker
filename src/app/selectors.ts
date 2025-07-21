import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from './store';
import { getCurrencyPerClick } from '../utils';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';
import { selectAllBuildings } from '../state/buildingsSlice';
import { selectAllSkills } from '../state/skillsSlice';
import getSkillStatus from '../utils/getSkillStatus';

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
