import { createAppAsyncThunk } from '@/app/thunk';
import {
  CURRENCY_BOOSTER_ID,
  getBoosterTtlMultiplier,
  getCurrencyByBooster,
  refreshBoosterTtl,
} from '@/entities/booster';
import { selectUnlockedSkillsIds } from '@/entities/skill/model/selectors';
import { selectCurrencyPerSecond } from './selectors';
import { increaseCurrency } from '@/entities/game';

export const activateBoosterThunk = createAppAsyncThunk(
  'game/activateBooster',
  async (
    {
      boosterId,
    }: {
      boosterId: number;
    },
    { getState, dispatch },
  ) => {
    const state = getState();
    const unlockedSkillIds = selectUnlockedSkillsIds(state);

    const ttlMultiplier = getBoosterTtlMultiplier(unlockedSkillIds);
    dispatch(
      refreshBoosterTtl({
        id: boosterId,
        muitiplier: ttlMultiplier,
      }),
    );

    if (boosterId !== CURRENCY_BOOSTER_ID) return;

    const cps = selectCurrencyPerSecond(state);
    const currencyByBooster = getCurrencyByBooster(cps);

    dispatch(increaseCurrency(currencyByBooster));
  },
);
