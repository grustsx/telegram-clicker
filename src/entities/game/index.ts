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

export { type TgUserType } from './model/types';
