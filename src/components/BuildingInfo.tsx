import React from 'react';
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
import Stones from './BuildingUpdates/Stones';
import TortikSpells from './BuildingUpdates/TortikSpells';
import VodkaWell from './BuildingUpdates/VodkaWell';
import type { GameMessageType } from '../types/types';

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

  const { id, level, incomePerSecond } = building;
  const buildingInfo = BUILDINGS_INFO[id][assetLevels[id]];
  const [eventMessages, setEventMessages] = React.useState<
    GameMessageType[] | null
  >(null);

  React.useEffect(() => {
    return () => {
      setEventMessages(null);
    };
  }, [buildingId]);

  if (!sugarSpell) return;
  const price = getPrice(
    building.basePrice,
    building.multiplier,
    building.level,
    unlockedSkills,
  );
  const isEnable = currency >= price;

  const handleClick = (buildingId: number) => {
    dispatch(buyBuildingLevel(buildingId));
    sendUpgradeBuilding(buildingId, userId);
  };

  function showEventMessages(eventMessages: GameMessageType[], time = 3000) {
    setEventMessages(eventMessages);
    setTimeout(() => setEventMessages(null), time);
  }

  const getUpgade = (id: number) => {
    switch (id) {
      case 1:
        return <VodkaWell upgradeVodkaWell={handleClick} />;
      case 2:
        return <TortikSpells showEventMessages={showEventMessages} />;
      case 4:
        return <Stones />;
      default:
        return null;
    }
  };

  const isCount: boolean = buildingInfo.messages
    ? !!(buildingInfo.messages.length % 2)
    : true;

  return (
    <div className="fixed max-h-full flex gap-1 flex-col p-0 bottom-0 w-full pixel-border--dt cursor-pointer z-60">
      <div className="overflow-scroll flex flex-col gap-1">
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
        <GameText
          borderStyle="lt"
          size="lg"
          theme="brown"
          text={buildingInfo.title.toUpperCase()}
        />
        <GameText size="sm" text={buildingInfo.description} />

        {eventMessages == null
          ? buildingInfo.messages?.map((message, index) => (
              <GameMessage
                key={message.description + message.name}
                reversed={!!(index % 2)}
                theme={index % 2 ? 'light' : 'dark'}
                {...message}
              />
            ))
          : eventMessages.map((message, index) => (
              <GameMessage
                key={message.description + message.name}
                reversed={!!(index % 2)}
                theme={index % 2 ? 'light' : 'dark'}
                {...message}
              />
            ))}

        <div
          className={`flex flex-col gap-2 pixel-border--${isCount ? 'w' : 'gr'} justify-between items-center`}
        >
          <div className="flex flex-col gap-1 w-full">
            <GameText
              size="sm"
              theme={isCount ? 'dark' : 'light'}
              text={'Стоимость: ' + formatLargeNumber(price)}
            />
            {assetLevels[id] !== 1 && (
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
                  text={`${formatLargeNumber(+level * +incomePerSecond)}/сек -> ${formatLargeNumber((+level + 1) * +incomePerSecond)}/сек`}
                />
              </>
            )}
          </div>

          <button
            className={`w-full border-white border-2 text-white p-2 ${isEnable ? 'bg-emerald-600' : 'bg-gray-400'}`}
            onClick={() => handleClick(id)}
            disabled={!isEnable}
          >
            <GameText size="sm" text="КУПИТЬ" />
          </button>
        </div>
        {getUpgade(id)}
      </div>
    </div>
  );
};
export default BuildingInfo;
