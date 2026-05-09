export { type BuildingType } from './model/types';

export {
  incrementBuildingLevel,
  upgradeBuilding,
  setBuildings,
} from './model/buildingsSlice';

export { buyBuildingLevelThunk } from './model/buyBuildingLevelThunk';

export { sendUpgradeBuilding } from './api/sendUpgradeBuilding';

export { getBuildingLevel } from './lib/getBuildingLevel';
export { getBuildingAssetLevel } from './lib/getBuildingAssetLevel';
export { getIsBuildingShowed } from './lib/getIsBuildingShowed';
export { getPrice } from './lib/getPrice';

export { BUILDING_SKILLS_MAP } from './config/buildingSkillsMap';

export { STONES_SPELL_ID, AMBAR_ID, LAB_ID, VODKA_WELL_ID } from './config/ids';
export { BUILDINGS_INFO } from './config/buildingsInfo';

export {
  selectAllBuildings,
  selectBuildingById,
  selectBuildingIds,
  selectBuildingLevelsSum,
} from './model/selectors';
