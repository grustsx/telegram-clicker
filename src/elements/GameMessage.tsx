import type { GameMessageType } from '../types/types';
import GameText from './GameText';

const messageTheme = {
  dark: 'text-[#ddebfc] text-shadow-xs text-shadow-[#3c4045] pixel-border--w',
  light: 'text-[#3c4045] text-shadow-xs text-shadow-[#ddebfc] pixel-border--gr',
};

const innerBorder: Record<string, 'dt' | 'lt' | 'w' | 'gr'> = {
  light: 'w',
  dark: 'gr',
};

export default function GameMessage({
  name,
  description,
  reversed = false,
  theme = 'dark',
  face = 'face',
}: GameMessageType & { reversed?: boolean; theme?: 'dark' | 'light' }) {
  return (
    <div
      className={`${reversed ? 'flex-row-reverse' : ''} flex gap-1 ${messageTheme[theme]} justify-between`}
    >
      <div className="flex flex-col grow">
        <GameText
          className="text-shadow-xs text-shadow-[#812a05]"
          text={name.toUpperCase()}
          size="lg"
          theme={theme === 'dark' ? 'light' : 'dark'}
          borderStyle={innerBorder[theme]}
        />
        <div className="flex grow items-center self-center">
          <GameText theme={theme} text={description} />
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
