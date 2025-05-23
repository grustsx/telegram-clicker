import React from 'react';

import './App.css';
const backendUrl = 'https://clicker-backend-8wcb.onrender.com';

const IS_DEV = false;

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
        telegram_id: tg?.WebApp?.initDataUnsafe?.user?.id,
      }),
    });
  };

  React.useEffect(() => {
    console.log('Компонент App смонтирован');

    if (tg) {
      tg.WebApp.ready();
      const id = tg.WebApp.initDataUnsafe?.user?.id;
      const name = tg.WebApp.initDataUnsafe?.user?.first_name || 'гость';
      setUsername(name);

      // Загружаем прогресс
      fetch(`${backendUrl}/api/progress/${id}`)
        .then((res) => res.json())
        .then((data) => setCookies(data.clicks || 0));
    }
  }, [tg]);

  return (
    <div className="card">
      <div>{'Привет, ' + username}</div>
      <div>{'Тортик кликер некоторый'}</div>
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
