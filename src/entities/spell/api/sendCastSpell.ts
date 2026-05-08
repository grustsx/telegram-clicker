import api from '@/axios';

export const sendCastSpell = (
  spellId: number,
  userId: number | undefined,
  payload?: { buildingId: number } | { win: boolean },
) => {
  if (!userId || !spellId) return;

  return api.post(`/api/users/${userId}/spell/${spellId}`, payload);
};
