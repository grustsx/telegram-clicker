import React from 'react';

import './App.css';
import { IS_DEV } from './env';
import { MainPage } from './pages';
import type { TgUserType } from './types/types';
import { Loader } from './components';
import { setUserData } from './state/gameSlice';
import { useAppDispatch } from './app/hooks';
import { getUserAndDictionaries } from './state/thunk';
import ErrorHandler from './components/ErrorHandler';

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
      },
    },
  },
};

function App() {
  const tg = IS_DEV ? mockedTg : window.Telegram;

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const user: TgUserType | undefined = tg?.WebApp?.initDataUnsafe?.user;
    if (!user) return;
    console.log('effect');
    dispatch(setUserData(user));
    dispatch(getUserAndDictionaries());
  }, [dispatch, tg?.WebApp?.initDataUnsafe?.user]);

  return (
    <Loader>
      <ErrorHandler>
        <MainPage />
      </ErrorHandler>
    </Loader>
  );
}

export default App;
