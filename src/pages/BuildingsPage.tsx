import { useAppSelector } from '../app/hooks';
import { selectCurrency, selectUnlockedSkillsIds } from '../app/selectors';
import { Building } from '../components';
import { selectAllBuildings } from '../state/buildingsSlice';
import { getPrice } from '../utils/getPrice';

function BuildingsPage() {
  const buildings = useAppSelector(selectAllBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);

  const getIsShowed = (buildingId: number): boolean => {
    if (buildingId === 1) return true;
    return (
      (buildings.find((building) => building.id === buildingId - 1)?.level ||
        0) > 0
    );
  };

  return (
    <div className="pt-8 w-full h-full text-tortik-white bg-radial from-tortik-orange to-indigo-900 flex flex-col">
      {[...buildings]
        .sort((a, b) => a.id - b.id)
        .map((building) => (
          <Building
            building={building}
            key={building.id}
            showed={getIsShowed(building.id)}
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
