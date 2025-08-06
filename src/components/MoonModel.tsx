import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import React from 'react';

const positions: Record<string, [number, number, number]> = {
  far: [120, -12, -800],
  closer: [60, -12, -300],
  evenCloser: [60, -12, -300],
  close: [20, -12, -100],
  deadly: [-6, -6, -30],
};

function MoonModel() {
  const { scene } = useGLTF('/models/moon/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group
      renderOrder={0}
      ref={groupRef}
      position={positions.deadly}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <primitive object={scene} scale={1} />
    </group>
  );
}
export default React.memo(MoonModel);
