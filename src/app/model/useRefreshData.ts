import { selectUserId, setErrorMessage } from '@/entities/game';
import { getUserAndDictionariesThunk } from '@/features/init-game';
import { useAppDispatch, useAppSelector } from '@/shared';
import React from 'react';

export default function useRefreshData() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (!userId) {
          dispatch(
            setErrorMessage(
              'юзер не найден, откройте игру через кнопку в сообщении, а не через нижнее меню',
            ),
          );
          return;
        }
        dispatch(getUserAndDictionariesThunk());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, userId]);
}
