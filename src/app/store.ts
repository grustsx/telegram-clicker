import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../state/gameSlice';
import skillsReducer from '../state/skillsSlice';
import buildingsReducer from '../state/buildingsSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    skills: skillsReducer,
    buildings: buildingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
