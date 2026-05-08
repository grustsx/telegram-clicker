import { getBuildingIncome } from './getBuildingIncome';

export const getCurrencyPerSecond = (
  skills: number[],
  buildings: { level: number; incomePerSecond: number; id: number }[],
  boosters: number[],
) => {
  const booster = (id: number) => {
    return boosters.includes(id) ? 1 : 0;
  };
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  const firstBuildingLvl = buildings.find((b) => b.id === 1)?.level || 0;

  return Math.ceil(
    buildings.reduce((prev, { level, incomePerSecond, id }) => {
      if (id === 7) {
        return (
          prev +
          getBuildingIncome(
            skills,
            level,
            Math.pow(firstBuildingLvl, 1 + 0.6 * skill(28)),
            id,
          )
        );
      }
      return prev + getBuildingIncome(skills, level, incomePerSecond, id);
    }, 0) *
      (1 + 4 * booster(3)),
  );
};
