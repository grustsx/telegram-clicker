import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrencyPerClick,
  selectCurrencyPerSecond,
  selectUserId,
} from '../app/selectors';
import {
  incrementCurrencyByClick,
  incrementCurrencyByPerSecond,
} from '../state/gameSlice';
import { sendClicks } from '../api';
import CakeScene from './CakeScene';

type FloatingNumber = {
  id: number;
  x: number;
  y: number;
  value: string;
};

let idCounter = 0;

const IncrementButton = () => {
  const [numbers, setNumbers] = React.useState<FloatingNumber[]>([]);

  const pendingClicks = React.useRef<number>(0);

  const dispatch = useAppDispatch();

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);
  const currencyPerClick = useAppSelector(selectCurrencyPerClick);

  const userId = useAppSelector(selectUserId);

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (!userId) return;
      sendClicks(pendingClicks.current, userId);
      pendingClicks.current = 0;
    }, 2000);

    const currencyInterval = setInterval(() => {
      if (currencyPerSecond > 0) {
        dispatch(incrementCurrencyByPerSecond());
      }
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(currencyInterval);
      if (userId) sendClicks(pendingClicks.current, userId);
    };
  }, [currencyPerSecond, dispatch, userId]);

  const handleClick = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      dispatch(incrementCurrencyByClick());
      pendingClicks.current += 1;

      const newNumber: FloatingNumber = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        value: `+${currencyPerClick}`, // или подставляй своё значение
      };
      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, 500);
    },
    [currencyPerClick, dispatch],
  );

  return (
    <>
      <CakeScene onClick={handleClick} />
      {numbers.map((n) => (
        <span
          key={n.id}
          className="fixed pointer-events-none text-tortik-orange text-3xl font-semibold z-50"
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
