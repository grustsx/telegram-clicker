import useRefreshData from './useRefreshData';
import useUpdateTimers from './useUpdateTimers';
import useSpawnBoosters from './useSpawnBoosters';
import useUpdateCurrencyByCPS from './useUpdateCurrencyByCPS';

export function useGameEffects() {
  useRefreshData();
  useUpdateCurrencyByCPS();
  useUpdateTimers();
  useSpawnBoosters();
}
