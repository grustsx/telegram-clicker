import { sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { BUILDINGS_INFO } from '../constants/buildingsInfo';
import GameMessage from '../elements/GameMessage';
import GameText from '../elements/GameText';
import { selectBuildingById } from '../state/buildingsSlice';
import { selectSpellById } from '../state/spellsSlice';
import { buyBuildingLevel } from '../state/thunk';
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

  const { id, level, incomePerSecond } = building;
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

  const buildingInfo = BUILDINGS_INFO[id][assetLevels[id]];

  return (
    <div className="fixed flex gap-1 flex-col p-0 bottom-0 w-full pixel-border--dt  cursor-pointer z-60">
      <button
        className="border-white border-2 absolute top-[-16px] right-4"
        onClick={onClose}
      >
        <img
          className="bg-red-900"
          style={{
            imageRendering: 'pixelated',
            width: 'calc(6.25vw)',
            height: 'calc(6.25vw)',
          }}
          src={`/assets/icons/skills/cross.png`}
        />
      </button>
      <GameText size="lg" text={buildingInfo.title} />
      <GameText size="md" text={buildingInfo.description} />

      {buildingInfo.message && <GameMessage {...buildingInfo.message} />}

      <div className="flex flex-col gap-2 pixel-border--w justify-between items-center">
        <div className="flex flex-col gap-1 w-full">
          <GameText
            theme="dark"
            text={
              'Стоимость: ' +
              formatLargeNumber(
                getPrice(
                  building.basePrice,
                  building.multiplier,
                  building.level,
                  unlockedSkills,
                ),
              )
            }
          />
          {assetLevels[id] !== 1 && (
            <>
              <GameText
                theme="dark"
                borderStyle="gr"
                text={`lvl ${level} -> ${level + 1}`}
              />
              <GameText
                theme="dark"
                text={`${formatLargeNumber(+level * +incomePerSecond)} -> ${formatLargeNumber((+level + 1) * +incomePerSecond)}/сек`}
              />
            </>
          )}
        </div>

        <button
          className={`w-full border-white border-2 text-white p-2 ${isEnable ? 'bg-emerald-600' : 'bg-gray-400'}`}
          onClick={handleClick}
          disabled={!isEnable}
        >
          <GameText text={'Купить'} size="lg" />
        </button>
      </div>
    </div>
  );
};
export default BuildingInfo;
