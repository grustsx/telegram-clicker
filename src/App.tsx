import React from 'react';
import './App.css';
import { IS_DEV } from './env';
import { PageController } from './pages';
import type { TgUserType } from './types/types';
import { Loader } from './components';
import { setUserData } from './state/gameSlice';
import { useAppDispatch } from './app/hooks';
import { getUserAndDictionaries } from './state/thunk';
import ErrorHandler from './components/ErrorHandler';
import useCurrencyPerSecond from './hooks/useUpdateCurrencyByCPS';
import useRefreshData from './hooks/useRefreshData';
import useUpdateSpellRemailn from './hooks/useUpdateSpellRemain';
import PreloadImages from './components/PreloadImages';

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

  useRefreshData();
  useCurrencyPerSecond();
  useUpdateSpellRemailn();

  return (
    <>
      <PreloadImages />
      <Loader>
        <ErrorHandler>
          <PageController />
        </ErrorHandler>
      </Loader>
    </>
  );
}

export default App;
