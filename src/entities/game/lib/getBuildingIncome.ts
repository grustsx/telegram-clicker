import { getBuildingIncomeMultiplier } from './getBuildingIncomeMultiplier';

export const getBuildingIncome = (
  skills: number[],
  level: number,
  incomePerSecond: number,
  id: number,
) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return Math.ceil(
    level *
      incomePerSecond *
      getBuildingIncomeMultiplier(skills, id) *
      (1 + 0.1 * skill(3)) *
      (1 + 0.1 * skill(5)) *
      (1 + 0.2 * skill(6)) *
      (1 + 0.2 * skill(11)) *
      (1 + 0.15 * skill(22) * (1 + skill(52))) *
      (1 + 0.5 * skill(37)),
  );
};
