import api from './axios';

export const sendUpgradeBuilding = (
  buildingId: number,
  userId: number | undefined,
) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/buildings/${buildingId}`);
};

export const sendUpgradeClickLevel = (
  count: number,
  userId: number | undefined,
) => {
  if (!userId || count === 0) return;

  return api.post(`/api/users/${userId}/clicks/level`, {
    count,
  });
};

export const sendClicks = (count: number, userId: number) => {
  if (!userId || count === 0) return;

  return api.post(`/api/users/${userId}/clicks`, {
    count,
  });
};
