import React, { type MouseEventHandler } from 'react';
import GameText from '../elements/GameText';

function ProgressBar({
  currentValue,
  maxValue,
  text,
  onPress,
}: {
  locked?: boolean;
  currentValue: number;
  maxValue: number;
  text?: string;
  onPress?: MouseEventHandler<HTMLDivElement>;
}) {
  const getColor = () => {
    if (currentValue === maxValue) return 'bg-emerald-500';
    if (maxValue / 2 < currentValue) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className="w-[30px] relative border-2 bg-gray-700 z-10 h-5 overflow-hidden box-content"
      style={{ borderRadius: 0 }}
    >
      <div
        onClick={onPress}
        className={`${getColor()} h-5 transition-all duration-300`}
        style={{ width: `${(currentValue / maxValue) * 100}%` }}
      />
      {!!text && (
        <GameText
          size="sm"
          text={text}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        />
      )}
    </div>
  );
}

export default React.memo(ProgressBar);
