import { createAppAsyncThunk } from '@/app/thunk';
import { getDictionariesThunk } from './getDictionariesThunk';
import { getUserDataThunk } from './getUserDataThunk';

export const getUserAndDictionariesThunk = createAppAsyncThunk(
  'data/getUserAndDictionaries',
  async (_, thunkAPI) => {
    const [userInfo, dictionaries] = await Promise.all([
      thunkAPI.dispatch(getUserDataThunk()).unwrap(),
      thunkAPI.dispatch(getDictionariesThunk()).unwrap(),
    ]);

    return { userInfo, dictionaries };
  },
);
