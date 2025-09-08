import { useAppDispatch, useAppSelector } from '../app/hooks';
import GameMessage from '../elements/GameMessage';
import GameText from '../elements/GameText';
import { nextLine } from '../state/dialogSlice';
import { createPortal } from 'react-dom';

export default function DialogModal() {
  const dispatch = useAppDispatch();
  const { isOpen, messages, currentIndex } = useAppSelector(
    (state) => state.dialog,
  );

  if (!isOpen) return null;

  const currentMessage = messages[currentIndex];
  const dialogRoot = document.getElementById('dialog-root');
  if (!dialogRoot) return null;

  return createPortal(
    <div className="fixed z-5000 inset-0 flex items-center justify-center bg-black/50">
      <div className="p-6 m-6 border-2 bg-blue-950/60 shadow-lg w-full flex flex-col gap-6">
        <GameMessage {...currentMessage} />

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => dispatch(nextLine())}
        >
          <GameText
            text={currentIndex < messages.length - 1 ? '->' : 'Закончить'}
          />
        </button>
      </div>
    </div>,
    dialogRoot,
  );
}
