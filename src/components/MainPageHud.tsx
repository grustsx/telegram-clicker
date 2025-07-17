import { Sugar, Storage } from '.';
import { useAppSelector } from '../app/hooks';
import { selectCurrency, selectCurrencyPerSecond } from '../app/selectors';
import { formatLargeNumber } from '../utils/format';

function MainPageHud() {
  const currency = useAppSelector(selectCurrency);

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);
  return (
    <div className="bg-amber-800/25">
      <div className="text-2xl text-shadow-lg">
        {'Заработок: ' + formatLargeNumber(currencyPerSecond) + ' в секунду'}
      </div>
      <div className="text-2xl text-shadow-lg">
        Денег: {formatLargeNumber(currency)}
      </div>
      <Sugar />
      <Storage />
    </div>
  );
}

export default MainPageHud;
