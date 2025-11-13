import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setAssetsLoading } from '../state/gameSlice';
import { useGLTF } from '@react-three/drei';

const imagePaths = [
  '/assets/backgrounds/skills/blue-back.png',
  '/assets/backgrounds/skills/blue-stars.png',

  '/assets/buildings/water.png',
  '/assets/buildings/top.png',
  '/assets/buildings/bottom.png',
  '/assets/buildings/up.png',
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/1/lvl${i}.png`),
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/2/lvl${i}.png`),
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/3/lvl${i}.png`),
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/4/lvl${i}.png`),
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/5/lvl${i}.png`),
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/6/lvl${i}.png`),
  ...Array.from({ length: 6 }, (_, i) => `/assets/buildings/7/lvl${i}.png`),

  '/assets/icons/Home.png',
  '/assets/icons/List.png',
  '/assets/icons/Up-Arrow.png',

  '/assets/faces/face.png',
  '/assets/faces/Andrey-0.png',
  '/assets/faces/Andrey-1.png',
  '/assets/faces/Andrey-2.png',
  '/assets/faces/Bogdan-normal.png',
  '/assets/faces/Bogdan-questioned.png',
  '/assets/faces/Bogdan-smile.png',
  '/assets/faces/Den-normal.png',
  '/assets/faces/Egor-0.png',
  '/assets/faces/Egor-1.png',
  '/assets/faces/Egor-2.png',
  '/assets/faces/Nadya-0.png',
  '/assets/faces/Nadya-1.png',
  '/assets/faces/Nadya-2.png',
  '/assets/faces/Nikita-normal.png',
  '/assets/faces/Nikita-notbad.png',
  '/assets/faces/Nikita-smile.png',
  '/assets/faces/Pavlik-0.png',
  '/assets/faces/Pavlik-1.png',
  '/assets/faces/Pavlik-2.png',
  '/assets/faces/Sanek-0.png',
  '/assets/faces/Sanek-1.png',
  '/assets/faces/Sanek-2.png',
  '/assets/faces/Sanek-3.png',

  '/assets/borders/default-border.png',
  '/assets/borders/gray-border.png',
  '/assets/borders/light-border.png',
  '/assets/borders/white-border.png',
  '/assets/borders/light-background.png',
  '/assets/borders/default-background.png',
  '/assets/borders/gray-background.png',
  '/assets/borders/light-background.png',

  ...[
    '777',
    'alien',
    'altar',
    'arrow-down',
    'belarus',
    'biceps',
    'biceps-shovel',
    'blind',
    'block',
    'boot',
    'chain',
    'cherry',
    'cross',
    'cursor-border',
    'cursor',
    'david',
    'dollar',
    'double-up',
    'finger',
    'fish',
    'god-eye',
    'gradus',
    'hand',
    'hunger',
    'key-one',
    'key-two',
    'key-skeleton',
    'list',
    'manager',
    'medicine',
    'mic',
    'moon',
    'nazar',
    'note',
    'occultist',
    'on-fire-solid',
    'on-fire',
    'passport',
    'rabbit',
    'ritual',
    'sale',
    'skull',
    'star',
    'stone',
    'sun',
    'teeth-smile',
    'teeth',
    'time',
    'tree',
    'well',
    'wine',
    'wrench',
  ].map((name) => `/assets/icons/skills/${name}.png`),
];
useGLTF.preload('/models/sun/scene.gltf');

export default function PreloadImagesWithLoading() {
  const dispatch = useAppDispatch();

  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    dispatch(setAssetsLoading(true));
  }, [dispatch]);

  useEffect(() => {
    if (loadedCount === imagePaths.length) {
      dispatch(setAssetsLoading(false));
    }
  }, [loadedCount, dispatch]);

  return (
    <div style={{ display: 'none' }}>
      {imagePaths.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          onLoad={() => setLoadedCount((c) => c + 1)}
          onError={() => setLoadedCount((c) => c + 1)}
        />
      ))}
    </div>
  );
}
