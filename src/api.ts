import api from './axios';

export const sendUpgradeBuilding = (
  buildingId: number,
  userId: number | undefined,
) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/buildings/${buildingId}`);
};

export const sendClicks = (count: number, userId: number) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/clicks`, {
    count,
  });
};

export const sendName = (name: string, userId: number) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/name`, {
    name,
  });
};

export const sendClaimStorage = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/claim-storage`);
};

export const sendUpdateScore = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/update-score`);
};

export const getLeaderBoard = async () => {
  const { data } = await api.get(`/api/leader-board`);
  return data;
};

export const sendRestartUser = (userId: number | undefined) => {
  if (!userId) return;

  return api.post(`/api/users/${userId}/restart-user`);
};

export const sendBuySkill = (skillId: number, userId: number | undefined) => {
  if (!userId || !skillId) return;

  return api.post(`/api/users/${userId}/skills/${skillId}`);
};

export const sendCastSpell = (
  spellId: number,
  userId: number | undefined,
  payload?: { buildingId: number } | { win: boolean },
) => {
  if (!userId || !spellId) return;

  return api.post(`/api/users/${userId}/spell/${spellId}`, payload);
};

export const sendActivateBooster = (
  boosterId: number,
  userId: number | undefined,
) => {
  if (!userId || !boosterId) return;

  return api.post(`/api/users/${userId}/boosters/${boosterId}`);
};
