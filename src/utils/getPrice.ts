import type { BuildingType } from '../types/types';

export const getPrice = (building: BuildingType, skills: number[]) => {
  const { basePrice, id, multiplier, level } = building;
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return Math.floor(
    basePrice *
      Math.pow(multiplier, level) *
      (1 - 0.2 * skill(9)) *
      (1 - 0.5 * skill(53)) *
      (1 - 0.5 * skill(38)) *
      getPriceMultiplier(skills, id),
  );
};

const getPriceMultiplier = (skills: number[], buildingId: number) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  switch (buildingId) {
    case 1:
      return 1 - 0.1 * skill(25);
    case 2:
      return 1;
    case 3:
      return 1 - 0.15 * skill(34);
    case 4:
      return 1 - 0.15 * skill(51);
    case 5:
      return 1;
    case 6:
      return 1 - 0.2 * skill(47);
    case 7:
      return 1 - 0.2 * skill(50);
    default:
      return 1;
  }
};
