import { Canvas } from '@react-three/fiber';
import CakeModel from './CakeModel';
import React from 'react';
import EarthModel from './EarthModel';

function CakeScene({
  onClick,
}: {
  onClick: (e: React.PointerEvent<Element>) => void;
}) {
  return (
    <div className="w-full h-full">
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

        <CakeModel onClick={onClick} />
        <EarthModel />
      </Canvas>
    </div>
  );
}

export default React.memo(CakeScene);
