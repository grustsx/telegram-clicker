export const STONES_INFO: Record<
  number,
  {
    title: string;
    description: string;
    upgradedDescription: string;
    icon: string;
  }
> = {
  22: {
    title: 'Прилив',
    description: 'Прибавляет 15% к торт/сек',
    upgradedDescription: 'Прибавляет 30% к торт/сек',
    icon: 'moon',
  },
  23: {
    title: 'Сила',
    description: 'Прибавляет 50% к мощности клика',
    upgradedDescription: 'Прибавляет 100% к мощности клика',
    icon: 'cursor',
  },
  24: {
    title: 'Усиление гравитации',
    description: 'Откат кулдаунов быстрее на 20%',
    upgradedDescription: 'Откат кулдаунов быстрее на 40%',
    icon: 'time',
  },
};
