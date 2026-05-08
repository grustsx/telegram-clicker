import { createAppAsyncThunk } from '@/app/thunk';
import { lockSkill, unlockSkill } from './skillsSlice';
import { decreaseSkillPoints } from '@/entities/game';
import { selectSkillById } from './selectors';

export const buySkillThunk = createAppAsyncThunk(
  'skills/buySkill',
  async (skillId: number, { getState, dispatch }) => {
    const state = getState();
    const skill = selectSkillById(state, skillId);

    if (!skill || skill.unlocked) return;

    const currentPoints = state.game.skillPoints;

    if (currentPoints < skill.price) return;

    if (skill.id === 22 || skill.id === 23 || skill.id === 24) {
      dispatch(lockSkill(22));
      dispatch(lockSkill(23));
      dispatch(lockSkill(24));
    }
    dispatch(decreaseSkillPoints(skill.price));
    dispatch(unlockSkill(skillId));
  },
);
