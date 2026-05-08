import type { RootState } from '@/app/store/store';

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectSkillPoints = (state: RootState) => state.game.skillPoints;

export const selectVisibleBoosters = (state: RootState) =>
  state.game.visibleBoosters;

export const selectUserBanned = (state: RootState) => state.game.banned;

export const selectLoading = (state: RootState) => state.game.loading;

export const selectConnectionLoading = (state: RootState) =>
  state.game.connectionLoading;

export const selectAssetsLoading = (state: RootState) =>
  state.game.assetsLoading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectStorageCurrency = (state: RootState) =>
  state.game.storageCurrency;
