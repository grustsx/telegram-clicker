import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const positions: Record<string, [number, number, number]> = {
  far: [120, -12, -800],
  closer: [60, -12, -300],
  evenCloser: [60, -12, -300],
  close: [20, -12, -100],
  deadly: [-6, -6, -30],
};

export default function MoonModel() {
  const { scene } = useGLTF('/models/moon/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0001;
    }
  });

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
