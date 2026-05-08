export function getIntensity(intensity: number, sunState: string): number {
  switch (sunState) {
    case 'deadly':
      return intensity / 10;
    case 'close':
      return intensity / 2;
    default:
      return intensity;
  }
}
