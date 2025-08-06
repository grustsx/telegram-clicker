import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Group, Raycaster, Vector2, Vector3 } from 'three';
import { playPressSound, playReleaseSound } from '../utils/playCakeSound';

const MAX_TILT = Math.PI / 16;

function CakeModel({
  onClick,
}: {
  onClick: (e: React.PointerEvent<Element>) => void;
}) {
  const { scene } = useGLTF('/models/cake/scene.gltf');
  const { camera, gl } = useThree();

  const baseRef = useRef<Group>(null);
  const raycaster = new Raycaster();
  const [isHolding, setIsHolding] = React.useState<boolean>(false);

  const [{ rotation }, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 1500, friction: 15 },
  }));

  const floatingRef = useRef<Group>(null);
  const clockRef = useRef(0);

  useFrame((_, delta) => {
    clockRef.current += delta;
    const yOffset = Math.sin(clockRef.current * 2) * 0.001;
    if (floatingRef.current) {
      floatingRef.current.position.y = yOffset;
    }
  });

  const handlePointerMove = (x: number, y: number) => {
    const bounds = gl.domElement.getBoundingClientRect();
    const mouse = new Vector2(
      ((x - bounds.left) / bounds.width) * 2 - 1,
      -((y - bounds.top) / bounds.height) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0 && floatingRef.current) {
      const point = intersects[0].point.clone();
      const center = new Vector3();
      floatingRef.current.getWorldPosition(center);

      const dir = point.sub(center).normalize();
      const tiltX = -dir.z * MAX_TILT;
      const tiltZ = dir.x * MAX_TILT;

      api.start({ rotation: [-tiltX, 0, -tiltZ] });
    }
  };
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onClick(e);
    setIsHolding(true);
    playPressSound();
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerMoveEvent = (e: React.PointerEvent) => {
    if (!isHolding) return;
    handlePointerMove(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsHolding(false);
    playReleaseSound();
    gl.domElement.releasePointerCapture(e.pointerId);
    api.start({ rotation: [0, 0, 0] });
  };

  React.useEffect(() => {
    gl.domElement.style.touchAction = 'none';
  }, [gl]);

  return (
    <group
      renderOrder={1}
      ref={baseRef}
      rotation={[Math.PI / 5, Math.PI / 6, 0]}
      position={[0, 0.97, 4.57]}
    >
      <group ref={floatingRef}>
        <a.group
          rotation={rotation as unknown as [number, number, number]}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMoveEvent}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <primitive object={scene} scale={0.06} />
        </a.group>
      </group>
    </group>
  );
}

export default React.memo(CakeModel);
