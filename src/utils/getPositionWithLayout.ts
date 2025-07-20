import type { PositionType } from '../types/types';

export const getPositionWithLayout = (
  position?: PositionType,
  layout?: { width: number; height: number; centerX: number; centerY: number },
): PositionType | null => {
  if (!position || !layout) return null;
  return {
    x: position.x + layout.width / 2 - 50 - layout.centerX,
    y: position.y + layout.height / 2 - 50 - layout.centerY,
  };
};
