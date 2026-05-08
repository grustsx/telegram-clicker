import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { SkillType } from './types';

export const skillsAdapter = createEntityAdapter<SkillType>();

const skillsSlice = createSlice({
  name: 'skills',
  initialState: skillsAdapter.getInitialState(),
  reducers: {
    unlockSkill(state, action: PayloadAction<number>) {
      const id = action.payload;
      const skill = state.entities[id];
      if (skill) {
        skill.unlocked = true;
      }
    },

    lockSkill(state, action: PayloadAction<number>) {
      const id = action.payload;
      const skill = state.entities[id];
      if (skill) {
        skill.unlocked = false;
      }
    },
    setSkills(state, action: PayloadAction<SkillType[]>) {
      skillsAdapter.setAll(state, action.payload);
    },
  },
});

export const { unlockSkill, lockSkill, setSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
