import { getIsBuildingShowed } from '.';
import type { BuildingType, SkillStatusType } from '../types/types';

export default function getSkillStatus(
  skill: { id: number; requires?: number[]; hidden?: boolean },
  unlockedSkills: number[],
  buildings: BuildingType[],
): SkillStatusType {
  if (skill.hidden) return 'hidden';

  if (unlockedSkills.includes(skill.id)) return 'unlocked';

  const available = skill.requires?.every((id) => unlockedSkills.includes(id));

  if (
    available &&
    ((skill.id === 14 && !getIsBuildingShowed(2, unlockedSkills, buildings)) ||
      (skill.id === 15 && !getIsBuildingShowed(3, unlockedSkills, buildings)) ||
      (skill.id === 16 && !getIsBuildingShowed(4, unlockedSkills, buildings)) ||
      (skill.id === 17 && !getIsBuildingShowed(5, unlockedSkills, buildings)) ||
      (skill.id === 18 && !getIsBuildingShowed(6, unlockedSkills, buildings)))
  )
    return 'mysterious';

  if (available) return 'available';

  const mysterious = skill.requires?.some((id) => unlockedSkills.includes(id));

  if (mysterious) return 'mysterious';

  return 'hidden';
}
