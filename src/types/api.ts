export interface ApiErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

export type GetUserDataType = {
  user: {
    id: number;
    currency: number;
    skillPoints: number;
    storage: number;
    storageCurrency: number;
  };
  buildings: UserBuildingType[];
  spells: UserSpellType[];
  unlockedSkills: number[];
};

export type UserSpellType = {
  id: number;
  availableAt: number;
};

export type UserBuildingType = {
  id: number;
  level: number;
  upgraded?: boolean;
};

export type GetDictionariesType = {
  buildings: {
    id: number;
    name: string;
    basePrice: number;
    multiplier: number;
    incomePerSecond: number;
  }[];
  skillsTree: UserSkillType[];
  spells: {
    id: number;
    name: string;
    cooldownSeconds: number;
  }[];
};

export type UserSkillType = {
  id: number;
  name: string;
  price: number;
  requires: number[];
};
