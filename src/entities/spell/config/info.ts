import { BOOSTER_SPELL_ID, CHEATING_SPELL_ID, DEP_ID } from './ids';

export const SPELLS_INFO: Record<number, string> = {
  [DEP_ID]: 'Депнуть весь капитал в казик, шанс победы чуть меньше 50%',
  [CHEATING_SPELL_ID]:
    'Потратить 1 комнату амбара, чтобы отвлечь крупье на 2 минуты и понизить шанс проигрыша в 2 раза',
  [BOOSTER_SPELL_ID]: 'Состредоточить 2 комнаты амбара в спавн бустера',
};
