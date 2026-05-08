import { GameText } from '@/shared';
import type { LineType } from '../model/types';

export function Line({
  item,
  userId,
  index,
}: {
  item: LineType;
  userId: number | undefined;
  index: number;
}) {
  return (
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
  );
}
