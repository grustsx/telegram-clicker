import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectActiveBoosterIds,
  selectActiveBoosters,
  selectCurrencyPerClick,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { sendClicks } from '../api';
import CakeScene from './CakeScene';
import { updateCurrencyByClick } from '../state/thunk';
import GameText from '../elements/GameText';
import { getCPCTemporaryMultipler } from '../utils/getCurrencyPerClick';

type FloatingNumber = {
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

  const handleClick = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      const multipler = getCPCTemporaryMultipler(
        unlockedSkillsIds,
        activeBoosterIds,
      );
      dispatch(updateCurrencyByClick(multipler));
      pendingClicks.current += multipler;

      const newNumber: FloatingNumber = {
        id: idCounter++,
        x: e.clientX + Math.random() * -40,
        y: e.clientY + Math.random() * -40,
        value: `+${currencyPerClick * multipler}`,
      };
      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, 500);
    },
    [activeBoosterIds, currencyPerClick, dispatch, unlockedSkillsIds],
  );

  return (
    <>
      <CakeScene onClick={handleClick} />
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
          className="fixed pointer-events-none text-tortik-white text-shadow-md text-3xl font-semibold z-50"
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
