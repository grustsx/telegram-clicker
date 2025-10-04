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

const buildingSkillsMap: Record<number, number[]> = {
  1: [13, 26, 29],
  2: [14, 31, 33],
  3: [15, 35, 21],
  4: [16, 51, 52],
  5: [17, 44, 46],
  6: [18, 47, 49],
  7: [27, 28, 50],
};

export function getBuildingAssetLevel(
  unlockedSkillsIds: number[],
  buildingId: number,
): number {
  return buildingSkillsMap[buildingId].reduce((prev, currentId) => {
    return unlockedSkillsIds.includes(currentId) ? prev + 1 : prev;
  }, 0);
}
