import axios from 'axios';
import { BACKEND_URL } from '../config/env';
import { store } from '@/app/store/store';
import { setConnectionLoading, setErrorMessage } from '@/entities/game';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MAX_RETRIES = 3;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message =
      error.response?.data?.message || error.message || 'Unknown error';

    const isNetworkError = !error.response && error.message === 'Network Error';

    const originalRequest = error.config;

    if (isNetworkError) {
      // Инициализируем счётчик повторов
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      if (originalRequest._retryCount <= MAX_RETRIES) {
        // Показываем лоадер только во время повторных попыток
        if (originalRequest._retryCount === 1) {
          store.dispatch(setConnectionLoading(true));
        }

        console.warn(
          `Network error, retrying ${originalRequest._retryCount}...`,
        );
        await new Promise((res) =>
          setTimeout(res, 2000 * originalRequest._retryCount),
        ); // задержка перед повтором

        try {
          const retryResponse = await api(originalRequest);

          // Если удалось — убираем лоадер
          store.dispatch(setConnectionLoading(false));
          return retryResponse;
        } catch (retryError) {
          if (originalRequest._retryCount >= MAX_RETRIES) {
            store.dispatch(setConnectionLoading(false));
            store.dispatch(
              setErrorMessage('Не удалось восстановить соединение'),
            );
          }
          return Promise.reject(retryError);
        }
      }
    }

    store.dispatch(setConnectionLoading(false));
    store.dispatch(setErrorMessage(message));
    return Promise.reject(error); // пробрасываем ошибку дальше
  },
);

export default api;
