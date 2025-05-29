import { sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';
import {
  incrementBuildingLevel,
  updateCurrencyPerSecond,
} from '../state/gameSlice';
import type { BuildingType } from '../types';
import { getBuildingPrice } from '../utils/getBuildingPrice';

const Building = ({
  building,
  disabled,
}: {
  building: BuildingType;
  disabled: boolean;
}) => {
  const { buildingId, name, level, increasePerSecond } = building;
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const handleClick = () => {
    dispatch(incrementBuildingLevel(buildingId));
    dispatch(updateCurrencyPerSecond());
    sendUpgradeBuilding(buildingId, userId);
  };

  return (
    <div className="row">
      <button disabled={disabled} onClick={handleClick}>
        {name + ': ' + getBuildingPrice(building) + ' денег'}
      </button>
      <div>{'lvl: ' + level}</div>
      <div>{'доход: ' + +level * +increasePerSecond}</div>
    </div>
  );
};
export default Building;
