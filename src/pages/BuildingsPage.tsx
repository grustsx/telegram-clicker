import React from 'react';
import { useAppSelector } from '../app/hooks';
import { BuildingInfo, MainPageHud } from '../components';
import { selectAllBuildings } from '../state/buildingsSlice';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
} from '../app/selectors';
import type { BuildingType } from '../types/types';
import { getPrice } from '../utils';

function BuildingsPage() {
  const buildings = useAppSelector(selectAllBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const assetLevels = useAppSelector(selectAssetLevels);

  const [selectedBuildingId, setSelectedBuildingId] = React.useState<
    number | null
  >(null);

  const getIsShowed = (buildingId: number): boolean => {
    if (buildingId === 1) return true;
    return (
      (buildings.find((building) => building.id === buildingId - 1)?.level ||
        0) > 0
    );
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
                className={`${building.id === 7 ? 'absolute w-1/2 pointer-events-none' : 'relative w-full h-full'} aspect-square`}
                onClick={() => {
                  if (!getIsShowed(building.id)) return;
                  setSelectedBuildingId(building.id);
                }}
              >
                <img
                  className={`w-full h-full object-contain ${building.id === 7 ? 'pointer-events-none' : ''}`}
                  src={`/assets/buildings/${building.id}/lvl${assetLevels[building.id]}.png`}
                  style={{
                    pointerEvents: building.id === 7 ? 'none' : 'auto',
                    imageRendering: 'pixelated',
                  }}
                />
                {getIsEnoughCurrency(building) && getIsShowed(building.id) && (
                  <img
                    className="absolute top-1/4 left-1/4 w-1/8 h-1/8 animate-bounce pointer-events-none'"
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
          {selectedBuildingId && (
            <BuildingInfo
              buildingId={selectedBuildingId}
              onClose={() => setSelectedBuildingId(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(BuildingsPage);
