export const getCurrencyPerClick = (
  skills: number[],
  buildingsCount: number,
) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };
  return Math.ceil(
    (Math.pow(
      2,
      skill(1) + skill(2) + skill(4) + skill(7) + skill(8) + skill(10),
    ) +
      skill(12) * buildingsCount) *
      (1 + 0.05 * skill(5)),
  );
};
