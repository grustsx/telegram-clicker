const textSize = {
  sm: '2xl',
  md: '3xl',
  lg: '4xl',
};

export default function GameText({
  text,
  borderStyle,
  size = 'md',
  className,
}: {
  text: string;
  borderStyle?: 'dt' | 'lt' | 'w' | 'gr';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <div
      className={`${borderStyle ? `pixel-border--${borderStyle}` : ''} text-${textSize[size]} ${className ? className : ''}`}
    >
      {text}
    </div>
  );
}
