import api from '@/axios';

export const sendBuySkill = (skillId: number, userId: number | undefined) => {
  if (!userId || !skillId) return;

  return api.post(`/api/users/${userId}/skills/${skillId}`);
};
