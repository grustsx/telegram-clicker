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
      <div className={`text-2xl ${selected && 'text-tortik-orange'}`}>
        {name}
      </div>
    </div>
  );
};

export default MenuButton;
