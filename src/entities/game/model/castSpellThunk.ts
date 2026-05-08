import { createAppAsyncThunk } from '@/app/thunk';
import { selectUnlockedSkillsIds, STORAGE_SEGMENT } from '@/entities/skill';
import {
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectVisibleBoosters,
} from './selectors';
import { decreaseStorage, depCurrency, spawnBooster } from './gameSlice';
import { upgradeBuilding } from '@/entities/building';
import { BOOSTER_NORMAL_TIMEOUT } from '@/entities/booster';
import { refreshSpellCooldown, selectSpellById } from '@/entities/spell';
import { getCooldownMultiplier } from '../lib/getCooldownMultiplier';

export const castSpellThunk = createAppAsyncThunk(
  'game/castSpell',
  async (
    {
      spellId,
      spellPayload,
    }: {
      spellId: number;
      spellPayload?: { buildingId: number } | { win: boolean };
    },
    { getState, dispatch },
  ) => {
    const state = getState();
    const spell = selectSpellById(state, spellId);
    const unlockedSkillIds = selectUnlockedSkillsIds(state);
    const cps = selectCurrencyPerSecond(state);
    const visibleBoosters = selectVisibleBoosters(state);
    const storageCurrency = selectStorageCurrency(state);

    if (spell.remainSeconds > 0) return;

    if (spell.cost * STORAGE_SEGMENT * cps > storageCurrency) return;

    dispatch(decreaseStorage(spell.cost * STORAGE_SEGMENT * cps));

    dispatch(
      refreshSpellCooldown({
        id: spellId,
        muitiplier: getCooldownMultiplier(unlockedSkillIds),
      }),
    );

    switch (spellId) {
      case 1: {
        const buildingId = (spellPayload as { buildingId: number })?.buildingId;
        if (!buildingId) return;
        dispatch(upgradeBuilding(buildingId));
        break;
      }
      case 3: {
        const win = (spellPayload as { win: boolean })?.win;
        dispatch(depCurrency(win));
        break;
      }
      case 4: {
        const boosters = Object.keys(BOOSTER_NORMAL_TIMEOUT)
          .map((id) => +id)
          .filter((id) => !visibleBoosters.includes(id));
        dispatch(
          spawnBooster(boosters[Math.floor(Math.random() * boosters.length)]),
        );
        break;
      }
    }
  },
);
