import React from 'react';

import type { FloatingNumber } from '../model/types';
import { getCPCTemporaryMultipler } from '../lib/getCPCTemporaryMultipler';
import { FIRST_DIALOG, SECOND_DIALOG, THIRD_DIALOG } from '../config/dialogs';
import { getNumberColor } from '../lib/getNumberColor';
import { getBoosterIcon } from '../lib/getBoosterIcon';
import { BoosterInfo } from './BoosterInfo';

import { startDialog } from '@/entities/dialog';
import { sendClicks } from '@/entities/game';
import { getCurrencyByBooster } from '@/entities/booster';

import { formatLargeNumber, useAppDispatch, useAppSelector } from '@/shared';
import CakeScene from './CakeScene/CakeScene';
import { selectCurrency, selectUserId } from '@/entities/game/model/selectors';
import {
  selectActiveBoosterIds,
  selectActiveBoosters,
} from '@/entities/booster/model/selectors';
import { selectUnlockedSkillsIds } from '@/entities/skill/model/selectors';
import {
  selectCurrencyPerClick,
  selectCurrencyPerSecond,
} from '@/features/game-progress/model/selectors';
import { updateCurrencyByClickThunk } from '@/features/game-progress/model/updateCurrencyByClickThunk';

const INTERVAL_TIME = 2000;

let idCounter = 0;

const IncrementButton = () => {
  const [numbers, setNumbers] = React.useState<FloatingNumber[]>([]);

  const pendingClicks = React.useRef<number>(0);

  const dispatch = useAppDispatch();

  const currencyPerClick = useAppSelector(selectCurrencyPerClick);
  const cps = useAppSelector(selectCurrencyPerSecond);
  const currency = useAppSelector(selectCurrency);

  const activeBoosterIds = useAppSelector(selectActiveBoosterIds);
  const activeBoosters = useAppSelector(selectActiveBoosters);

  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);

  const userId = useAppSelector(selectUserId);

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (!userId) return;
      sendClicks(pendingClicks.current, userId);
      pendingClicks.current = 0;
    }, INTERVAL_TIME);

    return () => {
      clearInterval(fetchInterval);
      if (userId) sendClicks(pendingClicks.current, userId);
    };
  }, [dispatch, userId]);

  const showBoosterBonus = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      const newNumber = {
        color: 'text-tortik-white',
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        value: `+${formatLargeNumber(getCurrencyByBooster(cps))}`,
      };

      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, 2000);
    },
    [cps],
  );

  const handleClick = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      if (cps === 0) {
        switch (currency) {
          case 0:
            dispatch(startDialog(FIRST_DIALOG));
            break;
          case 33:
            dispatch(startDialog(SECOND_DIALOG));
            break;
          case 99:
            dispatch(startDialog(THIRD_DIALOG));
            break;
        }
      }

      const multipler = getCPCTemporaryMultipler(
        unlockedSkillsIds,
        activeBoosterIds,
      );
      dispatch(updateCurrencyByClickThunk(multipler));
      pendingClicks.current += multipler;

      const newNumber: FloatingNumber = {
        id: idCounter++,
        color: getNumberColor(multipler),
        x: e.clientX + Math.random() * -40,
        y: e.clientY + Math.random() * -40,
        value:
          Math.random() < 0.03
            ? 'Ай'
            : `+${formatLargeNumber(currencyPerClick * multipler)}`,
      };
      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, 500);
    },
    [
      activeBoosterIds,
      cps,
      currency,
      currencyPerClick,
      dispatch,
      unlockedSkillsIds,
    ],
  );

  return (
    <>
      <CakeScene onClick={handleClick} showBoosterBonus={showBoosterBonus} />
      <div className={`flex flex-col gap-4 absolute z-50 left-4 top-24`}>
        {activeBoosters.map((booster) => (
          <BoosterInfo
            key={booster.id}
            booster={booster}
            icon={getBoosterIcon(booster.id)}
          />
        ))}
      </div>
      {numbers.map((n) => (
        <span
          key={n.id}
          className={`fixed pointer-events-none ${n.color} text-shadow-md text-xl font-semibold z-50`}
          style={{
            left: n.x,
            top: n.y,
          }}
        >
          {n.value}
        </span>
      ))}
    </>
  );
};

export default React.memo(IncrementButton);
