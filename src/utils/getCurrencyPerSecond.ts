const buildingIdToSkillIdMap: Record<number, number> = {
  1: 13,
  2: 14,
  3: 15,
  4: 16,
  5: 17,
  6: 18,
};

export const getCurrencyPerSecond = (
  skills: number[],
  buildings: { level: number; incomePerSecond: number; id: number }[],
) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  const firstBuildingLvl = buildings.find((b) => b.id === 1)?.level || 0;

  return Math.ceil(
    buildings.reduce((prev, { level, incomePerSecond, id }) => {
      if (id === 7) {
        return prev + level * firstBuildingLvl;
      }
      return (
        prev +
        level * incomePerSecond * (1 + 0.1 * skill(buildingIdToSkillIdMap[id]))
      );
    }, 0) *
      (1 + 0.05 * skill(3)) *
      (1 + 0.05 * skill(5)) *
      (1 + 0.05 * skill(6)) *
      (1 + 0.1 * skill(11)) *
      (1 + 0.15 * skill(22)),
  );
};

export function nowUnix(): number {
  return Math.floor(Date.now() / 1000);
}

export const getCooldown = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return 1 - 0.2 * skill(24);
};
