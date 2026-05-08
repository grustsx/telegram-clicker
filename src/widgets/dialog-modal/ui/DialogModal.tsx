import { GameMessage, nextLine } from '@/entities/dialog';
import { GameButton, useAppDispatch, useAppSelector } from '@/shared';
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
    <div className="fixed z-5000 inset-0 flex items-center justify-center bg-black/80">
      <div className="p-2 m-2 border-2 bg-blue-950/60 shadow-lg w-full flex flex-col gap-2">
        <GameMessage {...currentMessage} />

        <GameButton
          theme="blue"
          size="small"
          onClick={() => dispatch(nextLine())}
          text={currentIndex < messages.length - 1 ? 'Далее' : 'Закончить'}
        />
      </div>
    </div>,
    dialogRoot,
  );
}
