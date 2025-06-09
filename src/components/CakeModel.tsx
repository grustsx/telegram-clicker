import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Raycaster, Vector2, Vector3 } from 'three';

const MAX_TILT = Math.PI / 16;

function CakeModel({ onClick }: { onClick: () => void }) {
  const { scene } = useGLTF('/public/models/cake/scene.gltf');
  const { camera, gl } = useThree();

  const baseRef = useRef<Group>(null); // начальный поворот
  const tiltRef = useRef<Group>(null); // динамический наклон
  const raycaster = new Raycaster();

  const [tiltTarget, setTiltTarget] = useState({ x: 0, z: 0 });

  useFrame(() => {
    if (!tiltRef.current) return;
    tiltRef.current.rotation.x +=
      (tiltTarget.x - tiltRef.current.rotation.x) * 0.3;
    tiltRef.current.rotation.z +=
      (tiltTarget.z - tiltRef.current.rotation.z) * 0.3;
  });

  const handleClick = (e: React.MouseEvent) => {
    const bounds = gl.domElement.getBoundingClientRect();
    const mouse = new Vector2(
      ((e.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((e.clientY - bounds.top) / bounds.height) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
      onClick();
      const point = intersects[0].point.clone();
      const modelCenter = new Vector3(0, 0, 0);

      // Получаем направление от центра к точке
      const direction = point.sub(modelCenter).normalize();

      const newTiltX = -direction.z * MAX_TILT;
      const newTiltZ = direction.x * MAX_TILT;

      setTiltTarget({ x: -newTiltX, z: -newTiltZ });
    }
  };

  const handleUnClick = () => {
    if (!tiltRef.current) return;

    if (
      Math.abs(tiltRef.current.rotation.x - tiltTarget.x) < 0.01 &&
      Math.abs(tiltRef.current.rotation.z - tiltTarget.z) < 0.01 &&
      (tiltTarget.x !== 0 || tiltTarget.z !== 0)
    ) {
      setTiltTarget({ x: 0, z: 0 }); // возврат
    }
  };

  return (
    <group
      ref={baseRef}
      rotation={[Math.PI / 4, Math.PI / 6, 0]}
      position={[0.05, -0.4, 0]}
    >
      <group
        ref={tiltRef}
        onPointerDown={handleClick}
        onPointerUp={(e) => {
          e.stopPropagation();
          handleUnClick();
        }}
        onPointerLeave={handleUnClick}
      >
        <primitive object={scene} scale={0.02} />
      </group>
    </group>
  );
}

export default React.memo(CakeModel);
