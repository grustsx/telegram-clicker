import React, { type MouseEventHandler } from 'react';

function ProgressBar({
  currentValue,
  maxValue,
  onPress,
}: {
  currentValue: number;
  maxValue: number;
  onPress?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={onPress}
      className="bg-purple-500 h-full transition-all duration-300"
      style={{ width: `${(currentValue / maxValue) * 100}%` }}
    />
  );
}

export default React.memo(ProgressBar);
