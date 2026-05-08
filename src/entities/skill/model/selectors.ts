import { createSelector } from '@reduxjs/toolkit';

import { selectAllSkills } from './skillsSlice';
import getSkillStatus from '../lib/getSkillStatus';

import { selectAllBuildings } from '@/entities/building';
import { selectSkillPoints } from '@/entities/game';
import { STONES_UPGRADE_SKILL_ID } from '../config/ids';
import { getStorage } from '../lib/getStorage';

export const selectUnlockedSkillsIds = createSelector(
  selectAllSkills,
  (skills) => skills.filter((skill) => skill.unlocked).map((skill) => skill.id),
);

export const selectVisibleSkills = createSelector(
  [selectAllSkills, selectUnlockedSkillsIds, selectAllBuildings],
  (skills, unlockedSkillsIds, buildings) =>
    skills.filter(
      (skill) =>
        getSkillStatus(skill, unlockedSkillsIds, buildings) !== 'hidden',
    ),
);

export const selectVisibleSkillsIds = createSelector(
  selectVisibleSkills,
  (skills) => skills.map((skill) => skill.id),
);

export const selectIsAnySkillAvailable = createSelector(
  [
    selectAllSkills,
    selectUnlockedSkillsIds,
    selectSkillPoints,
    selectAllBuildings,
  ],
  (skills, unlockedSkillsIds, skillPoints, buildings) =>
    skills.some(
      (skill) =>
        getSkillStatus(skill, unlockedSkillsIds, buildings) === 'available' &&
        skillPoints >= skill.price,
    ),
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
