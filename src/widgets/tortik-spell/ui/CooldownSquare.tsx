import { formatDuration, GameText } from '@/shared';
import React from 'react';

export function CooldownSquare({
  remain,
  cooldown,
  message,
  icon,
}: {
  remain: number;
  cooldown: number;
  message: string | null;
  icon: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const progress = Math.min(1, Math.max(0, remain / cooldown));

  const text = remain > 0 ? formatDuration(remain) : message || '';

  return (
    <div
      onPointerDown={() => setIsOpen(true)}
      onPointerLeave={() => setIsOpen(false)}
      onPointerUp={() => setIsOpen(false)}
      className="relative inline-grid place-items-center text-white font-bold text-lg w-20 h-20"
    >
      {/* Затемняющий слой */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          width: `${progress * 100}%`,
          left: `${(1 - progress) * 100}%`,
        }}
      />
      <div>
        <img
          className="w-16 h-16 pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/${icon}`}
        />
        {isOpen && !!text.length && (
          <GameText
            className="z-10 bg-gray-900/70 p-2 absolute bottom-16 left-0"
            size="sm"
            text={text}
          />
        )}
      </div>
    </div>
  );
}
