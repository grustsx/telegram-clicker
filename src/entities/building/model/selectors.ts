import { createSelector } from '@reduxjs/toolkit';

import { buildingsAdapter } from './buildingsSlice';
import type { RootState } from '@/app/store/store';

export const {
  selectAll: selectAllBuildings,
  selectById: selectBuildingById,
  selectIds: selectBuildingIds,
} = buildingsAdapter.getSelectors((state: RootState) => state.buildings);

export const selectBuildingLevelsSum = createSelector(
  selectAllBuildings,
  (buildings) => buildings.reduce((sum, building) => sum + building.level, 0),
);
