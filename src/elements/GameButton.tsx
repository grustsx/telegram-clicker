import GameText from './GameText';

type ButtonTheme = 'green' | 'red' | 'blue' | 'space' | 'brown' | 'orange';
type ButtonSize = 'medium' | 'small' | 'large';

export default function GameButton({
  text,
  theme = 'green',
  icon,
  size = 'medium',
  disabled = false,
  bordered = true,
  onClick,
  className = '',
}: {
  text?: string;
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
  size?: ButtonSize;
  theme?: ButtonTheme;
  bordered?: boolean;
  className?: string;
}) {
  const getThemeStyle = (theme: ButtonTheme) => {
    switch (theme) {
      case 'red':
        return 'bg-red-900';
      case 'blue':
        return 'bg-blue-900';
      case 'space':
        return 'bg-green-600/30';
      case 'brown':
        return 'bg-amber-800';
      case 'orange':
        return 'bg-amber-600';
      default:
        return 'bg-emerald-600';
    }
  };

  const getDisabledTheme = (theme: ButtonTheme) => {
    switch (theme) {
      case 'space':
        return 'bg-red-600/30';
      default:
        return 'bg-gray-400';
    }
  };

  const getSizeStyle = (size: ButtonSize) => {
    switch (size) {
      case 'medium':
        return 'min-h-10';
      default:
        return '';
    }
  };

  const getIconStyle = (size: ButtonSize) => {
    switch (size) {
      case 'small':
        return 'w-3 min-w-3 h-3 min-h-3';
      case 'large':
        return 'w-20 min-w-20 h-20 min-h-20';
      default:
        return 'w-4 min-w-4 h-4 min-h-4';
    }
  };

  return (
    <button
      className={`${!!text && 'w-full'} ${bordered ? 'border-2' : 'border-0'} flex flex-row justify-center items-center gap-2 p-1 border-white text-white ${getSizeStyle(size)} ${getThemeStyle(theme)} ${disabled ? getDisabledTheme(theme) : 'active:brightness-120'} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <img
          className={getIconStyle(size)}
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/${icon}`}
        />
      )}

      {text && <GameText size="sm" text={text} />}

      {text && icon && (
        <img
          className="w-4 h-4"
          style={{
            imageRendering: 'pixelated',
          }}
          src={`/assets/icons/${icon}`}
        />
      )}
    </button>
  );
}
