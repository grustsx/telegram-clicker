import { type ReactElement } from 'react';
import { selectErrorMessage } from '../app/selectors';
import { useAppSelector } from '../app/hooks';

const ErrorHandler = ({ children }: { children: ReactElement }) => {
  const errorMessage = useAppSelector(selectErrorMessage);

  return errorMessage ? (
    <div className="w-full h-full flex items-center justify-center bg-tortik-orange">
      <div className="m-4 p-4 bg-tortik-white/5 text-tortik-white text-3xl border-dashed border-4 rounded-xl">
        {'Ой, шото упало то ли у нас, то ли у вас, вот ошибка: '}
        <span className="text-tortik-yellow">{errorMessage}</span>
        {'. Перезагрузите попробуйте игру хз'}
      </div>
    </div>
  ) : (
    children
  );
};
export default ErrorHandler;
