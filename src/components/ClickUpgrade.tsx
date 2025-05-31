import React from 'react';
import { sendUpgradeClickLevel } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectClickInfo,
  selectCurrency,
  selectUserId,
} from '../app/selectors';
import {
  incrementClickLevel,
  updateCurrencyPerClick,
} from '../state/gameSlice';
import { getPrice } from '../utils/getPrice';

const ClickUpgrade = () => {
  const dispatch = useAppDispatch();

  const clickInfo = useAppSelector(selectClickInfo);
  const currency = useAppSelector(selectCurrency);
  const userId = useAppSelector(selectUserId);

  const pendingClicksUpdates = React.useRef<number>(0);

  const price = React.useMemo(() => {
    return getPrice(
      clickInfo.clickUpgradeBasePrice,
      clickInfo.clickUpgradeMultipler,
      clickInfo.clickLevel,
    );
  }, [clickInfo]);

  const handleClick = () => {
    dispatch(incrementClickLevel());
    dispatch(updateCurrencyPerClick());
    pendingClicksUpdates.current += 1;
  };

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (!userId || pendingClicksUpdates.current <= 0) return;
      sendUpgradeClickLevel(pendingClicksUpdates.current, userId);
      pendingClicksUpdates.current = 0;
    }, 2000);

    return () => {
      clearInterval(fetchInterval);
      if (userId) sendUpgradeClickLevel(pendingClicksUpdates.current, userId);
    };
  }, [dispatch, userId]);

  return (
    <div className="row">
      <button disabled={currency < price} onClick={handleClick}>
        {price + ' денег'}
      </button>
      <div>{'Даёт ' + clickInfo.currencyPerClick + ' за клик'}</div>
    </div>
  );
};
export default ClickUpgrade;
