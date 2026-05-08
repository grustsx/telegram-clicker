import { Howl } from 'howler';
import type { Sound } from './types';
import { FADE_TIME } from './config';

function createLoop(src: string) {
  return new Howl({
    src: [src],
    loop: true,
    volume: 0,
  });
}

const loops: Record<string, Sound> = {
  mainBass: { howl: createLoop('/sounds/music/Tortik BABurial-esque XS.mp3') },
  mainPad: { howl: createLoop('/sounds/music/Tortik Pad No.13.mp3') },
  mainDrum: {
    howl: createLoop('/sounds/music/Tortik 10-Vintage Intelligent Drum.mp3'),
  },
  buildingDrum: {
    howl: createLoop(
      '/sounds/music/Tortik 14-Amen VP9000 Remixed 06 175 BPM.mp3',
    ),
  },
  buildingSynth: {
    howl: createLoop('/sounds/music/Tortik XIC 53 Hello Wendy.mp3'),
  },
  skillBass: { howl: createLoop('/sounds/music/Tortik BA 808 Bass XS.mp3') },
  skillPad: { howl: createLoop('/sounds/music/Tortik PD Trance Voices.mp3') },
  skillSnare: { howl: createLoop('/sounds/music/Tortik 4-Snare_7.mp3') },
  skillKick: { howl: createLoop('/sounds/music/Tortik 5-Kick_25.mp3') },
  skillHat: { howl: createLoop('/sounds/music/Tortik 6-Hihat_7_closed.mp3') },
  bells: { howl: createLoop('/sounds/music/Tortik Rahels Long.mp3') },
};

const startAllLoopsSync = () => {
  const loadPromises: Promise<Sound>[] = [];

  for (const loop of Object.values(loops)) {
    loadPromises.push(
      new Promise((resolve) => loop.howl.once('load', () => resolve(loop))),
    );
  }
  Promise.all(loadPromises).then((loops) => {
    loops.forEach((loop) => {
      const id = loop.howl.play();
      loop.id = id;
    });
  });
};

startAllLoopsSync();

const playingLoopsSet = new Set<string>();

export const unmuteSounds = (soundNames: string[]) => {
  soundNames.forEach((soundName) => {
    if (loops[soundName]) {
      playingLoopsSet.add(soundName);
      loops[soundName].howl.fade(0, 0.5, FADE_TIME);
    }
  });
};

export const soloSounds = (soundNames: string[]) => {
  Array.from(playingLoopsSet).forEach((playingSoundName) => {
    if (soundNames.includes(playingSoundName)) return;

    loops[playingSoundName].howl.fade(0.5, 0, FADE_TIME);
    playingLoopsSet.delete(playingSoundName);
  });

  soundNames.forEach((soundName) => {
    if (loops[soundName] && !playingLoopsSet.has(soundName)) {
      playingLoopsSet.add(soundName);
      loops[soundName].howl.fade(0, 0.5, FADE_TIME);
    }
  });
};

export const muteSounds = (soundNames: string[]) => {
  soundNames.forEach((soundName) => {
    if (loops[soundName] && playingLoopsSet.has(soundName)) {
      playingLoopsSet.delete(soundName);
      loops[soundName].howl.fade(0.5, 0, FADE_TIME);
    }
  });
};
