export { getPrice } from './getPrice';
export { getCurrencyPerClick } from './getCurrencyPerClick';

export const getMaxStorage = (storage: number, cps: number): number => {
  return storage * cps;
};
