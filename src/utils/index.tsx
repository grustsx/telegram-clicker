import type { BuildingType } from '../types';

export const getPrice = (building: BuildingType) => {
  return Math.floor(
    building.base_price * Math.pow(building.multiplier, building.level),
  );
};
