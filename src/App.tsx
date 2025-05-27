import React from 'react';

import './App.css';
import { IS_DEV } from './env';
const backendUrl = 'https://clicker-backend-8wcb.onrender.com';

type Building = {
  building_id: number;
  name: string;
  level: number;
  base_price: number;
  multiplier: number;
  income_per_second: number;
};
type GetUserDataResponse = {
  userData: {
    user: {
      id: number;
      currency: number;
      currency_per_second: number;
      currency_per_click: number;
    };
    buildings: Building[];
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
const getPrice = (building: Building) => {
  return Math.floor(
    building.base_price * Math.pow(building.multiplier, building.level),
  );
};

function App() {
  const tg = IS_DEV ? mockedTg : window.Telegram;

  const [currency, setCurrency] = React.useState<number>(0);
  const [currencyPerSecond, setCurrencyPerSecond] = React.useState<number>(0);
  const [buildings, setBuildings] = React.useState<Building[]>([]);

  const [username, setUsername] = React.useState('неизвестен');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const pendingClicks = React.useRef<number>(0);

  const upgradeBuilding = (building: Building) => {
    setCurrencyPerSecond((prev) => prev + building.income_per_second);
    setCurrency((prev) => prev - getPrice(building));
    setBuildings((prev) =>
      prev.map((build: Building) => {
        if (building !== build) return build;
        return {
          ...build,
          level: build.level + 1,
        };
      }),
    );
    fetchUpgradeBuilding(
      building.building_id,
      tg?.WebApp?.initDataUnsafe?.user,
    );
  };

  const fetchUpgradeBuilding = React.useCallback(
    (building_id: number, telegramUser: TgUser | undefined) => {
      if (!telegramUser) return;
      fetch(`${backendUrl}/api/upgradeBuilding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_user: telegramUser,
          building_id,
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
          setCurrency(+res.userData.user.currency);
          setCurrencyPerSecond(+res.userData.user.currency_per_second);
          setBuildings(res.userData.buildings);
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
      <div>{'Заработок: ' + currencyPerSecond + ' в секунду'}</div>
      <button onClick={handleClick}>Денег: {currency}</button>
      {buildings
        .sort((a, b) => a.building_id - b.building_id)
        .map((building) => (
          <div className="row">
            <button
              key={building.building_id}
              disabled={currency < getPrice(building)}
              onClick={() => upgradeBuilding(building)}
            >
              {building.name + ': ' + getPrice(building) + ' денег'}
            </button>
            <div>{'lvl: ' + building.level}</div>
            <div>
              {'доход: ' + +building.level * +building.income_per_second}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
