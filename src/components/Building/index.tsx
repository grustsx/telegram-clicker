import type { BuildingType } from '../../types';
import { getPrice } from '../../utils';

const Building = ({
  building,
  upgradeBuilding,
  currency,
}: {
  building: BuildingType;
  upgradeBuilding: (building: BuildingType) => void;
  currency: number;
}) => {
  return (
    <div className="row">
      <button
        key={building.building_id}
        disabled={currency < getPrice(building)}
        onClick={() => upgradeBuilding(building)}
      >
        {building.name + ': ' + getPrice(building) + ' денег'}
      </button>
      <div>{'lvl: ' + building.level}</div>
      <div>{'доход: ' + +building.level * +building.income_per_second}</div>
    </div>
  );
};
export default Building;
