import React from 'react';

import './App.css';
import { IS_DEV } from './env';
import { PageController } from './pages';
import type { TgUserType } from './types/types';
import { Loader } from './components';
import { setUserData } from './state/gameSlice';
import { useAppDispatch } from './app/hooks';
import { getUserAndDictionaries, getUserData } from './state/thunk';
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
    dispatch(setUserData(user));
    dispatch(getUserAndDictionaries());
  }, [dispatch, tg?.WebApp?.initDataUnsafe?.user]);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('gere');
        dispatch(getUserAndDictionaries());
      }
    };

    const handlePageShow = () => {
      // console.log('ffgere');
      // dispatch(getUserAndDictionaries());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageShow);
    };
  }, [dispatch]);

  return (
    <Loader>
      <ErrorHandler>
        <PageController />
      </ErrorHandler>
    </Loader>
  );
}

export default App;
