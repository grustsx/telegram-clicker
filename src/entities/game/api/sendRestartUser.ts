import api from '@/shared/api/axios';

export const sendRestartUser = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/restart-user`);
};
