import { IncrementButton, MainPageHud } from '../components';

function MainPage() {
  return (
    <div className="text-tortik-white w-full h-full bg-radial from-tortik-yellow via-tortik-orange via-40% to-indigo-900">
      <MainPageHud />
      <IncrementButton />
    </div>
  );
}

export default MainPage;
