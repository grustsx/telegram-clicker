export function findById<T extends { id: number }>(array: T[], id: number) {
  return array.find((arrObj: T) => arrObj.id === id);
}
