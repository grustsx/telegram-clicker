import { useAppSelector } from '../app/hooks';
import { selectBuildings, selectCurrency } from '../app/selectors';
import { Building, ClickUpgrade, IncrementButton } from '../components';
import { getPrice } from '../utils/getPrice';

function MainPage() {
  const buildings = useAppSelector(selectBuildings);
  const currency = useAppSelector(selectCurrency);

  return (
    <div className="card">
      <IncrementButton />
      <ClickUpgrade />
      {[...buildings]
        .sort((a, b) => a.buildingId - b.buildingId)
        .map((building) => (
          <Building
            building={building}
            key={building.buildingId}
            disabled={
              currency <
              getPrice(building.basePrice, building.multiplier, building.level)
            }
          />
        ))}
    </div>
  );
}

export default MainPage;
