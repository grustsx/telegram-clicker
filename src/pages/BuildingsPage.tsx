import React from 'react';
import { useAppSelector } from '../app/hooks';
import { BuildingInfo, MainPageHud } from '../components';
import { selectAllBuildings } from '../state/buildingsSlice';
import { selectCurrency, selectUnlockedSkillsIds } from '../app/selectors';
import { getPrice } from '../utils';
import type { BuildingType } from '../types/types';

function BuildingsPage() {
  const buildings = useAppSelector(selectAllBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);

  const [selectedBuilding, setSelectedBuilding] =
    React.useState<BuildingType | null>(null);

  const getIsShowed = (buildingId: number): boolean => {
    if (buildingId === 1) return true;
    return (
      (buildings.find((building) => building.id === buildingId - 1)?.level ||
        0) > 0
    );
  };

  const getAssetLevel = (building: BuildingType): number => {
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
    <>
      <MainPageHud />

      <div className="relative w-full h-full overflow-scroll">
        <div
          className="w-screen h-[max(200vw,100vh)] flex flex-col items-center justify-center bg-[url('/assets/buildings/water.png')] bg-center bg-repeat pb-20 pt-20 box-border animate-water"
          style={{
            backgroundSize: 'calc(1/4 * 100%) auto',
            imageRendering: 'pixelated',
          }}
        >
          <img
            className="relative w-full object-contain"
            src="/assets/buildings/top.png"
            style={{
              imageRendering: 'pixelated',
            }}
          />

          <div className="grid grid-cols-2 grid-rows-3 gap-0 w-full aspect-[2/3]">
            {buildings.map((building) => (
              <div
                key={building.id}
                className={`relative aspect-square w-full h-full`}
                onClick={() => {
                  if (!getIsShowed(building.id)) return;
                  setSelectedBuilding(building);
                }}
              >
                <img
                  className="w-full h-full object-contain"
                  src={`/assets/buildings/${building.id}/lvl${getAssetLevel(building)}.png`}
                  style={{
                    imageRendering: 'pixelated',
                  }}
                />
                {getIsEnoughCurrency(building) && getIsShowed(building.id) && (
                  <img
                    className="absolute top-1/4 left-1/4 w-1/8 h-1/8 animate-bounce"
                    src="/assets/buildings/up.png"
                    style={{
                      imageRendering: 'pixelated',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <img
            className="relative w-full object-contain"
            src="/assets/buildings/bottom.png"
            style={{
              imageRendering: 'pixelated',
            }}
          />
          {selectedBuilding && (
            <BuildingInfo
              building={selectedBuilding}
              assetLevel={getAssetLevel(selectedBuilding)}
              onClose={() => setSelectedBuilding(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(BuildingsPage);
