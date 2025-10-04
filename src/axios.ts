import axios from 'axios';
import { BACKEND_URL } from './env';
import { setErrorMessage } from './state/gameSlice';
import { store } from './app/store';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Unknown error';
    store.dispatch(setErrorMessage(message));
    return Promise.reject(error); // пробрасываем ошибку дальше
  },
);

export default api;
