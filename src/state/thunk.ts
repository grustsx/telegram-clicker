import { type RootState } from '../app/store';
import api from '../axios';
import type { AxiosError } from 'axios';
import type {
  ApiErrorResponse,
  GetDictionariesType,
  GetUserDataType,
} from '../types/api';
import {
  getBoosterTtlMultiplier,
  getCooldownMultiplier,
  getCurrencyByBooster,
  getCurrencyPerSecond,
} from '../utils/getCurrencyPerSecond';
import {
  decreaseCurrency,
  decreaseSkillPoints,
  decreaseStorage,
  depCurrency,
  increaseCurrency,
  incrementSkillPoints,
  spawnBooster,
} from './gameSlice';
import {
  selectActiveBoosterIds,
  selectCurrencyPerClick,
  selectCurrencyPerSecond,
  selectStorageCurrency,
  selectUnlockedSkillsIds,
  selectVisibleBoosters,
} from '../app/selectors';
import { getPrice } from '../utils';
import { lockSkill, selectSkillById, unlockSkill } from './skillsSlice';
import { createAppAsyncThunk } from '../app/thunk';
import {
  incrementBuildingLevel,
  selectAllBuildings,
  selectBuildingById,
  upgradeBuilding,
} from './buildingsSlice';
import { refreshSpellCooldown, selectSpellById } from './spellsSlice';
import { refreshBoosterTtl } from './boostersSlice';
import {
  BOOSTER_NORMAL_TIMEOUT,
  CURRENCY_BOOSTER_ID,
  STORAGE_SEGMENT,
} from '../constants/const';
import { sendName } from '../api';

export const getUserData = createAppAsyncThunk(
  'game/getUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).game.user.id;
      const userName = `${(getState() as RootState).game.user.first_name || ''} ${(getState() as RootState).game.user.last_name || ''}`;

      if (!userId)
        throw {
          message:
            'юзер не найден, откройте игру через кнопку в сообщении, а не через нижнее меню',
        };
      let response = await api.get(`/api/users/${userId}`);

      if (!response.data.user.name || response.data.user.name !== userName) {
        await sendName(userName, userId);
        response = await api.get(`/api/users/${userId}`);
      }

      return response.data as GetUserDataType;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.message || String(error.response?.data));
    }
  },
);

export const getDictionaries = createAppAsyncThunk(
  'game/getDictionaries',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/dictionaries`);
      return data as GetDictionariesType;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.message || String(error.response?.data));
    }
  },
);

export const getUserAndDictionaries = createAppAsyncThunk(
  'data/getUserAndDictionaries',
  async (_, thunkAPI) => {
    const [userInfo, dictionaries] = await Promise.all([
      thunkAPI.dispatch(getUserData()).unwrap(),
      thunkAPI.dispatch(getDictionaries()).unwrap(),
    ]);

    return { userInfo, dictionaries };
  },
);

// Вызывается раз в секунду!! Важно не нахуевертить
export const updateCurrencyByCPS = createAppAsyncThunk(
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

// Вызывается на каждый клик по печеньке!! Важно не нахуевертить
export const updateCurrencyByClick = createAppAsyncThunk(
  'game/updateCurrencyByClick',
  async (multipler: number, { getState, dispatch }) => {
    const state = getState();

    const delta = selectCurrencyPerClick(state);

    dispatch(increaseCurrency(delta * multipler));
  },
);

export const buyBuildingLevel = createAppAsyncThunk(
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

export const buySkill = createAppAsyncThunk(
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

export const castSpell = createAppAsyncThunk(
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

export const activateBooster = createAppAsyncThunk(
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
