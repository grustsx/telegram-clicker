export const getNumberColor = (multipler: number) => {
  if (multipler >= 500) return 'text-indigo-900';
  if (multipler >= 50) return 'text-tortik-orange';
  if (multipler >= 5) return 'text-tortik-yellow';
  return 'text-tortik-white';
};
