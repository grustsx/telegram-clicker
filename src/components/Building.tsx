import { sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';
import {
  incrementBuildingLevel,
  updateCurrencyPerSecond,
} from '../state/gameSlice';
import type { BuildingType } from '../types/types';
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
    if (disabled) return;

    dispatch(incrementBuildingLevel(buildingId));
    dispatch(updateCurrencyPerSecond());
    sendUpgradeBuilding(buildingId, userId);
  };

  return (
    showed && (
      <div
        className={`p-4 flex flex-row justify-between items-center text-lg text-shadow-lg shadow-md ${disabled ? 'bg-black/5 text-black/50' : 'bg-white/5 text-tortik-white'}`}
        onClick={handleClick}
      >
        <div className="w-1/5">{name}</div>
        <div className="w-1/5">
          {formatLargeNumber(
            getPrice(building.basePrice, building.multiplier, building.level),
          ) + ' денег'}
        </div>
        <div className="w-1/5">{level + ' lvl'}</div>
        <div className="w-1/5">
          {'доход: ' + formatLargeNumber(+level * +incomePerSecond)}
        </div>
      </div>
    )
  );
};
export default Building;
