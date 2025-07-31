const textSize = {
  sm: '1xl',
  md: '2xl',
  lg: '3xl',
};

const textTheme = {
  light: 'text-[#ddebfc] text-shadow-xs text-shadow-[#3c4045]',
  dark: 'text-[#3c4045] text-shadow-xs text-shadow-[#ddebfc]',
  brown: 'text-[#853f21] text-shadow-xs text-shadow-[#ddebfc]',
};

export default function GameText({
  text,
  borderStyle,
  size = 'md',
  className,
  theme = 'light',
}: {
  text: string;
  borderStyle?: 'dt' | 'lt' | 'w' | 'gr';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'brown';
  className?: string;
}) {
  return (
    <div
      className={`${borderStyle ? `pixel-border--${borderStyle}` : ''} text-${textSize[size]} ${className ? className : ''} ${textTheme[theme]}`}
    >
      {text}
    </div>
  );
}
