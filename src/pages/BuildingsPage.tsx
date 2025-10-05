import React from 'react';
import { useAppSelector } from '../app/hooks';
import { BuildingInfo, MainPageHud } from '../components';
import { selectAllBuildings } from '../state/buildingsSlice';
import {
  selectAssetLevels,
  selectCurrency,
  selectSunState,
  selectUnlockedSkillsIds,
} from '../app/selectors';
import type { BuildingType } from '../types/types';
import { getIsBuildingShowed, getPrice } from '../utils';

function BuildingsPage() {
  const buildings = useAppSelector(selectAllBuildings);
  const currency = useAppSelector(selectCurrency);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const assetLevels = useAppSelector(selectAssetLevels);
  const sunState = useAppSelector(selectSunState);

  const [selectedBuildingId, setSelectedBuildingId] = React.useState<
    number | null
  >(null);

  const getIsEnoughCurrency = (building: BuildingType): boolean => {
    return getPrice(building, unlockedSkills) <= currency;
  };
  return (
    <>
      <MainPageHud />

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
        {sunState !== 'far' && (
          <div
            className={`fixed w-screen h-[max(200vw,100vh)] inset-0 bg-tortik-yellow/${sunState === 'deadly' ? '20' : '10'} pointer-events-none z-30`}
          />
        )}
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
            {buildings
              .sort((a, b) => a.id - b.id)
              .map((building) => (
                <div
                  key={building.id}
                  className={`${building.id === 7 ? 'absolute w-1/2 pointer-events-none' : 'relative w-full h-full'} aspect-square`}
                  onClick={() => {
                    if (
                      !getIsBuildingShowed(
                        building.id,
                        unlockedSkills,
                        buildings,
                      )
                    )
                      return;
                    setSelectedBuildingId(building.id);
                  }}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={`/assets/buildings/${building.id}/lvl${assetLevels[building.id]}.png`}
                    style={{
                      pointerEvents: building.id === 7 ? 'none' : 'auto',
                      imageRendering: 'pixelated',
                    }}
                  />
                  {getIsEnoughCurrency(building) &&
                    getIsBuildingShowed(
                      building.id,
                      unlockedSkills,
                      buildings,
                    ) && (
                      <img
                        className={`absolute ${building.id === 7 ? 'bottom-1/4 right-1/5' : 'top-1/4 left-1/4'} w-1/8 h-1/8 animate-bounce pointer-events-none`}
                        src="/assets/buildings/up.png"
                        style={{
                          pointerEvents: 'none',
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
        </div>
      </div>
      {selectedBuildingId && (
        <BuildingInfo
          buildingId={selectedBuildingId}
          onClose={() => setSelectedBuildingId(null)}
        />
      )}
    </>
  );
}

export default React.memo(BuildingsPage);
