import React from 'react';

import { CooldownSquare } from './CooldownSquare';

import type { BoosterType } from '@/entities/booster';

import { formatDuration, GameText } from '@/shared';

export function BoosterInfo({
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
