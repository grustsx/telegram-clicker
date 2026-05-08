import { BUILDING_SKILLS_MAP } from '../config/buildingSkillsMap';

export function getBuildingAssetLevel(
  unlockedSkillsIds: number[],
  buildingId: number,
): number {
  return BUILDING_SKILLS_MAP[buildingId].reduce((prev, currentId) => {
    return unlockedSkillsIds.includes(currentId) ? prev + 1 : prev;
  }, 0);
}
