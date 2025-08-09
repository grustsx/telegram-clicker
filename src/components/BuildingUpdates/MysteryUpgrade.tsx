import GameText from '../../elements/GameText';

export default function MysteryUpgrade() {
  return (
    <div
      className={`flex flex-col gap-2 pixel-border--gr justify-between items-center`}
    >
      <GameText theme="light" text="???" />
    </div>
  );
}
