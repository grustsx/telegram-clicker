export {
  selectSkillPoints,
  selectCurrency,
  selectUserId,
  selectVisibleBoosters,
  selectUserBanned,
  selectLoading,
  selectConnectionLoading,
  selectAssetsLoading,
  selectErrorMessage,
  selectStorageCurrency,
  selectCurrencyPerSecond,
  selectCurrencyPerClick,
} from './model/selectors';

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
} from './model/gameSlice';

export { activateBoosterThunk } from './model/activateBoosterThunk';
export { castSpellThunk } from './model/castSpellThunk';
export { updateCurrencyByCPSThunk } from './model/updateCurrencyByCPSThunk';
export { updateCurrencyByClickThunk } from './model/updateCurrencyByClickThunk';

export { getBuildingIncome } from './lib/getBuildingIncome';
export { getCooldownMultiplier } from './lib/getCooldownMultiplier';

export { type TgUserType } from './model/types';
