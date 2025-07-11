import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { getUserAndDictionaries } from '../state/thunk';

export default function useRefreshData() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(getUserAndDictionaries());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);
}
