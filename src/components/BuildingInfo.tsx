import { sendCastSpell, sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { BUILDINGS_INFO } from '../constants/buildingsInfo';
import { selectBuildingById } from '../state/buildingsSlice';
import { selectSpellById } from '../state/spellsSlice';
import { buyBuildingLevel, castSpell } from '../state/thunk';
import { formatLargeNumber } from '../utils/format';
import { getPrice } from '../utils/getPrice';

const BuildingInfo = ({
  buildingId,
  onClose,
}: {
  buildingId: number;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const building = useAppSelector((state) =>
    selectBuildingById(state, buildingId),
  );

  const assetLevels = useAppSelector(selectAssetLevels);

  const userId = useAppSelector(selectUserId);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const sugarSpell = useAppSelector((state) => selectSpellById(state, 1));
  const currency = useAppSelector(selectCurrency);
  if (!sugarSpell) return;

  const { id, name, level, incomePerSecond, upgraded } = building;
  const isSugarSpellAbailable = sugarSpell.remainSeconds <= 0;
  const price = getPrice(
    building.basePrice,
    building.multiplier,
    building.level,
    unlockedSkills,
  );
  const isEnable = currency >= price;

  const handleClick = () => {
    dispatch(buyBuildingLevel(id));
    sendUpgradeBuilding(id, userId);
  };

  const handleCastUpdate = () => {
    if (upgraded) return;

    dispatch(castSpell({ spellId: 1, spellPayload: { buildingId: id } }));
    sendCastSpell(1, userId, { buildingId: id });
  };

  return (
    <div className="fixed gap-1 flex-col p-8 bottom-0 w-full bg-slate-700 text-tortik-white cursor-pointer z-60">
      <button className="bg-red-900 absolute top-4 right-4" onClick={onClose}>
        x
      </button>
      <div>{name}</div>
      <div>{BUILDINGS_INFO[id][assetLevels[id]]}</div>
      <div>
        {'Улучшение стоит' +
          formatLargeNumber(
            getPrice(
              building.basePrice,
              building.multiplier,
              building.level,
              unlockedSkills,
            ),
          ) +
          ' денег'}
      </div>
      <div>{level + ' lvl'}</div>
      <div>
        {'Приносит в секунду: ' + formatLargeNumber(+level * +incomePerSecond)}
      </div>
      <button
        className={`flex p-1 ${isEnable ? 'bg-emerald-600' : 'bg-gray-400'}`}
        onClick={handleClick}
        disabled={!isEnable}
      >
        {'Купить'}
      </button>

      <button
        className={`flex p-1 ${isSugarSpellAbailable ? 'bg-emerald-600' : 'bg-gray-400'}`}
        onClick={handleCastUpdate}
        disabled={!isSugarSpellAbailable}
      >
        {isSugarSpellAbailable ? 'UPD' : 'NO'}
      </button>
    </div>
  );
};
export default BuildingInfo;
