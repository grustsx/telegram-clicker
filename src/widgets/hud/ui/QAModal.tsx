import { CLICK_BOOSTER_ID, sendActivateBooster } from '@/entities/booster';
import {
  activateBoosterThunk,
  sendRestartUser,
  setErrorMessage,
} from '@/entities/game';
import { selectUserId } from '@/entities/game/model/selectors';
import { GameButton, useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';

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
                  dispatch(
                    activateBoosterThunk({ boosterId: CLICK_BOOSTER_ID }),
                  );
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
