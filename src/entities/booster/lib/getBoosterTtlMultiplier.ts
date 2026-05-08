export const getBoosterTtlMultiplier = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return 1 - 0 * skill(24);
};
