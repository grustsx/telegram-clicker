import { selectErrorMessage } from '@/entities/game/model/selectors';
import { useAppSelector } from '@/shared';
import type { ReactElement } from 'react';

const ErrorHandler = ({ children }: { children: ReactElement }) => {
  const errorMessage = useAppSelector(selectErrorMessage);

  return errorMessage ? (
    <div className="w-full h-full flex items-center justify-center bg-tortik-orange">
      <div className="m-4 p-4 bg-tortik-white/5 text-tortik-white text-xl border-dashed border-4 rounded-xl">
        {'Ошибка: '}
        <span className="text-tortik-yellow">{errorMessage}</span>
        {'. Перезагрузите игру.'}
      </div>
    </div>
  ) : (
    children
  );
};
export default ErrorHandler;
