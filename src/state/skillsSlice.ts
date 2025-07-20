import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { SkillType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { SKILLS_INFO } from '../constants/skillsInfo';
import type { RootState } from '../app/store';
import getSkillStatus from '../utils/getSkillStatus';

const skillsAdapter = createEntityAdapter<SkillType>();

const skillsSlice = createSlice({
  name: 'skills',
  initialState: skillsAdapter.getInitialState(),
  reducers: {
    unlockSkill(state, action: PayloadAction<number>) {
      const id = action.payload;
      const skill = state.entities[id];
      if (skill && skill.status === 'available') {
        skill.status = 'unlocked';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAndDictionaries.fulfilled, (state, action) => {
      const { userInfo, dictionaries } = action.payload;

      const skills = dictionaries.skillsTree.map((skill) => ({
        ...skill,
        description: SKILLS_INFO[skill.id].description,
        status: getSkillStatus(skill, userInfo.unlockedSkills),
      }));

      skillsAdapter.setAll(state, skills);
    });
  },
});

export const {
  selectAll: selectAllSkills,
  selectById: selectSkillById,
  selectIds: selectSkillIds,
} = skillsAdapter.getSelectors((state: RootState) => state.skills);

export const { unlockSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
