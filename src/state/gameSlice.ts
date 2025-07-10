import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BuildingType, SkillType, TgUserType } from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { getPrice, getCurrencyPerClick } from '../utils';
import { SKILLS_INFO } from '../constants/skillsInfo';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';

export interface GameState {
  currency: number;
  currencyPerSecond: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  currencyPerClick: number;
  user: TgUserType;
  buildings: BuildingType[];
  loading: boolean;
  errorMessage: string;
  skillsTree: SkillType[];
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  currencyPerClick: 1,
  skillPoints: 0,
  user: {},
  buildings: [],
  currencyPerSecond: 0,
  errorMessage: '',
  skillsTree: [],
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
      state.currencyPerSecond = getCurrencyPerSecond(
        state.skillsTree
          .filter((skill) => skill.unlocked)
          .map((skill) => skill.id),
        state.buildings.map((building: BuildingType) => ({
          level: building.level,
          income: building.incomePerSecond,
          id: building.buildingId,
        })),
      );
    },
    incrementCurrencyByClick(state) {
      state.currency += state.currencyPerClick;
    },
    updateCurrencyPerClick(state) {
      state.currencyPerClick = getCurrencyPerClick(
        state.skillsTree
          .filter((skill) => skill.unlocked)
          .map((skill) => skill.id),
        state.buildings.reduce((prev, building) => prev + building.level, 0),
      );
    },
    setUserData(state, action: PayloadAction<TgUserType>) {
      state.user = action.payload;
    },
    buySkill(state, action: PayloadAction<string>) {
      const skillId = action.payload;
      const skill = state.skillsTree.find((skill) => skill.id === skillId);

      if (!skill || skill?.price > state.skillPoints || skill?.unlocked) return;
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

        const skillsTree: SkillType[] = dictionaries.skillsTree.map(
          (skill: {
            id: string;
            name: string;
            price: number;
            requires: string[];
          }) => ({
            ...skill,
            description: SKILLS_INFO[skill.id].description,
            position: SKILLS_INFO[skill.id].position,
            unlocked: userInfo.unlockedSkills.includes(skill.id),
          }),
        );

        const updatedState = {
          currency: +userInfo.user.currency,
          currencyPerSecond: getCurrencyPerSecond(
            userInfo.unlockedSkills,
            userInfo.buildings.map((building) => ({
              level: building.level,
              income:
                dictionaries.buildings.find(
                  ({ buildingId }) => buildingId === building.buildingId,
                )?.incomePerSecond || 0,
              id: building.buildingId,
            })),
          ),
          storage: +userInfo.user.storage,
          storageCurrency: +userInfo.user.storageCurrency,
          skillPoints: +userInfo.user.skillPoints,
          currencyPerClick: getCurrencyPerClick(
            userInfo.unlockedSkills,
            userInfo.buildings.reduce(
              (prev, building) => prev + building.level,
              0,
            ),
          ),
          buildings: dictionaries.buildings.map((building) => ({
            buildingId: building.buildingId,
            name: building.name,
            level: userInfo.buildings.find(
              (userBuilding: { buildingId: number }) =>
                userBuilding.buildingId === building.buildingId,
            )?.level,
            basePrice: building.basePrice,
            multiplier: building.multiplier,
            incomePerSecond: building.incomePerSecond,
          })),
          skillsTree,
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
  buySkill,
  updateCurrencyPerClick,
} = gameSlice.actions;
export default gameSlice.reducer;
