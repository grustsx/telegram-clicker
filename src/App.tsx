import React from 'react';

import './App.css';
const backendUrl = 'https://clicker-backend-8wcb.onrender.com';

const IS_DEV = true;

type GetProgressResponse = {
  clicks: number;
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

  const [cookies, setCookies] = React.useState(0);
  const [username, setUsername] = React.useState('неизвестен');
  const [isBoosted, setIsBoosted] = React.useState(false);
  const [modifyer, setModifyer] = React.useState(1);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const buyBoost = () => {
    setIsBoosted(true);
    setCookies((prev) => prev - 15);
    setModifyer((modifyer) => modifyer + 1);
  };

  const handleClick = () => {
    setCookies((prev) => prev + modifyer);
    fetch(`${backendUrl}/api/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_user: tg?.WebApp?.initDataUnsafe?.user,
      }),
    });
  };

  async function getProgress(id: number): Promise<GetProgressResponse> {
    try {
      setLoading(true);

      const response = await fetch(`${backendUrl}/api/progress/${id}`);

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data: GetProgressResponse = await response.json();
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
      getProgress(id)
        .then((res) => setCookies(res.clicks))
        .catch((err) => setError(err));
    }
  }, [tg]);

  if (error) {
    return <div>{error}</div>;
  }

  return loading ? (
    <div>Загрузка...</div>
  ) : (
    <div className="card">
      <div>{'Привет, ' + username}</div>
      <div>Тортик кликер некоторый</div>
      <div>
        {'id: ' +
          tg?.WebApp.initDataUnsafe?.user?.id +
          ' ' +
          typeof tg?.WebApp.initDataUnsafe?.user?.id}
      </div>
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
