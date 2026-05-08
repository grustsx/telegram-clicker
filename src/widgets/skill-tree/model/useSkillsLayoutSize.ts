import { useMemo } from 'react';

import { SKILLS_INFO } from '@/entities/skill';

import { useAppSelector } from '@/shared';
import { selectVisibleSkillsIds } from '@/entities/game/model/selectors';

export default function useSkillsLayoutSize(): {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
} {
  const visibleSkillsIds = useAppSelector(selectVisibleSkillsIds);

  const layoutSize = useMemo(() => {
    const positions = visibleSkillsIds
      .filter((skillId) => !!SKILLS_INFO[skillId]?.position)
      .map((skillId) => SKILLS_INFO[skillId].position);

    if (positions.length === 0)
      return { width: 0, height: 0, centerX: 0, centerY: 0 };

    const minX = Math.min(...positions.map((p) => p.x));
    const maxX = Math.max(...positions.map((p) => p.x));

    const minY = Math.min(...positions.map((p) => p.y));
    const maxY = Math.max(...positions.map((p) => p.y));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const width = maxX - minX + window.innerWidth * 1.5;
    const height = maxY - minY + window.innerHeight * 1.5;

    return { width, height, centerX, centerY };
  }, [visibleSkillsIds]);

  return layoutSize;
}
