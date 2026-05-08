import { createSelector } from '@reduxjs/toolkit';
import { selectAllBoosters } from './boostersSlice';

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
