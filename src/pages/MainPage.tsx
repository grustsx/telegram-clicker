import { useAppSelector } from '../app/hooks';
import { selectSunState } from '../app/selectors';
import { IncrementButton, MainPageHud } from '../components';

function MainPage() {
  const sunState = useAppSelector(selectSunState);

  return (
    <>
      <MainPageHud darkMode={sunState === 'deadly'} />
      <IncrementButton />
    </>
  );
}

export default MainPage;
