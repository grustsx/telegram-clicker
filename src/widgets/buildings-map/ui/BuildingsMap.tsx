// widgets/buildings-map/ui/BuildingsMap.tsx

import {
  getIsBuildingShowed,
  getPrice,
  selectAllBuildings,
  type BuildingType,
} from '@/entities/building';

import { selectCurrency } from '@/entities/game';
import { selectUnlockedSkillsIds } from '@/entities/skill';
import { selectAssetLevels, selectSunState } from '@/features/game-progress';
import { useAppSelector } from '@/shared';
import { BuildingInfo } from '@/widgets/building-info';

import { BuildingMapItem } from './BuildingMapItem';
import { BuildingsSunOverlay } from './BuildingsSunOverlay';
import { useSelectedBuilding } from '../model/useSelectedBuilding';

export function BuildingsMap() {
  const buildings = useAppSelector(selectAllBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const assetLevels = useAppSelector(selectAssetLevels);
  const sunState = useAppSelector(selectSunState);

  const { selectedBuildingId, selectBuilding, clearSelectedBuilding } =
    useSelectedBuilding();

  const sortedBuildings = [...buildings].sort((a, b) => a.id - b.id);

  const getIsEnoughCurrency = (building: BuildingType) =>
    getPrice(building, unlockedSkills) <= currency;

  const handleSelectBuilding = (building: BuildingType) => {
    const isShowed = getIsBuildingShowed(
      building.id,
      unlockedSkills,
      buildings,
    );

    if (!isShowed) return;

    selectBuilding(building.id);
  };

  return (
    <>
      <div
        className={`relative w-full h-full overflow-scroll
        ${
          sunState === 'deadly'
            ? '-hue-rotate-15 saturate-120 brightness-105 contrast-120'
            : sunState === 'close'
              ? '-hue-rotate-5 saturate-110 contrast-110'
              : ''
        }`}
      >
        <BuildingsSunOverlay sunState={sunState} />

        <div
          className="w-screen h-[max(200vw,100vh)] flex flex-col items-center justify-center bg-[url('/assets/buildings/water.png')] bg-center bg-repeat pb-20 pt-20 box-border animate-water"
          style={{
            backgroundSize: 'calc(1/4 * 100%) auto',
            imageRendering: 'pixelated',
          }}
        >
          <img
            className="relative w-full object-contain pointer-events-none"
            src="/assets/buildings/top.png"
            style={{ imageRendering: 'pixelated' }}
          />

          <div className="grid grid-cols-2 grid-rows-3 gap-0 w-full aspect-[2/3]">
            {sortedBuildings.map((building) => {
              const isShowed = getIsBuildingShowed(
                building.id,
                unlockedSkills,
                buildings,
              );

              return (
                <BuildingMapItem
                  key={building.id}
                  building={building}
                  assetLevel={assetLevels[building.id]}
                  isShowed={isShowed}
                  isEnoughCurrency={getIsEnoughCurrency(building)}
                  onClick={() => handleSelectBuilding(building)}
                />
              );
            })}
          </div>

          <img
            className="relative w-full object-contain pointer-events-none"
            src="/assets/buildings/bottom.png"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      {selectedBuildingId && (
        <BuildingInfo
          buildingId={selectedBuildingId}
          onClose={clearSelectedBuilding}
        />
      )}
    </>
  );
}
