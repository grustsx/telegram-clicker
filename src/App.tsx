import React from 'react';

import './App.css';
import { IS_DEV } from './env';
import type { BuildingType, TgUser } from './types';
import { getUserData, sendClicks, sendUpgradeBuilding } from './api';
import { Building, Loader } from './components';
import { getPrice } from './utils';

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
  const tgUser = tg?.WebApp.initDataUnsafe?.user;

  const [currency, setCurrency] = React.useState<number>(0);
  const [currencyPerSecond, setCurrencyPerSecond] = React.useState<number>(0);
  const [buildings, setBuildings] = React.useState<BuildingType[]>([]);

  const [username, setUsername] = React.useState('неизвестен');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const pendingClicks = React.useRef<number>(0);

  const upgradeBuilding = (building: BuildingType) => {
    if (!tgUser) return;
    setCurrencyPerSecond((prev) => prev + building.income_per_second);
    setCurrency((prev) => prev - getPrice(building));
    setBuildings((prev) =>
      prev.map((build: BuildingType) => {
        if (building !== build) return build;
        return {
          ...build,
          level: build.level + 1,
        };
      }),
    );
    sendUpgradeBuilding(building.building_id, tgUser);
  };

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (!tgUser || pendingClicks.current <= 0) return;
      sendClicks(pendingClicks.current, tgUser);
      pendingClicks.current = 0;
    }, 2000);

    const currencyInterval = setInterval(() => {
      if (currencyPerSecond > 0) {
        setCurrency((prev) => prev + currencyPerSecond);
      }
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(currencyInterval);
      if (tgUser) sendClicks(pendingClicks.current, tgUser);
    };
  }, [currencyPerSecond, tgUser]);

  const handleClick = React.useCallback(() => {
    setCurrency((prev) => prev + 1);
    pendingClicks.current += 1;
  }, []);

  React.useEffect(() => {
    console.log('Компонент App смонтирован');

    if (tg) {
      tg.WebApp.ready();
      const id = tg.WebApp.initDataUnsafe?.user?.id;
      const name = tg.WebApp.initDataUnsafe?.user?.first_name || 'гость';
      setUsername(name);

      if (!id) return;
      setLoading(true);
      getUserData(id)
        .then((res) => {
          setCurrency(+res.userData.user.currency);
          setCurrencyPerSecond(+res.userData.user.currency_per_second);
          setBuildings(res.userData.buildings);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tg]);

  if (error) {
    return <div>Ошибка! Скорее всего это специально не работает сейчас</div>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="card">
      <div>{'Привет, ' + username}</div>
      <div>{'Заработок: ' + currencyPerSecond + ' в секунду'}</div>
      <button onClick={handleClick}>Денег: {currency}</button>
      {buildings
        .sort((a, b) => a.building_id - b.building_id)
        .map((building) => (
          <Building
            building={building}
            upgradeBuilding={upgradeBuilding}
            currency={currency}
          />
        ))}
    </div>
  );
}

export default App;
