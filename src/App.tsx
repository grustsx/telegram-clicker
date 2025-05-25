import React from 'react';
import throttle from './utils/throttle';

import './App.css';
import { IS_DEV } from './env';
const backendUrl = 'https://clicker-backend-8wcb.onrender.com';

type GetUserDataResponse = {
  userData: {
    currency: number;
  };
};

const mockedTg: {
  WebApp: {
    ready: () => void;
    initDataUnsafe?: {
      user?: {
        first_name?: string;
        last_name?: string;
        id?: number;
        username?: string;
      };
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

  const [cookies, setCookies] = React.useState<number>(0);
  const [username, setUsername] = React.useState('неизвестен');
  const [isBoosted, setIsBoosted] = React.useState(false);
  const [modifyer, setModifyer] = React.useState<number>(1);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const buyBoost = () => {
    setIsBoosted(true);
    setCookies((prev) => prev - 15);
    setModifyer((modifyer) => modifyer + 1);
  };

  const fetchClicks = () => {
    fetch(`${backendUrl}/api/clicks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegramUser: tg?.WebApp?.initDataUnsafe?.user,
        count: 1,
      }),
    })
  };

  const throttledFetchClicks = React.useCallback(throttle(fetchClicks, 1000),  [tg?.WebApp?.initDataUnsafe?.user]);

  const handleClick = () => {
    setCookies((prev) => prev + modifyer);
    throttledFetchClicks();
  };

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
        .then((res) => setCookies(+res.userData.currency))
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
      <button onClick={handleClick}>Денег: {cookies}</button>
      {isBoosted ? (
        <button disabled>Куплено</button>
      ) : (
        <button disabled onClick={buyBoost}>
          улучшения не доступны
        </button>
      )}
    </div>
  );
}

export default App;
