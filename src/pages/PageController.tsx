import React from 'react';
import MainPage from './MainPage';
import { AppVersion, MenuButton } from '../components';
import CakeSvg from '../assets/List.svg?react';
import BuildingSvg from '../assets/Home.svg?react';
import UpgradeSvg from '../assets/Up-Arrow.svg?react';
import BuildingsPage from './BuildingsPage';
import SkillTreePage from './SkillTreePage';

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

function PageController() {
  const [tab, setTab] = React.useState<TabName>(TabNames.MAIN);
  return (
    <>
      {TabComponentsMap[tab]}
      <div className="absolute inset-x-0 bottom-4 flex flex-row justify-around">
        <MenuButton
          onClick={() => setTab(TabNames.BUILDINGS)}
          name="Постройки"
          Icon={BuildingSvg}
          selected={tab === TabNames.BUILDINGS}
        />
        <MenuButton
          onClick={() => setTab(TabNames.MAIN)}
          name="ТОРТиК"
          Icon={CakeSvg}
          selected={tab === TabNames.MAIN}
        />
        <MenuButton
          onClick={() => setTab(TabNames.UPGRADES)}
          name="Улучшения"
          Icon={UpgradeSvg}
          selected={tab === TabNames.UPGRADES}
        />
      </div>
      <AppVersion />
    </>
  );
}

export default PageController;
