import { type ReactElement } from 'react';
import { selectErrorMessage } from '../app/selectors';
import { useAppSelector } from '../app/hooks';

const ErrorHandler = ({ children }: { children: ReactElement }) => {
  const errorMessage = useAppSelector(selectErrorMessage);

  return errorMessage ? <div>{errorMessage}</div> : children;
};
export default ErrorHandler;
