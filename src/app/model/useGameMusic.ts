import { useEffect } from 'react';
import { soloSounds } from '@/shared/lib/audio/musicController';
import { TabSounds } from '../config/tabSounds';
import type { TabName } from '../config/tabs';

export function useGameMusic(tab: TabName) {
  useEffect(() => {
    soloSounds(TabSounds[tab]);
  }, [tab]);
}
