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

  const getSpriteLevel = (building: BuildingType): number => {
    const { level, id } = building;
    if (!getIsShowed(id)) return 0;
    if (level === 0) return 1;
    if (level < 10) return 2;
    if (level < 20) return 3;
    if (level < 30) return 4;
    return 5;
  };

  const getIsEnoughCurrency = (building: BuildingType): boolean => {
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
            className={`relative aspect-square w-full h-full`}
            onClick={() => {
              if (!getIsShowed(building.id)) return;
              setSelectedBuilding(building.id);
            }}
          >
            <div className="absolute top-1/2 left-1/2">{building.name}</div>
            <img
              className={`w-full h-full object-contain ${!getIsEnoughCurrency(building) && getIsShowed(building.id) && 'grayscale'}`}
              src={`/assets/buildings/1/lvl${getSpriteLevel(building)}.png`}
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
