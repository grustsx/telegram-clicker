import {
  getLeaderBoard,
  sendUpdateScore,
  setSkillPoints,
} from '@/entities/game';
import { GameButton, GameText, useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';
import { LeaderboardModal } from './LeaderboardModal';
import {
  selectSkillPoints,
  selectUserBanned,
  selectUserId,
} from '@/entities/game/model/selectors';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = React.useState(null);
  const userId = useAppSelector(selectUserId);
  const skillPoints = useAppSelector(selectSkillPoints);
  const isBanned = useAppSelector(selectUserBanned);

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
              icon="skills/stsrc/widgets/leaderboard/ui/Leaderboard.tsxar.png"
              disabled={isBanned}
              text="ОТКРЫТЬ ЛИДЕРБОРД"
            />
            <GameButton
              theme="brown"
              disabled={!skillPoints || isBanned}
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
