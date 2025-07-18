import React from 'react';
import { useAppSelector } from '../app/hooks';
import { BuildingInfo } from '../components';
import { selectAllBuildings } from '../state/buildingsSlice';
import { selectCurrency, selectUnlockedSkillsIds } from '../app/selectors';
import { getPrice } from '../utils';
import type { BuildingType } from '../types/types';

function BuildingsPage() {
  const buildings = useAppSelector(selectAllBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);

  const [selectedBuilding, setSelectedBuilding] = React.useState<number | null>(
    null,
  );

  const getIsShowed = (buildingId: number): boolean => {
    if (buildingId === 1) return true;
    return (
      (buildings.find((building) => building.id === buildingId - 1)?.level ||
        0) > 0
    );
  };

  const enoughCurrency = (building: BuildingType): boolean => {
    return (
      getPrice(
        building.basePrice,
        building.multiplier,
        building.level,
        unlockedSkills,
      ) <= currency
    );
  };

  return (
    <div
      //className="pt-8 relative w-full  h-full bg-[url('/assets/grass-tile.png')] bg-center bg-repeat flex flex-row flex-wrap"
      className="w-screen h-screen flex items-center justify-center bg-[url('/assets/grass-tile.png')] bg-center bg-repeat pb-20 box-border"
      style={{
        backgroundSize: '64px 64px',
        imageRendering: 'pixelated',
      }}
    >
      <div className="grid grid-cols-2 grid-rows-3 gap-0 h-full max-h-[calc(100vh-100px)] aspect-[2/3]">
        {buildings.map((building) => (
          <div
            key={building.id}
            className={`relative aspect-square w-full h-full ${!getIsShowed(building.id) && 'hidden'}`}
            onClick={() => setSelectedBuilding(building.id)}
          >
            <div className="absolute top-1/2 left-1/2">{building.name}</div>
            <img
              className={`w-full h-full object-contain ${!enoughCurrency(building) && 'grayscale'}`}
              src={`/assets/buildings/1/default8x8.png`}
              style={{
                imageRendering: 'pixelated',
              }}
            />
          </div>
        ))}
      </div>
      {selectedBuilding && (
        <BuildingInfo
          buildingId={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}
    </div>
  );
}

export default BuildingsPage;
