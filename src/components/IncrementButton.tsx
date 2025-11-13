import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectActiveBoosterIds,
  selectActiveBoosters,
  selectCurrency,
  selectCurrencyPerClick,
  selectCurrencyPerSecond,
  selectUnlockedSkillsIds,
  selectUserId,
} from '../app/selectors';
import { sendClicks } from '../api';
import CakeScene from './CakeScene';
import { updateCurrencyByClick } from '../state/thunk';
import { getCPCTemporaryMultipler } from '../utils/getCurrencyPerClick';
import { startDialog } from '../state/dialogSlice';
import { getCurrencyByBooster } from '../utils/getCurrencyPerSecond';
import { formatDuration, formatLargeNumber } from '../utils/format';
import type { BoosterType } from '../types/types';
import { CLICK_BOOSTER_ID, CPS_BOOSTER_ID } from '../constants/const';
import GameText from '../elements/GameText';

type FloatingNumber = {
  color: string;
  id: number;
  x: number;
  y: number;
  value: string;
};

const INTERVAL_TIME = 2000;

let idCounter = 0;

const IncrementButton = () => {
  const [numbers, setNumbers] = React.useState<FloatingNumber[]>([]);

  const pendingClicks = React.useRef<number>(0);

  const dispatch = useAppDispatch();

  const currencyPerClick = useAppSelector(selectCurrencyPerClick);
  const cps = useAppSelector(selectCurrencyPerSecond);
  const currency = useAppSelector(selectCurrency);

  const activeBoosterIds = useAppSelector(selectActiveBoosterIds);
  const activeBoosters = useAppSelector(selectActiveBoosters);

  const unlockedSkillsIds = useAppSelector(selectUnlockedSkillsIds);

  const userId = useAppSelector(selectUserId);

  React.useEffect(() => {
    const fetchInterval = setInterval(() => {
      if (!userId) return;
      sendClicks(pendingClicks.current, userId);
      pendingClicks.current = 0;
    }, INTERVAL_TIME);

    return () => {
      clearInterval(fetchInterval);
      if (userId) sendClicks(pendingClicks.current, userId);
    };
  }, [dispatch, userId]);

  const showBoosterBonus = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      const newNumber = {
        color: 'text-tortik-white',
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        value: `+${formatLargeNumber(getCurrencyByBooster(cps))}`,
      };

      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, 2000);
    },
    [cps],
  );

  const handleClick = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      if (cps === 0) {
        switch (currency) {
          case 0:
            dispatch(
              startDialog([
                {
                  name: 'Павел',
                  description: 'Нам на счёт поступил наш первый торт!',
                  face: 'Pavlik-0',
                },
                {
                  name: 'Дэнис',
                  description: 'Так что же, теория верна?',
                  face: 'Den-normal',
                },
                {
                  name: 'Павел',
                  description: 'Надо будет построить лабораторию, чтобы понять',
                  face: 'Pavlik-0',
                },
              ]),
            );
            break;
          case 33:
            dispatch(
              startDialog([
                {
                  name: 'Санёк',
                  description: 'Неплохо идёт, но надо бы побольше, побольше!',
                  face: 'Sanek-0',
                },
                {
                  name: 'Никита',
                  description: 'Общага стоит 100',
                  face: 'Nikita-normal',
                },
                {
                  name: 'Егор',
                  description: 'Помощь нужна?',
                  face: 'Egor-0',
                },
                {
                  name: 'Санёк',
                  description: 'Куда бы его спровадить...',
                  face: 'Sanek-0',
                },
                {
                  name: 'Никита',
                  description:
                    'Егор, иди пока в море покупайся, мало ли там кто в беде!',
                  face: 'Nikita-normal',
                },
                {
                  name: 'Егор',
                  description: 'Понял!',
                  face: 'Egor-0',
                },
              ]),
            );
            break;
          case 99:
            dispatch(
              startDialog([
                {
                  name: 'Богдан',
                  face: 'Bogdan-normal',
                  description: 'Давайте скорее уже построим общагу!',
                },
                {
                  name: 'Андрей',
                  description: 'И колодец водки выкопаем!',
                  face: 'Andrey-0',
                },
                {
                  name: 'Надя',
                  description:
                    'Я отлично умею копать! У меня даже трактор есть! В Беларуси правда...',
                  face: 'Nadya-0',
                },
                {
                  name: 'Егор',
                  description:
                    'Андрей, го помогать морским обитателям! Я нашёл отличную бухту!',
                  face: 'Egor-0',
                },
                {
                  name: 'Андрей',
                  description:
                    'Сначала купим общагу, меня бесит восклицательный знак снизу!',
                  face: 'Andrey-0',
                },
              ]),
            );
            break;
        }
      }

      const multipler = getCPCTemporaryMultipler(
        unlockedSkillsIds,
        activeBoosterIds,
      );
      dispatch(updateCurrencyByClick(multipler));
      pendingClicks.current += multipler;

      const getColor = () => {
        if (multipler >= 500) return 'text-indigo-900';
        if (multipler >= 50) return 'text-tortik-orange';
        if (multipler >= 5) return 'text-tortik-yellow';
        return 'text-tortik-white';
      };

      const newNumber: FloatingNumber = {
        id: idCounter++,
        color: getColor(),
        x: e.clientX + Math.random() * -40,
        y: e.clientY + Math.random() * -40,
        value:
          Math.random() < 0.03
            ? 'Ай'
            : `+${formatLargeNumber(currencyPerClick * multipler)}`,
      };
      setNumbers((prev) => [...prev, newNumber]);

      setTimeout(() => {
        setNumbers((prev) => prev.filter((n) => n.id !== newNumber.id));
      }, 500);
    },
    [
      activeBoosterIds,
      cps,
      currency,
      currencyPerClick,
      dispatch,
      unlockedSkillsIds,
    ],
  );

  return (
    <>
      <CakeScene onClick={handleClick} showBoosterBonus={showBoosterBonus} />
      <div className={`flex flex-col gap-4 absolute z-50 left-4 top-24`}>
        {activeBoosters.map((booster) => (
          <BoosterInfo
            key={booster.id}
            booster={booster}
            icon={getBoosterIcon(booster.id)}
          />
        ))}
      </div>
      {numbers.map((n) => (
        <span
          key={n.id}
          className={`fixed pointer-events-none ${n.color} text-shadow-md text-xl font-semibold z-50`}
          style={{
            left: n.x,
            top: n.y,
          }}
        >
          {n.value}
        </span>
      ))}
    </>
  );
};

