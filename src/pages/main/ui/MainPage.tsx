import { selectSunState } from '@/entities/skill';
import { useAppSelector } from '@/shared';
import { IncrementButton } from '@/widgets/clicker';
import { Hud } from '@/widgets/hud';

function MainPage() {
  const sunState = useAppSelector(selectSunState);

  return (
    <>
      <Hud darkMode={sunState === 'deadly'} />
      <IncrementButton />
    </>
  );
}

export default MainPage;
