import React from 'react';
import './App.css';
import { IS_DEV } from './env';
import { PageController } from './pages';
import type { TgUserType } from './types/types';
import { DialogModal, Loader } from './components';
import { setErrorMessage, setUserData } from './state/gameSlice';
import { useAppDispatch } from './app/hooks';
import { getUserAndDictionaries } from './state/thunk';
import ErrorHandler from './components/ErrorHandler';
import useCurrencyPerSecond from './hooks/useUpdateCurrencyByCPS';
import useRefreshData from './hooks/useRefreshData';
import useUpdateTimers from './hooks/useUpdateTimers';
import PreloadImages from './components/PreloadImages';
import useSpawnBoosters from './hooks/useSpawnBoosters';
import ConnectionLoader from './components/ConnectionLoader';
import api from './axios';

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
          token = 'testtoken';
        } else {
          const initData = window.Telegram?.WebApp?.initData;
          const { data } = await api.post('/api/users/authorize', { initData });
          token = data.token;
        }

        // Сохраняем токен
        localStorage.setItem('token', token);

        // После авторизации — загрузка пользователя и словарей
        dispatch(getUserAndDictionaries());
      } catch {
        dispatch(setErrorMessage('Ошибка авторизации'));
      }
    }

    authorize();
  }, [dispatch, tg]);

  useRefreshData();
  useCurrencyPerSecond();
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
