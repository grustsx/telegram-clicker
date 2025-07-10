export const getCurrencyPerClick = (
  skills: string[],
  buildingsCount: number,
) => {
  const skill = (id: string) => {
    return skills.includes(id) ? 1 : 0;
  };
  return Math.ceil(
    (Math.pow(2, skill('1') + skill('2') + skill('4')) +
      skill('7') * buildingsCount) *
      (1 + 0.01 * skill('5')),
  );
};
