import { LAB_ID, selectBuildingById } from '@/entities/building';
import { GameButton, useAppSelector } from '@/shared';
import { createPortal } from 'react-dom';
import { MESSAGES } from '../config/messages';
import { TextNote } from './TextNote';

export function NotesModal({ onClose }: { onClose: () => void }) {
  const root = document.getElementById('notes-root');
  const { level } = useAppSelector((state) =>
    selectBuildingById(state, LAB_ID),
  );
  if (!root) return null;

  const showedMEssages = MESSAGES.slice(0, level / 5 + 1);

  return createPortal(
    <div className="absolute z-5000 inset-0 p-4 flex flex-col items-center gap-2 bg-red-950 justify-center">
      <div className="border-t-8 border-b-8 border-emerald-700 shadow-lg w-full flex flex-col gap-4 overflow-scroll">
        <div className="border-l-8 border-r-8 border-emerald-700 bg-amber-100 notebook">
          {showedMEssages.map((message, index) => (
            <div>
              <TextNote message={message} index={index + 1} />
              {!((index + 1) % 5) && (
                <div className="w-full h-2 bg-emerald-700" />
              )}
            </div>
          ))}
          {MESSAGES.length > showedMEssages.length && (
            <TextNote
              message={`${MESSAGES[showedMEssages.length].slice(0, 15)}...`}
              index={showedMEssages.length + 1}
            />
          )}
        </div>
      </div>
      <GameButton
        theme="red"
        onClick={onClose}
        text="Закрыть"
        icon="skills/cross.png"
      />
    </div>,
    root,
  );
}
