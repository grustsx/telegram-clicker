import React from 'react';
import GameText from '../elements/GameText';

const MenuButton = ({
  onClick,
  name,
  icon,
  selected,
}: {
  onClick: () => void;
  name: string;
  icon: string;
  selected: boolean;
}) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center z-50">
      <img
        className="w-8 h-8"
        src={icon}
        style={{
          imageRendering: 'pixelated',
        }}
      />
      <GameText text={name} className={`${selected && 'text-tortik-orange'}`} />
    </div>
  );
};

export default React.memo(MenuButton);
