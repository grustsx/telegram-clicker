import { BACKEND_URL } from './env';
import type { GetUserDataResponse, TgUser } from './types';

export const getUserData = async (id: number): Promise<GetUserDataResponse> => {
  const response = await fetch(`${BACKEND_URL}/api/userData/${id}`);
  if (!response.ok) throw new Error('Ошибка загрузки данных');
  return response.json();
};

export const sendUpgradeBuilding = (building_id: number, user: TgUser) => {
  if (!user) return;
  return fetch(`${BACKEND_URL}/api/upgradeBuilding`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegram_user: user, building_id }),
  });
};

export const sendClicks = (count: number, user: TgUser) => {
  console.log(`sendClicks(${count}, ${user})`);
  if (!user || count === 0) return;
  return fetch(`${BACKEND_URL}/api/clicks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramUser: user, count }),
  });
};
