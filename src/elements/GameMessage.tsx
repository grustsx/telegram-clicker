import type { GameMessageType } from '../types/types';
import GameText from './GameText';

const messageTheme = {
  dark: 'text-[#ddebfc] text-shadow-xs text-shadow-[#3c4045] pixel-border--dt',
  light: 'text-[#3c4045] text-shadow-xs text-shadow-[#ddebfc] pixel-border--lt',
};

const innerBorder: Record<string, 'dt' | 'lt' | 'w' | 'gr'> = {
  dark: 'lt',
  light: 'dt',
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
          theme={theme === 'dark' ? 'brown' : 'light'}
          borderStyle={innerBorder[theme]}
        />
        <div className="flex grow items-center self-center">
          <GameText
            theme={theme === 'dark' ? 'light' : 'brown'}
            size="sm"
            text={description}
          />
        </div>
      </div>

      <img
        className="pixel-border--gr box-border"
        style={{
          backgroundColor: 'black',
          width: 'calc(25vw)',
          height: 'calc(25vw)',
        }}
        src={`/assets/faces/${face}.png`}
      />
    </div>
  );
}
