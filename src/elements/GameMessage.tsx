import type { GameMessageType } from '../types/types';
import GameText from './GameText';

export default function GameMessage({
  name,
  description,
  face = 'face',
}: GameMessageType) {
  return (
    <div className="flex gap-1 pixel-border--lt justify-between">
      <div className="flex flex-col grow">
        <GameText
          className="text-shadow-xs text-shadow-[#812a05]"
          text={name}
          size="lg"
          borderStyle="dt"
        />
        <div className="flex grow items-center self-center">
          <GameText theme="brown" text={description} />
        </div>
      </div>

      <img
        className="pixel-border--gr box-border"
        style={{
          borderRadius: 0,
          backgroundColor: 'transparent',
          width: 'calc(25vw)',
          height: 'calc(25vw)',
        }}
        src={`/assets/faces/${face}.png`}
      />
    </div>
  );
}
