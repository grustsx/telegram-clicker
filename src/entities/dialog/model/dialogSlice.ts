import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GameMessageType } from './types';

interface DialogState {
  isOpen: boolean;
  messages: GameMessageType[];
  currentIndex: number;
}

const initialState: DialogState = {
  isOpen: false,
  messages: [],
  currentIndex: 0,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    startDialog: (state, action: PayloadAction<GameMessageType[]>) => {
      state.isOpen = true;
      state.messages = action.payload;
      state.currentIndex = 0;
    },
    nextLine: (state) => {
      if (state.currentIndex < state.messages.length - 1) {
        state.currentIndex += 1;
      } else {
        state.isOpen = false;
        state.messages = [];
        state.currentIndex = 0;
      }
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.messages = [];
      state.currentIndex = 0;
    },
  },
});

export const { startDialog, nextLine, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
