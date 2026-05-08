import { createAppAsyncThunk } from '@/app/store/thunk';
import { getDictionariesThunk } from './getDictionariesThunk';
import { getUserDataThunk } from './getUserDataThunk';
import {
  findById,
  nowUnix,
  type UserBoosterType,
  type UserBuildingType,
  type UserSpellType,
} from '@/shared';
import { setBuildings } from '@/entities/building';
import { setBoosters } from '@/entities/booster';
import { setSkills, SKILLS_INFO } from '@/entities/skill';
import { setSpells } from '@/entities/spell';
import { setErrorMessage, setGameData, setGameLoading } from '@/entities/game';

export const getUserAndDictionariesThunk = createAppAsyncThunk(
  'data/getUserAndDictionaries',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setGameLoading(true));

    try {
      const [userInfo, dictionaries] = await Promise.all([
        dispatch(getUserDataThunk()).unwrap(),
        dispatch(getDictionariesThunk()).unwrap(),
      ]);

      //set boosters
      const boosters = dictionaries.boosters.map((booster) => {
        const userBooster = findById<UserBoosterType>(
          userInfo.boosters,
          booster.id,
        );
        return {
          id: booster.id,
          name: booster.name,
          ttlSeconds: booster.ttl,
          remainSeconds: userBooster
            ? Math.max(0, userBooster.availableTo - nowUnix())
            : 0,
        };
      });
      dispatch(setBoosters(boosters));

      //set buildings
      const buildings = dictionaries.buildings.map((building) => {
        const userBuilding = findById<UserBuildingType>(
          userInfo.buildings,
          building.id,
        );

        return {
          id: building.id,
          name: building.name,
          level: userBuilding?.level || 0,
          upgraded: userBuilding?.upgraded || false,
          basePrice: building.basePrice,
          multiplier: building.multiplier,
          incomePerSecond: building.incomePerSecond,
        };
      });
      dispatch(setBuildings(buildings));

      //set skills
      const skills = dictionaries.skillsTree.map((skill) => ({
        ...skill,
        description: SKILLS_INFO[skill.id]?.description || '',
        unlocked: userInfo.unlockedSkills.includes(skill.id),
      }));
      dispatch(setSkills(skills));

      //set spells
      const spells = dictionaries.spells.map((spell) => {
        const userSpell = findById<UserSpellType>(userInfo.spells, spell.id);
        return {
          ...spell,
          remainSeconds: userSpell
            ? Math.max(0, userSpell.availableAt - nowUnix())
            : 0,
        };
      });
      dispatch(setSpells(spells));

      //set game
      const { user } = userInfo;

      dispatch(
        setGameData({
          currency: user.currency,
          storage: user.storage,
          storageCurrency: user.storageCurrency,
          skillPoints: user.skillPoints,
          banned: user.banned,
        }),
      );

      return { userInfo, dictionaries };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка';

      dispatch(setErrorMessage(message));

      return rejectWithValue(message);
    } finally {
      dispatch(setGameLoading(false));
    }
  },
);
