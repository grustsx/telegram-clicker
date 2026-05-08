import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import React from 'react';
import { useAppSelector } from '@/shared';
import { selectSunState } from '@/entities/skill';

const positions: Record<string, [number, number, number]> = {
  far: [120, -12, -800],
  closer: [60, -12, -300],
  evenCloser: [60, -12, -300],
  close: [20, -12, -100],
  deadly: [0, -5, -5],
};

function SunModel() {
  const { scene } = useGLTF('/models/sun/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);
  const sunState = useAppSelector(selectSunState);

  return (
    <group renderOrder={0} ref={groupRef} position={positions[sunState]}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
}
export default React.memo(SunModel);
