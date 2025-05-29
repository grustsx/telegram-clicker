import { type RootState } from './store';

export const selectCurrency = (state: RootState) => state.game.currency;

export const selectCurrencyPerSecond = (state: RootState) =>
  state.game.currencyPerSecond;

export const selectBuildings = (state: RootState) => state.game.buildings;

export const selectUserId = (state: RootState) => state.game.user.id;

export const selectLoading = (state: RootState) => state.game.loading;
