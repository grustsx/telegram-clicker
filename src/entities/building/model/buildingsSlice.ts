import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { findById } from '../../../shared/lib/findById';
import type { BuildingType } from './types';
import { getUserAndDictionariesThunk } from '@/features/init-game/model/getUserAndDictionariesThunk';
import type { UserBuildingType } from '@/shared/api/types';
import type { RootState } from '@/app/store';

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
    builder.addCase(getUserAndDictionariesThunk.fulfilled, (state, action) => {
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
