import { Canvas } from '@react-three/fiber';
import CakeModel from './CakeModel';
import React from 'react';
import EarthModel from './EarthModel';
import SunModel from './SunModel';
import MoonModel from './MoonModel';
import StarrySky from './StarSky';
import { EffectComposer, Pixelation } from '@react-three/postprocessing';
import BoosterModel from './BoosterModel';
import { useAppSelector } from '../app/hooks';
import { selectSunState, selectVisibleBoosters } from '../app/selectors';

function getIntensity(intensity: number, sunState: string): number {
  switch (sunState) {
    case 'deadly':
      return intensity / 10;
    case 'close':
      return intensity / 2;
    default:
      return intensity;
  }
}

function CakeScene({
  onClick,
  showBoosterBonus,
}: {
  onClick: (e: React.PointerEvent<Element>) => void;
  showBoosterBonus: (e: React.PointerEvent<Element>) => void;
}) {
  const visibleBosster = useAppSelector(selectVisibleBoosters);
  const sunState = useAppSelector(selectSunState);

  return (
    <div className="w-full h-full">
      <StarrySky />

      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        gl={{ antialias: false }}
      >
        <ambientLight intensity={0.3} />
        <pointLight
          position={[0, 1, -1]}
          intensity={getIntensity(4, sunState)}
          distance={10000}
          decay={2}
          color={'#fffad4'}
        />
        <pointLight
          position={[0, 1, 1]}
          intensity={getIntensity(4, sunState)}
          distance={10000}
          decay={2}
          color={'#fffad4'}
        />
        <pointLight
          position={[1, 2, 6]}
          intensity={getIntensity(1, sunState)}
          distance={10000}
          decay={2}
          color={'#ff6666'}
        />
        <pointLight
          position={[-1, 1, 5]}
          intensity={getIntensity(11, sunState)}
          distance={10000}
          decay={2}
          color={'#3333ff'}
        />
        <pointLight
          position={[-1, 2, 5]}
          intensity={getIntensity(3, sunState)}
          distance={10000}
          decay={2}
          color={'#fffad4'}
        />

        <pointLight
          position={[-5, -5, -30]}
          intensity={getIntensity(3, sunState)}
          distance={0}
          decay={1}
          color={'#fffad4'}
        />

        <CakeModel onClick={onClick} />
        <EarthModel />
        <MoonModel />
        <SunModel />
        {visibleBosster.map((booster) => (
          <BoosterModel
            id={booster}
            key={booster}
            showBoosterBonus={showBoosterBonus}
          />
        ))}

        <EffectComposer>
          <Pixelation granularity={2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default CakeScene;
