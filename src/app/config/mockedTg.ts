import type { TgUserType } from '@/entities/game';

export const MOCKED_TG: {
  WebApp: {
    ready: () => void;
    initDataUnsafe?: {
      user?: TgUserType;
    };
  };
} = {
  WebApp: {
    ready: () => {},
    initDataUnsafe: {
      user: {
        id: 1,
        first_name: 'dev test',
        last_name: 'user',
      },
    },
  },
};
