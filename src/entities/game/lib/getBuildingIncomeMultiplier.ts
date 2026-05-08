export const getBuildingIncomeMultiplier = (
  skills: number[],
  buildingId: number,
) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  switch (buildingId) {
    case 1:
      return (
        (1 + 0.25 * skill(13)) * (1 + 0.5 * skill(26)) * (1 + 1 * skill(29))
      );
    case 2:
      return (1 + 0.25 * skill(14)) * (1 + 0.5 * skill(31));
    case 3:
      return (1 + 0.25 * skill(15)) * (1 + 0.5 * skill(35));
    case 4:
      return 1 + 0.25 * skill(16);
    case 5:
      return (1 + 0.25 * skill(17)) * (1 + 0.5 * skill(42));
    case 6:
      return 1 + 0.25 * skill(18);
    case 7:
      return 1;
    default:
      return 1;
  }
};
