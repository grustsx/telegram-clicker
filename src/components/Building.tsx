import { sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';
import {
  incrementBuildingLevel,
  updateCurrencyPerSecond,
} from '../state/gameSlice';
import type { BuildingType } from '../types';
import { formatLargeNumber } from '../utils/format';
import { getPrice } from '../utils/getPrice';

const Building = ({
  building,
  disabled,
  showed,
}: {
  building: BuildingType;
  disabled: boolean;
  showed: boolean;
}) => {
  const { buildingId, name, level, incomePerSecond } = building;
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const handleClick = () => {
    dispatch(incrementBuildingLevel(buildingId));
    dispatch(updateCurrencyPerSecond());
    sendUpgradeBuilding(buildingId, userId);
  };

  return (
    showed && (
      <div className="row">
        <button disabled={disabled} onClick={handleClick}>
          {name +
            ': ' +
            formatLargeNumber(
              getPrice(building.basePrice, building.multiplier, building.level),
            ) +
            ' денег'}
        </button>
        <div>{'lvl: ' + level}</div>
        <div>{'доход: ' + formatLargeNumber(+level * +incomePerSecond)}</div>
      </div>
    )
  );
};
export default Building;
