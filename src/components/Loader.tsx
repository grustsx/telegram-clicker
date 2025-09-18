import { useState, useEffect, type ReactElement } from 'react';
import { selectAssetsLoading, selectLoading } from '../app/selectors';
import { useAppSelector } from '../app/hooks';
import loadingGif from '../assets/loading.gif';

const loadingMessagesArray = [
  'Загрузка...',
  'Ой-ой, кажется, сервер только запускается...',
  'Щащащащащащащащаща...',
];

const Loader = ({ children }: { children: ReactElement }) => {
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const loading = useAppSelector(selectLoading);
  const assetsLoading = useAppSelector(selectAssetsLoading);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev === loadingMessagesArray.length - 1) return 0;
        return prev + 1;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return loading || assetsLoading ? (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-tortik-orange overflow-hidden">
      <img src={loadingGif} alt="Загрузка..." className="w-64 h-64" />
      <div className="text-3xl text-tortik-white">
        {loadingMessagesArray[messageIndex]}
      </div>
    </div>
  ) : (
    children
  );
};
export default Loader;
