import React from 'react';
import { useAppSelector } from '../app/hooks';
import { BuildingInfo } from '../components';
import { BUILDINGS_INFO } from '../constants/skillsInfo';
import { selectAllBuildings } from '../state/buildingsSlice';
import useDragScroll from '../hooks/useDragScroll';

function BuildingsPage() {
  const containerRef = useDragScroll<HTMLDivElement>();

  const buildings = useAppSelector(selectAllBuildings);

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

  return (
    <div ref={containerRef} className="w-full h-full overflow-scroll ">
      <div className="pt-8 relative min-w-[1200px] w-full min-h-[2200px] h-full text-tortik-white bg-radial from-tortik-orange to-indigo-900 flex flex-col">
        {buildings
          .filter((building) => getIsShowed(building.id))
          .map((building) => (
            <div
              key={building.id}
              className={`absolute w-24 h-24 bg-sky-600 rounded-lg p-2 text-center cursor-pointer  ${building.upgraded && 'border-amber-300 border-solid border-2'}`}
              style={{
                left: `${BUILDINGS_INFO[building.id].position.x + 200}px`,
                top: `${BUILDINGS_INFO[building.id].position.y + 200}px`,
              }}
              onClick={() => setSelectedBuilding(building.id)}
            >
              <strong>{building.name}</strong>
            </div>
          ))}
        {selectedBuilding && (
          <BuildingInfo
            buildingId={selectedBuilding}
            onClose={() => setSelectedBuilding(null)}
          />
        )}
      </div>
    </div>
  );
}

export default BuildingsPage;
