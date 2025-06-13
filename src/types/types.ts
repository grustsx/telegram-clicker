export type BuildingType = {
  buildingId: number;
  name: string;
  level: number;
  basePrice: number;
  multiplier: number;
  incomePerSecond: number;
};
export type GetUserDataResponseType = {
  userData: {
    user: {
      id: number;
      currency: number;
      currency_per_second: number;
      currency_per_click: number;
    };
    buildings: BuildingType[];
  };
};

export type TgUserType = {
  first_name?: string;
  last_name?: string;
  id?: number;
  username?: string;
};

export type SkillType = {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  requires?: string[];
};
