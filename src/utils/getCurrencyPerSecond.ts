const buildingIdToSkillIdMap: Record<number, string> = {
  1: '13',
  2: '14',
  3: '15',
  4: '16',
  5: '17',
  6: '18',
};

export const getCurrencyPerSecond = (
  skills: string[],
  buildings: { level: number; income: number; id: number }[],
) => {
  const skill = (id: string) => {
    return skills.includes(id) ? 1 : 0;
  };

  return Math.ceil(
    buildings.reduce(
      (prev, { level, income, id }) =>
        prev + level * income * (1 + 0.1 * skill(buildingIdToSkillIdMap[id])),
      0,
    ) *
      (1 + 0.05 * skill('3')) *
      (1 + 0.05 * skill('5')) *
      (1 + 0.05 * skill('6')) *
      (1 + 0.1 * skill('11')),
  );
};
