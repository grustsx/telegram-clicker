import { createAppAsyncThunk } from '@/app/store/thunk';
import { incrementBuildingLevel } from './buildingsSlice';
import { getPrice } from '../lib/getPrice';
import { decreaseCurrency, incrementSkillPoints } from '@/entities/game';
import { selectBuildingById } from './selectors';
import { selectUnlockedSkillsIds } from '@/entities/skill';

export const buyBuildingLevelThunk = createAppAsyncThunk(
  'buildings/incrementBuildingLevel',
  async (buildingId: number, { getState, dispatch }) => {
    const state = getState();
    const building = selectBuildingById(state, buildingId);

    if (!building) return;

    const unlockedSkillIds = selectUnlockedSkillsIds(state);
    const price = getPrice(building, unlockedSkillIds);

    if (state.game.currency < price) return;

    dispatch(incrementBuildingLevel(buildingId));
    dispatch(incrementSkillPoints());
    dispatch(decreaseCurrency(price));
  },
);
