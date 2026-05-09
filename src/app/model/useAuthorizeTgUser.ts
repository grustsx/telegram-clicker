import { useEffect } from 'react';

import { IS_DEV } from '@/shared/config/env';
import { useAppDispatch } from '@/shared';

import { setErrorMessage, setUserData, type TgUserType } from '@/entities/game';

import { getUserAndDictionariesThunk } from '@/features/init-game';
import { MOCKED_TG } from '../config/mockedTg';
import api from '@/shared/api/axios';

export function useAuthorizeTgUser() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function authorize() {
      const tg = IS_DEV ? MOCKED_TG : window.Telegram;
      const user: TgUserType | undefined = tg?.WebApp?.initDataUnsafe?.user;

      if (!user?.id) {
        dispatch(
          setErrorMessage(
            'юзер не найден, откройте игру через кнопку в сообщении, а не через нижнее меню',
          ),
        );
        return;
      }

      dispatch(setUserData(user));

      try {
        const token = await getAuthToken();

        localStorage.setItem('token', token);

        dispatch(getUserAndDictionariesThunk());
      } catch {
        dispatch(setErrorMessage('Ошибка авторизации'));
      }
    }

    authorize();
  }, [dispatch]);
}

async function getAuthToken() {
  if (IS_DEV) {
    return 'test-token-clicker-228';
  }

  const initData = window.Telegram?.WebApp?.initData;
  const { data } = await api.post('/api/users/authorize', { initData });

  return data.token as string;
}
