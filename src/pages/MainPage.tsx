import { IncrementButton, MainPageHud } from '../components';

function MainPage() {
  return (
    <div className="text-tortik-white w-full h-full bg-radial from-tortik-orange from-20% via-indigo-900 via-50% to-black ">
      <MainPageHud />
      <IncrementButton />
    </div>
  );
}

export default MainPage;
