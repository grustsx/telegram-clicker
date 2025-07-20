import type { PositionType } from '../types/types';

export const getPositionWithLayout = (
  position: PositionType,
  layoutSize: { width: number; height: number },
): PositionType => {
  return {
    x: position.x + layoutSize.width / 2 - 50,
    y: position.y + layoutSize.height / 2 - 50,
  };
};
