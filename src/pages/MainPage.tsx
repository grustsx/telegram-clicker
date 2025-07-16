import { useAppSelector } from '../app/hooks';
import { selectCurrency, selectCurrencyPerSecond } from '../app/selectors';
import { AppVersion, IncrementButton, Storage, Sugar } from '../components';
import { formatLargeNumber } from '../utils/format';

function MainPage() {
  const currency = useAppSelector(selectCurrency);

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  return (
    <div className="text-tortik-white pt-8 w-full h-full bg-radial from-tortik-yellow via-tortik-orange via-40% to-indigo-900">
      <AppVersion />
      <div className="text-2xl text-shadow-lg">
        {'Заработок: ' + formatLargeNumber(currencyPerSecond) + ' в секунду'}
      </div>
      <div className="text-2xl text-shadow-lg">
        Денег: {formatLargeNumber(currency)}
      </div>
      <Sugar />
      <Storage />
      <IncrementButton />
    </div>
  );
}

export default MainPage;
