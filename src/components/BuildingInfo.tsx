import { sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { BUILDINGS_INFO } from '../constants/buildingsInfo';
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

  const { id, name, level, incomePerSecond } = building;
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

  return (
    <div className="fixed flex gap-1 flex-col p-0 bottom-0 w-full pixel-border--dt text-tortik-white cursor-pointer z-60">
      <button
        className="border-white border-2 absolute top-[-16px] right-0"
        onClick={onClose}
      >
        <img
          className="bg-red-900"
          style={{
            imageRendering: 'pixelated',
            width: 'calc(4.6875vw)',
            height: 'calc(4.6875vw)',
          }}
          src={`/assets/icons/skills/cross.png`}
        />
      </button>
      <div className="flex gap-1 pixel-border--lt justify-between">
        <div className="flex flex-col grow">
          <GameText
            className="text-shadow-xs text-shadow-[#812a05]"
            text={name}
            size="lg"
            borderStyle="dt"
          />
          <div className="flex grow items-center self-center">
            <GameText
              className="text-[#812a05] text-shadow-xs text-shadow-[#ffdecf]"
              text={BUILDINGS_INFO[id][assetLevels[id]]}
            />
          </div>
        </div>
        <div className="flex-col">
          <img
            className="pixel-border--gr"
            style={{
              imageRendering: 'pixelated',
              minWidth: 'calc(18.75vw)',
              width: 'calc(18.75vw)',
              height: 'calc(18.75vw)',
            }}
            src={`/assets/icons/skills/star.png`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 pixel-border--w justify-between items-center text-[#3c4045] text-shadow-xs text-shadow-[#ddebfc]">
        <div className="flex flex-col gap-1 w-full">
          <GameText
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

          <GameText borderStyle="gr" text={`lvl ${level} -> ${level + 1}`} />
          <GameText
            text={`${formatLargeNumber(+level * +incomePerSecond)} -> ${formatLargeNumber((+level + 1) * +incomePerSecond)}/сек`}
          />
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
