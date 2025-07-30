import { Howl } from 'howler';

function createLoop(src: string) {
  return new Howl({
    src: [src],
    preload: true,
    loop: true,
    volume: 0.5,
    mute: true,
  });
}

const loops: Record<string, Howl> = {
  mainBass: createLoop('/sounds/music/Tortik BABurial-esque XS.mp3'),
  mainPad: createLoop('/sounds/music/Tortik Pad No.13.mp3'),
  mainDrum: createLoop('/sounds/music/Tortik 10-Vintage Intelligent Drum.mp3'),
  buildingDrum: createLoop(
    '/sounds/music/Tortik 14-Amen VP9000 Remixed 06 175 BPM.mp3',
  ),
  buildingSynth: createLoop('/sounds/music/Tortik XIC 53 Hello Wendy.mp3'),
  skillBass: createLoop('/sounds/music/Tortik BA 808 Bass XS.mp3'),
  skillPad: createLoop('/sounds/music/Tortik PD Trance Voices.mp3'),
  skillSnare: createLoop('/sounds/music/Tortik 4-Snare_7.mp3'),
  skillKick: createLoop('/sounds/music/Tortik 5-Kick_25.mp3'),
  skillHat: createLoop('/sounds/music/Tortik 6-Hihat_7_closed.mp3'),
  bells: createLoop('/sounds/music/Tortik Rahels Long.mp3'),
};

const startAllLoopsSync = () => {
  const ids: Record<string, number> = {};

  for (const [name, howl] of Object.entries(loops)) {
    ids[name] = howl.play();
    howl.mute(true, ids[name]);
  }

  return ids;
};

startAllLoopsSync();

export const unmuteSounds = (soundNames: string[]) => {
  soundNames.forEach((soundName) => {
    if (loops[soundName]) {
      loops[soundName].mute(false);
    }
  });
};

export const soloSounds = (soundNames: string[]) => {
  for (const loop of Object.values(loops)) {
    loop.mute(true);
  }
  soundNames.forEach((soundName) => {
    if (loops[soundName]) {
      loops[soundName].mute(false);
    }
  });
};

export const muteSounds = (soundNames: string[]) => {
  soundNames.forEach((soundName) => {
    if (loops[soundName]) {
      loops[soundName].mute(true);
    }
  });
};
