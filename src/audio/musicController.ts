// loopController.ts
type Loop = {
  buffer: AudioBuffer;
  source?: AudioBufferSourceNode;
  gain: GainNode;
};

const audioCtx = new AudioContext();
const loops: Record<string, Loop> = {};
let isPlaying = false;

const audioFiles: Record<string, string> = {
  mainBass: '/sounds/music/Tortik BABurial-esque XS.mp3',
  mainPad: '/sounds/music/Tortik Pad No.13.mp3',
  mainDrum: '/sounds/music/Tortik 10-Vintage Intelligent Drum.mp3',
  buildingDrum: '/sounds/music/Tortik 14-Amen VP9000 Remixed 06 175 BPM.mp3',
  buildingSynth: '/sounds/music/Tortik XIC 53 Hello Wendy.mp3',
  skillBass: '/sounds/music/Tortik BA 808 Bass XS.mp3',
  skillPad: '/sounds/music/Tortik PD Trance Voices.mp3',
  skillSnare: '/sounds/music/Tortik 4-Snare_7.mp3',
  skillKick: '/sounds/music/Tortik 5-Kick_25.mp3',
  skillHat: '/sounds/music/Tortik 6-Hihat_7_closed.mp3',
  bells: '/sounds/music/Tortik Rahels Long.mp3',
};

// Load all audio buffers
export const loadAllLoops = async () => {
  const entries = Object.entries(audioFiles);
  for (const [key, url] of entries) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const gain = audioCtx.createGain();
    gain.gain.value = 0; // start muted
    gain.connect(audioCtx.destination);
    loops[key] = { buffer: audioBuffer, gain };
  }
};

// Start all loops in sync
export const startAllLoopsSync = () => {
  if (isPlaying) return;

  const startTime = audioCtx.currentTime + 0.1; // schedule a bit ahead

  for (const loop of Object.values(loops)) {
    const source = audioCtx.createBufferSource();
    source.buffer = loop.buffer;
    source.loop = true;
    source.connect(loop.gain);
    source.start(startTime);
    loop.source = source;
  }

  isPlaying = true;
};

// Mute/unmute helpers
export const muteSounds = (names: string[]) => {
  for (const name of names) {
    if (loops[name]) {
      loops[name].gain.gain.value = 0;
    }
  }
};

export const unmuteSounds = (names: string[]) => {
  for (const name of names) {
    if (loops[name]) {
      loops[name].gain.gain.value = 1;
    }
  }
};

export const soloSounds = (names: string[]) => {
  for (const [key, loop] of Object.entries(loops)) {
    loop.gain.gain.value = names.includes(key) ? 1 : 0;
  }
};
