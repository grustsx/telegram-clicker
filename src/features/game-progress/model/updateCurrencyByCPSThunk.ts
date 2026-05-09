import { createAppAsyncThunk } from '@/app/store/thunk';

import { selectUnlockedSkillsIds } from '@/entities/skill';
import { selectActiveBoosterIds } from '@/entities/booster';
import { selectAllBuildings } from '@/entities/building';
import { getCurrencyPerSecond } from '@/entities/game/lib/getCurrencyPerSecond';
import { increaseCurrency } from '@/entities/game';

// Вызывается раз в секунду!! Важно не нахуевертить
export const updateCurrencyByCPSThunk = createAppAsyncThunk(
  'game/updateCurrencyByCPS',
  async (_, { getState, dispatch }) => {
    const state = getState();

    const unlockedSkillIds = selectUnlockedSkillsIds(state);

    const activeBoostersIds = selectActiveBoosterIds(state);

    const buildings = selectAllBuildings(state);

    const delta = getCurrencyPerSecond(
      unlockedSkillIds,
      buildings,
      activeBoostersIds,
    );

    dispatch(increaseCurrency(delta));
  },
);
