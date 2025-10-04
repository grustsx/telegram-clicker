import { StorageIndicator } from '.';
import { useAppSelector } from '../app/hooks';
import {
  selectCurrency,
  selectCurrencyPerSecond,
  selectSkillPoints,
} from '../app/selectors';
import { AMBAR_ID } from '../constants/const';
import GameText from '../elements/GameText';
import { selectBuildingById } from '../state/buildingsSlice';
import { formatLargeNumber } from '../utils/format';

function MainPageHud({ darkMode = false }: { darkMode?: boolean }) {
  const currency = useAppSelector(selectCurrency);
  const skillPoints = useAppSelector(selectSkillPoints);

  const ambar = useAppSelector((state) => selectBuildingById(state, AMBAR_ID));
  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  return (
    <div className="fixed w-full flex flex-col z-20">
      <GameText
        theme={darkMode ? 'dark' : 'light'}
        text={formatLargeNumber(currency) + ' тортиков'}
      />

      <div className="text-shadow-lg flex flex-row justify-between items-center p-4 pt-0">
        <GameText
          theme={darkMode ? 'dark' : 'light'}
          size="sm"
          text={formatLargeNumber(currencyPerSecond) + '/сек'}
        />
        {ambar.level > 0 && <StorageIndicator />}
        <GameText
          theme={darkMode ? 'dark' : 'light'}
          size="sm"
          text={formatLargeNumber(skillPoints) + ' оу'}
        />
      </div>
    </div>
  );
}

export default MainPageHud;
