import React, { type MouseEventHandler } from 'react';

function ProgressBar({
  currentValue,
  maxValue,
  text,
  onPress,
}: {
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
    <div className="w-[100px] relative bg-gray-700 rounded-full z-10 h-5 overflow-hidden">
      <div
        onClick={onPress}
        className={`${getColor()} h-5 transition-all duration-300`}
        style={{ width: `${(currentValue / maxValue) * 100}%` }}
      ></div>

      {!!text && (
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white z-20 pointer-events-none">
          {text}
        </div>
      )}
    </div>
  );
}

export default React.memo(ProgressBar);
