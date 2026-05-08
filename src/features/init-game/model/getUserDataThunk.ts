import { createAppAsyncThunk } from '@/app/thunk';
import api from '@/shared/api/axios';
import { sendName } from '@/entities/game';
import type { ApiErrorResponse, GetUserDataType } from '@/shared/api/types';
import type { AxiosError } from 'axios';

export const getUserDataThunk = createAppAsyncThunk(
  'game/getUserData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().game.user.id;
      const userName = `${getState().game.user.first_name || ''} ${getState().game.user.last_name || ''}`;

      if (!userId)
        throw {
          message:
            'юзер не найден, откройте игру через кнопку в сообщении, а не через нижнее меню',
        };
      let response = await api.get(`/api/users/${userId}`);

      if (!response.data.user.name || response.data.user.name !== userName) {
        await sendName(userName, userId);
        response = await api.get(`/api/users/${userId}`);
      }

      return response.data as GetUserDataType;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<ApiErrorResponse>;
      return rejectWithValue(error.message || String(error.response?.data));
    }
  },
);
