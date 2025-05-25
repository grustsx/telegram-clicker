import React from 'react';

import './App.css';
import { IS_DEV } from './env';
const backendUrl = 'https://clicker-backend-8wcb.onrender.com';

type GetUserDataResponse = {
  userData: {
    currency: number;
    currency_per_second: number;
  };
};

type TgUser = {
  first_name?: string;
  last_name?: string;
  id?: number;
  username?: string;
};

const mockedTg: {
  WebApp: {
    ready: () => void;
    initDataUnsafe?: {
      user?: TgUser | undefined;
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

  const [currency, setCurrency] = React.useState<number>(0);
  const [currencyPerSecond, setCurrencyPerSecond] = React.useState<number>(0);

  const [username, setUsername] = React.useState('неизвестен');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const pendingClicks = React.useRef<number>(0);

  const buyBoost = () => {
    setCurrencyPerSecond((prev) => prev + 1);
    fetchCps(1, tg?.WebApp?.initDataUnsafe?.user);
  };

  const fetchCps = React.useCallback(
    (count: number, telegramUser: TgUser | undefined) => {
      if (count === 0 || !telegramUser) return;
      fetch(`${backendUrl}/api/increaseCps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramUser,
          count,
        }),
      });
    },
    [],
  );

  const fetchClicks = React.useCallback(
    (count: number) => {
      if (count === 0) return;
      fetch(`${backendUrl}/api/clicks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramUser: tg?.WebApp?.initDataUnsafe?.user,
          count,
        }),
      });
    },
    [tg?.WebApp?.initDataUnsafe?.user],
  );

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (pendingClicks.current > 0) {
        fetchClicks(pendingClicks.current);
        pendingClicks.current = 0;
      }
    }, 2000);

    const currencyInterval = setInterval(() => {
      if (currencyPerSecond > 0) {
        setCurrency((prev) => prev + currencyPerSecond);
      }
    }, 1000);

    return () => {
      fetchClicks(pendingClicks.current);
      clearInterval(fetchInterval);
      clearInterval(currencyInterval);
    };
  }, [currencyPerSecond, fetchClicks]);

  const handleClick = React.useCallback(() => {
    setCurrency((prev) => prev + 1);
    pendingClicks.current += 1;
  }, []);

  async function getUserData(id: number): Promise<GetUserDataResponse> {
    try {
      setLoading(true);

      const response = await fetch(`${backendUrl}/api/userData/${id}`);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data: GetUserDataResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка при загрузке пользователя:', error.message);
      } else {
        console.error('Неизвестная ошибка:', error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    console.log('Компонент App смонтирован');

    if (tg) {
      tg.WebApp.ready();
      const id = tg.WebApp.initDataUnsafe?.user?.id;
      const name = tg.WebApp.initDataUnsafe?.user?.first_name || 'гость';
      setUsername(name);

      if (!id) return;
      getUserData(id)
        .then((res) => {
          setCurrency(+res.userData.currency);
          setCurrencyPerSecond(+res.userData.currency_per_second);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [tg]);

  if (error) {
    return <div>Ошибка! Скорее всего это специально не работает сейчас</div>;
  }

  return loading ? (
    <div>Загрузка...</div>
  ) : (
    <div className="card">
      <div>{'Привет, ' + username}</div>
      <div>Тортик кликер некоторый</div>
      <button onClick={handleClick}>Денег: {currency}</button>
      {currencyPerSecond > 0 ? (
        <>
          <div>{'Прирост: ' + currencyPerSecond + ' денег в секунду'}</div>
          <button disabled>Куплено</button>
        </>
      ) : (
        <>
          <button onClick={buyBoost}>
            Ивестировать в кал 0 денег (выгодно)
          </button>
        </>
      )}
    </div>
  );
}

export default App;
