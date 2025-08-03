import { Canvas } from '@react-three/fiber';
import CakeModel from './CakeModel';
import React from 'react';
import EarthModel from './EarthModel';
import SunModel from './SunModel';
import MoonModel from './MoonModel';
import StarrySky from './StarSky';
import { EffectComposer, Pixelation } from '@react-three/postprocessing';

function CakeScene({
  onClick,
}: {
  onClick: (e: React.PointerEvent<Element>) => void;
}) {
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
          intensity={4}
          distance={10000}
          decay={2}
          color={'#fffad4'}
        />
        <pointLight
          position={[0, 1, 1]}
          intensity={4}
          distance={10000}
          decay={2}
          color={'#fffad4'}
        />
        <pointLight
          position={[1, 2, 6]}
          intensity={1}
          distance={10000}
          decay={2}
          color={'#ff6666'}
        />
        <pointLight
          position={[-1, 1, 5]}
          intensity={11}
          distance={10000}
          decay={2}
          color={'#3333ff'}
        />
        <pointLight
          position={[-1, 2, 5]}
          intensity={3}
          distance={10000}
          decay={2}
          color={'#fffad4'}
        />

        <pointLight
          position={[-5, -5, -30]}
          intensity={3}
          distance={0}
          decay={1}
          color={'#fffad4'}
        />

        <CakeModel onClick={onClick} />
        <EarthModel />
        <MoonModel />
        <SunModel />

        <EffectComposer>
          <Pixelation granularity={2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default React.memo(CakeScene);
