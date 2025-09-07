import { StorageIndicator } from '.';
import { useAppSelector } from '../app/hooks';
import {
  selectCurrency,
  selectCurrencyPerSecond,
  selectSkillPoints,
} from '../app/selectors';
import GameText from '../elements/GameText';
import { formatLargeNumber } from '../utils/format';

function MainPageHud() {
  const currency = useAppSelector(selectCurrency);
  const skillPoints = useAppSelector(selectSkillPoints);

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  return (
    <div className="fixed w-full flex flex-col z-20">
      <GameText text={formatLargeNumber(currency) + ' тортиков'} />

      <div className="text-shadow-lg flex flex-row justify-between items-center p-8">
        <GameText
          size="sm"
          text={formatLargeNumber(currencyPerSecond) + '/сек'}
        />
        <StorageIndicator />
        <GameText size="sm" text={formatLargeNumber(skillPoints) + ' оу'} />
      </div>
    </div>
  );
}

export default MainPageHud;
