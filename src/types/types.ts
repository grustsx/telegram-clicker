export type BuildingType = {
  id: number;
  name: string;
  level: number;
  basePrice: number;
  multiplier: number;
  incomePerSecond: number;
  upgraded: boolean;
};

export type TgUserType = {
  first_name?: string;
  last_name?: string;
  id?: number;
  username?: string;
};

export type SkillType = {
  id: number;
  name: string;
  description: string;
  price: number;
  unlocked: boolean;
  requires?: number[];
};

export type SpellType = {
  id: number;
  name: string;
  cooldownSeconds: number;
  remainSeconds: number;
};

export type BoosterType = {
  id: number;
  name: string;
  ttlSeconds: number;
  remainSeconds: number;
};

export type SkillStatusType =
  | 'unlocked'
  | 'available'
  | 'hidden'
  | 'mysterious';

export type PositionType = { x: number; y: number };

export type GameMessageType = {
  name: string;
  description: string;
  face?: string;
};
