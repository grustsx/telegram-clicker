import { useAppSelector } from '../../app/hooks';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
} from '../../app/selectors';
import { VODKA_WELL_ID } from '../../constants/const';
import GameButton from '../../elements/GameButton';
import GameText from '../../elements/GameText';
import { selectBuildingById } from '../../state/buildingsSlice';
import { getPrice } from '../../utils';
import { formatLargeNumber } from '../../utils/format';
import { getBuildingIncome } from '../../utils/getCurrencyPerSecond';

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
  const price = getPrice(vodkaWll, unlockedSkills);

  const skill = (id: number) => {
    return unlockedSkills.includes(id) ? 1 : 0;
  };

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
              text={`${formatLargeNumber(getBuildingIncome(unlockedSkills, +level, Math.pow(+dormLevel, 1 + skill(28)), VODKA_WELL_ID))}/сек -> ${formatLargeNumber(getBuildingIncome(unlockedSkills, +level, Math.pow(+dormLevel, 1 + skill(28)), VODKA_WELL_ID))}/сек`}
            />
          </>
        )}
        <GameButton
          onClick={() => upgradeVodkaWell(VODKA_WELL_ID)}
          text="КУПИТЬ"
          disabled={!isEnable}
        />
      </div>
    </div>
  );
}
