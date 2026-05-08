import {
  CHEATING_BOOSTER_ID,
  CLICK_BOOSTER_ID,
  CPS_BOOSTER_ID,
} from '@/entities/booster';

export function getBoosterIcon(id: number): string {
  switch (id) {
    case CLICK_BOOSTER_ID:
      return 'skills/cursor.png';
    case CPS_BOOSTER_ID:
      return 'Home.png';
    case CHEATING_BOOSTER_ID:
      return 'skills/ace.png';
    default:
      return '';
  }
}
