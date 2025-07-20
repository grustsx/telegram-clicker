import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUnlockedSkillsIds } from '../app/selectors';
import { SKILLS_INFO } from '../constants/skillsInfo';

export default function useSkillsLayoutSize(): {
  width: number;
  height: number;
} {
  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);

  const layoutSize = useMemo(() => {
    const positions = unlockedSkillsIds.map(
      (skillId) => SKILLS_INFO[skillId].position,
    );

    if (positions.length === 0) return { width: 0, height: 0 };

    const minX = Math.min(...positions.map((p) => p.x));
    const maxX = Math.max(...positions.map((p) => p.x));

    const minY = Math.min(...positions.map((p) => p.y));
    const maxY = Math.max(...positions.map((p) => p.y));

    console.log(maxX - minX, maxY - minY);

    const width = maxX - minX + window.innerWidth * 2;
    const height = maxY - minY + window.innerHeight * 2;

    return { width, height };
  }, [unlockedSkillsIds]);

  return layoutSize;
}
