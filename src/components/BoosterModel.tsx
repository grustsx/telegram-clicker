import { useRef } from 'react';
import * as THREE from 'three';
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Gltf } from '@react-three/drei';

function BoosterModel({
  onClick,
  id,
}: {
  onClick: (id: number) => void;
  id: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    console.log('press');
    e.stopPropagation();
    onClick(id);
  };
  let time = 0;

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    time += delta;

    groupRef.current.rotation.x -= 0.002;
    groupRef.current.rotation.y -= 0.002;
    groupRef.current.rotation.z -= 0.002;

    groupRef.current.position.x = 0 + Math.sin(time) * 0.05;
    groupRef.current.position.y = 0.95 + Math.sin(time * 0.5) * 0.06;
    groupRef.current.position.z = 4.8 + Math.sin(time * 0.3) * 0.03;
  });

  return (
    <group
      ref={groupRef}
      scale={0.005}
      position={[0, 0.95, 4.8]}
      onPointerDown={handlePointerDown}
    >
      <Gltf src="/models/booster/scene.gltf" />
    </group>
  );
}
export default React.memo(BoosterModel);
