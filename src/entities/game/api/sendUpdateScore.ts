import api from '@/axios';

export const sendUpdateScore = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/update-score`);
};
