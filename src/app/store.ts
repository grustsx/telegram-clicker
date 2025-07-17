import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../state/gameSlice';
import skillsReducer from '../state/skillsSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
