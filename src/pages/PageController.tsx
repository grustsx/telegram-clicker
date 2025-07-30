import React from 'react';
import MainPage from './MainPage';
import { AppVersion, MenuButton } from '../components';
import BuildingsPage from './BuildingsPage';
import SkillTreePage from './SkillTreePage';
import { soloSounds } from '../audio/musicController';

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

  return (
    <>
      {TabComponentsMap[tab]}
      <div className="absolute inset-x-0 bottom-4 flex flex-row justify-around">
        <MenuButton
          onClick={() => setTab(TabNames.BUILDINGS)}
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
