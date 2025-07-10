export const getPrice = (
  basePrice: number,
  multiplier: number,
  level: number,
  skills: string[],
) => {
  const skill = (id: string) => {
    return skills.includes(id) ? 1 : 0;
  };

  return Math.floor(
    +basePrice * Math.pow(+multiplier, +level) * (1 - 0.05 * skill('9')),
  );
};
