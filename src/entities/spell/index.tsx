export { selectSpellsOnCooldoown } from './model/selectors';
export {
  selectSpellById,
  refreshSpellCooldown,
  updateSpellsTimer,
} from './model/spellsSlice';
export { sendCastSpell } from './api/sendCastSpell';

export { SPELLS_INFO } from './config/info';

export { DEP_ID, BOOSTER_SPELL_ID, CHEATING_SPELL_ID } from './config/ids';
