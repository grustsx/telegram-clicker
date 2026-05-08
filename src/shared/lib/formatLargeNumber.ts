export function formatLargeNumber(num: number): string {
  const suffixes: [number, string][] = [
    [1e18, 'квнтлн'],
    [1e15, 'квдрлн'],
    [1e12, 'трлн'],
    [1e9, 'млрд'],
    [1e6, 'млн'],
    [1e3, 'тыс.'],
  ];
  for (const [value, name] of suffixes) {
    if (Math.abs(num) >= value) {
      const formatted = Math.round((num / value) * 1000) / 1000;
      return `${formatted} ${name}`;
    }
  }

  return num.toString();
}
