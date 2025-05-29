import { useState, useEffect, type ReactElement } from 'react';
import { selectLoading } from '../app/selectors';
import { useAppSelector } from '../app/hooks';

const loadingMessagesArray = [
  'Загрузка...',
  'Ой-ой, кажется, сервер только запускается...',
  'Щащащащащащащащаща...',
];

const Loader = ({ children }: { children: ReactElement }) => {
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const loading = useAppSelector(selectLoading);

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
  return loading ? <div>{loadingMessagesArray[messageIndex]}</div> : children;
};
export default Loader;
