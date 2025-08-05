import { type RootState } from '../app/store';
import api from '../axios';
import type { AxiosError } from 'axios';
import type {
  ApiErrorResponse,
  GetDictionariesType,
  GetUserDataType,
} from '../types/api';
import {
  getCooldown,
  getCurrencyPerSecond,
} from '../utils/getCurrencyPerSecond';
import {
  decreaseCurrency,
  decreaseSkillPoints,
  depCurrency,
  increaseCurrency,
  incrementSkillPoints,
} from './gameSlice';
import {
  selectBuildingLevelsSum,
  selectUnlockedSkillsIds,
} from '../app/selectors';
import { getCurrencyPerClick, getPrice } from '../utils';
import { lockSkill, selectSkillById, unlockSkill } from './skillsSlice';
import { createAppAsyncThunk } from '../app/thunk';
import {
  incrementBuildingLevel,
  selectAllBuildings,
  selectBuildingById,
  upgradeBuilding,
} from './buildingsSlice';
import { refreshSpellCooldown, selectSpellById } from './spellsSlice';

export const getUserData = createAppAsyncThunk(
  'game/getUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).game.user.id;
      const { data } = await api.get(`/api/users/${userId}`);
      return data as GetUserDataType;
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

    const buildings = selectAllBuildings(state);

    const delta = getCurrencyPerSecond(unlockedSkillIds, buildings);

    dispatch(increaseCurrency(delta));
  },
);

// Вызывается на каждый клик по печеньке!! Важно не нахуевертить
export const updateCurrencyByClick = createAppAsyncThunk(
  'game/updateCurrencyByClick',
  async (_, { getState, dispatch }) => {
    const state = getState();

    const unlockedSkillIds = selectUnlockedSkillsIds(state);

    const buildingsCount = selectBuildingLevelsSum(state);

    const delta = getCurrencyPerClick(unlockedSkillIds, buildingsCount);

    dispatch(increaseCurrency(delta));
  },
);

export const buyBuildingLevel = createAppAsyncThunk(
  'buildings/incrementBuildingLevel',
  async (buildingId: number, { getState, dispatch }) => {
    const state = getState();
    const building = selectBuildingById(state, buildingId);

    if (!building) return;

    const unlockedSkillIds = selectUnlockedSkillsIds(state);
    const price = getPrice(
      building.basePrice,
      building.multiplier,
      building.level,
      unlockedSkillIds,
    );

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

    if (spell.remainSeconds > 0) return;

    const cooldown = getCooldown(unlockedSkillIds);
    console.log(cooldown);

    dispatch(
      refreshSpellCooldown({
        id: spellId,
        muitiplier: getCooldown(unlockedSkillIds),
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
    }
  },
);
