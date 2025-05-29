import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BuildingType, TgUserType } from '../types';
import { getUserData } from './thunk';
import { getBuildingPrice } from '../utils/getBuildingPrice';

export interface GameState {
  currency: number;
  currencyPerSecond: number;
  currencyPerClick: number;
  user: TgUserType;
  buildings: BuildingType[];
  loading: boolean;
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  currencyPerSecond: 0,
  currencyPerClick: 1,
  user: {},
  buildings: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementCurrencyByClick(state) {
      state.currency += state.currencyPerClick;
    },
    incrementCurrencyByPerSecond(state) {
      state.currency += state.currencyPerSecond;
    },
    incrementBuildingLevel(state, action: PayloadAction<number>) {
      const buildingId = action.payload;
      const building = state.buildings.find((b) => b.buildingId === buildingId);

      if (building) {
        building.level += 1;
        state.currency -= getBuildingPrice(building);
      }
    },
    updateCurrencyPerSecond(state) {
      state.currencyPerSecond = state.buildings.reduce(
        (prev, building) => prev + building.level * building.increasePerSecond,
        0,
      );
    },
    setUserData(state, action: PayloadAction<TgUserType>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        const updatedState = {
          currency: +action.payload.user.currency,
          currencyPerSecond: +action.payload.user.currencyPerSecond,
          currencyPerClick: +action.payload.user.currencyPerClick,
          buildings: action.payload.buildings,
        };
        Object.assign(state, updatedState);
        state.loading = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  incrementCurrencyByClick,
  incrementBuildingLevel,
  updateCurrencyPerSecond,
  incrementCurrencyByPerSecond,
  setUserData,
} = gameSlice.actions;
export default gameSlice.reducer;
