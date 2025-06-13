import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrencyPerSecond, selectUserId } from '../app/selectors';
import {
  incrementCurrencyByClick,
  incrementCurrencyByPerSecond,
} from '../state/gameSlice';
import { sendClicks } from '../api';
import CakeScene from './CakeScene';

const IncrementButton = () => {
  const pendingClicks = React.useRef<number>(0);

  const dispatch = useAppDispatch();

  const currencyPerSecond = useAppSelector(selectCurrencyPerSecond);
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

  const handleClick = React.useCallback(() => {
    dispatch(incrementCurrencyByClick());
    pendingClicks.current += 1;
  }, [dispatch]);

  return <CakeScene onClick={handleClick} />;
};

export default React.memo(IncrementButton);
