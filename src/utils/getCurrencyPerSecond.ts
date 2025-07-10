const buildingIdToSkillIdMap: Record<number, string> = {
  1: '9',
  2: '10',
  3: '11',
  4: '12',
  5: '13',
  6: '14',
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
      (1 + 0.05 * skill('6')) *
      (1 + 0.05 * skill('5')),
  );
};
