import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { SpellType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import type { RootState } from '../app/store';
import type { UserSpellType } from '../types/api';
import { findById } from '../utils/findById';
import { nowUnix } from '../utils';

const spellsAdapter = createEntityAdapter<SpellType>();

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
    refreshSpellCooldown(state, action: PayloadAction<number>) {
      const id = action.payload;
      const spell = state.entities[id];
      if (!spell) return;

      spell.remainSeconds = spell.cooldownSeconds;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAndDictionaries.fulfilled, (state, action) => {
      const { userInfo, dictionaries } = action.payload;

      const spells = dictionaries.spells.map((spell) => {
        const userSpell = findById<UserSpellType>(userInfo.spells, spell.id);
        return {
          ...spell,
          remainSeconds: userSpell
            ? Math.max(0, userSpell.availableAt - nowUnix())
            : 0,
        };
      });

      spellsAdapter.setAll(state, spells);
    });
  },
});

export const {
  selectAll: selectAllSpells,
  selectById: selectSpellById,
  selectIds: selectSpellIds,
} = spellsAdapter.getSelectors((state: RootState) => state.spells);

export const { refreshSpellCooldown, updateSpellsTimer } = spellsSlice.actions;
export default spellsSlice.reducer;
