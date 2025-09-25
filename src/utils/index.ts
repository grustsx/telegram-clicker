import type { BuildingType } from '../types/types';

export { getPrice } from './getPrice';
export { getCurrencyPerClick } from './getCurrencyPerClick';

export const getMaxStorage = (storage: number, cps: number): number => {
  return storage * cps;
};

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000);
}

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
