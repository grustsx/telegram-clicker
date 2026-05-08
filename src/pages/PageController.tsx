import React from 'react';

import { soloSounds } from '../audio/musicController';

import MainPage from './main/ui/MainPage';
import SkillTreePage from './skill-tree/ui/SkillTreePage';
import BuildingsPage from './buildings/ui/BuildingsPage';

import { selectIsAnyBuildingAvailable } from '@/entities/building';
import { selectIsAnySkillAvailable } from '@/entities/skill';

import { useAppSelector, MenuButton, AppVersion } from '@/shared';

const TabNames = {
  MAIN: 'main',
  BUILDINGS: 'buildings',
  UPGRADES: 'upgrades',
} as const;

type TabName = (typeof TabNames)[keyof typeof TabNames];

const TabComponentsMap = {
  [TabNames.MAIN]: <MainPage />,
  [TabNames.BUILDINGS]: <BuildingsPage />,
  [TabNames.UPGRADES]: <SkillTreePage />,
};

const TabSounds = {
  [TabNames.MAIN]: ['mainBass', 'mainPad', 'mainDrum', 'bells'],
  [TabNames.BUILDINGS]: ['buildingDrum', 'buildingSynth', 'bells'],
  [TabNames.UPGRADES]: [
    'skillBass',
    'skillPad',
    'skillSnare',
    'skillKick',
    'skillHat',
    'bells',
  ],
};

function PageController() {
  const [tab, setTab] = React.useState<TabName>(TabNames.MAIN);

  React.useEffect(() => {
    soloSounds(TabSounds[tab]);
  }, [tab]);

  const isAnyBuildingAvailable = useAppSelector(selectIsAnyBuildingAvailable);
  const isAnySkillAvailable = useAppSelector(selectIsAnySkillAvailable);

  return (
    <>
      {TabComponentsMap[tab]}
      <div className="absolute inset-x-0 bottom-4 flex flex-row justify-around">
        <MenuButton
          onClick={() => setTab(TabNames.BUILDINGS)}
          alerted={isAnyBuildingAvailable}
          name="Постройки"
          icon={'/assets/icons/Home.png'}
          selected={tab === TabNames.BUILDINGS}
        />
        <MenuButton
          onClick={() => setTab(TabNames.MAIN)}
          name="ТОРТиК"
          icon={'/assets/icons/Tortik.png'}
          selected={tab === TabNames.MAIN}
        />
        <MenuButton
          onClick={() => setTab(TabNames.UPGRADES)}
          alerted={isAnySkillAvailable}
          name="Улучшения"
          icon={'/assets/icons/Up-Arrow.png'}
          selected={tab === TabNames.UPGRADES}
        />
      </div>
      <AppVersion />
    </>
  );
}

export default PageController;
