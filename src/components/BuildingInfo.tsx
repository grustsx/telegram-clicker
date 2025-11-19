import React from 'react';
import { sendUpgradeBuilding } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAssetLevels,
  selectCurrency,
  selectUnlockedSkillsIds,
  selectUserBanned,
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
import Storage from './BuildingUpdates/Storage';
import type { GameMessageType } from '../types/types';
import MysteryUpgrade from './BuildingUpdates/MysteryUpgrade';
import { getBuildingIncome } from '../utils/getCurrencyPerSecond';
import { startDialog } from '../state/dialogSlice';
import Leaderboard from './BuildingUpdates/Leaderboard';
import Notes from './BuildingUpdates/Notes';
import GameButton from '../elements/GameButton';

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
  const [isUp, setIsUp] = React.useState(false);

  const assetLevels = useAppSelector(selectAssetLevels);

  const userId = useAppSelector(selectUserId);
  const isBanned = useAppSelector(selectUserBanned);
  const unlockedSkills = useAppSelector(selectUnlockedSkillsIds);
  const sugarSpell = useAppSelector((state) => selectSpellById(state, 1));
  const currency = useAppSelector(selectCurrency);

  const { id, level, incomePerSecond } = building;
  const buildingInfo = BUILDINGS_INFO[id][assetLevels[id]];
  const [eventMessages, setEventMessages] = React.useState<
    GameMessageType[] | null
  >(null);

  const handleClose = () => {
    setIsUp(false);
    setTimeout(() => onClose(), 300);
  };

  React.useEffect(() => {
    setIsUp(true);
    return () => {
      setEventMessages(null);
    };
  }, [buildingId]);

  if (!sugarSpell) return;
  const price = getPrice(building, unlockedSkills);
  const isEnable = currency >= price;

  const handleClick = (buildingId: number) => {
    if (level === 0) {
      switch (buildingId) {
        case 1:
          dispatch(
            startDialog([
              {
                name: 'Богдан',
                face: 'Bogdan-smile',
                description: 'Ура!!!',
              },
              {
                name: 'Павел',
                face: 'Pavlik-0',
                description: 'Теперь у нас 1 ОУ',
              },
              {
                name: 'Андрей',
                face: 'Andrey-0',
                description:
                  'Восклицательный знак всё ещё внизу, как это раздражает!',
              },
            ]),
          );
      }
    }
    dispatch(buyBuildingLevel(buildingId));
    sendUpgradeBuilding(buildingId, userId);
  };

  function showEventMessages(eventMessages: GameMessageType[], time = 3000) {
    setEventMessages(eventMessages);
    setTimeout(() => setEventMessages(null), time);
  }

  const renderUpgade = (id: number) => {
    switch (id) {
      case 1:
        return unlockedSkills.includes(27) ? (
          <VodkaWell upgradeVodkaWell={handleClick} />
        ) : (
          <MysteryUpgrade />
        );
      case 2:
        return unlockedSkills.includes(30) ? (
          <TortikSpells showEventMessages={showEventMessages} />
        ) : (
          <MysteryUpgrade />
        );
      case 3:
        return <Storage />;
      case 4:
        return unlockedSkills.includes(36) ? <Stones /> : <MysteryUpgrade />;
      case 5:
        return <Leaderboard />;
      case 6:
        return <Notes />;
      default:
    }
  };

  const isCount: boolean = buildingInfo.messages
    ? !!(buildingInfo.messages.length % 2)
    : true;

  return (
    <div
      onClick={handleClose}
      className={`fixed z-2000 inset-0 flex items-center transition-opacity duration-300 justify-center bg-black/50
          ${isUp ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`overflow-scroll fixed max-h-full p-0 bottom-0 w-full
        pixel-border--dt z-60 transform transition-transform duration-300
        ${isUp ? 'translate-y-0' : 'translate-y-200'}`}
      >
        <div className="overflow-scroll flex flex-col gap-1">
          <GameButton
            className="absolute top-0 right-0 z-800"
            onClick={handleClose}
            size="small"
            theme="red"
            icon="skills/cross.png"
          />

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
                  description={
                    isBanned
                      ? 'Мы все глубоко разочарованы тобой'
                      : message.description
                  }
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
                    text={`${formatLargeNumber(getBuildingIncome(unlockedSkills, level, incomePerSecond, id))}/сек -> ${formatLargeNumber(getBuildingIncome(unlockedSkills, level + 1, incomePerSecond, id))}/сек`}
                  />
                </>
              )}
            </div>
            <GameButton
              text="КУПИТЬ"
              onClick={() => handleClick(id)}
              disabled={!isEnable}
            />
          </div>
          {level > 0 && renderUpgade(id)}
        </div>
      </div>
    </div>
  );
};
export default BuildingInfo;
