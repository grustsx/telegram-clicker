import api from '@/axios';

export const getLeaderBoard = async () => {
  const { data } = await api.get(`/api/leader-board`);
  return data;
};
