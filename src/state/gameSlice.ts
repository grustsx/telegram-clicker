import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';

export interface GameState {
  currency: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  user: TgUserType;
  loading: boolean;
  assetsLoading: boolean;
  errorMessage: string;
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  skillPoints: 0,
  user: {},
  errorMessage: '',
  storage: 0,
  storageCurrency: 0,
  assetsLoading: true,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
    incrementSkillPoints(state) {
      state.skillPoints += 1;
    },
    setUserData(state, action: PayloadAction<TgUserType>) {
      state.user = action.payload;
    },
    setAssetsLoading(state, action: PayloadAction<boolean>) {
      state.assetsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAndDictionaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAndDictionaries.fulfilled, (state, action) => {
        const { user } = action.payload.userInfo;

        const updatedState = {
          currency: user.currency,
          storage: user.storage,
          storageCurrency: user.storageCurrency,
          skillPoints: user.skillPoints,
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
  setAssetsLoading,
} = gameSlice.actions;
export default gameSlice.reducer;
