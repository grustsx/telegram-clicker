import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import api from '../axios';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/api';

export const getUserData = createAsyncThunk(
  'game/getUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).game.user.id;
      const { data } = await api.get(`/api/users/${userId}`);
      return data;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
