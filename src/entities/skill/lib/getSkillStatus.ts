import { type BuildingType, getBuildingLevel } from '@/entities/building';
import type { SkillStatusType } from '../model/types';

export function getSkillStatus(
  skill: { id: number; requires?: number[]; hidden?: boolean },
  unlockedSkills: number[],
  buildings: BuildingType[],
): SkillStatusType {
  if (skill.hidden) return 'hidden';

  if (unlockedSkills.includes(skill.id)) return 'unlocked';

  const available = skill.requires?.every((id) => unlockedSkills.includes(id));

  if (
    available &&
    ((skill.id === 14 && !getBuildingLevel(2, buildings)) ||
      (skill.id === 15 && !getBuildingLevel(3, buildings)) ||
      (skill.id === 16 && !getBuildingLevel(4, buildings)) ||
      (skill.id === 17 && !getBuildingLevel(5, buildings)) ||
      (skill.id === 18 && !getBuildingLevel(6, buildings)))
  )
    return 'mysterious';

  if (available) return 'available';

  const mysterious = skill.requires?.some((id) => unlockedSkills.includes(id));

  if (mysterious) return 'mysterious';

  return 'hidden';
}
