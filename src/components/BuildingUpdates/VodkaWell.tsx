import { useAppSelector } from '../../app/hooks';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
} from '../../app/selectors';
import GameText from '../../elements/GameText';
import { selectBuildingById } from '../../state/buildingsSlice';
import { getPrice } from '../../utils';
import { formatLargeNumber } from '../../utils/format';

const VODKA_WELL_ID = 7;

export default function VodkaWell({
  upgradeVodkaWell,
}: {
  upgradeVodkaWell: (id: number) => void;
}) {
  const isCount = true;
  const vodkaWll = useAppSelector((state) =>
    selectBuildingById(state, VODKA_WELL_ID),
  );
  const { level: dormLevel } = useAppSelector((state) =>
    selectBuildingById(state, 1),
  );

  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const assetLevels = useAppSelector(selectAssetLevels);
  const { level } = vodkaWll;
  const currency = useAppSelector(selectCurrency);
  const price = getPrice(
    vodkaWll.basePrice,
    vodkaWll.multiplier,
    vodkaWll.level,
    unlockedSkills,
  );
  const isEnable = currency >= price;

  return (
    <div
      className={`flex flex-col gap-2 pixel-border--${isCount ? 'w' : 'gr'} justify-between items-center`}
    >
      <div className="flex flex-col gap-1 w-full">
        <GameText theme={isCount ? 'dark' : 'light'} text="Колодец с водкой" />
        <GameText
          size="sm"
          theme={isCount ? 'dark' : 'light'}
          text={'Стоимость: ' + formatLargeNumber(price)}
        />
        {assetLevels[VODKA_WELL_ID] !== 1 && (
          <>
            <GameText
              size="sm"
              borderStyle={isCount ? 'gr' : 'w'}
              theme={isCount ? 'light' : 'dark'}
              text={`lvl ${level} -> lvl ${level + 1}`}
            />
            <GameText
              size="sm"
              theme={isCount ? 'dark' : 'light'}
              text={`${formatLargeNumber(+level * +dormLevel)}/сек -> ${formatLargeNumber((+level + 1) * +dormLevel)}/сек`}
            />
          </>
        )}

        <button
          className={`w-full border-white border-2 text-white p-2 ${isEnable ? 'bg-emerald-600' : 'bg-gray-400'}`}
          onClick={() => upgradeVodkaWell(VODKA_WELL_ID)}
          disabled={!isEnable}
        >
          <GameText size="sm" text="КУПИТЬ" />
        </button>
      </div>
    </div>
  );
}
