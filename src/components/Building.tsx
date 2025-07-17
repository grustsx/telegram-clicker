import { sendCastSpell, sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectSpellById,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { buyBuildingLevel, castSpell } from '../state/thunk';
import type { BuildingType } from '../types/types';
import { formatLargeNumber } from '../utils/format';
import { getPrice } from '../utils/getPrice';

const Building = ({
  building,
  disabled,
  showed,
}: {
  building: BuildingType;
  disabled: boolean;
  showed: boolean;
}) => {
  const { id, name, level, incomePerSecond, upgraded } = building;
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);

  const sugarSpell = useAppSelector((state) => selectSpellById(state, 1));
  if (!sugarSpell) return;
  const isSugarSpellAbailable = sugarSpell.remainSeconds <= 0;
  const handleClick = () => {
    if (disabled) return;

    dispatch(buyBuildingLevel(id));
    sendUpgradeBuilding(id, userId);
  };

  const handleCastUpdate = () => {
    if (upgraded) return;

    dispatch(castSpell({ spellId: 1, spellPayload: { buildingId: id } }));
    sendCastSpell(1, userId, { buildingId: id });
  };

  return (
    showed && (
      <div
        className={`p-4 flex flex-row justify-between items-center text-lg text-shadow-lg shadow-md cursor-pointer select-none ${disabled ? 'bg-black/5 text-black/50' : upgraded ? 'bg-indigo-300/5 text-tortik-yellow/50' : 'bg-white/5 text-tortik-white'} hover:bg-tortik-orange/50`}
        onClick={handleClick}
      >
        <div className="w-1/6">{name}</div>
        <div className="w-1/6">
          {formatLargeNumber(
            getPrice(
              building.basePrice,
              building.multiplier,
              building.level,
              unlockedSkills,
            ),
          ) + ' денег'}
        </div>
        <div className="w-1/6">{level + ' lvl'}</div>
        <div className="w-1/6">
          {'доход: ' + formatLargeNumber(+level * +incomePerSecond)}
        </div>
        <div className="w-1/6">
          <button onClick={handleCastUpdate}>
            {isSugarSpellAbailable ? 'UPD' : 'NO'}
          </button>
        </div>
      </div>
    )
  );
};
export default Building;
