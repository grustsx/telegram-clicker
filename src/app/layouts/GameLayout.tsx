import React from 'react';

import { BottomNavigation } from '@/widgets/bottom-navigation';
import { AppVersion, useAppSelector } from '@/shared';

import { TabNames, type TabName } from '../config/tabs';
import { useGameMusic } from '../model/useGameMusic';
import { MainPage } from '@/pages/main';
import { BuildingsPage } from '@/pages/buildings';
import { SkillTreePage } from '@/pages/skill-tree';
import {
  selectIsAnyBuildingAvailable,
  selectIsAnySkillAvailable,
} from '@/features/game-progress';

const TabComponentsMap = {
  [TabNames.MAIN]: MainPage,
  [TabNames.BUILDINGS]: BuildingsPage,
  [TabNames.UPGRADES]: SkillTreePage,
};

export function GameLayout() {
  const [tab, setTab] = React.useState<TabName>(TabNames.MAIN);

  useGameMusic(tab);

  const isAnyBuildingAvailable = useAppSelector(selectIsAnyBuildingAvailable);
  const isAnySkillAvailable = useAppSelector(selectIsAnySkillAvailable);

  const navigationItems = [
    {
      id: TabNames.BUILDINGS,
      name: 'Постройки',
      icon: '/assets/icons/Home.png',
      alerted: isAnyBuildingAvailable,
    },
    {
      id: TabNames.MAIN,
      name: 'ТОРТиК',
      icon: '/assets/icons/Tortik.png',
    },
    {
      id: TabNames.UPGRADES,
      name: 'Улучшения',
      icon: '/assets/icons/Up-Arrow.png',
      alerted: isAnySkillAvailable,
    },
  ];

  const ActivePage = TabComponentsMap[tab];

  return (
    <>
      <ActivePage />

      <BottomNavigation
        activeItem={tab}
        items={navigationItems}
        onChangeItem={setTab}
      />
      <AppVersion />
    </>
  );
}
