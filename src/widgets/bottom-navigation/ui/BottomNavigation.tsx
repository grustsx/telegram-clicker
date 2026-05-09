import { MenuButton } from '@/shared';

type NavigationItem<T extends string> = {
  id: T;
  name: string;
  icon: string;
  alerted?: boolean;
};

type Props<T extends string> = {
  activeItem: T;
  items: NavigationItem<T>[];
  onChangeItem: (item: T) => void;
};

export function BottomNavigation<T extends string>({
  activeItem,
  items,
  onChangeItem,
}: Props<T>) {
  return (
    <div className="absolute inset-x-0 bottom-4 flex flex-row justify-around">
      {items.map((item) => (
        <MenuButton
          key={item.id}
          onClick={() => onChangeItem(item.id)}
          alerted={item.alerted}
          name={item.name}
          icon={item.icon}
          selected={activeItem === item.id}
        />
      ))}
    </div>
  );
}
