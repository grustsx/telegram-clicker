import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { BuildingType } from './types';

export const buildingsAdapter = createEntityAdapter<BuildingType>();

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
    setBuildings(state, action: PayloadAction<BuildingType[]>) {
      buildingsAdapter.setAll(state, action.payload);
    },
  },
});

export const { incrementBuildingLevel, upgradeBuilding, setBuildings } =
  buildingsSlice.actions;
export default buildingsSlice.reducer;
