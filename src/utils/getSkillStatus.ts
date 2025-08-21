import type { SkillStatusType } from '../types/types';

export default function getSkillStatus(
  skill: { id: number; requires?: number[]; hidden?: boolean },
  unlockedSkills: number[],
): SkillStatusType {
  if (skill.hidden) return 'hidden';

  if (unlockedSkills.includes(skill.id)) return 'unlocked';

  const available = skill.requires?.every((id) => unlockedSkills.includes(id));

  if (available) return 'available';

  const mysterious = skill.requires?.some((id) => unlockedSkills.includes(id));

  if (mysterious) return 'mysterious';

  return 'hidden';
}
