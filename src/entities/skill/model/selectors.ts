import { createSelector } from '@reduxjs/toolkit';

import { STONES_UPGRADE_SKILL_ID } from '../config/ids';
import { getStorage } from '../lib/getStorage';
import { skillsAdapter } from './skillsSlice';
import type { RootState } from '@/app/store';

export const {
  selectAll: selectAllSkills,
  selectById: selectSkillById,
  selectIds: selectSkillIds,
} = skillsAdapter.getSelectors((state: RootState) => state.skills);

export const selectUnlockedSkillsIds = createSelector(
  selectAllSkills,
  (skills) => skills.filter((skill) => skill.unlocked).map((skill) => skill.id),
);

export const selectSunState = createSelector(
  selectUnlockedSkillsIds,
  (skills) => {
    return skills.includes(24)
      ? skills.includes(STONES_UPGRADE_SKILL_ID)
        ? 'deadly'
        : 'close'
      : 'far';
  },
);

export const selectMoonState = createSelector(
  selectUnlockedSkillsIds,
  (skills) => {
    return skills.includes(22)
      ? skills.includes(STONES_UPGRADE_SKILL_ID)
        ? 'deadly'
        : 'close'
      : 'normal';
  },
);

export const selectStorage = createSelector(
  selectUnlockedSkillsIds,
  (unlockedSkillsIds) => {
    return getStorage(unlockedSkillsIds);
  },
);
