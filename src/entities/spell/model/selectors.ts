import { createSelector } from '@reduxjs/toolkit';
import { spellsAdapter } from './spellsSlice';
import type { RootState } from '@/app/store/store';

export const {
  selectAll: selectAllSpells,
  selectById: selectSpellById,
  selectIds: selectSpellIds,
} = spellsAdapter.getSelectors((state: RootState) => state.spells);

export const selectSpellsOnCooldoown = createSelector(
  selectAllSpells,
  (spells) => spells.filter((s) => s?.remainSeconds > 0),
);
