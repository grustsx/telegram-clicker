import React from 'react';
import { sendActivateBooster, sendRestartUser } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';
import GameText from '../elements/GameText';
import { activateBooster } from '../state/thunk';
import { CLICK_BOOSTER_ID } from '../constants/const';

function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      onClick={onClick}
    >
      <GameText text={text} />
    </button>
  );
}

export default function QAModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const userId = useAppSelector(selectUserId);
  const [isConfirm, setIsConfirm] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    isOpen && (
      <div className="fixed z-5000 inset-0 flex items-center justify-center bg-black/50">
        <div className="p-6 m-6 border-2 bg-blue-950/60 shadow-lg w-full flex flex-col gap-6">
          {isConfirm ? (
            <>
              <Button text="Да" onClick={() => sendRestartUser(userId)} />
              <Button text="Нет" onClick={() => setIsConfirm(false)} />
            </>
          ) : (
            <>
              <Button
                text="Сбросить пользователя"
                onClick={() => setIsConfirm(true)}
              />
              <Button
                text="Вкючить бонус кликов"
                onClick={() => {
                  dispatch(activateBooster({ boosterId: CLICK_BOOSTER_ID }));
                  sendActivateBooster(CLICK_BOOSTER_ID, userId);
                }}
              />
              <Button text="Закрыть" onClick={onClose} />
            </>
          )}
        </div>
      </div>
    )
  );
}
