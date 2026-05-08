import type { AppDispatch, RootState } from '@/app/store/store';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

// Используем во всём приложении вместо обычного useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Используем во всём приложении вместо обычного useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
