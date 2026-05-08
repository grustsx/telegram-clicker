import api from '@/axios';

export const sendName = (name: string, userId: number) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/name`, {
    name,
  });
};
