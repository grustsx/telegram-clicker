import type { BuildingType } from '../model/types';

export const getBuildingLevel = (
  buildingId: number,
  buildings: BuildingType[],
): number => {
  return buildings.find((building) => building.id === buildingId)?.level || 0;
};
