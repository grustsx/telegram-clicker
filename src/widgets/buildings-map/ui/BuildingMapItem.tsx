import type { BuildingType } from '@/entities/building';

type Props = {
  building: BuildingType;
  assetLevel: number;
  isShowed: boolean;
  isEnoughCurrency: boolean;
  onClick: () => void;
};

export function BuildingMapItem({
  building,
  assetLevel,
  isShowed,
  isEnoughCurrency,
  onClick,
}: Props) {
  return (
    <div
      className={`${
        building.id === 7
          ? 'absolute w-1/2 pointer-events-none'
          : 'relative w-full h-full'
      } aspect-square`}
      onClick={onClick}
    >
      <img
        className="w-full h-full object-contain pointer-events-none"
        src={`/assets/buildings/${building.id}/lvl${assetLevel}.png`}
        style={{ imageRendering: 'pixelated' }}
      />

      {isEnoughCurrency && isShowed && (
        <img
          className={`absolute ${
            building.id === 7 ? 'bottom-1/4 right-1/5' : 'top-1/4 left-1/4'
          } w-1/8 h-1/8 animate-bounce pointer-events-none`}
          src="/assets/buildings/up.png"
          style={{
            pointerEvents: 'none',
            imageRendering: 'pixelated',
          }}
        />
      )}
    </div>
  );
}
