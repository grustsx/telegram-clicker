import api from '@/shared/api/axios';

export const getLeaderBoard = async () => {
  const { data } = await api.get(`/api/leader-board`);
  return data;
};
