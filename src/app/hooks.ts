import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Используем во всём приложении вместо обычного useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Используем во всём приложении вместо обычного useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
