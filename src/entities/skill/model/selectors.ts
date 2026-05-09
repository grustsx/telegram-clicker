import { createSelector } from '@reduxjs/toolkit';

import { skillsAdapter } from './skillsSlice';
import type { RootState } from '@/app/store/store';

export const {
  selectAll: selectAllSkills,
  selectById: selectSkillById,
  selectIds: selectSkillIds,
} = skillsAdapter.getSelectors((state: RootState) => state.skills);

export const selectUnlockedSkillsIds = createSelector(
  selectAllSkills,
  (skills) => skills.filter((skill) => skill.unlocked).map((skill) => skill.id),
);
