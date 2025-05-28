import { useState, useEffect } from 'react';

const Loader = () => {
  const [loadingMessage, setLoadingMessage] = useState<string>('Загрузка...');

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      setLoadingMessage('Ой-ой, кажется, сервер только запускается...');
    }, 5000);

    const secondTimeout = setTimeout(() => {
      setLoadingMessage('Щащащащащащащащаща...');
    }, 10000);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, []);
  return <div>{loadingMessage}</div>;
};
export default Loader;
