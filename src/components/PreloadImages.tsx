import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setAssetsLoading } from '../state/gameSlice';

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

  '/assets/icons/Home.png',
  '/assets/icons/List.png',
  '/assets/icons/Up-Arrow.png',
  ...[
    'alien',
    'boot',
    'cross',
    'cursor-border',
    'cursor',
    'david',
    'dollar',
    'finger',
    'star',
    'wrench',
  ].map((name) => `/assets/icons/skills/${name}.png`),
];

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
