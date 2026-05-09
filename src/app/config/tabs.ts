export const TabNames = {
  MAIN: 'main',
  BUILDINGS: 'buildings',
  UPGRADES: 'upgrades',
} as const;

export type TabName = (typeof TabNames)[keyof typeof TabNames];
