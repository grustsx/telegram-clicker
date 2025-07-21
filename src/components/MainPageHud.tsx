import { Storage } from '.';
import { useAppSelector } from '../app/hooks';
import {
  selectCurrency,
  selectCurrencyPerSecond,
  selectSkillPoints,
} from '../app/selectors';
import { formatLargeNumber } from '../utils/format';

function MainPageHud() {
  const currency = useAppSelector(selectCurrency);
  const skillPoints = useAppSelector(selectSkillPoints);

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  return (
    <div className="fixed w-full flex flex-col z-20">
      <div className="text-3xl text-shadow-lg">
        {formatLargeNumber(currency) + ' тортиков'}
      </div>
      <div className="text-2xl text-shadow-lg flex flex-row justify-around items-center">
        <div>{formatLargeNumber(currencyPerSecond) + '/сек'}</div>
        <Storage />
        <div>{formatLargeNumber(skillPoints) + ' оу'}</div>
      </div>
    </div>
  );
}

export default MainPageHud;
