import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BuildingType, SkillType, TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { getPrice, getCurrencyPerClick } from '../utils';

export interface GameState {
  currency: number;
  currencyPerSecond: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  clickInfo: {
    currencyPerClick: number;
    clickLevel: number;
    clickUpgradeBasePrice: number;
    clickUpgradeMultipler: number;
  };
  user: TgUserType;
  buildings: BuildingType[];
  loading: boolean;
  errorMessage: string;
  skillTree: SkillType[];
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  clickInfo: {
    currencyPerClick: 1,
    clickLevel: 0,
    clickUpgradeBasePrice: 0,
    clickUpgradeMultipler: 0,
  },
  skillPoints: 40,
  user: {},
  buildings: [],
  currencyPerSecond: 0,
  errorMessage: '',
  skillTree: [
    {
      id: '1',
      name: 'Даблклик',
      price: 1,
      description: 'Два клика по цене одного',
      position: { x: 300, y: 50 },
    },
    {
      id: '2',
      name: 'Даблдаблклик',
      price: 5,
      description: 'Ещё в два раза, будьте добры',
      requires: ['1'],
      position: { x: 200, y: 200 },
    },
    {
      id: '3',
      price: 5,
      name: 'Пинок',
      description: 'Бафф башен 5%',
      requires: ['1'],
      position: { x: 400, y: 200 },
    },
    {
      id: '4',
      price: 10,
      name: 'Мутация',
      description: 'Дополнительный палец. Клики эффективнее ещё в 2 раза',
      requires: ['2'],
      position: { x: 100, y: 400 },
    },
    {
      id: '5',
      price: 10,
      name: 'Гайки',
      description: 'Все будут жопу рвать. 1% ко всему',
      requires: ['2', '3'],
      position: { x: 300, y: 400 },
    },
    {
      id: '6',
      price: 5,
      name: 'Логгирование времени',
      description: '5% к эффективномти башнен',
      requires: ['3'],
      position: { x: 500, y: 400 },
    },
    {
      id: '7',
      price: 10,
      name: 'Указ',
      description:
        'По указу президента все башни теперь кликают по команде. Клик увеличивается на количество построек.',
      requires: ['4'],
      position: { x: 100, y: 600 },
    },
    {
      id: '8',
      price: 10,
      name: 'Скидка',
      description: 'Рабинович недоволен, башни дешевле на 5%',
      requires: ['6'],
      position: { x: 500, y: 600 },
    },
    {
      id: '9',
      price: 5,
      name: 'Повышение градуса',
      description: 'Богданы на 10% эффективнее',
      requires: ['8'],
      position: { x: 500, y: 800 },
    },
    {
      id: '10',
      price: 5,
      name: 'Б2 бафф',
      description: 'Б2 на 10% эффективнее',
      requires: ['8'],
      position: { x: 500, y: 1000 },
    },
    {
      id: '11',
      price: 5,
      name: 'Б3 бафф',
      description: 'Б3 на 10% эффективнее',
      requires: ['8'],
      position: { x: 500, y: 1200 },
    },
    {
      id: '12',
      price: 5,
      name: 'Б4 бафф',
      description: 'Б4 на 10% эффективнее',
      requires: ['8'],
      position: { x: 500, y: 1400 },
    },
    {
      id: '13',
      price: 5,
      name: 'Б5 бафф',
      description: 'Б5 на 10% эффективнее',
      requires: ['8'],
      position: { x: 500, y: 1600 },
    },
    {
      id: '14',
      price: 5,
      name: 'Б6 бафф',
      description: 'Б6 на 10% эффективнее',
      requires: ['8'],
      position: { x: 500, y: 1800 },
    },
    {
      id: '15',
      name: 'Склад 1',
      price: 5,
      description: '+ 10 мин к складу',
      position: { x: 700, y: 100 },
    },
    {
      id: '16',
      name: 'Склад 2',
      price: 5,
      description: '+ 10 мин к складу',
      requires: ['15'],
      position: { x: 700, y: 300 },
    },
    {
      id: '17',
      name: 'Склад 3',
      price: 10,
      description: '+ 10 мин к складу',
      requires: ['16'],
      position: { x: 700, y: 500 },
    },
  ],
  storage: 0,
  storageCurrency: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    claimStorage(state) {
      state.currency += state.storageCurrency;
      state.storageCurrency = 0;
    },
    incrementCurrencyByClick(state) {
      state.currency += state.clickInfo.currencyPerClick;
    },
    incrementCurrencyByPerSecond(state) {
      state.currency += state.currencyPerSecond;
    },
    incrementBuildingLevel(state, action: PayloadAction<number>) {
      const buildingId = action.payload;
      const building = state.buildings.find((b) => b.buildingId === buildingId);

      if (building) {
        state.currency -= getPrice(
          building.basePrice,
          building.multiplier,
          building.level,
        );
        building.level += 1;
        state.skillPoints += 1;
      }
    },
    updateCurrencyPerSecond(state) {
      state.currencyPerSecond = state.buildings.reduce(
        (prev, building) => prev + building.level * building.incomePerSecond,
        0,
      );
    },
    incrementClickLevel(state) {
      state.currency -= getPrice(
        state.clickInfo.clickUpgradeBasePrice,
        state.clickInfo.clickUpgradeMultipler,
        state.clickInfo.clickLevel,
      );
      state.clickInfo.clickLevel += 1;
    },
    updateCurrencyPerClick(state) {
      state.clickInfo.currencyPerClick = getCurrencyPerClick(
        state.clickInfo.clickLevel,
      );
    },
    setUserData(state, action: PayloadAction<TgUserType>) {
      state.user = action.payload;
    },
    buySkill(state, action: PayloadAction<string>) {
      const skillId = action.payload;
      const skill = state.skillTree.find((skill) => skill.id === skillId);

      if (!skill || skill?.price > state.skillPoints) return;
      state.skillPoints = state.skillPoints - skill.price;
      skill.unlocked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAndDictionaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAndDictionaries.fulfilled, (state, action) => {
        const { userInfo, dictionaries } = action.payload;

        const updatedState = {
          currency: +userInfo.user.currency,
          currencyPerSecond: +userInfo.user.currencyPerSecond,
          storage: +userInfo.user.storage,
          storageCurrency: +userInfo.user.storageCurrency,
          clickInfo: {
            clickLevel: +userInfo.user.clickLevel,
            currencyPerClick: getCurrencyPerClick(+userInfo.user.clickLevel),
            clickUpgradeBasePrice: +userInfo.user.clickUpgradeBasePrice,
            clickUpgradeMultipler: +userInfo.user.clickUpgradeMultipler,
          },
          buildings: dictionaries.buildings.map((building: BuildingType) => ({
            buildingId: building.buildingId,
            name: building.name,
            level: userInfo.buildings.find(
              (userBuilding: { buildingId: number; level: number }) =>
                userBuilding.buildingId === building.buildingId,
            ).level,
            basePrice: building.basePrice,
            multiplier: building.multiplier,
            incomePerSecond: building.incomePerSecond,
          })),
        };
        Object.assign(state, updatedState);
        state.loading = false;
      })
      .addCase(getUserAndDictionaries.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error.message as string;

        state.errorMessage = errorMessage || 'Произошла неизвестная ошибка';
      });
  },
});

export const {
  incrementCurrencyByClick,
  incrementBuildingLevel,
  updateCurrencyPerSecond,
  claimStorage,
  incrementCurrencyByPerSecond,
  setUserData,
  incrementClickLevel,
  buySkill,
  updateCurrencyPerClick,
} = gameSlice.actions;
export default gameSlice.reducer;
