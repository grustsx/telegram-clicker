import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { BoosterType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import type { RootState } from '../app/store';
import type { UserBoosterType } from '../types/api';
import { findById } from '../utils/findById';
import { nowUnix } from '../utils';

const boostersAdapter = createEntityAdapter<BoosterType>();

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
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAndDictionaries.fulfilled, (state, action) => {
      const { userInfo, dictionaries } = action.payload;

      const boosters = dictionaries.boosters.map((booster) => {
        const userBooster = findById<UserBoosterType>(
          userInfo.boosters,
          booster.id,
        );
        return {
          id: booster.id,
          name: booster.name,
          ttlSeconds: booster.ttl,
          remainSeconds: userBooster
            ? Math.max(0, userBooster.availableTo - nowUnix())
            : 0,
        };
      });

      boostersAdapter.setAll(state, boosters);
    });
  },
});

export const {
  selectAll: selectAllBoosters,
  selectById: selectBoosterById,
  selectIds: selectBoosterIds,
} = boostersAdapter.getSelectors((state: RootState) => state.boosters);

export const { refreshBoosterTtl, updateBoostersTimer } = boostersSlice.actions;
export default boostersSlice.reducer;
