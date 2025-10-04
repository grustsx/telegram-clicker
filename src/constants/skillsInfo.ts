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
    description: 'Всё из-под пинка. Эффективность башен растёт на 10%.',
    position: { x: 100, y: 200 },
    icon: 'boot.png',
  },
  '4': {
    description: 'Ваша подлость увеличивает урон по тортику в два раза.',
    position: { x: -200, y: 400 },
    icon: 'david.png',
  },
  '5': {
    description: 'Все будут жопу рвать. 10% ко всему.',
    position: { x: 0, y: 400 },
    icon: 'wrench.png',
  },
  '6': {
    description: 'Контроль увеличивает эффективность башен на 20%.',
    position: { x: 200, y: 400 },
    icon: 'time.png',
  },
  '7': {
    description: 'Дополнительный палец. Клики эффективнее ещё в 2 раза.',
    position: { x: -200, y: 600 },
    icon: 'finger.png',
  },
  '8': {
    description: 'Дополнительная рука. Клики эффективнее ещё в 2 раза.',
    position: { x: -200, y: 800 },
    icon: 'hand.png',
  },
  '9': {
    description: 'Рабинович недоволен, башни дешевле на 20%.',
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
      'Проджект менеджеры выгоняют народ с курилок, повышая эффективность башен на 20%',
    position: { x: 100, y: 800 },
    icon: 'manager.png',
  },
  '12': {
    description:
      'По указу президента все башни теперь кликают по команде. Клик увеличивается на количество построек.',
    position: { x: 0, y: 1200 },
    icon: 'list.png',
  },
  '13': {
    description: 'Горячая вода делает общаги на 25% эффективнее',
    position: { x: 400, y: 800 },
    icon: 'gradus.png',
  },
  '14': {
    description: 'ТОРТиКи на 25% эффективнее',
    position: { x: 400, y: 1000 },
    icon: 'belarus.png',
  },
  '15': {
    description: 'Артефакт из прошлого, амбар на 25% эффективнее',
    position: { x: 400, y: 1200 },
    icon: 'chain.png',
  },
  '16': {
    description:
      'Камень заглушает голос разума, делая добычу на 25% эффективнее',
    position: { x: 400, y: 1400 },
    icon: 'stone.png',
  },
  '17': {
    description: 'Откуда у Нади такие бицепсы, она сильнее на 25%',
    position: { x: 400, y: 1600 },
    icon: 'biceps.png',
  },
  '18': {
    description:
      'Дэнис сажает пару кустов, чтобы прикрыть лабораторию. Лаборатории легче работать на 25%',
    position: { x: 400, y: 1800 },
    icon: 'tree.png',
  },
  '19': {
    description: 'Открывает дополнительную комнату абара',
    position: { x: 600, y: 1100 },
    icon: 'key-one.png',
  },
  '20': {
    description: 'Открывает третью комнату в амбаре',
    position: { x: 1200, y: 1000 },
    icon: 'key-two.png',
  },
  '21': {
    description: 'Мастер ключ, даёт доступ ко всем комнатам амбара',
    position: { x: 1400, y: 1000 },
    icon: 'key-skeleton.png',
  },
  '25': {
    description: 'Улучшение общаги на 10% дешевле',
    position: { x: 600, y: 700 },
    icon: 'sale.png',
  },
  '26': {
    description:
      'Увеличивает эффективность студентов на 50%, по какой-то причине',
    position: { x: 800, y: 500 },
    icon: 'sun.png',
  },
  '27': {
    description: 'Волшебный колодец, скейлится от студентов',
    position: { x: 1000, y: 500 },
    icon: 'well.png',
  },
  '28': {
    description: '+25% к эффективности колодца',
    position: { x: 1200, y: 300 },
    icon: 'fish.png',
  },
  '29': {
    description:
      'Общага приносит в 2 раза больше. ТОРТиКи рады за студентов, но не от всего сердца',
    position: { x: 1200, y: 500 },
    icon: 'wine.png',
  },
  '30': {
    description: 'Можно будет проиграть все деньги в казик',
    position: { x: 600, y: 900 },
    icon: '777.png',
  },
  '31': {
    description:
      'Вечером супер гулять по дороге, повышает эффективность базы на 50%',
    position: { x: 800, y: 900 },
    icon: 'moon.png',
  },
  '32': {
    description: 'Делает вероятность выигрыша ровно 50%',
    position: { x: 1000, y: 800 },
    icon: 'cherry.png',
  },
  '33': {
    description: 'Спавнит бустер, никто не может сказать, как они это делают',
    position: { x: 1200, y: 800 },
    icon: 'ritual.png',
  },
  '34': {
    description: 'Славянам аренда дешевле на 15%',
    position: { x: 800, y: 1100 },
    icon: 'passport.png',
  },
  '35': {
    description: 'Рэп вернул амбар к своим корням, эффективноть выше на 50%',
    position: { x: 1000, y: 1000 },
    icon: 'mic.png',
  },
  '36': {
    description: 'Открывает возможность Егору совершать кровавые обряды',
    position: { x: 600, y: 1400 },
    icon: 'altar.png',
  },
  '37': {
    description:
      'Утром йога, вечером дорога, такой девиз увеличивает эффективность всех построек на 50%',
    position: { x: 800, y: 700 },
    icon: 'medicine.png',
  },
  '38': {
    description: 'Всё дешевле на 50%',
    position: { x: 1000, y: 1200 },
  },
  '39': {
    description: 'Даёт криты',
    position: { x: 0, y: 1400 },
    icon: 'teeth.png',
  },
  '40': {
    description: 'Увеличивает частоту крита',
    position: { x: 0, y: 1600 },
    icon: 'teeth-smile.png',
  },
  '41': {
    description: 'Увеличивает урон крита',
    position: { x: 0, y: 1800 },
    icon: 'block.png',
  },
  '42': {
    description: 'Тело Нади адаптируется к копанию, ускоряет добычу на 50%',
    position: { x: 200, y: 1600 },
    icon: 'biceps-shovel.png',
  },
  '43': {
    description: 'Даёт мегакрит',
    position: { x: 200, y: 1800 },
    icon: 'skull.png',
  },
  '44': {
    description: 'Усиливает мегакрит',
    position: { x: 200, y: 2000 },
    icon: 'on-fire.png',
  },
  '45': {
    description:
      'Глубокая связь с таинственным тортиком дарит Наде внеземную внутреннюю силу. Клик получает 1% от кпс',
    position: { x: 0, y: 2000 },
    icon: 'on-fire-solid.png',
  },
  '46': {
    description: 'Клик получает ещё 1% кпс',
    position: { x: 0, y: 2200 },
    icon: 'god-eye.png',
  },
  '47': {
    description:
      'Математическая модель показала, что бустеры появляются случайно, и этот шанс может увеличить... Кроличья лапка?',
    position: { x: 600, y: 1800 },
    icon: 'rabbit.png',
  },
  '48': {
    description: 'Улучшать лабу стало на 20% дешевле',
    position: { x: 800, y: 1800 },
  },
  '49': {
    description:
      'Таинственным образом учащает появление бустеров и незначительно уменьшает ужас Павлика',
    position: { x: 1000, y: 1800 },
  },
  '50': {
    description: 'Колодец дешевле на 20%',
    position: { x: 1400, y: 300 },
    icon: 'blind.png',
  },
  '51': {
    description: 'Егору и Андрею больше не нужно есть, апгрейды дешевле на 15%',
    position: { x: 800, y: 1400 },
  },
  '52': {
    description: 'Андрей теперь тоже совершает кровавую жертву на камне',
    position: { x: 1000, y: 1400 },
    icon: 'occultist.png',
  },
  '53': {
    description: 'Башни дешевле на 50%',
    position: { x: 400, y: 2000 },
    icon: 'double-up.png',
  },
};
