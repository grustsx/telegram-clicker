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
      <Icon className="w-16 h-16" />
      <div className={`text-2xl ${selected && 'text-tortik-orange'}`}>
        {name}
      </div>
    </div>
  );
};

export default MenuButton;
