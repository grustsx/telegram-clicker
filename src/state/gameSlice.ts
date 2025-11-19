import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';

export interface GameState {
  currency: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  banned: boolean;
  user: TgUserType;
  loading: boolean;
  connectionLoading: boolean;
  assetsLoading: boolean;
  errorMessage: string;
  visibleBoosters: number[];
}

const initialState: GameState = {
  loading: true,
  connectionLoading: false,
  currency: 0,
  skillPoints: 0,
  banned: false,
  user: {},
  errorMessage: '',
  storage: 0,
  storageCurrency: 0,
  assetsLoading: true,
  visibleBoosters: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    claimStorage(state) {
      state.currency += state.storageCurrency;
      state.storageCurrency = 0;
    },

    decreaseStorage(state, action: PayloadAction<number>) {
      state.storageCurrency -= action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setConnectionLoading(state, action: PayloadAction<boolean>) {
      state.connectionLoading = action.payload;
    },
    spawnBooster(state, action: PayloadAction<number>) {
      if (action.payload === 0) return;
      if (!state.visibleBoosters.includes(action.payload)) {
        state.visibleBoosters = [...state.visibleBoosters, action.payload];
      }
    },
    removeBooster(state, action: PayloadAction<number>) {
      state.visibleBoosters = state.visibleBoosters.filter(
        (id) => id !== action.payload,
      );
    },
    decreaseSkillPoints: (state, action: PayloadAction<number>) => {
      state.skillPoints -= action.payload;
    },
    setSkillPoints: (state, action: PayloadAction<number>) => {
      state.skillPoints = action.payload;
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
    depCurrency(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.currency = state.currency * 2;
      } else {
        state.currency = 0;
      }
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
          banned: user.banned,
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
  depCurrency,
  spawnBooster,
  decreaseStorage,
  removeBooster,
  setErrorMessage,
  setSkillPoints,
  setConnectionLoading,
} = gameSlice.actions;
export default gameSlice.reducer;
