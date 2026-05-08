import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { SpellType } from './types';

export const spellsAdapter = createEntityAdapter<SpellType>();

const spellsSlice = createSlice({
  name: 'spells',
  initialState: spellsAdapter.getInitialState(),
  reducers: {
    updateSpellsTimer(state, action: PayloadAction<number>) {
      const seconds = action.payload;

      state.ids.forEach((id) => {
        const spell = state.entities[id];
        spell.remainSeconds = Math.max(spell.remainSeconds - seconds, 0);
      });
    },
    refreshSpellCooldown(
      state,
      action: PayloadAction<{ id: number; muitiplier?: number }>,
    ) {
      const { id, muitiplier = 1 } = action.payload;
      const spell = state.entities[id];
      if (!spell) return;

      spell.remainSeconds = spell.cooldownSeconds * muitiplier;
    },
    setSpells(state, action: PayloadAction<SpellType[]>) {
      spellsAdapter.setAll(state, action.payload);
    },
  },
});

export const { refreshSpellCooldown, updateSpellsTimer, setSpells } =
  spellsSlice.actions;
export default spellsSlice.reducer;
