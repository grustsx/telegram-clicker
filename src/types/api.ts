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
    currencyPerSecond: number;
    skillPoints: number;
    storage: number;
    storageCurrency: number;
  };
  buildings: {
    buildingId: number;
    level: number;
  }[];
  unlockedSkills: string[];
};

export type GetDictionariesType = {
  buildings: {
    buildingId: number;
    name: string;
    basePrice: number;
    multiplier: number;
    incomePerSecond: number;
  }[];
  skillsTree: {
    id: string;
    name: string;
    price: number;
    requires: string[];
  }[];
};
