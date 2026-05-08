import React from 'react';
import { NotesModal } from './NotesModal';
import { GameButton } from '@/shared';

function Notes() {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
      {isOpened && <NotesModal onClose={() => setIsOpened(false)} />}

      <div
        className={`flex flex-col gap-4 pixel-border--gr justify-between items-center p-4`}
      >
        <GameButton
          theme="brown"
          onClick={() => setIsOpened(true)}
          text="ЗАПИСКИ ПАВЛИКА"
          icon="skills/list.png"
        />
      </div>
    </>
  );
}

export default React.memo(Notes);
