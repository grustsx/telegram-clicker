import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrency,
  selectCurrencyPerSecond,
  selectUserId,
} from '../app/selectors';
import {
  incrementCurrencyByClick,
  incrementCurrencyByPerSecond,
} from '../state/gameSlice';
import { sendClicks } from '../api';

const IncrementButton = () => {
  const pendingClicks = React.useRef<number>(0);

  const dispatch = useAppDispatch();

  const currency = useAppSelector(selectCurrency);
  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);
  const userId = useAppSelector(selectUserId);

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (!userId || pendingClicks.current <= 0) return;
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

  const handleClick = () => {
    dispatch(incrementCurrencyByClick());
    pendingClicks.current += 1;
  };

  return (
    <>
      <div>{'Заработок: ' + currencyPerSecond + ' в секунду'}</div>
      <button onClick={handleClick}>Денег: {currency}</button>
    </>
  );
};
export default IncrementButton;
