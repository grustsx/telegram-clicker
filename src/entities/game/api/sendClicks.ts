import api from '@/axios';

export const sendClicks = (count: number, userId: number) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/clicks`, {
    count,
  });
};
