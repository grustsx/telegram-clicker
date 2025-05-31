export const getPrice = (
  basePrice: number,
  multiplier: number,
  level: number,
): number => {
  return Math.floor(+basePrice * Math.pow(+multiplier, +level));
};
