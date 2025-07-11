import { useAppSelector } from '../app/hooks';
import {
  selectBuildings,
  selectCurrency,
  selectUnlockedSkillsIds,
} from '../app/selectors';
import { Building } from '../components';
import { getPrice } from '../utils/getPrice';

function BuildingsPage() {
  const buildings = useAppSelector(selectBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);

  const getIsShowed = (buildingId: number): boolean => {
    if (buildingId === 1) return true;
    return (
      (buildings.find((building) => building.buildingId === buildingId - 1)
        ?.level || 0) > 0
    );
  };

  return (
    <div className="pt-8 w-full h-full text-tortik-white bg-radial from-tortik-orange to-indigo-900 flex flex-col">
      {[...buildings]
        .sort((a, b) => a.buildingId - b.buildingId)
        .map((building) => (
          <Building
            building={building}
            key={building.buildingId}
            showed={getIsShowed(building.buildingId)}
            disabled={
              currency <
              getPrice(
                building.basePrice,
                building.multiplier,
                building.level,
                unlockedSkills,
              )
            }
          />
        ))}
    </div>
  );
}

export default BuildingsPage;
