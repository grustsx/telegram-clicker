import { useAppSelector } from '../app/hooks';
import { selectBuildings, selectCurrency } from '../app/selectors';
import { Building, IncrementButton } from '../components';
import { getPrice } from '../utils/getPrice';

function MainPage() {
  const buildings = useAppSelector(selectBuildings);
  const currency = useAppSelector(selectCurrency);

  const getIsShowed = (buildingId: number): boolean => {
    if (buildingId === 1) return true;
    return (
      (buildings.find((building) => building.buildingId === buildingId - 1)
        ?.level || 0) > 0
    );
  };

  return (
    <div className="card">
      <IncrementButton />
      {/* <ClickUpgrade /> */}
      {[...buildings]
        .sort((a, b) => a.buildingId - b.buildingId)
        .map((building) => (
          <Building
            building={building}
            key={building.buildingId}
            showed={getIsShowed(building.buildingId)}
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
