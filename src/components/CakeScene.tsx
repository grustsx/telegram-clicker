import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CakeModel from './CakeModel';
import React from 'react';

function CakeScene({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <Environment preset="sunset" />
        <CakeModel onClick={onClick} />
      </Canvas>
    </div>
  );
}

export default React.memo(CakeScene);
