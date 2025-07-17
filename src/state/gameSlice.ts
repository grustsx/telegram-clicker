import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BuildingType, SpellType, TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { nowUnix } from '../utils';
import { findById } from '../utils/findById';
import type { UserBuildingType, UserSpellType } from '../types/api';

export interface GameState {
  currency: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  user: TgUserType;
  buildings: BuildingType[];
  loading: boolean;
  errorMessage: string;
  spells: SpellType[];
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  skillPoints: 0,
  user: {},
  buildings: [],
  errorMessage: '',
  storage: 0,
  storageCurrency: 0,
  spells: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    castSpell(
      state,
      action: PayloadAction<{
        spellId: number;
        spellPayload?: { buildingId: number };
      }>,
    ) {
      const { spellId, spellPayload } = action.payload;

      const spell = findById(state.spells, spellId);

      if (!spell) return;

      const remailnSeconds = spell.remainSeconds || 0;

      if (remailnSeconds > 0) return;

      spell.remainSeconds = spell.cooldownSeconds;

      if (spell.id === 1 && spellPayload) {
        const building = findById(state.buildings, spellPayload.buildingId);

        if (!building) return;

        building.upgraded = true;
      }
    },
    claimStorage(state) {
      state.currency += state.storageCurrency;
      state.storageCurrency = 0;
    },
    decreaseSkillPoints: (state, action: PayloadAction<number>) => {
      state.skillPoints -= action.payload;
    },
    increaseCurrency(state, action: PayloadAction<number>) {
      state.currency += action.payload;
    },
    decreaseCurrency(state, action: PayloadAction<number>) {
      state.currency -= action.payload;
    },
    updateSpellsRemain(state, action: PayloadAction<number>) {
      const seconds = action.payload;

      state.spells.forEach((spell) => {
        spell.remainSeconds = Math.max(spell.remainSeconds - seconds, 0);
      });
    },
    incrementBuildingLevel(state, action: PayloadAction<number>) {
      const buildingId = action.payload;
      const building = findById(state.buildings, buildingId);

      if (!building) return;

      building.level += 1;
      state.skillPoints += 1;
    },
    setUserData(state, action: PayloadAction<TgUserType>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAndDictionaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAndDictionaries.fulfilled, (state, action) => {
        const { userInfo, dictionaries } = action.payload;

        const updatedState = {
          currency: userInfo.user.currency,
          storage: userInfo.user.storage,
          storageCurrency: userInfo.user.storageCurrency,
          skillPoints: userInfo.user.skillPoints,
          buildings: dictionaries.buildings.map((building) => {
            const userBuilding = findById<UserBuildingType>(
              userInfo.buildings,
              building.id,
            );
            return {
              id: building.id,
              name: building.name,
              level: userBuilding?.level,
              upgraded: userBuilding?.upgraded,
              basePrice: building.basePrice,
              multiplier: building.multiplier,
              incomePerSecond: building.incomePerSecond,
            };
          }),
          spells: dictionaries.spells.map((spell) => {
            const userSpell = findById<UserSpellType>(
              userInfo.spells,
              spell.id,
            );
            if (!userSpell) return spell;
            return {
              ...spell,
              remainSeconds: Math.max(0, userSpell.availableAt - nowUnix()),
            };
          }),
        };
        Object.assign(state, updatedState);
        state.loading = false;
      })
      .addCase(getUserAndDictionaries.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error.message as string;

        state.errorMessage = errorMessage || 'Произошла неизвестная ошибка';
      });
  },
});

export const {
  incrementBuildingLevel,
  claimStorage,
  increaseCurrency,
  decreaseCurrency,
  decreaseSkillPoints,
  setUserData,
  castSpell,
  updateSpellsRemain,
} = gameSlice.actions;
export default gameSlice.reducer;
