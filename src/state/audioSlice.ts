import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 'tab1',
  isPlaying: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setTab(state, action) {
      state.currentTab = action.payload;
    },
    setPlaying(state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export const { setTab, setPlaying } = audioSlice.actions;
export default audioSlice.reducer;
