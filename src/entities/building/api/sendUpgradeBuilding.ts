import api from '@/shared/api/axios';

export const sendUpgradeBuilding = (
  buildingId: number,
  userId: number | undefined,
) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/buildings/${buildingId}`);
};
