import { GameButton, GameText, useAppSelector } from '@/shared';
import type { LineType } from '../model/types';
import { TORT_IDS } from '../config/torts';
import { createPortal } from 'react-dom';
import { Line } from './Line';
import { selectUserId } from '@/entities/game';

export function LeaderboardModal({
  leaderboard,
  onClose,
}: {
  leaderboard: LineType[];
  onClose: () => void;
}) {
  const userId = useAppSelector(selectUserId);
  const root = document.getElementById('leaderboard-root');
  if (!root) return null;

  const isTort = TORT_IDS.includes(userId || 0);
  const torts: LineType[] = [];

  return createPortal(
    <div className="absolute z-5000 inset-0 p-8 flex flex-col items-center gap-2 bg-emerald-950/95 justify-center">
      <div className="p-2 border-2 shadow-lg w-full flex flex-col gap-2 overflow-scroll">
        {leaderboard
          .filter((item) => !!item.id)
          .filter((item) => !!item.score)
          .filter((item) => {
            if (TORT_IDS.includes(+item.id)) {
              torts.push(item);
              return false;
            }
            return true;
          })
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <Line item={item} userId={userId} index={index} key={item.id} />
          ))}

        {isTort && (
          <>
            <GameText text="Торты" />
            {torts
              .sort((a, b) => b.score - a.score)
              .map((item, index) => (
                <Line item={item} userId={userId} index={index} key={item.id} />
              ))}
          </>
        )}
      </div>
      <GameButton
        theme="red"
        onClick={onClose}
        text="Закрыть"
        icon="skills/cross.png"
      />
    </div>,
    root,
  );
}
