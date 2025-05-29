import { useAppSelector } from '../app/hooks';
import { selectBuildings, selectCurrency } from '../app/selectors';
import { Building, IncrementButton } from '../components';
import { getBuildingPrice } from '../utils/getBuildingPrice';

function MainPage() {
  const buildings = useAppSelector(selectBuildings);
  const currency = useAppSelector(selectCurrency);

  return (
    <div className="card">
      <IncrementButton />
      {[...buildings]
        .sort((a, b) => a.buildingId - b.buildingId)
        .map((building) => (
          <Building
            building={building}
            key={building.buildingId}
            disabled={currency < getBuildingPrice(building)}
          />
        ))}
    </div>
  );
}

export default MainPage;
