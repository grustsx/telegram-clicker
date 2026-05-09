type SunState = 'far' | 'close' | 'deadly';

type Props = {
  sunState: SunState;
};

export function BuildingsSunOverlay({ sunState }: Props) {
  if (sunState === 'far') return null;

  return (
    <div
      className={`fixed w-screen h-[max(200vw,100vh)] inset-0 bg-tortik-yellow/${
        sunState === 'deadly' ? '20' : '10'
      } pointer-events-none z-30`}
    />
  );
}
