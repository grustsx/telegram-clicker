import React from 'react';
import { Hud } from '@/widgets/hud';
import { BuildingsMap } from '@/widgets/buildings-map';

function BuildingsPage() {
  return (
    <>
      <Hud />
      <BuildingsMap />
    </>
  );
}

export default React.memo(BuildingsPage);
