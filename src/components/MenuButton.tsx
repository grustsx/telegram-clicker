import React from 'react';

const MenuButton = ({
  onClick,
  name,
  Icon,
  selected,
}: {
  onClick: () => void;
  name: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  selected: boolean;
}) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center">
      <Icon
        className={`w-16 h-16 ${selected ? 'fill-tortik-orange' : 'fill-tortik-yellow'}`}
      />
      <div className="text-black">{name}</div>
    </div>
  );
};

export default MenuButton;
