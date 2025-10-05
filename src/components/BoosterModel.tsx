import { useRef } from 'react';
import * as THREE from 'three';
import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { sendActivateBooster } from '../api';
import { activateBooster } from '../state/thunk';
import { selectUserId } from '../app/selectors';
import { removeBooster } from '../state/gameSlice';
import { CURRENCY_BOOSTER_ID } from '../constants/const';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';

const getRandomPhase = () => {
  return (2 * Math.random() - 1) * Math.PI;
};

function BoosterModel({
  id,
  showBoosterBonus,
}: {
  id: number;
  showBoosterBonus: (e: React.PointerEvent<Element>) => void;
}) {
  const dispatch = useAppDispatch();
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const openRef = useRef(false);

  const deviationRef = useRef(3);

  const gltf = useGLTF('/models/booster/scene.gltf');
  const clone = SkeletonUtils.clone(gltf.scene) as THREE.Group;
  const { actions } = useAnimations(gltf.animations, groupRef);

  const userId = useAppSelector(selectUserId);

  const handleBooster = (e: React.PointerEvent<Element>) => {
    dispatch(removeBooster(id));
    dispatch(activateBooster({ boosterId: id }));
    sendActivateBooster(id, userId);
    if (id !== CURRENCY_BOOSTER_ID) return;
    showBoosterBonus(e);
  };

  const despawnBooster = React.useCallback(
    (id: number) => {
      if (openRef.current) return;
      dispatch(removeBooster(id));
    },
    [dispatch],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (openRef.current) return;
    actions[gltf.animations[0].name]?.play();

    e.stopPropagation();
    openRef.current = true;
    setTimeout(() => handleBooster(e), 1000);
  };

  const randomPhase = +getRandomPhase();

  React.useEffect(() => {
    const timeout = setTimeout(() => despawnBooster(id), 60000);
    return () => {
      clearTimeout(timeout);
    };
  }, [despawnBooster, id]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta * (1 - +openRef.current * 0.9);

    deviationRef.current = Math.max(0, deviationRef.current - delta);

    groupRef.current.rotation.x -= 0.002;
    groupRef.current.rotation.y -= 0.002 + 0.07 * +openRef.current;
    groupRef.current.rotation.z -= 0.002;

    groupRef.current.position.x =
      0 +
      Math.sin(timeRef.current + Math.PI / 2) *
        0.05 *
        (1 + deviationRef.current);
    groupRef.current.position.y =
      0.95 + Math.sin(timeRef.current * 0.5 + randomPhase) * 0.06;
    groupRef.current.position.z =
      4.8 + Math.sin(timeRef.current * 0.3 + randomPhase) * 0.03;
  });

  return (
    <group
      ref={groupRef}
      scale={0.005}
      position={[0, 0.95, 4.8]}
      onPointerDown={handlePointerDown}
    >
      <primitive object={clone} />
    </group>
  );
}
export default React.memo(BoosterModel);
