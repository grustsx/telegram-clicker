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
