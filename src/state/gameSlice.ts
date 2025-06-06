import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BuildingType, TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { getPrice, getCurrencyPerClick } from '../utils';

export interface GameState {
  currency: number;
  currencyPerSecond: number;
  clickInfo: {
    currencyPerClick: number;
    clickLevel: number;
    clickUpgradeBasePrice: number;
    clickUpgradeMultipler: number;
  };
  user: TgUserType;
  buildings: BuildingType[];
  loading: boolean;
  errorMessage: string;
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  clickInfo: {
    currencyPerClick: 1,
    clickLevel: 0,
    clickUpgradeBasePrice: 0,
    clickUpgradeMultipler: 0,
  },
  user: {},
  buildings: [],
  currencyPerSecond: 0,
  errorMessage: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementCurrencyByClick(state) {
      state.currency += state.clickInfo.currencyPerClick;
    },
    incrementCurrencyByPerSecond(state) {
      state.currency += state.currencyPerSecond;
    },
    incrementBuildingLevel(state, action: PayloadAction<number>) {
      const buildingId = action.payload;
      const building = state.buildings.find((b) => b.buildingId === buildingId);

      if (building) {
        state.currency -= getPrice(
          building.basePrice,
          building.multiplier,
          building.level,
        );
        building.level += 1;
      }
    },
    updateCurrencyPerSecond(state) {
      state.currencyPerSecond = state.buildings.reduce(
        (prev, building) => prev + building.level * building.incomePerSecond,
        0,
      );
    },
    incrementClickLevel(state) {
      state.currency -= getPrice(
        state.clickInfo.clickUpgradeBasePrice,
        state.clickInfo.clickUpgradeMultipler,
        state.clickInfo.clickLevel,
      );
      state.clickInfo.clickLevel += 1;
    },
    updateCurrencyPerClick(state) {
      state.clickInfo.currencyPerClick = getCurrencyPerClick(
        state.clickInfo.clickLevel,
      );
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
          currency: +userInfo.user.currency,
          currencyPerSecond: +userInfo.user.currencyPerSecond,
          clickInfo: {
            clickLevel: +userInfo.user.clickLevel,
            currencyPerClick: getCurrencyPerClick(+userInfo.user.clickLevel),
            clickUpgradeBasePrice: +userInfo.user.clickUpgradeBasePrice,
            clickUpgradeMultipler: +userInfo.user.clickUpgradeMultipler,
          },
          buildings: dictionaries.buildings.map((building: BuildingType) => ({
            buildingId: building.buildingId,
            name: building.name,
            level: userInfo.buildings.find(
              (userBuilding: { buildingId: number; level: number }) =>
                userBuilding.buildingId === building.buildingId,
            ).level,
            basePrice: building.basePrice,
            multiplier: building.multiplier,
            incomePerSecond: building.incomePerSecond,
          })),
        };
        Object.assign(state, updatedState);
        state.loading = false;
      })
      .addCase(getUserAndDictionaries.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as string;

        state.errorMessage = payload || 'Произошла неизвестная ошибка';
      });
  },
});

export const {
  incrementCurrencyByClick,
  incrementBuildingLevel,
  updateCurrencyPerSecond,
  incrementCurrencyByPerSecond,
  setUserData,
  incrementClickLevel,
  updateCurrencyPerClick,
} = gameSlice.actions;
export default gameSlice.reducer;
