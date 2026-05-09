import { selectConnectionLoading } from '@/entities/game';
import { GameText, useAppSelector } from '@/shared';
import { createPortal } from 'react-dom';

const ConnectionLoader = () => {
  const loading = useAppSelector(selectConnectionLoading);
  const loaderRoot = document.getElementById('loader-root');
  if (!loaderRoot) return null;
  return (
    loading &&
    createPortal(
      <div className="fixed z-5000 inset-0 w-full p-2 h-full flex flex-col items-center justify-center bg-tortik-white/90 overflow-hidden">
        <GameText
          className="animate-pulse"
          size="sm"
          theme="dark"
          text={'Восстановление соединения...'}
        />
      </div>,
      loaderRoot,
    )
  );
};

export default ConnectionLoader;
