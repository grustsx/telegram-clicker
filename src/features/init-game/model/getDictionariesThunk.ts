import { createAppAsyncThunk } from '@/app/store/thunk';
import api from '@/shared/api/axios';
import type { ApiErrorResponse, GetDictionariesType } from '@/shared/api/types';
import type { AxiosError } from 'axios';

export const getDictionariesThunk = createAppAsyncThunk(
  'game/getDictionaries',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/dictionaries`);
      return data as GetDictionariesType;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.message || String(error.response?.data));
    }
  },
);
