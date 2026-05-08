import { createSelector } from '@reduxjs/toolkit';
import { boostersAdapter } from './boostersSlice';
import type { RootState } from '@/app/store';

export const {
  selectAll: selectAllBoosters,
  selectById: selectBoosterById,
  selectIds: selectBoosterIds,
} = boostersAdapter.getSelectors((state: RootState) => state.boosters);

export const selectActiveBoosters = createSelector(
  selectAllBoosters,
  (boosters) => boosters.filter((booster) => booster.remainSeconds > 0),
);

export const selectActiveBoosterIds = createSelector(
  selectAllBoosters,
  (boosters) =>
    boosters
      .filter((booster) => booster.remainSeconds > 0)
      .map((booster) => booster.id),
);
