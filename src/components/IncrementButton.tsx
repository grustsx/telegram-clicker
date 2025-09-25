import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectActiveBoosterIds,
  selectActiveBoosters,
  selectCurrency,
  selectCurrencyPerClick,
  selectCurrencyPerSecond,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { sendClicks } from '../api';
import CakeScene from './CakeScene';
import { updateCurrencyByClick } from '../state/thunk';
import GameText from '../elements/GameText';
import { getCPCTemporaryMultipler } from '../utils/getCurrencyPerClick';
import { startDialog } from '../state/dialogSlice';
import { getCurrencyByBooster } from '../utils/getCurrencyPerSecond';
import { formatLargeNumber } from '../utils/format';

type FloatingNumber = {
  color: string;
  id: number;
  x: number;
  y: number;
  value: string;
};

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
            dispatch(
              startDialog([
                { name: '???', description: '...' },
                {
                  name: '???',
                  description: 'Ты чё толкаешься, ты чё больной?',
                },
              ]),
            );
            break;
          case 10:
            dispatch(
              startDialog([
                {
                  name: '???',
                  description: 'Ты не видишь, что по мне дамаг наносится?',
                },
              ]),
            );
            break;
          case 33:
            dispatch(
              startDialog([
                {
                  name: '???',
                  description: 'Нанеси мне сто урона и ты увидишь что будет',
                },
              ]),
            );
            break;
          case 99:
            dispatch(
              startDialog([
                {
                  name: '???',
                  description:
                    'Снизу загорелся восклицательный знак, считай ты уже пригабенился',
                },
              ]),
            );
            break;
        }
      }

      const multipler = getCPCTemporaryMultipler(
        unlockedSkillsIds,
        activeBoosterIds,
      );
      dispatch(updateCurrencyByClick(multipler));
      pendingClicks.current += multipler;

      const getColor = () => {
        if (multipler >= 500) return 'text-indigo-900';
        if (multipler >= 50) return 'text-tortik-orange';
        if (multipler >= 5) return 'text-tortik-yellow';
        return 'text-tortik-white';
      };

      const newNumber: FloatingNumber = {
        id: idCounter++,
        color: getColor(),
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
      <div className={`flex gap-12 absolute z-50 left-0 top-24`}>
        {activeBoosters.map((booster) => (
          <div key={booster.id}>
            <GameText text={`${booster.name}`} size="xs" />
            <GameText text={`${booster.remainSeconds}`} size="xs" />
          </div>
        ))}
      </div>
      {numbers.map((n) => (
        <span
          key={n.id}
          className={`fixed pointer-events-none ${n.color} text-shadow-md text-2xl font-semibold z-50`}
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
