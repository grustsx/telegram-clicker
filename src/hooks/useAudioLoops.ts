import { useEffect } from 'react';
import {
  loadAllLoops,
  startAllLoopsSync,
  unmuteSounds,
} from '../audio/musicController';

export function useAudioLoops(initialUnmuteSounds: string[] = []) {
  useEffect(() => {
    const resumeAudio = async () => {
      try {
        await loadAllLoops();
        startAllLoopsSync();
        unmuteSounds(initialUnmuteSounds);
      } catch (e) {
        console.error('Failed to initialize audio loops', e);
      }
      window.removeEventListener('click', resumeAudio);
    };

    window.addEventListener('click', resumeAudio);

    return () => {
      window.removeEventListener('click', resumeAudio);
    };
  }, [initialUnmuteSounds]);
}
