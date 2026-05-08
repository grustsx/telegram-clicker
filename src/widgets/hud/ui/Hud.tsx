import React from 'react';

import QAModal from './QAModal';
import { formatLargeNumber, GameText, useAppSelector } from '@/shared';
import {} from '@/entities/game';
import StorageIndicator from './StorageIndicator';
import { AMBAR_ID } from '@/entities/building';
import { QA_IDS } from '../config/qa';
import {
  selectCurrency,
  selectSkillPoints,
  selectUserId,
} from '@/entities/game/model/selectors';
import { selectBuildingById } from '@/entities/building/model/selectors';
import { selectCurrencyPerSecond } from '@/features/game-progress/model/selectors';

function Hud({ darkMode = false }: { darkMode?: boolean }) {
  const currency = useAppSelector(selectCurrency);
  const skillPoints = useAppSelector(selectSkillPoints);
  const userId = useAppSelector(selectUserId);
  const [isQaOpened, setIsQaOpened] = React.useState(false);

  const ambar = useAppSelector((state) => selectBuildingById(state, AMBAR_ID));
  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);

  return (
    <>
      <div
        className="fixed w-full flex flex-col z-20"
        onClick={() => {
          if (userId && QA_IDS.includes(userId)) {
            setIsQaOpened(true);
          }
        }}
      >
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
      <QAModal isOpen={isQaOpened} onClose={() => setIsQaOpened(false)} />
    </>
  );
}

export default Hud;
