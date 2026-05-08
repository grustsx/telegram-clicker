import { getPrice, VODKA_WELL_ID } from '@/entities/building';
import { selectBuildingById } from '@/entities/building/model/selectors';
import { getBuildingIncome } from '@/entities/game';
import {
  selectAssetLevels,
  selectCurrency,
} from '@/entities/game/model/selectors';
import { selectUnlockedSkillsIds } from '@/entities/skill/model/selectors';
import {
  formatLargeNumber,
  GameButton,
  GameText,
  useAppSelector,
} from '@/shared';

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
              text={`${formatLargeNumber(getBuildingIncome(unlockedSkills, +level, Math.pow(+dormLevel, 1 + 0.6 * skill(28)), VODKA_WELL_ID))}/сек -> ${formatLargeNumber(getBuildingIncome(unlockedSkills, +level + 1, Math.pow(+dormLevel, 1 + 0.6 * skill(28)), VODKA_WELL_ID))}/сек`}
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
