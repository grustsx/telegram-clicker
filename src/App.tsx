import React from 'react';

import './App.css';
import { IS_DEV } from './env';
import { MainPage } from './pages';
import type { TgUserType } from './types';
import { Loader } from './components';
import { setUserData } from './state/gameSlice';
import { useAppDispatch } from './app/hooks';
import { getUserData } from './state/thunk';

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
    dispatch(setUserData(user));
    dispatch(getUserData());
  }, [dispatch, tg?.WebApp?.initDataUnsafe?.user]);

  return (
    <Loader>
      <MainPage />
    </Loader>
  );
}

export default App;
