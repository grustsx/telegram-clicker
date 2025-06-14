import React from 'react';
import MainPage from './MainPage';
import { MenuButton } from '../components';
import CakeSvg from '../assets/cake.svg?react';
import BuildingSvg from '../assets/building.svg?react';
import UpgradeSvg from '../assets/upgrade.svg?react';
import BuildingsPage from './BuildingsPage';
import SkillTree from '../components/SkillTree';

const TabNames = {
  MAIN: 'main',
  BUILDINGS: 'buildings',
  UPGRADES: 'upgrades',
} as const;

type TabName = (typeof TabNames)[keyof typeof TabNames];

const TabComponentsMap = {
  [TabNames.MAIN]: <MainPage />,
  [TabNames.BUILDINGS]: <BuildingsPage />,
  [TabNames.UPGRADES]: <SkillTree />,
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
    </>
  );
}

export default PageController;
