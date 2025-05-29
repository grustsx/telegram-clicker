import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import api from '../axios';

export const getUserData = createAsyncThunk(
  'game/getUserData',
  async (_, { getState }) => {
    console.log('getUserData');
    const userId = (getState() as RootState).game.user.id;
    const { data } = await api.get(`/api/users/${userId}`);
    return data;
  },
);
