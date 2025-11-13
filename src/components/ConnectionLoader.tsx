import { selectConnectionLoading } from '../app/selectors';
import { useAppSelector } from '../app/hooks';
import GameText from '../elements/GameText';
import { createPortal } from 'react-dom';

const ConnectionLoader = () => {
  const loading = useAppSelector(selectConnectionLoading);
  const loaderRoot = document.getElementById('loader-root');
  if (!loaderRoot) return null;
  return (
    loading &&
    createPortal(
      <div className="fixed z-5000 inset-0 w-full h-full flex flex-col items-center justify-center bg-tortik-white/90 overflow-hidden">
        <GameText
          className="animate-pulse"
          theme="dark"
          text={'Восстановление соединения...'}
        />
      </div>,
      loaderRoot,
    )
  );
};

export default ConnectionLoader;
