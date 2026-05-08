import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../entities/game/model/gameSlice';
import skillsReducer from '../entities/skill/model/skillsSlice';
import buildingsReducer from '../entities/building/model/buildingsSlice';
import spellsReducer from '../entities/spell/model/spellsSlice';
import boostersReducer from '../entities/booster/model/boostersSlice';
import dialogReducer from '../entities/dialog/model/dialogSlice';

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    game: gameReducer,
    spells: spellsReducer,
    buildings: buildingsReducer,
    boosters: boostersReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
