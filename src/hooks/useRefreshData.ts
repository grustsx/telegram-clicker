import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserAndDictionaries } from '../state/thunk';
import { selectUserId } from '../app/selectors';
import { setErrorMessage } from '../state/gameSlice';

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
        dispatch(getUserAndDictionaries());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, userId]);
}
