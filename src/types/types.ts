export type BuildingType = {
  buildingId: number;
  name: string;
  level: number;
  basePrice: number;
  multiplier: number;
  incomePerSecond: number;
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
  price: number;
  position: { x: number; y: number };
  requires?: string[];
  unlocked?: boolean;
};
