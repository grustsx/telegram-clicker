import { a, useSprings } from '@react-spring/three';
import React from 'react';

const PARTICLE_COUNT = 6;

function FallingParticles({
  center,
  onDone,
}: {
  center: [number, number, number];
  onDone: () => void;
}) {
  // Генерация начальных позиций для частиц
  const initialPositions = Array.from({ length: PARTICLE_COUNT }, () => [
    center[0] + (Math.random() - 0.5) * 0.5,
    center[1] + (Math.random() - 0.5) * 0.5,
    center[2] + (Math.random() - 0.5) * 0.1,
  ]);

  const [springs] = useSprings(PARTICLE_COUNT, (i) => {
    const pos = initialPositions[i];
    return {
      from: { position: pos, opacity: 1 },
      to: async (next) => {
        await next({
          position: [pos[0], pos[1] - 1 - Math.random(), pos[2]],
          opacity: 1,
          config: { duration: 200000 },
        });
      },
      onRest: () => {
        if (i === PARTICLE_COUNT - 1) onDone(); // вызывать onDone один раз после последней частицы
      },
    };
  });

  return (
    <>
      {springs.map(({ position, opacity }, i) => (
        <a.mesh key={i} position={position}>
          <planeGeometry args={[0.05, 0.05]} />
          <a.meshStandardMaterial transparent opacity={opacity} color="brown" />
        </a.mesh>
      ))}
    </>
  );
}
export default React.memo(FallingParticles);
