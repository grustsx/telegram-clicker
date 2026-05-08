export type SkillType = {
  id: number;
  name: string;
  description: string;
  price: number;
  unlocked: boolean;
  hidden: boolean;
  requires?: number[];
};

export type PositionType = { x: number; y: number };

export type SkillStatusType =
  | 'unlocked'
  | 'available'
  | 'hidden'
  | 'mysterious';
