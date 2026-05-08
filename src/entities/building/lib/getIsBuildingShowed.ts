import type { BuildingType } from '../model/types';

export const getIsBuildingShowed = (
  buildingId: number,
  unlockedSkills: number[],
  buildings: BuildingType[],
): boolean => {
  if (buildingId === 1) return true;
  if (buildingId === 7) {
    return unlockedSkills.includes(27);
  }

  return (
    (buildings.find((building) => building.id === buildingId - 1)?.level || 0) >
    0
  );
};
