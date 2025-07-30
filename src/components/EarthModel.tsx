import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EarthModel() {
  const { scene } = useGLTF('/models/earth/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <group renderOrder={0} ref={groupRef} position={[0, -2, 0]}>
      <primitive object={scene} scale={0.03} />
    </group>
  );
}
