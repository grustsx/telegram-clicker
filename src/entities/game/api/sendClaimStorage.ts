import api from '@/axios';

export const sendClaimStorage = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/claim-storage`);
};
