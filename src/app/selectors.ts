import { type RootState } from './store';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectCurrencyPerSecond = (state: RootState) =>
  state.game.currencyPerSecond;

export const selectBuildings = (state: RootState) => state.game.buildings;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectClickInfo = (state: RootState) => state.game.clickInfo;

export const selectLoading = (state: RootState) => state.game.loading;

export const selectErrorMessage = (state: RootState) => state.game.errorMessage;

export const selectSkillTree = (state: RootState) => state.game.skillTree;

export const selectStorage = (state: RootState) => ({
  storage: state.game.storage,
  storageCurrency: state.game.storageCurrency,
});
