import type { BuildingType } from '../types';

export const getBuildingPrice = (building: BuildingType) => {
  return Math.floor(
    building.basePrice * Math.pow(building.multiplier, building.level),
  );
};
