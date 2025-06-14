import { Howl } from 'howler';

const pressSounds = [
  '/sounds/p_down_1.mp3',
  '/sounds/p_down_2.mp3',
  '/sounds/p_down_3.mp3',
];

const releaseSounds = [
  '/sounds/p_up_1.mp3',
  '/sounds/p_up_2.mp3',
  '/sounds/p_up_3.mp3',
];

function playRandomSound(sounds: string[], volume = 0.6) {
  const src = sounds[Math.floor(Math.random() * sounds.length)];

  const sound = new Howl({
    src: [src],
    volume: volume - Math.random() * 0.1,
    rate: 0.6 + Math.random(), // pitch variation
  });

  sound.play();
}

// 👉 вызов при нажатии:
export function playPressSound() {
  playRandomSound(pressSounds);
}

// 👉 вызов при отпускании:
export function playReleaseSound() {
  playRandomSound(releaseSounds, 0.3);
}
