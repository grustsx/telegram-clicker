import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Group, Raycaster, Vector2, Vector3 } from 'three';
import { playPressSound, playReleaseSound } from '../utils/playCakeSound';
// import ExplodingCubes from './ExplodingCubes';

const MAX_TILT = Math.PI / 16;

export default function CakeModel({
  onClick,
}: {
  onClick: (e: React.PointerEvent<Element>) => void;
}) {
  const { scene } = useGLTF('/models/cake/scene.gltf');
  const { camera, gl } = useThree();

  const baseRef = useRef<Group>(null);
  const raycaster = new Raycaster();
  const [isHolding, setIsHolding] = React.useState<boolean>(false);
  // const [explodeCenter, setExplodeCenter] = React.useState<
  //   [number, number, number] | null
  // >(null);

  const [{ rotation }, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 1500, friction: 15 },
  }));

  const handlePointerMove = (x: number, y: number, explode = false) => {
    const bounds = gl.domElement.getBoundingClientRect();
    const mouse = new Vector2(
      ((x - bounds.left) / bounds.width) * 2 - 1,
      -((y - bounds.top) / bounds.height) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene, true);

    if (intersects.length > 0) {
      const point = intersects[0].point.clone();
      const center = new Vector3(0, 0, 0);

      const dir = point.sub(center).normalize();
      const tiltX = -dir.z * MAX_TILT;
      const tiltZ = dir.x * MAX_TILT;

      if (explode) {
        // setExplodeCenter([dir.x, 0, dir.z]);
      }

      api.start({ rotation: [-tiltX, 0, -tiltZ] });
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onClick(e);
    setIsHolding(true);
    playPressSound();
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX, e.clientY, true);
  };

  const handlePointerMoveEvent = (e: React.PointerEvent) => {
    console.log(e);
    if (!isHolding) return;
    handlePointerMove(e.clientX, e.clientY);
  };

  // const savedSetExplodeCenter = React.useCallback(
  //   () => setExplodeCenter(null),
  //   [],
  // );

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
      ref={baseRef}
      rotation={[Math.PI / 4, Math.PI / 6, 0]} // базовый наклон
      position={[0.05, 0, 0]}
    >
      <a.group
        rotation={rotation as unknown as [number, number, number]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMoveEvent}
        onPointerUp={handlePointerUp}
        //onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <primitive object={scene} scale={0.02} />
      </a.group>
      {/* {explodeCenter && (
        <ExplodingCubes center={explodeCenter} onDone={savedSetExplodeCenter} />
      )} */}
    </group>
  );
}
