export const getCurrencyPerSecond = (
  skills: number[],
  buildings: { level: number; incomePerSecond: number; id: number }[],
  boosters: number[],
) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  const booster = (id: number) => {
    return boosters.includes(id) ? 1 : 0;
  };

  const firstBuildingLvl = buildings.find((b) => b.id === 1)?.level || 0;

  return Math.ceil(
    buildings.reduce((prev, { level, incomePerSecond, id }) => {
      if (id === 7) {
        return prev + level * firstBuildingLvl;
      }
      return (
        prev + level * incomePerSecond * getBuildingIncomeMultiplier(skills, id)
      );
    }, 0) *
      (1 + 0.05 * skill(3)) *
      (1 + 0.05 * skill(5)) *
      (1 + 0.05 * skill(6)) *
      (1 + 0.1 * skill(11)) *
      (1 + 0.15 * skill(22) * (1 + skill(52))) *
      (1 + 0.5 * skill(37)) *
      (1 + 4 * booster(3)),
  );
};

const getBuildingIncomeMultiplier = (skills: number[], buildingId: number) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  switch (buildingId) {
    case 1:
      return (
        (1 + 0.1 * skill(13)) * (1 + 0.5 * skill(26)) * (1 + 1 * skill(29))
      );
    case 2:
      return (1 + 0.1 * skill(14)) * (1 + 0.5 * skill(31));
    case 3:
      return (1 + 0.1 * skill(15)) * (1 + 0.5 * skill(35));
    case 4:
      return 1 + 0.1 * skill(16);
    case 5:
      return (1 + 0.1 * skill(17)) * (1 + 0.5 * skill(42));
    case 6:
      return 1 + 0.1 * skill(18);
    case 7:
      return 1 + 0.1 * skill(28);
    default:
      return 1;
  }
};

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000);
}

export const getCooldownMultiplier = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return 1 - 0.2 * skill(24) * (1 + skill(52));
};

export const getBoosterTtlMultiplier = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return 1 - 0 * skill(24);
};

export const getCurrencyByBooster = (cps: number) => {
  return Math.ceil(cps * 600);
};

export const getStorage = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return Math.ceil(
    1800 + skill(19) * 600 + skill(20) * 1200 + skill(21) * 1800,
  );
};
