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

export function formatDuration(seconds: number) {
  seconds = Math.max(0, Math.floor(seconds));

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  } else if (mins > 0) {
    return `${mins}:${String(secs).padStart(2, '0')}`;
  } else {
    return `${secs}`;
  }
}
