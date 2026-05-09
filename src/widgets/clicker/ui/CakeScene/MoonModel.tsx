import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import React from 'react';
import { useAppSelector } from '@/shared';
import { selectMoonState } from '@/features/game-progress';

const positions: Record<string, [number, number, number]> = {
  normal: [-6, -6, -30],
  close: [-3, 0, -10],
  deadly: [-1, 1, -3],
};

function MoonModel() {
  const { scene } = useGLTF('/models/moon/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);
  const moonState = useAppSelector(selectMoonState);

  return (
    <group
      renderOrder={0}
      ref={groupRef}
      position={positions[moonState]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <primitive object={scene} scale={1} />
    </group>
  );
}
export default React.memo(MoonModel);
