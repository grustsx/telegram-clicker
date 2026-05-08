import { useEffect, useState } from 'react';

import { useGLTF } from '@react-three/drei';
import { IMAGES_PATHES } from '../config/imagePathes';
import { setAssetsLoading } from '@/entities/game';
import { useAppDispatch } from '@/shared';

useGLTF.preload('/models/sun/scene.gltf');

export default function PreloadImagesWithLoading() {
  const dispatch = useAppDispatch();

  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    dispatch(setAssetsLoading(true));
  }, [dispatch]);

  useEffect(() => {
    if (loadedCount === IMAGES_PATHES.length) {
      dispatch(setAssetsLoading(false));
    }
  }, [loadedCount, dispatch]);

  return (
    <div style={{ display: 'none' }}>
      {IMAGES_PATHES.map((src, index) => (
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
