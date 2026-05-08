export function getDepWin(boosters: number[]): boolean {
  const booster = (id: number) => {
    return boosters.includes(id) ? 1 : 0;
  };
  return Math.random() < 0.48 + 0.26 * booster(4);
}
