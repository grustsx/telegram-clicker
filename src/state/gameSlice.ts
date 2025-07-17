import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SpellType, TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { nowUnix } from '../utils';
import { findById } from '../utils/findById';
import type { UserSpellType } from '../types/api';

export interface GameState {
  currency: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  user: TgUserType;
  loading: boolean;
  errorMessage: string;
  spells: SpellType[];
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  skillPoints: 0,
  user: {},
  errorMessage: '',
  storage: 0,
  storageCurrency: 0,
  spells: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    refreshSpellRemainsSeconds(state, action: PayloadAction<number>) {
      const spellId = action.payload;
      const spell = findById(state.spells, spellId);
      if (!spell) return;

      spell.remainSeconds = spell.cooldownSeconds;
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
    incrementSkillPoints(state) {
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
  incrementSkillPoints,
  claimStorage,
  increaseCurrency,
  decreaseCurrency,
  decreaseSkillPoints,
  setUserData,
  updateSpellsRemain,
  refreshSpellRemainsSeconds,
} = gameSlice.actions;
export default gameSlice.reducer;
