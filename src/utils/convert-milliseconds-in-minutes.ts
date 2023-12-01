export function convertMillisecondsInMinutes(millisecond: number): string {
  const minutes = Math.floor(millisecond / 1000 / 60);
  const seconds = ((millisecond % (1000 * 60)) / 100) * 60;

  const timeExpiration = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
  return timeExpiration;
}
