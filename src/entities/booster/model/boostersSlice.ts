import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { BoosterType } from './types';

export const boostersAdapter = createEntityAdapter<BoosterType>();

const boostersSlice = createSlice({
  name: 'boosters',
  initialState: boostersAdapter.getInitialState(),
  reducers: {
    updateBoostersTimer(state, action: PayloadAction<number>) {
      const seconds = action.payload;

      state.ids.forEach((id) => {
        const booster = state.entities[id];
        booster.remainSeconds = Math.max(booster.remainSeconds - seconds, 0);
      });
    },
    refreshBoosterTtl(
      state,
      action: PayloadAction<{ id: number; muitiplier?: number }>,
    ) {
      const { id, muitiplier = 1 } = action.payload;
      const booster = state.entities[id];
      if (!booster) return;

      booster.remainSeconds = booster.ttlSeconds * muitiplier;
    },
    setBoosters(state, action: PayloadAction<BoosterType[]>) {
      boostersAdapter.setAll(state, action.payload);
    },
  },
});

export const { refreshBoosterTtl, updateBoostersTimer, setBoosters } =
  boostersSlice.actions;
export default boostersSlice.reducer;
