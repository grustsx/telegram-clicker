import React from 'react';
import GameText from '../../elements/GameText';
import { getLeaderBoard, sendUpdateScore } from '../../api';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSkillPoints, selectUserId } from '../../app/selectors';
import { setSkillPoints } from '../../state/gameSlice';
import GameButton from '../../elements/GameButton';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = React.useState(null);
  const userId = useAppSelector(selectUserId);
  const skillPoints = useAppSelector(selectSkillPoints);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const { leaderboard } = await getLeaderBoard();
      setLeaderboard(leaderboard);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      await sendUpdateScore(userId);
      dispatch(setSkillPoints(0));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {leaderboard && (
        <LeaderboardModal
          leaderboard={leaderboard}
          onClose={() => setLeaderboard(null)}
        />
      )}
      <div
        className={`flex flex-col gap-4 pixel-border--gr justify-center items-center p-4`}
      >
        {isLoading ? (
          <GameText
            className="min-h-24 flex items-center justify-center"
            size="lg"
            text="Загрузка..."
          />
        ) : (
          <>
            <GameButton
              theme="blue"
              onClick={handleClick}
              icon="skills/star.png"
              text="ОТКРЫТЬ ЛИДЕРБОРД"
            />
            <GameButton
              theme="brown"
              disabled={!skillPoints}
              onClick={handleUpgrade}
              text={
                skillPoints ? `ВЛИТЬ ${skillPoints} ОУ В РЕЙТИНГ` : 'НЕТ ОУ'
              }
            />
          </>
        )}
      </div>
    </>
  );
}

function LeaderboardModal({
  leaderboard,
  onClose,
}: {
  leaderboard: { id: string; score: number; name: string | null }[];
  onClose: () => void;
}) {
  const userId = useAppSelector(selectUserId);
  const root = document.getElementById('leaderboard-root');
  if (!root) return null;

  return createPortal(
    <div className="absolute z-5000 inset-0 p-8 flex flex-col items-center gap-2 bg-emerald-950/95 justify-center">
      <div className="p-2 border-2 shadow-lg w-full flex flex-col gap-2 overflow-scroll">
        {leaderboard
          .filter((item) => !!item.id)
          .filter((item) => !!item.score)
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-row justify-between w-full ${userId === +item.id ? 'text-amber-300' : 'text-white'}`}
            >
              <GameText
                className={`${userId === +item.id ? 'text-amber-300' : 'text-white'}`}
                size="sm"
                text={`#${index + 1}`}
              />
              <GameText
                className={`${userId === +item.id ? 'text-amber-300' : 'text-white'}`}
                size="sm"
                text={(item.name && item.name.trim()) || item.id}
              />
              <GameText
                className={`${userId === +item.id ? 'text-amber-300' : 'text-white'}`}
                size="sm"
                text={item.score.toString()}
              />
            </div>
          ))}
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

export default React.memo(Leaderboard);
