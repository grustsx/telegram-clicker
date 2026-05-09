import { useState, useEffect, type ReactElement } from 'react';

import loadingGif from '@/shared/assets/loading.gif';
import { LOADING_MESSAGES } from '../config/loadingMessages';
import { useAppSelector } from '@/shared';
import { selectAssetsLoading, selectLoading } from '@/entities/game';

const Loader = ({ children }: { children: ReactElement }) => {
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const loading = useAppSelector(selectLoading);
  const assetsLoading = useAppSelector(selectAssetsLoading);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev === LOADING_MESSAGES.length - 1) return 0;
        return prev + 1;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return loading || assetsLoading ? (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-tortik-orange overflow-hidden">
      <img
        src={loadingGif}
        alt="Загрузка..."
        className="w-64 h-64 pointer-events-none"
      />
      <div className="text-3xl text-tortik-white">
        {LOADING_MESSAGES[messageIndex]}
      </div>
    </div>
  ) : (
    children
  );
};
export default Loader;
