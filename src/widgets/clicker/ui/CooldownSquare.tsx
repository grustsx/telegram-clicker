export function CooldownSquare({
  remain,
  cooldown,
  icon,
}: {
  remain: number;
  cooldown: number;
  icon?: string;
}) {
  const progress = Math.min(1, Math.max(0, 1 - remain / cooldown));

  return (
    <div className="relative inline-grid bg-tortik-orange/90 border-tortik-yellow/90 border-2 place-items-center text-white font-bold text-lg min-w-12 min-h-12 w-12 h-12">
      {/* Затемняющий слой */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          width: `${progress * 100}%`,
          left: `${(1 - progress) * 100}%`,
        }}
      />
      {icon && (
        <img
          className="w-10 h-10 pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/${icon}`}
        />
      )}
    </div>
  );
}
