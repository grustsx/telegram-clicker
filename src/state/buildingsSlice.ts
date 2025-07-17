import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { BuildingType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import type { RootState } from '../app/store';
import { findById } from '../utils/findById';
import type { UserBuildingType } from '../types/api';

const buildingsAdapter = createEntityAdapter<BuildingType>();

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState: buildingsAdapter.getInitialState(),
  reducers: {
    incrementBuildingLevel(state, action: PayloadAction<number>) {
      const id = action.payload;
      const building = state.entities[id];

      if (!building) return;

      building.level += 1;
    },
    upgradeBuilding(state, action: PayloadAction<number>) {
      const id = action.payload;
      const building = state.entities[id];

      if (!building) return;

      building.upgraded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAndDictionaries.fulfilled, (state, action) => {
      const { userInfo, dictionaries } = action.payload;

      const buildings = dictionaries.buildings.map((building) => {
        const userBuilding = findById<UserBuildingType>(
          userInfo.buildings,
          building.id,
        );
        return {
          id: building.id,
          name: building.name,
          level: userBuilding?.level || 0,
          upgraded: userBuilding?.upgraded || false,
          basePrice: building.basePrice,
          multiplier: building.multiplier,
          incomePerSecond: building.incomePerSecond,
        };
      });

      buildingsAdapter.setAll(state, buildings);
    });
  },
});

export const {
  selectAll: selectAllBuildings,
  selectById: selectBuildingById,
  selectIds: selectBuildingIds,
} = buildingsAdapter.getSelectors((state: RootState) => state.buildings);

export const { incrementBuildingLevel, upgradeBuilding } =
  buildingsSlice.actions;
export default buildingsSlice.reducer;
