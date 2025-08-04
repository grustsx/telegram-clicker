import { useAppSelector } from '../../app/hooks';
import {
  selectAssetLevels,
  selectUnlockedSkillsIds,
} from '../../app/selectors';
import GameText from '../../elements/GameText';
import { selectBuildingById } from '../../state/buildingsSlice';
import { getPrice } from '../../utils';
import { formatLargeNumber } from '../../utils/format';

export default function VodkaWell() {
  const isCount = true;
  const vodkaWll = useAppSelector((state) => selectBuildingById(state, 7));
  const { level: dormLevel } = useAppSelector((state) =>
    selectBuildingById(state, 1),
  );

  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const assetLevels = useAppSelector(selectAssetLevels);
  const { level } = vodkaWll;

  return (
    <div
      className={`flex flex-col gap-2 pixel-border--${isCount ? 'w' : 'gr'} justify-between items-center`}
    >
      <div className="flex flex-col gap-1 w-full">
        <GameText
          theme={isCount ? 'dark' : 'light'}
          text={
            'Стоимость: ' +
            formatLargeNumber(
              getPrice(
                vodkaWll.basePrice,
                vodkaWll.multiplier,
                vodkaWll.level,
                unlockedSkills,
              ),
            )
          }
        />
        {assetLevels[7] !== 1 && (
          <>
            <GameText
              borderStyle={isCount ? 'gr' : 'w'}
              theme={isCount ? 'light' : 'dark'}
              text={`lvl ${level} -> lvl ${level + 1}`}
            />
            <GameText
              theme={isCount ? 'dark' : 'light'}
              text={`${formatLargeNumber(+level * +dormLevel)}/сек -> ${formatLargeNumber((+level + 1) * +dormLevel)}/сек`}
            />
          </>
        )}
      </div>
    </div>
  );
}
