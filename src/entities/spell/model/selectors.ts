import { createSelector } from '@reduxjs/toolkit';
import { selectAllSpells } from './spellsSlice';

export const selectSpellsOnCooldoown = createSelector(
  selectAllSpells,
  (spells) => spells.filter((s) => s?.remainSeconds > 0),
);
