import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import api from '../axios';
import type { AxiosError } from 'axios';
import type {
  ApiErrorResponse,
  GetDictionariesType,
  GetUserDataType,
} from '../types/api';

export const getUserData = createAsyncThunk(
  'game/getUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = (getState() as RootState).game.user.id;
      const { data } = await api.get(`/api/users/${userId}`);
      return data as GetUserDataType;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getDictionaries = createAsyncThunk(
  'game/getDictionaries',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/dictionaries`);
      return data as GetDictionariesType;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getUserAndDictionaries = createAsyncThunk(
  'data/getUserAndDictionaries',
  async (_, thunkAPI) => {
    const [userInfo, dictionaries] = await Promise.all([
      thunkAPI.dispatch(getUserData()).unwrap(),
      thunkAPI.dispatch(getDictionaries()).unwrap(),
    ]);

    return { userInfo, dictionaries };
  },
);
