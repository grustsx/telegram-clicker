import api from '@/axios';

export const sendActivateBooster = (
  boosterId: number,
  userId: number | undefined,
) => {
  if (!userId || !boosterId) return;

  return api.post(`/api/users/${userId}/boosters/${boosterId}`);
};
