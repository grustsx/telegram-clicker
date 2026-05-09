export { sendClicks } from './api/sendClicks';
export { getLeaderBoard } from './api/getLeaderBoard';
export { sendClaimStorage } from './api/sendClaimStorage';
export { sendName } from './api/sendName';
export { sendRestartUser } from './api/sendRestartUser';
export { sendUpdateScore } from './api/sendUpdateScore';

export {
  incrementSkillPoints,
  claimStorage,
  increaseCurrency,
  decreaseCurrency,
  decreaseSkillPoints,
  setUserData,
  setAssetsLoading,
  depCurrency,
  spawnBooster,
  decreaseStorage,
  removeBooster,
  setErrorMessage,
  setSkillPoints,
  setConnectionLoading,
  setGameData,
  setGameLoading,
} from './model/gameSlice';

export { activateBoosterThunk } from '../../features/game-progress/model/activateBoosterThunk';

export { getBuildingIncome } from './lib/getBuildingIncome';
export { getCooldownMultiplier } from './lib/getCooldownMultiplier';
export { getCurrencyPerClick } from './lib/getCurrencyPerClick';
export { getCurrencyPerSecond } from './lib/getCurrencyPerSecond';

export { type TgUserType } from './model/types';

export {
  selectUserId,
  selectCurrency,
  selectSkillPoints,
  selectVisibleBoosters,
  selectUserBanned,
  selectLoading,
  selectConnectionLoading,
  selectAssetsLoading,
  selectErrorMessage,
  selectStorageCurrency,
} from './model/selectors';
