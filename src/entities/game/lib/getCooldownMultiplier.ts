export const getCooldownMultiplier = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return 1 - 0.2 * skill(24) * (1 + skill(52));
};
