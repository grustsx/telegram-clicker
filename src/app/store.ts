import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../state/gameSlice';
import skillsReducer from '../state/skillsSlice';
import buildingsReducer from '../state/buildingsSlice';
import spellsReducer from '../state/spellsSlice';
import boostersReducer from '../state/boostersSlice';
import dialogReducer from '../state/dialogSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    skills: skillsReducer,
    spells: spellsReducer,
    buildings: buildingsReducer,
    boosters: boostersReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
