import api from './axios';

export const sendUpgradeBuilding = (
  buildingId: number,
  userId: number | undefined,
) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/buildings/${buildingId}`);
};

export const sendClicks = (count: number, userId: number) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/clicks`, {
    count,
  });
};

export const sendClaimStorage = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/claim-storage`);
};

export const sendBuySkill = (skillId: string, userId: number | undefined) => {
  if (!userId || !skillId) return;

  return api.post(`/api/users/${userId}/skills/${skillId}`);
};
