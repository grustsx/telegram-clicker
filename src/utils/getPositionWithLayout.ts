import type { PositionType } from '../types/types';

export const getPositionWithLayout = (
  position: PositionType,
  layout: { width: number; height: number; centerX: number; centerY: number },
): PositionType => {
  return {
    x: position.x + layout.width / 2 - 50 - layout.centerX,
    y: position.y + layout.height / 2 - 50 - layout.centerY,
  };
};