function getBoosterIcon(id: number): string {
  switch (id) {
    case CLICK_BOOSTER_ID:
      return 'skills/cursor.png';
    case CPS_BOOSTER_ID:
      return 'Home.png';
    default:
      return '';
  }
}

export default React.memo(IncrementButton);

function BoosterInfo({
  booster,
  icon,
}: {
  booster: BoosterType;
  icon?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      onPointerDown={() => setIsOpen(true)}
      onPointerUp={() => setIsOpen(false)}
      onPointerLeave={() => setIsOpen(false)}
      className="flex flex-row gap-4"
    >
      <CooldownSquare
        remain={booster.remainSeconds}
        cooldown={booster.ttlSeconds}
        icon={icon}
      />

      {isOpen && (
        <div className="flex flex-col">
          <GameText text={`${booster.name}`} size="xs" />
          <GameText
            text={`${formatDuration(booster.remainSeconds)}`}
            size="xs"
          />
        </div>
      )}
    </div>
  );
}

function CooldownSquare({
  remain,
  cooldown,
  icon,
}: {
  remain: number;
  cooldown: number;
  icon?: string;
}) {
  const progress = Math.min(1, Math.max(0, 1 - remain / cooldown));

  return (
    <div className="relative inline-grid bg-tortik-orange/90 border-tortik-yellow/90 border-2 place-items-center text-white font-bold text-lg w-12 h-12">
      {/* Затемняющий слой */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          width: `${progress * 100}%`,
          left: `${(1 - progress) * 100}%`,
        }}
      />
      {icon && (
        <img
          className="w-10 h-10"
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/${icon}`}
        />
      )}
    </div>
  );
}
