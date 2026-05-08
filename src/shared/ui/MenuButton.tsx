import React from 'react';
import GameText from './GameText';

const MenuButton = ({
  onClick,
  name,
  icon,
  selected,
  alerted = false,
}: {
  onClick: () => void;
  name: string;
  icon: string;
  selected: boolean;
  alerted?: boolean;
}) => {
  return (
    <div onClick={onClick} className="flex flex-col relative items-center z-50">
      {alerted && (
        <GameText
          size="lg"
          text="!"
          className="absolute text-shadow-xs animate-bounce text-tortik-orange left-1/2 top-[-10px] translate-x-[5px]"
        />
      )}
      <img
        className="w-8 h-8 pointer-events-none"
        src={icon}
        style={{
          imageRendering: 'pixelated',
        }}
      />
      <GameText
        size="xs"
        text={name}
        className={`${selected && 'text-tortik-orange'}`}
      />
    </div>
  );
};

export default React.memo(MenuButton);
