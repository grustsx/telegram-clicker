import React from 'react';
import './App.css';
import { IS_DEV } from './env';
import { PageController } from './pages';

import { setErrorMessage, setUserData, type TgUserType } from '@/entities/game';
import { useAppDispatch } from '@/shared';
import api from './axios';
import { getUserAndDictionariesThunk } from '@/features/init-game';
import { DialogModal } from '@/widgets/dialog-modal';
import { ErrorHandler } from '@/widgets/error-handler';
import { PreloadImages } from '@/widgets/preload-images';
import { Loader } from '@/widgets/loader';
import { ConnectionLoader } from '@/widgets/connection-loader';
import useRefreshData from './app/model/useRefreshData';
import useUpdateTimers from './app/model/useUpdateTimers';
import useSpawnBoosters from './app/model/useSpawnBoosters';
import useUpdateCurrencyByCPS from './app/model/useUpdateCurrencyByCPS';

const mockedTg: {
  WebApp: {
    ready: () => void;
    initDataUnsafe?: {
      user?: TgUserType | undefined;
    };
  };
} = {
  WebApp: {
    ready: () => {},
    initDataUnsafe: {
      user: {
        id: 1,
        first_name: 'dev test',
        last_name: 'user',
      },
    },
  },
};

function App() {
  const tg = IS_DEV ? mockedTg : window.Telegram;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function authorize() {
      const user: TgUserType | undefined = tg?.WebApp?.initDataUnsafe?.user;

      if (!user || !user.id) {
        dispatch(
          setErrorMessage(
            'юзер не найден, откройте игру через кнопку в сообщении, а не через нижнее меню',
          ),
        );
        return;
      }

      dispatch(setUserData(user));

      try {
        let token: string;

        if (IS_DEV) {
          //const { data } = await api.post('/api/users/dev-login');
          token = 'test-token-clicker-228';
        } else {
          const initData = window.Telegram?.WebApp?.initData;
          console.log(initData);
          const { data } = await api.post('/api/users/authorize', { initData });
          token = data.token;
        }

        // Сохраняем токен
        localStorage.setItem('token', token);

        // После авторизации — загрузка пользователя и словарей
        dispatch(getUserAndDictionariesThunk());
      } catch {
        dispatch(setErrorMessage('Ошибка авторизации'));
      }
    }

    authorize();
  }, [dispatch, tg]);

  useRefreshData();
  useUpdateCurrencyByCPS();
  useUpdateTimers();
  useSpawnBoosters();

  return (
    <>
      <PreloadImages />
      <ErrorHandler>
        <Loader>
          <>
            <ConnectionLoader />
            <DialogModal />
            <PageController />
          </>
        </Loader>
      </ErrorHandler>
    </>
  );
}

export default App;
