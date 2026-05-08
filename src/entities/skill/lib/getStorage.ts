import { STORAGE_SEGMENT } from '../config/storage';

export const getStorage = (skills: number[]) => {
  const skill = (id: number) => {
    return skills.includes(id) ? 1 : 0;
  };

  return Math.ceil(STORAGE_SEGMENT * (1 + skill(19) + skill(20) + skill(21)));
};
