import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  BuildingType,
  SkillType,
  SpellType,
  TgUserType,
} from '../types/types';
import { getUserAndDictionaries } from './thunk';
import { getPrice, getCurrencyPerClick } from '../utils';
import { SKILLS_INFO } from '../constants/skillsInfo';
import { getCurrencyPerSecond } from '../utils/getCurrencyPerSecond';
import { findById } from '../utils/findById';
import type {
  UserBuildingType,
  UserSkillType,
  UserSpellType,
} from '../types/api';

export interface GameState {
  currency: number;
  storage: number;
  storageCurrency: number;
  skillPoints: number;
  user: TgUserType;
  buildings: BuildingType[];
  loading: boolean;
  errorMessage: string;
  skillsTree: SkillType[];
  spells: SpellType[];
}

const initialState: GameState = {
  loading: true,
  currency: 0,
  skillPoints: 0,
  user: {},
  buildings: [],
  errorMessage: '',
  skillsTree: [],
  storage: 0,
  storageCurrency: 0,
  spells: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    claimStorage(state) {
      state.currency += state.storageCurrency;
      state.storageCurrency = 0;
    },
    updateCurrencyByCPS(state) {
      state.currency += getCurrencyPerSecond(
        state.skillsTree
          .filter((skill) => skill.unlocked)
          .map((skill) => skill.id),
        state.buildings.map((building: BuildingType) => ({
          level: building.level,
          income: building.incomePerSecond,
          id: building.id,
        })),
      );
    },
    incrementBuildingLevel(state, action: PayloadAction<number>) {
      const buildingId = action.payload;
      const building = state.buildings.find((b) => b.id === buildingId);

      if (building) {
        state.currency -= getPrice(
          building.basePrice,
          building.multiplier,
          building.level,
          state.skillsTree
            .filter((skill) => skill.unlocked)
            .map((skill) => skill.id),
        );
        building.level += 1;
        state.skillPoints += 1;
      }
    },
    updateCurrencyByClick(state) {
      state.currency += getCurrencyPerClick(
        state.skillsTree
          .filter((skill) => skill.unlocked)
          .map((skill) => skill.id),
        state.buildings.reduce((prev, building) => prev + building.level, 0),
      );
    },
    setUserData(state, action: PayloadAction<TgUserType>) {
      state.user = action.payload;
    },
    buySkill(state, action: PayloadAction<number>) {
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
          (skill: UserSkillType) => ({
            ...skill,
            description: SKILLS_INFO[skill.id].description,
            position: SKILLS_INFO[skill.id].position,
            hidden: !!SKILLS_INFO[skill.id].hidden,
            unlocked: userInfo.unlockedSkills.includes(skill.id),
          }),
        );

        const updatedState = {
          currency: userInfo.user.currency,
          storage: userInfo.user.storage,
          storageCurrency: userInfo.user.storageCurrency,
          skillPoints: userInfo.user.skillPoints,
          buildings: dictionaries.buildings.map((building) => ({
            buildingId: building.id,
            name: building.name,
            level: findById<UserBuildingType>(userInfo.buildings, building.id)
              ?.level,
            basePrice: building.basePrice,
            multiplier: building.multiplier,
            incomePerSecond: building.incomePerSecond,
          })),
          skillsTree,
          spells: dictionaries.spells.map((spell) => ({
            ...spell,
            availableAt: findById<UserSpellType>(userInfo.spells, spell.id)
              ?.availableAt,
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
  updateCurrencyByClick,
  incrementBuildingLevel,
  claimStorage,
  updateCurrencyByCPS,
  setUserData,
  buySkill,
} = gameSlice.actions;
export default gameSlice.reducer;
