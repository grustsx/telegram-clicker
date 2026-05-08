export const getCPCTemporaryMultipler = (
  skills: number[],
  boosters: number[],
) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  const booster = (id: number) => {
    return boosters.includes(id) ? 1 : 0;
  };

  const superCrit = Math.random() < 0.02 * skill(43) + 0.02 * skill(44) ? 1 : 0;

  const crit =
    Math.random() < 0.1 * skill(39) + 0.1 * skill(40) && !superCrit ? 1 : 0;

  return (
    1 *
    (1 + 499 * booster(2)) *
    (1 + (4 * skill(39) + 10 * skill(41)) * crit) *
    (1 + (49 * skill(43) + 50 * skill(44)) * superCrit)
  );
};
