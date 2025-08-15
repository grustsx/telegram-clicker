import React, { type MouseEventHandler } from 'react';
import GameText from '../elements/GameText';

function ProgressBar({
  locked,
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
    if (locked) return 'bg-gray-300';
    if (currentValue === maxValue) return 'bg-emerald-500';
    if (maxValue / 2 < currentValue) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div
      className="w-[50px] relative bg-gray-700 pixel-border--gr z-10 h-5 overflow-hidden box-content "
      style={{ borderRadius: 0 }}
    >
      <div
        onClick={onPress}
        className={`${getColor()} h-5 transition-all duration-300`}
        style={{ width: `${(currentValue / maxValue) * 100}%` }}
      ></div>
      E
      {!!text &&
        (locked ? (
          <GameText
            size="sm"
            text="🔒"
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          />
        ) : (
          <GameText
            size="sm"
            text={text}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          />
        ))}
    </div>
  );
}

export default React.memo(ProgressBar);
