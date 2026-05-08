import { createAppAsyncThunk } from '@/app/thunk';
import { selectCurrencyPerClick } from './selectors';
import { increaseCurrency } from '@/entities/game';

// Вызывается на каждый клик по печеньке!! Важно не нахуевертить
export const updateCurrencyByClickThunk = createAppAsyncThunk(
  'game/updateCurrencyByClick',
  async (multipler: number, { getState, dispatch }) => {
    const state = getState();

    const delta = selectCurrencyPerClick(state);

    dispatch(increaseCurrency(delta * multipler));
  },
);
