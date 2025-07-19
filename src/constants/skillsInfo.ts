import type { PositionType } from '../types/types';

export const SKILLS_INFO: Record<
  string,
  {
    description: string;
    position: PositionType;
    icon?: string;
    hidden?: boolean;
  }
> = {
  '1': {
    description: 'Два клика по цене одного.',
    position: { x: 0, y: 0 },
    icon: 'cursor.png',
  },
  '2': {
    description: 'Ещё в два раза, будьте добры.',
    position: { x: -100, y: 200 },
    icon: 'cursor-border.png',
  },
  '3': {
    description: 'Всё из-под пинка. Эффективность башен растёт на 5%.',
    position: { x: 100, y: 200 },
    icon: 'boot.png',
  },
  '4': {
    description: 'Ваша подлость увеличивает урон по тортику в два раза.',
    position: { x: -200, y: 400 },
    icon: 'david.png',
  },
  '5': {
    description: 'Все будут жопу рвать. 5% ко всему.',
    position: { x: 0, y: 400 },
    icon: 'wrench.png',
  },
  '6': {
    description: 'Контроль увеличивает эффективность башен на 5%.',
    position: { x: 200, y: 400 },
  },
  '7': {
    description: 'Дополнительный палец. Клики эффективнее ещё в 2 раза.',
    position: { x: -200, y: 600 },
    icon: 'finger.png',
  },
  '8': {
    description: 'Дополнительная рука. Клики эффективнее ещё в 2 раза.',
    position: { x: -200, y: 800 },
  },
  '9': {
    description: 'Рабинович недоволен, башни дешевле на 5%.',
    position: { x: 300, y: 600 },
    icon: 'dollar.png',
  },
  '10': {
    description:
      'Теперь ты сверх человек. Некоротые люди тебе поклоняются как божеству тортодобычи.',
    position: { x: -200, y: 1000 },
    icon: 'alien.png',
  },
  '11': {
    description:
      'Проджект менеджеры выгоняют народ с курилок, повышая эффективность башен на 5%',
    position: { x: 100, y: 800 },
  },
  '12': {
    description:
      'По указу президента все башни теперь кликают по команде. Клик увеличивается на количество построек.',
    position: { x: 100, y: 1200 },
  },
  '13': {
    description: 'Богданы на 10% эффективнее',
    position: { x: 400, y: 800 },
  },
  '14': {
    description: 'Б2 на 10% эффективнее',
    position: { x: 400, y: 900 },
  },
  '15': {
    description: 'Б3 на 10% эффективнее',
    position: { x: 400, y: 1000 },
  },
  '16': {
    description: 'Б4 на 10% эффективнее',
    position: { x: 400, y: 1100 },
  },
  '17': {
    description: 'Б5 на 10% эффективнее',
    position: { x: 400, y: 1200 },
  },
  '18': {
    description: 'Б6 на 10% эффективнее',
    position: { x: 400, y: 1300 },
  },
  '19': {
    description: '+ 10 мин к складу',
    position: { x: 400, y: 100 },
    hidden: true,
  },
  '20': {
    description: '+ 10 мин к складу',
    position: { x: 400, y: 300 },
  },
  '21': {
    description: '+ 10 мин к складу',
    position: { x: 400, y: 500 },
  },
};

export const fsf = [
  {
    id: '1',
    name: 'Даблклик',
    price: 1,
    requires: [],
    description: 'Два клика по цене одного.',
  },
  {
    id: '2',
    name: 'Даблдаблклик',
    price: 5,
    requires: ['1'],
    description: 'Ещё в два раза, будьте добры.',
  },
  {
    id: '3',
    name: 'Пинок',
    price: 5,
    requires: ['1'],
    description: 'Всё из-под пинка. Эффективность башен растёт на 5%.',
  },
  {
    id: '4',
    name: 'Хитрый приём',
    price: 5,
    requires: ['2'],
    description: 'Ваша подлость увеличивает урон по тортику в два раза.',
  },
  {
    id: '5',
    name: 'Гайки',
    price: 10,
    requires: ['2', '3'],
    description: 'Все будут жопу рвать. 5% ко всему.',
  },
  {
    id: '6',
    name: 'Логгирование времени',
    price: 5,
    requires: ['3'],
    description: 'Контроль увеличивает эффективность башен на 5%.',
  },
  {
    id: '7',
    name: 'Мутация',
    price: 5,
    requires: ['4'],
    description: 'Дополнительный палец. Клики эффективнее ещё в 2 раза.',
  },
  {
    id: '8',
    name: 'Адаптация',
    price: 10,
    requires: ['7'],
    description: 'Дополнительная рука. Клики эффективнее ещё в 2 раза.',
  },
  {
    id: '9',
    name: 'Скидка',
    price: 10,
    requires: ['6'],
    description: 'Рабинович недоволен, башни дешевле на 5%.',
  },
  {
    id: '10',
    name: 'Метаморфоза',
    price: 10,
    requires: ['8'],
    description:
      'Теперь ты сверх человек. Некоротые люди тебе поклоняются как божеству тортодобычи.',
  },
  {
    id: '11',
    name: 'Проджект менеджеры',
    price: 10,
    requires: ['6'],
    description:
      'Проджект менеджеры выгоняют народ с курилок, повышая эффективность башен на 5%',
  },
  {
    id: '12',
    name: 'Указ',
    price: 10,
    requires: ['5', '10', '11'],
    description:
      'По указу президента все башни теперь кликают по команде. Клик увеличивается на количество построек.',
  },
  {
    id: '13',
    name: 'Повышение градуса',
    price: 5,
    requires: ['9'],
    description: 'Богданы на 10% эффективнее',
  },
  {
    id: '14',
    name: 'Б2 бафф',
    price: 5,
    requires: ['9'],
    description: 'Б2 на 10% эффективнее',
  },
  {
    id: '15',
    name: 'Б3 бафф',
    price: 5,
    requires: ['9'],
    description: 'Б3 на 10% эффективнее',
  },
  {
    id: '16',
    name: 'Б4 бафф',
    price: 5,
    requires: ['9'],
    description: 'Б4 на 10% эффективнее',
  },
  {
    id: '17',
    name: 'Б5 бафф',
    price: 5,
    requires: ['9'],
    description: 'Б5 на 10% эффективнее',
  },
  {
    id: '18',
    name: 'Б6 бафф',
    price: 5,
    requires: ['9'],
    description: 'Б6 на 10% эффективнее',
  },
  {
    id: '19',
    name: 'Склад 1',
    price: 5,
    requires: [],
    description: '+ 10 мин к складу',
  },
  {
    id: '20',
    name: 'Склад 2',
    price: 5,
    requires: ['19'],
    description: '+ 10 мин к складу',
  },
  {
    id: '21',
    name: 'Склад 3',
    price: 10,
    requires: ['20'],
    description: '+ 10 мин к складу',
  },
];
