import React from 'react';
import { sendActivateBooster, sendRestartUser } from '../api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserId } from '../app/selectors';
import { activateBooster } from '../state/thunk';
import { CLICK_BOOSTER_ID } from '../constants/const';
import { setErrorMessage } from '../state/gameSlice';
import GameButton from '../elements/GameButton';

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
              <GameButton
                text="Да"
                onClick={() => {
                  sendRestartUser(userId);
                  dispatch(setErrorMessage('Теперь ребут игры'));
                }}
              />
              <GameButton
                theme="red"
                text="Нет"
                onClick={() => setIsConfirm(false)}
              />
            </>
          ) : (
            <>
              <GameButton
                theme="blue"
                text="Сбросить пользователя"
                onClick={() => setIsConfirm(true)}
              />
              <GameButton
                theme="blue"
                text="Вкючить бонус кликов"
                onClick={() => {
                  dispatch(activateBooster({ boosterId: CLICK_BOOSTER_ID }));
                  sendActivateBooster(CLICK_BOOSTER_ID, userId);
                }}
              />
              <GameButton theme="red" text="Закрыть" onClick={onClose} />
            </>
          )}
        </div>
      </div>
    )
  );
}
